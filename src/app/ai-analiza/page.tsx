'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Upload, Camera, Sparkles, CheckCircle2, Shield, Lock, Eye, Smile,
  Triangle, Brain, Download, ArrowRight, RefreshCw, Image as ImageIcon, FileLock2
} from 'lucide-react';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow, DisplayHero } from '@/components/ui/Typography';
import { ButtonPrimary, ButtonGold, ButtonGhost } from '@/components/ui/Buttons';
import { AIOrb } from '@/components/ui/AIOrb';
import { AIMatchBadge } from '@/components/ui/Badges';
import { SurgeonCard } from '@/components/ui/Cards';
import { surgeons } from '@/data/mock';
import { cn } from '@/lib/utils';

type Phase = 'intro' | 'upload' | 'analyzing' | 'results';

const analysisSteps = [
  'Detekcja punktów twarzy (468 landmarks)',
  'Analiza proporcji złotego podziału',
  'Ocena symetrii i harmonii rysów',
  'Mapowanie struktury kostnej',
  'Dobór rekomendacji estetycznych',
  'Personalizacja rankingu chirurgów',
];

export default function AiAnalizaPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Animate analysis progress
  useEffect(() => {
    if (phase !== 'analyzing') return;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 1;
        const stepIdx = Math.floor((next / 100) * analysisSteps.length);
        setCurrentStep(Math.min(stepIdx, analysisSteps.length - 1));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('results'), 600);
          return 100;
        }
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [phase]);

  const handleUpload = () => {
    setPhase('analyzing');
    setProgress(0);
    setCurrentStep(0);
  };

  const handleReset = () => {
    setPhase('intro');
    setProgress(0);
    setCurrentStep(0);
  };

  return (
    <>
      <TopNav />

      {phase === 'intro' && <IntroView onStart={() => setPhase('upload')} />}
      {phase === 'upload' && <UploadView fileInputRef={fileInputRef} onAnalyze={handleUpload} onBack={() => setPhase('intro')} />}
      {phase === 'analyzing' && <AnalyzingView progress={progress} currentStep={currentStep} />}
      {phase === 'results' && <ResultsView onReset={handleReset} />}

      <Footer />
    </>
  );
}

/* ─────── Intro ─────── */
function IntroView({ onStart }: { onStart: () => void }) {
  return (
    <>
      <section className="relative bg-nude-100 overflow-hidden">
        <div className="absolute top-1/3 right-[10%] hidden lg:block opacity-60">
          <AIOrb size="xl" />
        </div>

        <Container size="editorial">
          <div className="py-20 md:py-32 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rosegold-500/15 border border-rosegold-500/30 mb-6">
                <Sparkles size={12} strokeWidth={1.5} className="text-rosegold-500" />
                <span className="text-[10px] uppercase tracking-widest text-rosegold-500 font-semibold">
                  AI Face Visualization · BETA
                </span>
              </div>

              <DisplayHero className="text-charcoal-800">
                Zobacz twarz<br/>
                <span className="font-serif-editorial italic text-rosegold-500">w nowym świetle</span>
              </DisplayHero>

              <p className="font-serif-editorial italic text-lg md:text-xl text-charcoal-600 mt-6 leading-relaxed max-w-xl">
                Nasza AI analizuje 468 punktów twarzy w 12 sekund. Otrzymasz personalizowany raport
                o proporcjach, symetrii i rekomendacje chirurgów dopasowanych do Twojej anatomii.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonPrimary size="lg" onClick={onStart}>
                  Rozpocznij analizę
                </ButtonPrimary>
                <ButtonGold size="lg" href="#how-it-works">
                  Jak to działa?
                </ButtonGold>
              </div>

              {/* Trust strip */}
              <div className="mt-10 pt-8 border-t border-champagne-500/30 grid grid-cols-3 gap-6 max-w-xl">
                <TrustStat value="468" label="Punktów twarzy" />
                <TrustStat value="12s" label="Średni czas" />
                <TrustStat value="98%" label="Trafność AI" />
              </div>
            </div>

            <div className="relative lg:hidden">
              <AIOrb size="xl" />
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-nude-50 border-t border-champagne-500/20 py-20 md:py-28">
        <Container size="editorial">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Eyebrow>Trzy kroki do raportu</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal-800 mt-3">
              Bezpiecznie. Anonimowo. <span className="font-serif-editorial italic text-rosegold-500">Precyzyjnie.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <HowItWorksCard num="01" icon={Camera} title="Wgraj zdjęcie" description="Selfie en face w neutralnym świetle. Bez makijażu dla najlepszej dokładności." />
            <HowItWorksCard num="02" icon={Brain} title="AI analizuje" description="468 landmarks twarzy. Pomiar proporcji, symetrii, kątów. Zero przechowywania." />
            <HowItWorksCard num="03" icon={Sparkles} title="Otrzymaj raport" description="Indywidualne rekomendacje, ranking chirurgów i symulacje zabiegów." />
          </div>

          {/* Privacy block */}
          <div className="mt-16 max-w-3xl mx-auto px-6 md:px-10 py-8 bg-charcoal-800 text-nude-50">
            <div className="flex items-start gap-5">
              <FileLock2 size={32} strokeWidth={1.25} className="text-champagne-400 flex-shrink-0 mt-1" />
              <div>
                <Eyebrow className="text-champagne-400">Privacy by design</Eyebrow>
                <h3 className="font-display text-2xl mt-2 mb-3">Twoje zdjęcie nigdy nie opuszcza Twojego urządzenia</h3>
                <p className="font-serif-editorial italic text-nude-200 leading-relaxed">
                  Analiza odbywa się w przeglądarce (on-device TensorFlow.js). Po zakończeniu zdjęcie jest natychmiast usuwane.
                  ChirurgiaPiekna jest zgodne z RODO i certyfikatem ISO 27001. Nie używamy Twojego zdjęcia do treningu modeli AI.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Badge>RODO compliant</Badge>
                  <Badge>ISO 27001</Badge>
                  <Badge>HIPAA-aware</Badge>
                  <Badge>Zero retention</Badge>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ─────── Upload ─────── */
function UploadView({ fileInputRef, onAnalyze, onBack }: any) {
  const [hasFile, setHasFile] = useState(false);

  return (
    <section className="bg-nude-100 py-16 md:py-24 min-h-[80vh]">
      <Container size="editorial">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow className="text-rosegold-500">Krok 1 z 3 · Wgraj zdjęcie</Eyebrow>
            <h1 className="font-display text-4xl md:text-5xl text-charcoal-800 mt-3">
              Wybierz swoje selfie
            </h1>
            <p className="font-serif-editorial italic text-charcoal-500 mt-3">
              Najlepiej en face, w neutralnym świetle dziennym.
            </p>
          </div>

          {/* Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'group relative aspect-[4/3] md:aspect-[16/9] border-2 border-dashed transition-all cursor-pointer overflow-hidden',
              hasFile
                ? 'border-champagne-500 bg-champagne-500/5'
                : 'border-champagne-500/40 hover:border-champagne-500 bg-nude-50 hover:bg-champagne-500/5'
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={() => setHasFile(true)}
            />

            {/* Decorative corners */}
            <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-champagne-500/60" />
            <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-champagne-500/60" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-champagne-500/60" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-champagne-500/60" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              {hasFile ? (
                <>
                  <CheckCircle2 size={56} strokeWidth={1} className="text-champagne-600 mb-4" />
                  <div className="font-display text-xl text-charcoal-800">Zdjęcie gotowe do analizy</div>
                  <div className="font-serif-editorial italic text-sm text-charcoal-500 mt-2">portret-1.jpg · 2.3 MB</div>
                </>
              ) : (
                <>
                  <Upload size={56} strokeWidth={1} className="text-champagne-600 mb-4 group-hover:-translate-y-1 transition-transform" />
                  <div className="font-display text-2xl text-charcoal-800">Upuść zdjęcie tutaj</div>
                  <div className="font-serif-editorial italic text-sm text-charcoal-500 mt-2">lub kliknij, by wybrać z dysku</div>
                  <div className="mt-6 text-[10px] uppercase tracking-widest text-charcoal-400">
                    JPG · PNG · do 10 MB
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Photo guidelines */}
          <div className="mt-10 grid md:grid-cols-4 gap-4">
            <Guideline good label="En face" hint="Patrz prosto" />
            <Guideline good label="Naturalne światło" hint="Dzienne, miękkie" />
            <Guideline good label="Bez makijażu" hint="Optymalna analiza" />
            <Guideline good={false} label="Bez filtrów" hint="Tylko oryginalne" />
          </div>

          {/* Actions */}
          <div className="mt-10 flex justify-between items-center">
            <button onClick={onBack} className="text-sm text-charcoal-600 hover:text-burgundy-500 font-medium">
              ← Wstecz
            </button>
            <ButtonPrimary onClick={onAnalyze} disabled={!hasFile} size="lg">
              Analizuj z AI
            </ButtonPrimary>
          </div>

          {/* Skip / demo */}
          <div className="mt-6 text-center">
            <button
              onClick={() => { setHasFile(true); setTimeout(onAnalyze, 200); }}
              className="text-xs text-charcoal-500 hover:text-rosegold-500 underline underline-offset-4"
            >
              Pomiń · Zobacz demo analizy
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────── Analyzing ─────── */
function AnalyzingView({ progress, currentStep }: { progress: number; currentStep: number }) {
  return (
    <section className="bg-nude-100 py-20 md:py-32 min-h-[80vh] flex items-center">
      <Container size="editorial">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
            {/* AI Orb */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <AIOrb size="xl" />
                {/* Scanning grid overlay */}
                <FaceLandmarkOverlay />
              </div>
              <div className="mt-8 text-center">
                <Eyebrow className="text-rosegold-500">Analiza w toku</Eyebrow>
                <div className="font-display text-5xl text-charcoal-800 tabular-nums mt-3">
                  {progress}<span className="text-2xl text-champagne-500">%</span>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 leading-tight">
                AI analizuje<br />
                <span className="font-serif-editorial italic text-rosegold-500">Twoją unikalną twarz</span>
              </h2>
              <p className="font-serif-editorial italic text-charcoal-500 mt-3 mb-8">
                Wszystkie obliczenia odbywają się lokalnie. Zaraz zobaczysz personalizowany raport.
              </p>

              <ul className="space-y-4">
                {analysisSteps.map((step, i) => {
                  const isDone = i < currentStep;
                  const isActive = i === currentStep;
                  return (
                    <li
                      key={step}
                      className={cn(
                        'flex items-center gap-3 text-sm transition-opacity duration-300',
                        i > currentStep && 'opacity-30'
                      )}
                    >
                      <div className={cn(
                        'w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0',
                        isDone ? 'bg-champagne-500 border-champagne-500 text-charcoal-800' :
                        isActive ? 'border-rosegold-500 animate-pulse' :
                        'border-charcoal-300'
                      )}>
                        {isDone && <CheckCircle2 size={12} strokeWidth={2} />}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-rosegold-500" />}
                      </div>
                      <span className={cn(
                        isActive ? 'text-charcoal-800 font-medium' : 'text-charcoal-600'
                      )}>
                        {step}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Progress bar */}
              <div className="mt-10">
                <div className="h-1 bg-champagne-500/20 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rosegold-500 via-champagne-500 to-rosegold-500 gold-shimmer transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-charcoal-500">
                  <span className="font-serif-editorial italic">Pozostało {Math.max(1, 12 - Math.floor(progress / 8.3))} sekund</span>
                  <span className="tabular-nums">{progress}/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FaceLandmarkOverlay() {
  // 12 random landmark points scattered around an oval face
  const points = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * Math.PI * 2;
    const r = 60 + Math.sin(i * 1.7) * 18;
    return { cx: 100 + Math.cos(angle) * r, cy: 100 + Math.sin(angle) * r * 1.2, delay: i * 0.08 };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    >
      {/* Face oval guide */}
      <ellipse cx="100" cy="100" rx="62" ry="78" fill="none" stroke="#C9A961" strokeWidth="0.5" opacity="0.4" strokeDasharray="2 3" />
      <line x1="100" y1="22" x2="100" y2="178" stroke="#C9A961" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 3" />
      <line x1="38" y1="100" x2="162" y2="100" stroke="#C9A961" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 3" />

      {/* Landmark points */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r="1.4" fill="#B85A4E">
            <animate attributeName="opacity" values="0;1;0.4" dur="2s" begin={`${p.delay}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={p.cx} cy={p.cy} r="3" fill="none" stroke="#B85A4E" strokeWidth="0.4" opacity="0.5">
            <animate attributeName="r" values="2;5;2" dur="2s" begin={`${p.delay}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Connecting lines for golden ratio */}
      <path d="M 70 70 L 130 70 L 130 130 L 70 130 Z" fill="none" stroke="#C9A961" strokeWidth="0.6" opacity="0.5" />
      <path d="M 70 92 L 130 92" stroke="#C9A961" strokeWidth="0.4" opacity="0.4" />
      <path d="M 70 108 L 130 108" stroke="#C9A961" strokeWidth="0.4" opacity="0.4" />
    </svg>
  );
}

/* ─────── Results ─────── */
function ResultsView({ onReset }: { onReset: () => void }) {
  const topMatches = surgeons.slice(0, 3).sort((a, b) => b.aiMatch - a.aiMatch);

  return (
    <>
      {/* Hero results */}
      <section className="bg-nude-100 py-12 md:py-16 border-b border-champagne-500/30">
        <Container size="editorial">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <Eyebrow className="text-rosegold-500">Raport AI · ID: AI-{Date.now().toString().slice(-6)}</Eyebrow>
              <h1 className="font-display text-4xl md:text-5xl text-charcoal-800 mt-3">
                Twoja analiza<br/>
                <span className="font-serif-editorial italic text-rosegold-500">jest gotowa</span>
              </h1>
              <p className="font-serif-editorial italic text-charcoal-500 mt-3 max-w-xl">
                Raport został wygenerowany lokalnie. Zdjęcie zostało automatycznie usunięte.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <ButtonGold size="md" icon={<Download size={14} strokeWidth={1.5} />}>
                Pobierz PDF
              </ButtonGold>
              <button onClick={onReset} className="inline-flex items-center gap-1.5 text-sm text-charcoal-600 hover:text-rosegold-500 px-4 py-2">
                <RefreshCw size={13} strokeWidth={1.5} />
                Nowa analiza
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Scores */}
      <section className="bg-nude-50 py-16 border-b border-champagne-500/20">
        <Container size="editorial">
          <div className="grid md:grid-cols-4 gap-4">
            <ScoreCard label="Harmonia rysów" score={87} description="Bardzo wysoka" />
            <ScoreCard label="Symetria twarzy" score={92} description="Wyjątkowa" accent />
            <ScoreCard label="Złoty podział" score={81} description="Wysoki" />
            <ScoreCard label="Proporcje 1/3" score={79} description="Harmonijne" />
          </div>
        </Container>
      </section>

      {/* Detailed analysis */}
      <section className="bg-nude-100 py-16 md:py-20">
        <Container size="editorial">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12">
            {/* Left — face visualization */}
            <div className="bg-charcoal-800 p-8 md:p-10 relative overflow-hidden aspect-[4/5] lg:aspect-auto">
              <div className="absolute top-5 left-5 text-[10px] uppercase tracking-widest text-champagne-400 font-semibold">
                Mapa AI · 468 punktów
              </div>
              <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-2 py-1 bg-champagne-500/20 border border-champagne-500/40 text-[10px] uppercase tracking-widest text-champagne-300">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse" />
                Live
              </div>

              <div className="h-full flex items-center justify-center">
                <ResultsFaceMap />
              </div>

              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-3 text-[11px] text-nude-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rosegold-500" /> Landmarki AI
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-champagne-400" /> Linie złotego podziału
                </div>
              </div>
            </div>

            {/* Right — observations */}
            <div className="space-y-6">
              <div>
                <Eyebrow>Obserwacje AI</Eyebrow>
                <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 mt-2">
                  Co odkryła analiza
                </h2>
              </div>

              <ObservationCard
                icon={Eye}
                area="Oczy i powieki"
                observation="Lekka asymetria powieki górnej (≈ 1.8 mm). Linia spojrzenia neutralna, otwartość harmonijna."
                recommendation="Blepharoplastyka powiek górnych mogłaby otworzyć spojrzenie."
                procedureSlug="blepharoplastyka-gornych"
              />
              <ObservationCard
                icon={Triangle}
                area="Nos i profil"
                observation="Garbiek grzbietu nosa ~ 2 mm. Pozostałe proporcje w zakresie złotego podziału."
                recommendation="Rhinoplastyka ultrasonograficzna z subtelną korektą grzbietu."
                procedureSlug="rhinoplastyka-ultrasonograficzna"
                primary
              />
              <ObservationCard
                icon={Smile}
                area="Usta i okolica"
                observation="Czerwień wargi górnej delikatnie spłaszczona. Proporcja 1:1.6 z dolną."
                recommendation="Naturalna wolumetria kwasem hialuronowym (0.5 ml)."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Surgeon matches */}
      <section className="bg-nude-50 py-16 md:py-24 border-t border-champagne-500/20">
        <Container size="editorial">
          <div className="max-w-2xl mb-12">
            <Eyebrow className="text-rosegold-500">Personalizowane dopasowanie</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal-800 mt-3 leading-tight">
              Trzech chirurgów<br/>
              <span className="font-serif-editorial italic text-rosegold-500">dla Twojej anatomii</span>
            </h2>
            <p className="font-serif-editorial italic text-charcoal-500 mt-3">
              Ranking wygenerowany na podstawie Twojej analizy AI oraz specjalizacji każdego specjalisty.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topMatches.map((s, i) => (
              <div key={s.slug} className="relative">
                <div className="absolute -top-3 -left-3 z-10 w-10 h-10 rounded-full bg-rosegold-500 text-nude-50 flex items-center justify-center font-display text-lg shadow-editorial-md">
                  {i + 1}
                </div>
                <SurgeonCard surgeon={s} variant={i === 0 ? 'featured' : 'default'} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-nude-100 py-16 border-t border-champagne-500/20">
        <Container size="editorial">
          <div className="max-w-3xl mx-auto text-center">
            <Eyebrow>Następny krok</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 mt-3">
              Omów raport z chirurgiem
            </h2>
            <p className="font-serif-editorial italic text-charcoal-500 mt-3">
              Raport zostanie automatycznie udostępniony specjalistom podczas konsultacji.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <ButtonPrimary size="lg" href={`/rezerwacja?chirurg=${topMatches[0].slug}`}>
                Umów konsultację z {topMatches[0].name.split(' ')[1]}
              </ButtonPrimary>
              <ButtonGold size="lg" href="/telekonsultacje">
                Telekonsultacja online
              </ButtonGold>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ResultsFaceMap() {
  return (
    <svg viewBox="0 0 320 380" className="w-full max-w-sm" aria-hidden>
      <defs>
        <radialGradient id="faceGlow" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#B85A4E" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="380" fill="url(#faceGlow)" />

      {/* Face oval */}
      <ellipse cx="160" cy="180" rx="92" ry="118" fill="none" stroke="#C9A961" strokeWidth="0.8" opacity="0.7" />

      {/* Golden ratio horizontal lines */}
      <line x1="60" y1="120" x2="260" y2="120" stroke="#C9A961" strokeWidth="0.5" opacity="0.6" strokeDasharray="3 4" />
      <line x1="60" y1="180" x2="260" y2="180" stroke="#C9A961" strokeWidth="0.5" opacity="0.6" strokeDasharray="3 4" />
      <line x1="60" y1="240" x2="260" y2="240" stroke="#C9A961" strokeWidth="0.5" opacity="0.6" strokeDasharray="3 4" />

      {/* Vertical center */}
      <line x1="160" y1="60" x2="160" y2="298" stroke="#C9A961" strokeWidth="0.4" opacity="0.4" strokeDasharray="2 3" />

      {/* Golden ratio rectangle */}
      <rect x="100" y="120" width="120" height="74" fill="none" stroke="#C9A961" strokeWidth="0.6" opacity="0.5" />

      {/* Brow line */}
      <path d="M 110 142 Q 130 132 152 138" fill="none" stroke="#F8F4EE" strokeWidth="1.2" opacity="0.6" />
      <path d="M 168 138 Q 190 132 210 142" fill="none" stroke="#F8F4EE" strokeWidth="1.2" opacity="0.6" />

      {/* Eyes */}
      <ellipse cx="128" cy="160" rx="11" ry="4" fill="none" stroke="#F8F4EE" strokeWidth="1" opacity="0.6" />
      <ellipse cx="192" cy="160" rx="11" ry="4" fill="none" stroke="#F8F4EE" strokeWidth="1" opacity="0.6" />
      <circle cx="128" cy="160" r="2" fill="#F8F4EE" opacity="0.4" />
      <circle cx="192" cy="160" r="2" fill="#F8F4EE" opacity="0.4" />

      {/* Nose */}
      <path d="M 160 162 L 156 200 Q 158 212 160 214 Q 162 212 164 200 Z" fill="none" stroke="#F8F4EE" strokeWidth="1" opacity="0.5" />

      {/* Mouth */}
      <path d="M 138 240 Q 160 248 182 240" fill="none" stroke="#F8F4EE" strokeWidth="1.2" opacity="0.6" />
      <path d="M 138 240 Q 160 236 182 240" fill="none" stroke="#F8F4EE" strokeWidth="0.8" opacity="0.4" />

      {/* Landmarks — random dots */}
      {Array.from({ length: 38 }).map((_, i) => {
        const angle = (i / 38) * Math.PI * 2;
        const r = 88 + Math.sin(i * 2.3) * 14;
        const cx = 160 + Math.cos(angle) * r * 0.85;
        const cy = 180 + Math.sin(angle) * r * 1.05;
        return (
          <circle key={i} cx={cx} cy={cy} r="1.4" fill="#B85A4E">
            <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + (i % 3) * 0.5}s`} repeatCount="indefinite" begin={`${(i * 0.05) % 2}s`} />
          </circle>
        );
      })}

      {/* Inner facial landmarks */}
      {[
        { cx: 128, cy: 160 }, { cx: 192, cy: 160 }, { cx: 160, cy: 200 },
        { cx: 160, cy: 240 }, { cx: 140, cy: 240 }, { cx: 180, cy: 240 },
        { cx: 110, cy: 200 }, { cx: 210, cy: 200 }, { cx: 160, cy: 138 },
      ].map((p, i) => (
        <g key={`l${i}`}>
          <circle cx={p.cx} cy={p.cy} r="2" fill="#C9A961">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
          </circle>
          <circle cx={p.cx} cy={p.cy} r="5" fill="none" stroke="#C9A961" strokeWidth="0.4" opacity="0.5">
            <animate attributeName="r" values="3;7;3" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
          </circle>
        </g>
      ))}

      {/* Annotation callouts */}
      <g>
        <line x1="128" y1="160" x2="60" y2="120" stroke="#C9A961" strokeWidth="0.5" opacity="0.7" />
        <circle cx="60" cy="120" r="2" fill="#C9A961" />
        <text x="20" y="113" fontSize="8" fill="#F8F4EE" fontFamily="serif" fontStyle="italic">P1 · oko L</text>
      </g>
      <g>
        <line x1="160" y1="200" x2="270" y2="170" stroke="#C9A961" strokeWidth="0.5" opacity="0.7" />
        <circle cx="270" cy="170" r="2" fill="#C9A961" />
        <text x="232" y="163" fontSize="8" fill="#F8F4EE" fontFamily="serif" fontStyle="italic">P2 · grzbiet nosa</text>
      </g>
    </svg>
  );
}

/* ─────── Atoms ─────── */
function TrustStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-charcoal-800 tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-charcoal-500 mt-1 font-semibold">{label}</div>
    </div>
  );
}

function HowItWorksCard({ num, icon: Icon, title, description }: { num: string; icon: any; title: string; description: string }) {
  return (
    <article className="bg-surface-card border-t border-champagne-500/80 p-7 hover:shadow-editorial-md transition-shadow">
      <div className="flex items-baseline justify-between mb-5">
        <span className="font-display text-3xl text-champagne-500/70 tabular-nums">{num}</span>
        <Icon size={22} strokeWidth={1.5} className="text-rosegold-500" />
      </div>
      <h3 className="font-display text-xl text-charcoal-800 mb-2">{title}</h3>
      <p className="font-serif-editorial italic text-sm text-charcoal-500 leading-relaxed">{description}</p>
    </article>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-champagne-500/40 text-[10px] uppercase tracking-widest text-champagne-300 font-semibold">
      <Shield size={10} strokeWidth={1.5} />
      {children}
    </span>
  );
}

function Guideline({ good, label, hint }: { good: boolean; label: string; hint: string }) {
  return (
    <div className="text-center px-4 py-4 bg-nude-50 border border-champagne-500/20">
      <div className={cn(
        'w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2',
        good ? 'bg-champagne-500/15 text-champagne-700' : 'bg-burgundy-500/10 text-burgundy-500'
      )}>
        {good ? <CheckCircle2 size={14} strokeWidth={2} /> : '✕'}
      </div>
      <div className="font-display text-sm text-charcoal-800">{label}</div>
      <div className="text-[10px] text-charcoal-500 mt-0.5 font-serif-editorial italic">{hint}</div>
    </div>
  );
}

function ScoreCard({ label, score, description, accent }: { label: string; score: number; description: string; accent?: boolean }) {
  return (
    <div className={cn(
      'p-6 bg-surface-card border-t border-champagne-500/80',
      accent && 'ring-1 ring-rosegold-500/30 shadow-editorial-md'
    )}>
      <div className="text-[10px] uppercase tracking-widest text-champagne-600 font-semibold mb-3">{label}</div>
      <div className="flex items-baseline gap-2 mb-2">
        <div className={cn('font-display text-4xl tabular-nums', accent ? 'text-rosegold-500' : 'text-charcoal-800')}>
          {score}
        </div>
        <div className="text-charcoal-400 text-lg tabular-nums">/100</div>
      </div>
      <div className="text-xs text-charcoal-500 font-serif-editorial italic">{description}</div>
      {/* progress */}
      <div className="mt-3 h-0.5 bg-champagne-500/20 overflow-hidden">
        <div
          className={cn('h-full transition-all duration-1000', accent ? 'bg-rosegold-500' : 'bg-champagne-500')}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function ObservationCard({
  icon: Icon, area, observation, recommendation, procedureSlug, primary,
}: { icon: any; area: string; observation: string; recommendation: string; procedureSlug?: string; primary?: boolean }) {
  return (
    <article className={cn(
      'p-5 md:p-6 bg-surface-card border-l-2 transition-shadow hover:shadow-editorial-sm',
      primary ? 'border-rosegold-500 shadow-editorial-sm' : 'border-champagne-500/60'
    )}>
      <div className="flex items-start gap-4">
        <div className={cn(
          'w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0',
          primary ? 'bg-rosegold-500/15 text-rosegold-500' : 'bg-champagne-500/15 text-champagne-700'
        )}>
          <Icon size={16} strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <h3 className="font-display text-lg text-charcoal-800">{area}</h3>
            {primary && (
              <span className="text-[10px] uppercase tracking-widest text-rosegold-500 font-semibold">
                Priorytet AI
              </span>
            )}
          </div>
          <p className="text-sm text-charcoal-600 leading-relaxed">{observation}</p>
          <div className="mt-3 pt-3 border-t border-champagne-500/20">
            <div className="text-[10px] uppercase tracking-widest text-champagne-600 font-semibold mb-1">
              Rekomendacja
            </div>
            <p className="font-serif-editorial italic text-sm text-charcoal-700 leading-relaxed">{recommendation}</p>
            {procedureSlug && (
              <div className="mt-3">
                <ButtonGhost href={`/zabiegi/${procedureSlug}`}>Zobacz zabieg</ButtonGhost>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
