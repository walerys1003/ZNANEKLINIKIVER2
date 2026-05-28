'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Banknote, Calculator, Shield, CheckCircle2, Sparkles, TrendingUp, Calendar,
  ArrowRight, Lock, FileText, Building2, Wallet
} from 'lucide-react';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow, DisplayHero } from '@/components/ui/Typography';
import { ButtonPrimary, ButtonGold, ButtonGhost } from '@/components/ui/Buttons';
import { procedures } from '@/data/mock';
import { calculateMonthlyInstallment, formatPrice, cn } from '@/lib/utils';

const PARTNERS = [
  { name: 'mBank Hipoteczny', tag: 'RRSO 0%', months: [10, 20], rate: 0 },
  { name: 'Santander Consumer', tag: 'Standardowe', months: [24, 36, 48, 60], rate: 9.9 },
  { name: 'BNP Paribas Medical', tag: 'Premium', months: [12, 24, 36, 48], rate: 7.5 },
  { name: 'PKO BP MedFinance', tag: 'Długoterminowe', months: [36, 48, 60, 72, 84], rate: 8.4 },
];

const PRESET_PROCEDURES = procedures.slice(0, 6).map((p) => ({
  slug: p.slug,
  name: p.name,
  amount: Math.round((p.priceMin + p.priceMax) / 2),
}));

export default function FinansowaniePage() {
  const [amount, setAmount] = useState(22000);
  const [months, setMonths] = useState(24);
  const [partnerIdx, setPartnerIdx] = useState(2);
  const [downPayment, setDownPayment] = useState(0);

  const partner = PARTNERS[partnerIdx];
  const principal = Math.max(0, amount - downPayment);
  const monthly = useMemo(
    () => calculateMonthlyInstallment(principal, months, partner.rate),
    [principal, months, partner.rate]
  );
  const totalCost = monthly * months + downPayment;
  const totalInterest = totalCost - amount;

  return (
    <>
      <TopNav />

      {/* Hero */}
      <section className="relative bg-nude-100 border-b border-champagne-500/30 overflow-hidden">
        <Container size="editorial">
          <div className="py-16 md:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-champagne-500/15 border border-champagne-500/30 mb-6">
                <Banknote size={12} strokeWidth={1.5} className="text-champagne-700" />
                <span className="text-[10px] uppercase tracking-widest text-champagne-700 font-semibold">
                  Raty 0% · 4 partnerów bankowych
                </span>
              </div>

              <DisplayHero className="text-charcoal-800">
                Twój zabieg<br/>
                <span className="font-serif-editorial italic text-champagne-700">w dogodnych ratach</span>
              </DisplayHero>

              <p className="font-serif-editorial italic text-lg text-charcoal-600 mt-6 leading-relaxed">
                Sprawdź ratę w 30 sekund. Decyzja kredytowa online — pierwsze raty już 0% RRSO.
                Bez ukrytych kosztów, bez papierowej dokumentacji.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Calculator */}
      <section className="bg-nude-100 py-16 md:py-20">
        <Container size="editorial">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8">
            {/* Left: controls */}
            <div className="space-y-10">
              {/* Quick procedure presets */}
              <div>
                <Eyebrow>Szybki wybór</Eyebrow>
                <h2 className="font-display text-2xl text-charcoal-800 mt-2 mb-4">Lub wybierz zabieg</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {PRESET_PROCEDURES.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => setAmount(p.amount)}
                      className={cn(
                        'p-3 text-left border transition-all',
                        amount === p.amount
                          ? 'border-burgundy-500 bg-burgundy-500/5'
                          : 'border-champagne-500/30 hover:border-champagne-500/60'
                      )}
                    >
                      <div className="text-xs font-display text-charcoal-800 leading-tight line-clamp-2">{p.name}</div>
                      <div className="text-[11px] text-champagne-600 tabular-nums mt-1.5">{formatPrice(p.amount)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount slider */}
              <SliderField
                label="Kwota zabiegu"
                value={amount}
                min={5000}
                max={80000}
                step={500}
                format={formatPrice}
                onChange={setAmount}
              />

              {/* Down payment */}
              <SliderField
                label="Wpłata własna"
                value={downPayment}
                min={0}
                max={Math.floor(amount * 0.5 / 1000) * 1000}
                step={500}
                format={(v) => `${formatPrice(v)}${amount > 0 ? ` (${Math.round((v / amount) * 100)}%)` : ''}`}
                onChange={setDownPayment}
              />

              {/* Months */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <label className="text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold">Liczba rat</label>
                  <span className="font-display text-xl text-charcoal-800 tabular-nums">{months} <span className="text-base text-charcoal-500">mies.</span></span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {[6, 10, 12, 18, 24, 36, 48, 60, 72, 84].map((m) => {
                    const available = partner.months.includes(m);
                    return (
                      <button
                        key={m}
                        disabled={!available}
                        onClick={() => available && setMonths(m)}
                        className={cn(
                          'h-11 text-sm tabular-nums border transition-all',
                          months === m
                            ? 'bg-burgundy-500 text-nude-50 border-burgundy-500'
                            : available
                            ? 'border-champagne-500/40 text-charcoal-700 hover:bg-champagne-500/10'
                            : 'border-champagne-500/15 text-charcoal-300 cursor-not-allowed line-through'
                        )}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-charcoal-500 mt-2 font-serif-editorial italic">
                  Dostępne okresy zależą od wybranego partnera. Wyszarzone — niedostępne u {partner.name}.
                </p>
              </div>

              {/* Partner selector */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <label className="text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold">Wybierz partnera finansowego</label>
                  <span className="text-[10px] uppercase tracking-widest text-champagne-700 font-semibold">{PARTNERS.length} banków</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {PARTNERS.map((p, i) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        setPartnerIdx(i);
                        if (!p.months.includes(months)) setMonths(p.months[0]);
                      }}
                      className={cn(
                        'group relative p-5 text-left border transition-all',
                        partnerIdx === i
                          ? 'border-burgundy-500 bg-burgundy-500/5 shadow-editorial-sm'
                          : 'border-champagne-500/30 hover:border-champagne-500/60'
                      )}
                    >
                      {partnerIdx === i && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-burgundy-500 text-nude-50 flex items-center justify-center">
                          <CheckCircle2 size={12} strokeWidth={2} />
                        </span>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-sm bg-champagne-500/15 text-champagne-700 flex items-center justify-center">
                          <Building2 size={15} strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="font-display text-base text-charcoal-800">{p.name}</div>
                          <div className="text-[10px] uppercase tracking-widest text-champagne-600 font-semibold mt-0.5">{p.tag}</div>
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between text-xs text-charcoal-500">
                        <span>RRSO: <span className="font-display text-charcoal-800 tabular-nums">{p.rate === 0 ? '0%' : `${p.rate}%`}</span></span>
                        <span>{p.months[0]}–{p.months[p.months.length - 1]} mies.</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: result panel */}
            <aside className="lg:sticky lg:top-24 self-start">
              <div className="bg-surface-card border-t-2 border-champagne-500 shadow-editorial-lg">
                <div className="p-6 md:p-8 border-b border-champagne-500/30">
                  <Eyebrow className="text-champagne-700">Twoja rata miesięczna</Eyebrow>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-5xl md:text-6xl text-charcoal-800 tabular-nums leading-none">
                      {Math.round(monthly).toLocaleString('pl-PL')}
                    </span>
                    <span className="font-display text-xl text-charcoal-500">zł</span>
                    <span className="text-charcoal-400 font-serif-editorial italic ml-2">/ mies.</span>
                  </div>
                  <p className="font-serif-editorial italic text-xs text-charcoal-500 mt-3">
                    przez {months} miesięcy · {partner.name}
                  </p>
                </div>

                <dl className="p-6 md:p-8 space-y-3 text-sm border-b border-champagne-500/30 tabular-nums">
                  <SummaryRow label="Kwota zabiegu" value={formatPrice(amount)} />
                  <SummaryRow label="Wpłata własna" value={formatPrice(downPayment)} />
                  <SummaryRow label="Kwota kredytowania" value={formatPrice(principal)} />
                  <div className="my-2 border-t border-dashed border-champagne-500/30" />
                  <SummaryRow label="Liczba rat" value={`${months} mies.`} />
                  <SummaryRow label="Oprocentowanie (RRSO)" value={partner.rate === 0 ? '0%' : `${partner.rate}%`} />
                  <SummaryRow label="Suma odsetek" value={formatPrice(Math.max(0, Math.round(totalInterest)))} accent={totalInterest === 0} />
                  <div className="my-2 border-t border-dashed border-champagne-500/30" />
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold">Razem do zapłaty</span>
                    <span className="font-display text-xl text-charcoal-800">{formatPrice(Math.round(totalCost))}</span>
                  </div>
                </dl>

                <div className="p-6 md:p-8 space-y-3">
                  <ButtonPrimary size="lg" className="w-full">Złóż wniosek online</ButtonPrimary>
                  <ButtonGold size="lg" className="w-full">Pobierz symulację (PDF)</ButtonGold>
                </div>

                {/* Trust */}
                <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-2 text-[11px] text-charcoal-600 border-t border-champagne-500/20 pt-5">
                  <div className="flex items-center gap-2">
                    <Shield size={11} strokeWidth={1.5} className="text-champagne-600" />
                    <span>Decyzja kredytowa w 15 minut</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={11} strokeWidth={1.5} className="text-champagne-600" />
                    <span>Bez wpływu na BIK przed akceptacją</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={11} strokeWidth={1.5} className="text-champagne-600" />
                    <span>Wcześniejsza spłata bez prowizji</span>
                  </div>
                </div>
              </div>

              {/* AI tip */}
              <div className="mt-4 px-5 py-4 bg-rosegold-500/10 border-l-2 border-rosegold-500">
                <div className="flex items-start gap-2.5">
                  <Sparkles size={14} strokeWidth={1.5} className="text-rosegold-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-rosegold-500 font-semibold mb-1">AI Sugestia</div>
                    <p className="text-xs text-charcoal-700 leading-relaxed">
                      {partner.rate === 0
                        ? 'Wybrałaś najkorzystniejszą opcję — 0% RRSO. Łączny koszt = cena zabiegu.'
                        : downPayment === 0
                        ? `Wpłata własna 20% (${formatPrice(Math.round(amount * 0.2))}) zmniejszy ratę o ok. ${Math.round(monthly * 0.2)} zł.`
                        : `Świetna decyzja. Wpłata własna obniża koszt kredytu o ${formatPrice(Math.round(downPayment * partner.rate / 100))} rocznie.`}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-nude-50 py-20 border-t border-champagne-500/20">
        <Container size="editorial">
          <div className="max-w-2xl mb-12">
            <Eyebrow>Jak to działa</Eyebrow>
            <h2 className="font-display text-4xl text-charcoal-800 mt-3">
              Cztery kroki do<br />
              <span className="font-serif-editorial italic text-champagne-700">zaakceptowanego wniosku</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-5">
            <StepCard num="01" title="Symuluj ratę" description="Tutaj — bez logowania, bez wpływu na BIK." />
            <StepCard num="02" title="Wypełnij wniosek" description="5 minut online. Dane PESEL, dochód, wybrany bank." />
            <StepCard num="03" title="Otrzymaj decyzję" description="Średnio 15 minut. Akceptacja → środki na koncie." />
            <StepCard num="04" title="Zabieg + spłata" description="Klinika otrzymuje zapłatę. Ty spłacasz wygodnie." />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-nude-100 py-20 border-t border-champagne-500/20">
        <Container size="editorial">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12">
            <div>
              <Eyebrow>Pytania i odpowiedzi</Eyebrow>
              <h2 className="font-display text-4xl text-charcoal-800 mt-3 leading-tight">
                Bezpieczne<br/>
                <span className="font-serif-editorial italic text-champagne-700">finansowanie medyczne</span>
              </h2>
              <p className="font-serif-editorial italic text-charcoal-500 mt-4">
                Wszystkie nasze instytucje finansowe są nadzorowane przez KNF i UODO. Bezpieczeństwo Twoich danych jest priorytetem.
              </p>
            </div>

            <ul className="space-y-3">
              <FaqItem q="Czy raty 0% są naprawdę bez dopłat?" a="Tak. Kredyt 0% RRSO oznacza, że klinika pokrywa koszt finansowania. Zapłacisz dokładnie tyle, co cena zabiegu — ani złotówki więcej." />
              <FaqItem q="Czy potrzebuję zaświadczenia o dochodach?" a="Dla kwot do 30 tys. zł zwykle wystarczy oświadczenie. Powyżej — zaświadczenie z pracy lub wyciąg bankowy z 3 miesięcy." />
              <FaqItem q="Co jeśli nie zostanę zaakceptowana?" a="Sprawdzenie nie wpływa na BIK. Jeśli jeden bank odmówi, automatycznie sprawdzimy ofertę u pozostałych partnerów." />
              <FaqItem q="Kiedy klinika otrzymuje płatność?" a="Po akceptacji wniosku przez bank — środki są przekazywane bezpośrednio do kliniki, najczęściej w ciągu 24h." />
              <FaqItem q="Czy mogę spłacić wcześniej?" a="Tak, wcześniejsza spłata jest bezpłatna u wszystkich naszych partnerów. Zaoszczędzisz na odsetkach." />
            </ul>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}

/* ─────── Atoms ─────── */
function SliderField({
  label, value, min, max, step, format, onChange,
}: { label: string; value: number; min: number; max: number; step: number; format: (v: number) => string; onChange: (v: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label className="text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold">{label}</label>
        <span className="font-display text-2xl text-charcoal-800 tabular-nums">{format(value)}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 appearance-none bg-champagne-500/20 cursor-pointer relative z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-burgundy-500 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:shadow-editorial-sm [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-nude-50 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-burgundy-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-nude-50"
        />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-champagne-500 pointer-events-none" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-charcoal-400 tabular-nums font-semibold">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-charcoal-500">{label}</dt>
      <dd className={cn('font-medium', accent ? 'text-champagne-700' : 'text-charcoal-800')}>{value}</dd>
    </div>
  );
}

function StepCard({ num, title, description }: { num: string; title: string; description: string }) {
  return (
    <article className="p-6 bg-surface-card border-t border-champagne-500/60">
      <span className="font-display text-3xl text-champagne-500/70 tabular-nums">{num}</span>
      <h3 className="font-display text-lg text-charcoal-800 mt-3 mb-2">{title}</h3>
      <p className="font-serif-editorial italic text-sm text-charcoal-500 leading-relaxed">{description}</p>
    </article>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-surface-card border border-champagne-500/20 hover:border-champagne-500/40 transition-colors">
      <summary className="cursor-pointer px-5 py-4 flex items-center justify-between gap-4 list-none">
        <span className="font-display text-base text-charcoal-800">{q}</span>
        <span className="w-6 h-6 rounded-full border border-champagne-500/40 flex items-center justify-center text-champagne-700 group-open:bg-burgundy-500 group-open:border-burgundy-500 group-open:text-nude-50 group-open:rotate-45 transition-all flex-shrink-0">
          +
        </span>
      </summary>
      <div className="px-5 pb-5 -mt-1 font-serif-editorial italic text-sm text-charcoal-600 leading-relaxed">
        {a}
      </div>
    </details>
  );
}
