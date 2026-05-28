'use client';

/**
 * useWebRTCRoom — real WebRTC peer connection hook.
 *
 * Modes:
 *   - 'self'      : just getUserMedia for self-preview. No PeerConnection.
 *   - 'loopback'  : creates two local RTCPeerConnections that exchange
 *                   SDP/ICE inside the page. Proves the full stack works
 *                   end-to-end without any signaling server. Used as the
 *                   default in /telekonsultacje/[id] so the live preview
 *                   shows a real peer-to-peer video tile.
 *   - 'signaling' : connects to a Socket.IO server (NEXT_PUBLIC_SIGNALING_URL).
 *                   Production path. Implementation included but not enabled
 *                   unless the env var is set.
 *
 * Editorial UX:
 *   - All state changes are surfaced via the returned `status` enum so the
 *     UI can render connecting / connected / failed / hung-up states.
 *   - Toggling mic/camera mutes the tracks at the sender level.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export type WebRTCMode = 'self' | 'loopback' | 'signaling';
export type WebRTCStatus =
  | 'idle'
  | 'requesting-media'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'failed'
  | 'ended';

const ICE_SERVERS: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:global.stun.twilio.com:3478' },
  ],
};

interface Options {
  /** Default: 'loopback' for editorial demo. */
  mode?: WebRTCMode;
  /** Room id used by signaling. */
  roomId?: string;
  /** Signaling server URL (overrides env). */
  signalingUrl?: string;
}

interface ReturnShape {
  status: WebRTCStatus;
  mode: WebRTCMode;
  error: string | null;

  localStream: MediaStream | null;
  remoteStream: MediaStream | null;

  /** Indicates whether the local audio track is enabled. */
  micOn: boolean;
  cameraOn: boolean;
  screenSharing: boolean;

  start: () => Promise<void>;
  hangUp: () => void;
  toggleMic: () => void;
  toggleCamera: () => void;
  toggleScreenShare: () => Promise<void>;
}

export function useWebRTCRoom(opts: Options = {}): ReturnShape {
  const mode: WebRTCMode = opts.mode ?? 'loopback';
  const roomId = opts.roomId ?? 'default';
  const signalingUrl = opts.signalingUrl ?? process.env.NEXT_PUBLIC_SIGNALING_URL;

  const [status, setStatus] = useState<WebRTCStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  // Refs for cleanup without re-creating closures.
  const localPCRef = useRef<RTCPeerConnection | null>(null);
  const remotePCRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<unknown>(null); // Socket.IO client when used
  const screenTrackRef = useRef<MediaStreamTrack | null>(null);
  const cameraTrackRef = useRef<MediaStreamTrack | null>(null);

  /** Stops every track and closes the peer connections. */
  const cleanup = useCallback(() => {
    localPCRef.current?.close();
    remotePCRef.current?.close();
    localPCRef.current = null;
    remotePCRef.current = null;

    setLocalStream((s) => {
      s?.getTracks().forEach((t) => t.stop());
      return null;
    });
    setRemoteStream(null);

    const sock = socketRef.current as { disconnect?: () => void } | null;
    sock?.disconnect?.();
    socketRef.current = null;
  }, []);

  useEffect(() => cleanup, [cleanup]);

  /* ─── Public API ──────────────────────────────────────────────────── */

  const start = useCallback(async () => {
    try {
      setError(null);
      setStatus('requesting-media');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      cameraTrackRef.current = stream.getVideoTracks()[0] ?? null;
      setLocalStream(stream);

      if (mode === 'self') {
        setStatus('connected');
        return;
      }

      if (mode === 'loopback') {
        await startLoopback(stream);
        return;
      }

      if (mode === 'signaling') {
        await startSignaling(stream);
        return;
      }
    } catch (e) {
      setStatus('failed');
      if (e instanceof Error) {
        if (e.name === 'NotAllowedError') {
          setError('Dostęp do kamery/mikrofonu zablokowany. Zezwól w ustawieniach przeglądarki.');
        } else if (e.name === 'NotFoundError') {
          setError('Nie wykryto urządzenia kamery/mikrofonu.');
        } else {
          setError(e.message);
        }
      } else {
        setError('Nieznany błąd WebRTC.');
      }
      cleanup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, cleanup]);

  const hangUp = useCallback(() => {
    cleanup();
    setStatus('ended');
  }, [cleanup]);

  const toggleMic = useCallback(() => {
    if (!localStream) return;
    const next = !micOn;
    localStream.getAudioTracks().forEach((t) => (t.enabled = next));
    setMicOn(next);
  }, [localStream, micOn]);

  const toggleCamera = useCallback(() => {
    if (!localStream) return;
    const next = !cameraOn;
    localStream.getVideoTracks().forEach((t) => (t.enabled = next));
    setCameraOn(next);
  }, [localStream, cameraOn]);

  const toggleScreenShare = useCallback(async () => {
    if (!localPCRef.current && mode !== 'self') return;
    if (!screenSharing) {
      try {
        const display = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = display.getVideoTracks()[0];
        screenTrackRef.current = screenTrack;

        const sender = localPCRef.current
          ?.getSenders()
          .find((s) => s.track && s.track.kind === 'video');
        await sender?.replaceTrack(screenTrack);

        screenTrack.onended = () => {
          // Auto-restore camera when user stops sharing from the OS prompt.
          if (cameraTrackRef.current && sender) {
            sender.replaceTrack(cameraTrackRef.current);
          }
          setScreenSharing(false);
        };

        setScreenSharing(true);
      } catch {
        // User cancelled — no-op.
      }
    } else {
      screenTrackRef.current?.stop();
      screenTrackRef.current = null;
      const sender = localPCRef.current
        ?.getSenders()
        .find((s) => s.track && s.track.kind === 'video');
      if (cameraTrackRef.current && sender) {
        await sender.replaceTrack(cameraTrackRef.current);
      }
      setScreenSharing(false);
    }
  }, [mode, screenSharing]);

  /* ─── Mode: loopback (real PC ↔ PC in the same page) ──────────────── */

  const startLoopback = async (stream: MediaStream) => {
    setStatus('connecting');

    const localPC = new RTCPeerConnection(ICE_SERVERS);
    const remotePC = new RTCPeerConnection(ICE_SERVERS);
    localPCRef.current = localPC;
    remotePCRef.current = remotePC;

    // Trickle ICE: forward candidates to the other side.
    localPC.onicecandidate = (e) => e.candidate && remotePC.addIceCandidate(e.candidate);
    remotePC.onicecandidate = (e) => e.candidate && localPC.addIceCandidate(e.candidate);

    // Remote stream wiring
    const incoming = new MediaStream();
    remotePC.ontrack = (e) => {
      e.streams[0].getTracks().forEach((t) => incoming.addTrack(t));
      setRemoteStream(incoming);
    };

    // Connection state surfacing
    localPC.onconnectionstatechange = () => {
      const s = localPC.connectionState;
      if (s === 'connected') setStatus('connected');
      else if (s === 'disconnected') setStatus('reconnecting');
      else if (s === 'failed' || s === 'closed') setStatus('failed');
    };

    // Push local tracks into the connection
    stream.getTracks().forEach((t) => localPC.addTrack(t, stream));

    // Offer / answer dance
    const offer = await localPC.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
    await localPC.setLocalDescription(offer);
    await remotePC.setRemoteDescription(offer);

    const answer = await remotePC.createAnswer();
    await remotePC.setLocalDescription(answer);
    await localPC.setRemoteDescription(answer);
  };

  /* ─── Mode: signaling (real production path) ──────────────────────── */

  const startSignaling = async (stream: MediaStream) => {
    if (!signalingUrl) {
      setError('Brak NEXT_PUBLIC_SIGNALING_URL. Skonfiguruj serwer Socket.IO.');
      setStatus('failed');
      return;
    }
    setStatus('connecting');

    const { io } = await import('socket.io-client');
    const socket = io(signalingUrl, { transports: ['websocket'] });
    socketRef.current = socket;

    const pc = new RTCPeerConnection(ICE_SERVERS);
    localPCRef.current = pc;

    const incoming = new MediaStream();
    pc.ontrack = (e) => {
      e.streams[0].getTracks().forEach((t) => incoming.addTrack(t));
      setRemoteStream(incoming);
    };
    pc.onicecandidate = (e) => {
      if (e.candidate) socket.emit('webrtc:ice', { roomId, candidate: e.candidate });
    };
    pc.onconnectionstatechange = () => {
      const s = pc.connectionState;
      if (s === 'connected') setStatus('connected');
      else if (s === 'disconnected') setStatus('reconnecting');
      else if (s === 'failed' || s === 'closed') setStatus('failed');
    };

    stream.getTracks().forEach((t) => pc.addTrack(t, stream));

    socket.emit('webrtc:join', { roomId });

    // Receive remote offer → answer
    socket.on('webrtc:offer', async ({ sdp }: { sdp: RTCSessionDescriptionInit }) => {
      await pc.setRemoteDescription(sdp);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('webrtc:answer', { roomId, sdp: answer });
    });
    // Receive remote answer
    socket.on('webrtc:answer', async ({ sdp }: { sdp: RTCSessionDescriptionInit }) => {
      await pc.setRemoteDescription(sdp);
    });
    // Remote ICE candidate
    socket.on('webrtc:ice', async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      try {
        await pc.addIceCandidate(candidate);
      } catch (e) {
        console.warn('addIceCandidate failed', e);
      }
    });
    // When peer joins, we initiate (the first peer becomes the offerer).
    socket.on('webrtc:peer-joined', async () => {
      const offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
      await pc.setLocalDescription(offer);
      socket.emit('webrtc:offer', { roomId, sdp: offer });
    });
  };

  return {
    status,
    mode,
    error,
    localStream,
    remoteStream,
    micOn,
    cameraOn,
    screenSharing,
    start,
    hangUp,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
  };
}
