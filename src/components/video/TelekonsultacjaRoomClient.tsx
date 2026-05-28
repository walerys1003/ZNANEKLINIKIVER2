'use client';

/**
 * Live telekonsultacja room with real WebRTC peer connection.
 *
 * - Calls useWebRTCRoom in 'loopback' mode by default → real RTCPeerConnection
 *   handshake & media tracks, no signaling server needed for the demo.
 *   Set NEXT_PUBLIC_SIGNALING_URL to switch to production signaling.
 * - Editorial layout preserved (charcoal stage, gold corner frames, PiP,
 *   chat + AI notes side panel).
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Video, VideoOff, Mic, MicOff, PhoneOff, Monitor, MessageSquare, FileText,
  Settings, Lock, Wifi, Sparkles, ChevronLeft, ImagePlus, Pin, Users, Camera, Play, AlertTriangle, Loader2
} from 'lucide-react';
import { SurgeonPortrait } from '@/components/ui/Visuals';
import { AIMatchBadge } from '@/components/ui/Badges';
import { useWebRTCRoom, type WebRTCStatus } from '@/lib/webrtc/useWebRTC';
import { cn } from '@/lib/utils';

interface Surgeon {
  slug: string;
  name: string;
  initials: string;
  specialty: string;
  city: string;
  aiMatch: number;
}
interface Session {
  id: string;
  topic: string;
  patientName: string;
}

interface Props {
  session: Session;
  surgeon: Surgeon;
}

export function TelekonsultacjaRoomClient({ session, surgeon }: Props) {
  const room = useWebRTCRoom({ mode: 'loopback', roomId: session.id });
  const [elapsed, setElapsed] = useState(0); // seconds
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Attach streams to video elements when they change.
  useEffect(() => {
    if (localVideoRef.current && room.localStream) {
      localVideoRef.current.srcObject = room.localStream;
    }
  }, [room.localStream]);
  useEffect(() => {
    if (remoteVideoRef.current && room.remoteStream) {
      remoteVideoRef.current.srcObject = room.remoteStream;
    }
  }, [room.remoteStream]);

  // Tick the call timer once connected.
  useEffect(() => {
    if (room.status !== 'connected') return;
    const i = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(i);
  }, [room.status]);

  const mmss = `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-charcoal-900 text-nude-100 flex flex-col">
      {/* Top bar */}
      <header className="border-b border-charcoal-700 bg-charcoal-900/80 backdrop-blur-md px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/telekonsultacje" className="text-nude-300 hover:text-nude-50 flex items-center gap-1 text-xs">
            <ChevronLeft size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">Wyjdź</span>
          </Link>
          <div className="h-5 w-px bg-charcoal-700" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <StatusPill status={room.status} />
              <span className="text-[10px] uppercase tracking-widest text-champagne-400 font-semibold tabular-nums">{session.id}</span>
            </div>
            <div className="text-xs text-nude-200 mt-0.5 font-serif-editorial italic truncate">{session.topic}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-nude-300 flex-shrink-0">
          <div className="hidden md:flex items-center gap-1.5">
            <Lock size={12} strokeWidth={1.5} className="text-champagne-400" />
            <span>E2E (DTLS-SRTP)</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <Wifi size={12} strokeWidth={1.5} className="text-champagne-400" />
            <span>{room.status === 'connected' ? 'HD · 1080p' : '—'}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 border border-charcoal-700">
            <span className={cn('w-1.5 h-1.5 rounded-full', room.status === 'connected' ? 'bg-champagne-400 animate-pulse' : 'bg-nude-400')} />
            <span className="font-display tabular-nums text-champagne-300">{mmss}</span>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <div className="flex-1 grid lg:grid-cols-[1fr_360px] gap-3 p-3 md:p-4 overflow-hidden">
        {/* Video stage */}
        <main className="relative flex flex-col gap-3 min-h-[60vh]">
          {/* Main video — remote/surgeon */}
          <div className="relative flex-1 bg-charcoal-800 overflow-hidden">
            {/* Remote feed when connected, surgeon portrait fallback otherwise. */}
            {room.remoteStream ? (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover bg-charcoal-900"
              />
            ) : (
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 via-charcoal-800 to-charcoal-900" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-md aspect-[4/5]">
                    <SurgeonPortrait initials={surgeon.initials} />
                  </div>
                </div>
              </div>
            )}

            {/* Start overlay */}
            {room.status === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-charcoal-900/60 backdrop-blur-sm">
                <div className="text-[10px] uppercase tracking-widest text-champagne-400">Pokój konsultacyjny gotowy</div>
                <button
                  onClick={() => room.start()}
                  className="group relative inline-flex items-center gap-2 bg-champagne-500 text-charcoal-900 px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-champagne-400 transition-colors"
                >
                  <Play size={14} strokeWidth={2} />
                  Dołącz do połączenia
                </button>
                <p className="max-w-xs text-center text-[11px] text-nude-300 font-serif-editorial italic">
                  Przeglądarka poprosi o dostęp do kamery i mikrofonu. Połączenie jest szyfrowane end-to-end.
                </p>
              </div>
            )}
            {(room.status === 'requesting-media' || room.status === 'connecting') && (
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal-900/60 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs text-champagne-300">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {room.status === 'requesting-media' ? 'Aktywacja kamery…' : 'Nawiązywanie połączenia P2P…'}
                </div>
              </div>
            )}
            {room.status === 'failed' && room.error && (
              <div className="absolute inset-x-6 bottom-24 rounded-none border-l-2 border-burgundy-500 bg-burgundy-500/15 p-3 text-xs text-nude-100 backdrop-blur">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-burgundy-300" />
                  <div>
                    <div className="font-semibold text-nude-50">Połączenie nie powiodło się</div>
                    <p className="mt-1 text-nude-200">{room.error}</p>
                    <button onClick={() => room.start()} className="mt-2 text-[10px] uppercase tracking-widest text-champagne-400 hover:text-champagne-300">
                      Spróbuj ponownie →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Surgeon name plate */}
            <div className="absolute bottom-4 left-4 px-3 py-2 bg-charcoal-900/85 backdrop-blur-sm border-l-2 border-champagne-500">
              <div className="text-[10px] uppercase tracking-widest text-champagne-400 font-semibold">
                Twój chirurg
              </div>
              <div className="font-display text-base text-nude-50 mt-0.5">{surgeon.name}</div>
              <div className="text-[10px] text-nude-300 font-serif-editorial italic mt-0.5">{surgeon.specialty} · {surgeon.city}</div>
            </div>

            {/* Top right tools */}
            <div className="absolute top-4 right-4 flex gap-1.5">
              <RoomChip label="Przypnij" icon={Pin} />
              <RoomChip label="Tryb pełnoekranowy" icon={Monitor} />
            </div>

            {/* Gold frame */}
            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-champagne-500/40 pointer-events-none" />
            <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-champagne-500/40 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-champagne-500/40 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-champagne-500/40 pointer-events-none" />

            {/* Self-view PiP — real local stream */}
            <div className="absolute bottom-20 right-4 w-32 md:w-40 aspect-[4/5] bg-charcoal-700 border border-champagne-500/30 overflow-hidden">
              {room.localStream ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className={cn('absolute inset-0 w-full h-full object-cover', !room.cameraOn && 'opacity-0')}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-champagne-500/20 to-burgundy-500/20" />
              )}
              {!room.cameraOn && room.localStream && (
                <div className="absolute inset-0 flex items-center justify-center text-nude-300">
                  <VideoOff size={20} strokeWidth={1.5} />
                </div>
              )}
              <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-widest text-nude-50 font-semibold bg-charcoal-900/70 px-1.5 py-0.5">
                  {session.patientName}
                </span>
                {room.micOn ? (
                  <Mic size={10} strokeWidth={1.75} className="text-champagne-400 bg-charcoal-900/70 p-0.5 rounded-sm" />
                ) : (
                  <MicOff size={10} strokeWidth={1.75} className="text-burgundy-300 bg-charcoal-900/70 p-0.5 rounded-sm" />
                )}
              </div>
            </div>
          </div>

          {/* Controls bar */}
          <div className="bg-charcoal-800 border border-charcoal-700 px-4 py-3 flex items-center justify-center gap-2">
            <ControlBtn
              icon={room.micOn ? Mic : MicOff}
              label={room.micOn ? 'Wycisz mikrofon' : 'Włącz mikrofon'}
              active={room.micOn}
              danger={!room.micOn}
              disabled={!room.localStream}
              onClick={room.toggleMic}
            />
            <ControlBtn
              icon={room.cameraOn ? Video : VideoOff}
              label={room.cameraOn ? 'Wyłącz kamerę' : 'Włącz kamerę'}
              active={room.cameraOn}
              danger={!room.cameraOn}
              disabled={!room.localStream}
              onClick={room.toggleCamera}
            />
            <ControlBtn
              icon={Monitor}
              label="Udostępnij ekran"
              active={room.screenSharing}
              disabled={!room.localStream || room.mode === 'self'}
              onClick={room.toggleScreenShare}
            />
            <ControlBtn icon={ImagePlus} label="Wyślij zdjęcie" />
            <ControlBtn icon={Settings} label="Ustawienia" />
            <div className="w-px h-8 bg-charcoal-700 mx-1" />
            <button
              onClick={room.hangUp}
              disabled={room.status === 'idle' || room.status === 'ended'}
              className="inline-flex items-center gap-2 h-11 px-5 bg-burgundy-500 hover:bg-burgundy-600 text-nude-50 text-xs uppercase tracking-wider font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PhoneOff size={14} strokeWidth={1.75} />
              Zakończ
            </button>
          </div>
        </main>

        {/* Side panel: chat + AI notes */}
        <aside className="flex flex-col gap-3 min-h-0">
          {/* Tabs */}
          <div className="bg-charcoal-800 border border-charcoal-700 flex items-center gap-1 px-1 py-1">
            <TabBtn active label="Czat" icon={MessageSquare} count={3} />
            <TabBtn label="Notatki AI" icon={Sparkles} />
            <TabBtn label="Pliki" icon={FileText} />
          </div>

          {/* Chat */}
          <div className="flex-1 bg-charcoal-800 border border-charcoal-700 flex flex-col min-h-0">
            <div className="px-4 py-3 border-b border-charcoal-700 flex items-center justify-between">
              <div>
                <div className="font-display text-sm text-nude-50">Rozmowa</div>
                <div className="text-[10px] text-champagne-400 font-serif-editorial italic mt-0.5">Szyfrowana end-to-end</div>
              </div>
              <Users size={13} strokeWidth={1.5} className="text-champagne-400" />
            </div>

            <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
              <SystemMsg text={`Połączenie ${session.id} ${room.status === 'connected' ? 'aktywne' : 'oczekuje na start'}. ${room.mode === 'loopback' ? 'Tryb demo P2P (loopback)' : 'Sygnalizacja: WebSocket'}.`} />
              <ChatMsg author={surgeon.name} role="surgeon" time="14:01" text={`Dzień dobry ${session.patientName.split(' ')[0]}, miło Panią widzieć. Czy słyszy mnie Pani wyraźnie?`} />
              <ChatMsg author={session.patientName} role="patient" time="14:01" text="Dzień dobry, słyszę bardzo dobrze. Dziękuję za czas." />
              <ChatMsg author={surgeon.name} role="surgeon" time="14:02" text={`Zacznijmy od krótkiego wywiadu. Czy mogłaby Pani opowiedzieć, co przede wszystkim chciałaby Pani osiągnąć?`} />

              {/* AI suggestion bubble */}
              <div className="px-3 py-2.5 bg-rosegold-500/10 border-l-2 border-rosegold-500">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles size={11} strokeWidth={1.5} className="text-rosegold-500" />
                  <span className="text-[10px] uppercase tracking-widest text-rosegold-500 font-semibold">AI co-pilot sugeruje</span>
                </div>
                <p className="text-xs text-nude-200 leading-relaxed">
                  Pacjentka ma wcześniejszy raport AI Analiza (ID: AI-247831) — symetria 92, sugerowana rhinoplastyka.
                </p>
                <button className="mt-2 text-[10px] uppercase tracking-widest text-rosegold-500 hover:text-rosegold-400 font-semibold">
                  Otwórz raport →
                </button>
              </div>

              <SystemMsg text="Pacjentka udostępniła 2 zdjęcia referencyjne" />
            </div>

            {/* Input */}
            <div className="border-t border-charcoal-700 p-3">
              <div className="relative">
                <input
                  placeholder="Napisz wiadomość..."
                  className="w-full bg-charcoal-700/50 border border-charcoal-600 px-3 py-2 text-xs text-nude-100 placeholder:text-nude-400 focus:outline-none focus:border-champagne-500 pr-10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-champagne-400 hover:text-champagne-300">
                  <Camera size={14} strokeWidth={1.5} />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-nude-400">
                <span className="font-serif-editorial italic">Enter → wyślij · Shift+Enter → nowa linia</span>
                <span className="flex items-center gap-1">
                  <Lock size={9} strokeWidth={1.5} />
                  E2E
                </span>
              </div>
            </div>
          </div>

          {/* AI Insight mini-card */}
          <div className="bg-charcoal-800 border border-charcoal-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] uppercase tracking-widest text-rosegold-500 font-semibold flex items-center gap-1.5">
                <Sparkles size={11} strokeWidth={1.5} />
                AI Notatki na żywo
              </div>
              <AIMatchBadge percentage={surgeon.aiMatch} variant="inline" />
            </div>
            <ul className="space-y-2 text-[11px] text-nude-200">
              <NoteRow time="14:02" text="Główne obawy: garbiek nosa, asymetria powieki" />
              <NoteRow time="14:08" text="Pacjentka wcześniej u dermatologa (botoks 6m temu)" />
              <NoteRow time="14:12" text="Budżet 20-30 tys. zł, termin: II kwartał 2026" />
            </ul>
            <button className="mt-3 w-full text-[10px] uppercase tracking-widest text-champagne-400 hover:text-champagne-300 border border-charcoal-700 hover:border-champagne-500/40 py-2 font-semibold">
              Pełny zapis sesji (po zakończeniu)
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ─────── Atoms ─────── */

function StatusPill({ status }: { status: WebRTCStatus }) {
  const map: Record<WebRTCStatus, { label: string; cls: string }> = {
    idle:                { label: 'Pokój',         cls: 'bg-charcoal-700 text-nude-200' },
    'requesting-media':  { label: 'Kamera…',       cls: 'bg-champagne-500/20 text-champagne-300' },
    connecting:          { label: 'Łączenie…',     cls: 'bg-champagne-500/20 text-champagne-300' },
    connected:           { label: 'Live',          cls: 'bg-burgundy-500 text-nude-50' },
    reconnecting:        { label: 'Re-connect',    cls: 'bg-champagne-500/20 text-champagne-300' },
    failed:              { label: 'Błąd',          cls: 'bg-burgundy-700 text-nude-50' },
    ended:               { label: 'Zakończone',    cls: 'bg-charcoal-700 text-nude-300' },
  };
  const { label, cls } = map[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase tracking-widest font-semibold', cls)}>
      {status === 'connected' && <span className="w-1.5 h-1.5 rounded-full bg-nude-50 animate-pulse" />}
      {label}
    </span>
  );
}

function RoomChip({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button title={label} className="w-9 h-9 bg-charcoal-900/85 backdrop-blur-sm border border-charcoal-700 text-nude-200 hover:text-nude-50 hover:bg-charcoal-800 flex items-center justify-center">
      <Icon size={13} strokeWidth={1.5} />
    </button>
  );
}

function ControlBtn({
  icon: Icon,
  label,
  active,
  danger,
  disabled,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'w-11 h-11 flex items-center justify-center transition-colors border',
        active && !danger && 'bg-champagne-500/15 text-champagne-300 border-champagne-500/30',
        danger && 'bg-burgundy-500/15 text-burgundy-300 border-burgundy-500/40',
        !active && !danger && 'text-nude-200 hover:bg-charcoal-700 border-transparent',
        disabled && 'opacity-40 cursor-not-allowed'
      )}
    >
      <Icon size={15} strokeWidth={1.5} />
    </button>
  );
}

function TabBtn({ active, label, icon: Icon, count }: { active?: boolean; label: string; icon: any; count?: number }) {
  return (
    <button
      className={cn(
        'flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-[11px] uppercase tracking-widest font-semibold transition-colors',
        active ? 'bg-charcoal-700 text-nude-50' : 'text-nude-300 hover:text-nude-50'
      )}
    >
      <Icon size={12} strokeWidth={1.5} />
      {label}
      {count != null && (
        <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy-500 text-[9px] text-nude-50 px-1">{count}</span>
      )}
    </button>
  );
}

function SystemMsg({ text }: { text: string }) {
  return (
    <div className="text-center text-[10px] uppercase tracking-widest text-nude-400 font-semibold py-1">
      · {text} ·
    </div>
  );
}

function ChatMsg({ author, role, time, text }: { author: string; role: 'surgeon' | 'patient'; time: string; text: string }) {
  return (
    <div className={cn('flex flex-col gap-1', role === 'patient' && 'items-end')}>
      <div className="flex items-baseline gap-2">
        <span className={cn('text-[10px] uppercase tracking-widest font-semibold', role === 'surgeon' ? 'text-champagne-400' : 'text-rosegold-500')}>
          {author}
        </span>
        <span className="text-[10px] text-nude-400 tabular-nums">{time}</span>
      </div>
      <div className={cn(
        'max-w-[85%] px-3 py-2 text-xs leading-relaxed',
        role === 'surgeon' ? 'bg-charcoal-700 text-nude-100 border-l-2 border-champagne-500' : 'bg-rosegold-500/15 text-nude-100 border-r-2 border-rosegold-500'
      )}>
        {text}
      </div>
    </div>
  );
}

function NoteRow({ time, text }: { time: string; text: string }) {
  return (
    <li className="flex items-start gap-2 text-[11px] text-nude-200">
      <span className="text-[10px] tabular-nums text-champagne-400 mt-0.5">{time}</span>
      <span className="flex-1">{text}</span>
    </li>
  );
}
