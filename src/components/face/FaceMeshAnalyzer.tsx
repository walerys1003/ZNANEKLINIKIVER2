'use client';

/**
 * Real-world TensorFlow.js Face Landmarks analyzer.
 *
 * - Accepts an uploaded image OR a live webcam feed.
 * - Loads MediaPipe FaceMesh (468 landmarks, refineLandmarks=true).
 * - Renders the landmarks on an overlay canvas with editorial styling
 *   (champagne-gold dots, rose-gold golden-ratio rectangles, charcoal lines).
 * - Computes harmony / symmetry / golden-ratio / proportion scores fully
 *   client-side. Nothing leaves the browser.
 *
 * Usage:
 *   <FaceMeshAnalyzer onComplete={(analysis) => setAnalysis(analysis)} />
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, Upload, RefreshCw, AlertTriangle, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { detectFaceLandmarks, type FaceAnalysis } from '@/lib/tf/faceMesh';
import { cn } from '@/lib/utils';

type Mode = 'pick' | 'upload' | 'webcam';
type Status = 'idle' | 'loading-model' | 'analyzing' | 'done' | 'error' | 'no-face';

interface Props {
  onComplete: (analysis: FaceAnalysis) => void;
  onCancel?: () => void;
}

export function FaceMeshAnalyzer({ onComplete, onCancel }: Props) {
  const [mode, setMode] = useState<Mode>('pick');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Inicjalizacja…');

  const imgRef = useRef<HTMLImageElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  /** Stop any running webcam stream. */
  const stopWebcam = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => () => stopWebcam(), [stopWebcam]);

  /** Draw landmarks on the canvas in editorial style. */
  const drawLandmarks = (
    analysis: FaceAnalysis,
    sourceWidth: number,
    sourceHeight: number
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = sourceWidth;
    canvas.height = sourceHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Golden-ratio reference rectangles (champagne gold)
    const { bbox } = analysis;
    ctx.strokeStyle = 'rgba(212,175,55,0.55)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    // Thirds (horizontal)
    for (let i = 1; i < 3; i++) {
      const y = bbox.y + (bbox.height * i) / 3;
      ctx.beginPath();
      ctx.moveTo(bbox.x, y);
      ctx.lineTo(bbox.x + bbox.width, y);
      ctx.stroke();
    }
    // Vertical center
    ctx.beginPath();
    ctx.moveTo(bbox.x + bbox.width / 2, bbox.y);
    ctx.lineTo(bbox.x + bbox.width / 2, bbox.y + bbox.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Tessellation hints — light grey skeleton (subset of mesh lines)
    ctx.strokeStyle = 'rgba(245,243,239,0.25)';
    ctx.lineWidth = 0.5;
    const k = analysis.keypoints;
    const lines: [number, number][] = [
      [10, 152], [234, 454], [33, 263], [61, 291],
      [33, 61], [263, 291], [10, 234], [10, 454],
      [152, 234], [152, 454], [1, 152], [10, 1],
    ];
    lines.forEach(([a, b]) => {
      if (!k[a] || !k[b]) return;
      ctx.beginPath();
      ctx.moveTo(k[a].x, k[a].y);
      ctx.lineTo(k[b].x, k[b].y);
      ctx.stroke();
    });

    // 468 landmark dots — champagne gold with rose-gold accent on key points
    const keyIndices = new Set([
      10, 152, 234, 454, 33, 263, 133, 362, 1, 2, 61, 291,
      168, 6, 197, 195, 5, 4,
    ]);
    analysis.keypoints.forEach((kp, idx) => {
      ctx.beginPath();
      if (keyIndices.has(idx)) {
        ctx.fillStyle = 'rgba(184,115,51,0.95)'; // rose-gold
        ctx.arc(kp.x, kp.y, 2.5, 0, Math.PI * 2);
      } else {
        ctx.fillStyle = 'rgba(212,175,55,0.65)'; // champagne gold
        ctx.arc(kp.x, kp.y, 1.1, 0, Math.PI * 2);
      }
      ctx.fill();
    });
  };

  /** Run the model on an image element. */
  const analyzeImage = useCallback(async (img: HTMLImageElement) => {
    try {
      setStatus('loading-model');
      setStatusText('Pobieranie modelu MediaPipe FaceMesh (~3 MB)…');
      setProgress(15);

      // Tick progress while we wait for the model+inference
      const progInt = setInterval(() => {
        setProgress((p) => (p < 85 ? p + 2 : p));
      }, 120);

      setStatusText('Wykrywanie 468 punktów twarzy…');
      const analysis = await detectFaceLandmarks(img);

      clearInterval(progInt);

      if (!analysis) {
        setStatus('no-face');
        setError('Nie wykryto twarzy. Wgraj zdjęcie en face przy dobrym świetle.');
        return;
      }

      setStatusText('Liczenie proporcji złotego podziału…');
      setProgress(95);

      // Render the result overlay
      drawLandmarks(analysis, img.naturalWidth, img.naturalHeight);

      setProgress(100);
      setStatus('done');
      setStatusText('Analiza zakończona.');

      // Small delay so the user sees the overlay before navigating to results.
      setTimeout(() => onComplete(analysis), 900);
    } catch (e) {
      console.error(e);
      setStatus('error');
      setError(
        e instanceof Error
          ? `Błąd modelu: ${e.message}`
          : 'Nieznany błąd modelu TensorFlow.js.'
      );
    }
  }, [onComplete]);

  /** Handle file upload. */
  const handleFile = (file: File) => {
    setMode('upload');
    setStatus('analyzing');
    setError(null);
    setProgress(5);
    setStatusText('Ładowanie zdjęcia…');

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (imgRef.current) {
          imgRef.current.src = dataUrl;
        }
        analyzeImage(img);
      };
      img.onerror = () => {
        setStatus('error');
        setError('Nie udało się załadować obrazu.');
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  /** Start webcam and run detector on a single captured frame. */
  const startWebcam = async () => {
    try {
      setMode('webcam');
      setStatus('analyzing');
      setError(null);
      setProgress(5);
      setStatusText('Aktywacja kamery…');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;

      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      await video.play();

      // Give the camera ~800 ms to expose properly, then capture & analyse.
      setStatusText('Stabilizacja obrazu…');
      setProgress(20);
      await new Promise((r) => setTimeout(r, 800));

      // Capture current frame to a hidden canvas for the detector.
      const cap = document.createElement('canvas');
      cap.width = video.videoWidth;
      cap.height = video.videoHeight;
      const cctx = cap.getContext('2d');
      cctx?.drawImage(video, 0, 0);

      setStatusText('Wykrywanie 468 punktów twarzy…');
      setProgress(45);

      const progInt = setInterval(() => {
        setProgress((p) => (p < 90 ? p + 2 : p));
      }, 120);

      const analysis = await detectFaceLandmarks(cap);
      clearInterval(progInt);

      if (!analysis) {
        setStatus('no-face');
        setError('Nie wykryto twarzy w kadrze. Spróbuj ustawić się bezpośrednio przed kamerą.');
        return;
      }

      // Show captured still + overlay (stop the live stream)
      stopWebcam();
      if (imgRef.current) {
        imgRef.current.src = cap.toDataURL('image/jpeg', 0.9);
      }
      drawLandmarks(analysis, cap.width, cap.height);

      setProgress(100);
      setStatus('done');
      setStatusText('Analiza zakończona.');
      setTimeout(() => onComplete(analysis), 900);
    } catch (e) {
      stopWebcam();
      console.error(e);
      setStatus('error');
      if (e instanceof Error && e.name === 'NotAllowedError') {
        setError('Dostęp do kamery zablokowany. Zezwól na kamerę w ustawieniach przeglądarki.');
      } else {
        setError(e instanceof Error ? e.message : 'Nie udało się uruchomić kamery.');
      }
    }
  };

  const handleRetry = () => {
    stopWebcam();
    setMode('pick');
    setStatus('idle');
    setError(null);
    setProgress(0);
    if (imgRef.current) imgRef.current.src = '';
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────

  if (mode === 'pick') {
    return (
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="group relative overflow-hidden rounded-3xl border border-charcoal-200 bg-cream p-10 text-left transition hover:border-rose-gold-500 hover:shadow-luxury"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-gold-50 text-rose-gold-600">
              <Upload className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div className="font-serif text-2xl text-charcoal-900">Wgraj zdjęcie</div>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
              JPG / PNG / HEIC · zdjęcie en face przy naturalnym świetle, bez makijażu.
              Maks. 10 MB.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-rose-gold-600">
              Wybierz plik
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </button>

          <button
            onClick={startWebcam}
            className="group relative overflow-hidden rounded-3xl border border-charcoal-200 bg-cream p-10 text-left transition hover:border-champagne-500 hover:shadow-luxury"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-champagne-50 text-champagne-700">
              <Camera className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div className="font-serif text-2xl text-charcoal-900">Użyj kamery</div>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
              Aktywuj przednią kamerę. Klatka zostanie przeanalizowana lokalnie —
              <strong className="text-charcoal-900"> nic nie opuszcza Twojego urządzenia.</strong>
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-champagne-700">
              Uruchom kamerę
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />

        <p className="flex items-center justify-center gap-2 text-xs text-charcoal-500">
          <Sparkles className="h-3 w-3 text-rose-gold-500" />
          Model TensorFlow.js MediaPipe FaceMesh · 100% client-side · GDPR by design
        </p>

        {onCancel && (
          <div className="text-center">
            <button onClick={onCancel} className="text-sm text-charcoal-500 underline-offset-4 hover:underline">
              Anuluj
            </button>
          </div>
        )}
      </div>
    );
  }

  // analyzing / done / error / no-face
  return (
    <div className="space-y-6">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-3xl border border-charcoal-200 bg-charcoal-900 shadow-luxury">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} alt="" className="absolute inset-0 h-full w-full object-cover opacity-95" />
        <video ref={videoRef} className={cn('absolute inset-0 h-full w-full object-cover', mode !== 'webcam' || status === 'done' ? 'hidden' : '')} muted playsInline />
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />

        {/* corner brackets */}
        {(['top-left','top-right','bottom-left','bottom-right'] as const).map((corner) => (
          <span
            key={corner}
            className={cn(
              'pointer-events-none absolute h-8 w-8 border-champagne-500',
              corner === 'top-left' && 'top-3 left-3 border-l-2 border-t-2',
              corner === 'top-right' && 'top-3 right-3 border-r-2 border-t-2',
              corner === 'bottom-left' && 'bottom-3 left-3 border-l-2 border-b-2',
              corner === 'bottom-right' && 'bottom-3 right-3 border-r-2 border-b-2'
            )}
          />
        ))}

        {/* overlay status */}
        {(status === 'analyzing' || status === 'loading-model') && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-900/95 to-transparent p-5">
            <div className="flex items-center gap-3 text-cream">
              <Loader2 className="h-4 w-4 animate-spin text-champagne-500" />
              <span className="text-sm font-medium">{statusText}</span>
            </div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-cream/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-champagne-500 to-rose-gold-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {status === 'done' && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-charcoal-900/85 px-3 py-1 text-xs font-medium text-champagne-500 backdrop-blur">
            <CheckCircle2 className="h-3 w-3" />
            468 punktów wykrytych
          </div>
        )}
      </div>

      {(status === 'error' || status === 'no-face') && (
        <div className="rounded-2xl border border-burgundy-200 bg-burgundy-50 p-5 text-sm text-burgundy-900">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-burgundy-700" />
            <div className="flex-1">
              <div className="font-medium">
                {status === 'no-face' ? 'Nie wykryto twarzy' : 'Wystąpił błąd'}
              </div>
              <p className="mt-1 text-burgundy-800">{error}</p>
              <button
                onClick={handleRetry}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-burgundy-700 px-4 py-1.5 text-xs font-medium text-cream hover:bg-burgundy-800"
              >
                <RefreshCw className="h-3 w-3" /> Spróbuj ponownie
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
