'use client';

import { useState } from 'react';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { AIOrb } from '@/components/ui/AIOrb';
import { ButtonPrimary, ButtonGhost } from '@/components/ui/Buttons';
import { Eyebrow, Subtitle } from '@/components/ui/Typography';
import { SurgeonPortrait } from '@/components/ui/Visuals';
import { AIMatchBadge } from '@/components/ui/Badges';
import { aiMatcherSteps, surgeons } from '@/data/mock';

export default function AIDoradcaPage() {
  const [step, setStep] = useState(3); // start in middle to showcase
  const [selected, setSelected] = useState<string | null>('Oczy / Powieki');
  const [completed, setCompleted] = useState(false);

  const current = aiMatcherSteps[step - 1];
  const progress = Math.round((step / aiMatcherSteps.length) * 100);

  if (completed) return <AIResults />;

  return (
    <>
      <TopNav />
      <main className="py-12 md:py-20">
        <Container size="editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT — Question flow */}
            <div className="lg:col-span-7 bg-nude-50 p-8 md:p-12 border-t border-champagne-500/60">
              <Eyebrow>Krok {step} z {aiMatcherSteps.length}</Eyebrow>
              <h2 className="font-display text-[36px] md:text-[48px] leading-[1.1] tracking-tight text-charcoal-800 mt-4">
                {current.question}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-10">
                {current.options.map((opt) => {
                  const isSelected = selected === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setSelected(opt)}
                      className={`relative text-left p-5 border transition-all duration-300
                        ${isSelected
                          ? 'border-champagne-500 bg-champagne-100/40 shadow-editorial-md'
                          : 'border-champagne-500/30 bg-surface-card hover:border-champagne-500 hover:shadow-editorial-sm'
                        }
                      `}
                    >
                      <div className="font-display text-2xl text-charcoal-800 mb-1">⚜</div>
                      <div className="font-display text-base text-charcoal-800">{opt}</div>
                      <div className="text-[11px] text-charcoal-500 mt-1 font-serif-editorial italic">
                        {getProcedureHint(opt)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-12">
                <div className="relative h-1 bg-champagne-100 rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-champagne-500 via-rosegold-400 to-rosegold-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-charcoal-500">
                  <button
                    onClick={() => setStep(Math.max(1, step - 1))}
                    className="hover:text-burgundy-500"
                  >
                    Wstecz
                  </button>
                  <span className="font-medium tabular-nums">{progress}%</span>
                  <button
                    onClick={() => step < aiMatcherSteps.length ? setStep(step + 1) : setCompleted(true)}
                    className="px-5 py-2.5 bg-burgundy-500 text-nude-50 text-[11px] uppercase tracking-wider rounded-sm hover:bg-burgundy-600 transition-colors disabled:opacity-40"
                    disabled={!selected}
                  >
                    {step === aiMatcherSteps.length ? 'Pokaż wyniki' : 'Dalej →'}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT — AI orb + personalization */}
            <div className="lg:col-span-5 bg-nude-50 p-8 md:p-12 border-t border-rosegold-500/40">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-serif-editorial italic text-charcoal-700">Twoja personalizacja AI</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-champagne-100/60 text-[10px] uppercase tracking-widest text-champagne-700">
                  Powered by Aesthetic Insight AI
                </span>
              </div>

              <div className="flex flex-col items-center py-8">
                <AIOrb size="xl" />
                <div className="mt-12 text-center">
                  <div className="text-xs uppercase tracking-widest text-rosegold-700 mb-2">Dopasowanie</div>
                  <div className="font-display text-[64px] leading-none text-charcoal-800 tabular-nums">
                    87<span className="text-[40px]">%</span>
                  </div>
                  <p className="font-serif-editorial italic text-lg text-charcoal-700 mt-4">
                    Rhinoplastyka ultrasonograficzna
                  </p>
                  <p className="text-xs text-charcoal-500 mt-2">3 rekomendowanych chirurgów</p>

                  {/* Avatars */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {surgeons.slice(0, 3).map((s) => (
                      <div key={s.slug} className="w-10 h-10 rounded-full overflow-hidden border-2 border-champagne-500/40">
                        <SurgeonPortrait initials={s.initials} className="w-10 h-10 aspect-square" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-center font-serif-editorial italic text-charcoal-500 leading-relaxed mt-6">
                AI Aesthetic Insight analizuje 47 parametrów · GDPR compliant · Konsultacja medyczna wymagana
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function getProcedureHint(opt: string): string {
  const hints: Record<string, string> = {
    'Nos / Profil': 'Rhinoplastyka, septoplastyka',
    'Oczy / Powieki': 'Blefaroplastyka, lifting brwi',
    'Usta / Uśmiech': 'Lip lift, wypełnianie ust',
    'Żuchwa / Kontur': 'Implanty, lifting twarzy',
    'Piersi': 'Powiększanie, lifting, redukcja',
    'Ciało / Kontur': 'Liposukcja, plastyka brzucha',
    'Subtelna zmiana': 'Naturalna metamorfoza',
    'Wyrazista metamorfoza': 'Wyraźny efekt',
    'Korekta funkcji': 'Medyczne wskazania',
    'Odmłodzenie': 'Anti-aging',
  };
  return hints[opt] || '';
}

function AIResults() {
  const top = surgeons.slice(0, 3);
  return (
    <>
      <TopNav />
      <main className="py-12 md:py-16">
        <Container size="editorial">
          {/* Breadcrumb */}
          <div className="text-xs text-charcoal-400 mb-6">
            <a href="/" className="hover:text-burgundy-500">Strona główna</a>
            <span className="mx-2">/</span>
            <a href="/ai-doradca" className="hover:text-burgundy-500">AI Doradca</a>
            <span className="mx-2">/</span>
            <span className="text-charcoal-700">Twoje wyniki</span>
          </div>

          <header className="text-center mb-12">
            <h1 className="font-display text-[40px] md:text-[64px] lg:text-[72px] leading-[1.05] tracking-tighter text-charcoal-800">
              Twoje spersonalizowane rekomendacje
            </h1>
            <Subtitle className="mt-3 text-xl md:text-2xl">
              AI przeanalizowało 47 parametrów Twojego profilu
            </Subtitle>
          </header>

          {/* Recommendation banner */}
          <div className="relative bg-gradient-to-br from-rosegold-50/60 via-nude-50 to-champagne-100/40 border border-champagne-500/40 p-6 md:p-10 mb-12 rounded-sm">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <AIOrb size="lg" />
              <div className="flex-1">
                <p className="font-serif-editorial text-lg md:text-xl text-charcoal-700 leading-relaxed">
                  Na podstawie Twojego profilu AI rekomenduje zabieg <strong className="font-display not-italic text-burgundy-500">rhinoplastyki ultrasonograficznej</strong>. Dopasowanie 94%. Szacowany budżet: 16 000 — 22 000 zł. Rekonwalescencja: 10-14 dni.
                </p>
                <button className="mt-4 text-burgundy-500 underline font-medium text-sm hover:text-burgundy-600">
                  Dlaczego ta rekomendacja?
                </button>
              </div>
            </div>
          </div>

          {/* Top 3 surgeons */}
          <section className="mb-16">
            <h2 className="text-center font-display text-2xl md:text-3xl text-charcoal-800 mb-8">Top 3 chirurgów dla Ciebie</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {top.map((s, i) => (
                <div key={s.slug} className={`relative card-editorial p-4 ${i === 1 ? 'md:scale-105 md:-mt-4 shadow-editorial-lg' : ''}`}>
                  <div className="relative mb-3">
                    <SurgeonPortrait initials={s.initials} />
                    <div className="absolute top-2 right-2">
                      <AIMatchBadge percentage={s.aiMatch} variant="large" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl text-charcoal-800">{s.name}</h3>
                  {i === 1 && <p className="text-sm font-serif-editorial italic text-champagne-700 mt-1">Specjalistka chirurgii plastycznej, {s.procedures[0]}</p>}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-champagne-500 text-sm">★★★★★ 4.9/5</span>
                    <span className="font-display text-charcoal-800 tabular-nums">od {s.consultationPrice} zł</span>
                  </div>
                  {i === 1 && (
                    <ButtonPrimary className="w-full mt-4" size="sm">
                      Sprawdź dostępne terminy
                    </ButtonPrimary>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Alternative procedures */}
          <section className="mb-12">
            <h2 className="text-center font-display text-2xl text-charcoal-800 mb-8">Alternatywne zabiegi do rozważenia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <AltProcedure title="Septoplastyka funkcjonalna" desc="Specjalista chirurgii naprawczej plastycznej, Rhinoplastyka" />
              <AltProcedure title="Rinomodelacja non-surgical" desc="Rekomendacja zabieg Rhinomodelacja non-surgical" />
            </div>
          </section>

          <p className="text-center text-[11px] italic font-serif-editorial text-charcoal-400 max-w-2xl mx-auto">
            Rekomendacje AI mają charakter informacyjny. Konsultacja medyczna obowiązkowa.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function AltProcedure({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="card-editorial p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-sm bg-champagne-100/60 text-champagne-700 flex items-center justify-center text-xl">⚜</div>
      <div className="flex-1">
        <h3 className="font-display text-base text-charcoal-800">{title}</h3>
        <p className="text-xs text-charcoal-500 font-serif-editorial italic mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
