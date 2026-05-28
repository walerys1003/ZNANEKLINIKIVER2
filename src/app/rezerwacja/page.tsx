'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar, Clock, MapPin, CreditCard, CheckCircle2, ChevronLeft, ChevronRight,
  Lock, Shield, Sparkles, User, Mail, Phone, Video, Building2, Banknote, Wallet
} from 'lucide-react';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Typography';
import { ButtonPrimary, ButtonGold } from '@/components/ui/Buttons';
import { SurgeonPortrait } from '@/components/ui/Visuals';
import { AIMatchBadge, RatingStars } from '@/components/ui/Badges';
import { surgeons, procedures } from '@/data/mock';
import { cn, formatPrice } from '@/lib/utils';

type Step = 1 | 2 | 3 | 4;

const stepLabels = [
  { num: 1, label: 'Zabieg', icon: Sparkles },
  { num: 2, label: 'Termin', icon: Calendar },
  { num: 3, label: 'Twoje dane', icon: User },
  { num: 4, label: 'Płatność', icon: CreditCard },
];

const slots = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'];

export default function RezerwacjaPage() {
  const params = useSearchParams();
  const router = useRouter();
  const initialSlug = params.get('chirurg') ?? 'dr-anna-kowalska';
  const initialProc = params.get('zabieg') ?? 'rhinoplastyka-ultrasonograficzna';

  const surgeon = useMemo(
    () => surgeons.find((s) => s.slug === initialSlug) ?? surgeons[0],
    [initialSlug]
  );
  const procedure = useMemo(
    () => procedures.find((p) => p.slug === initialProc) ?? procedures[0],
    [initialProc]
  );

  const [step, setStep] = useState<Step>(1);
  const [consultType, setConsultType] = useState<'gabinet' | 'telekonsultacja'>('gabinet');
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string>('10:30');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'blik' | 'transfer'>('card');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    promo: '',
    agreeTerms: false,
    agreePrivacy: false,
  });

  const consultPrice = surgeon.consultationPrice;
  const tax = Math.round(consultPrice * 0.08);
  const total = consultPrice + tax;

  const handleConfirm = () => {
    const orderId = `CP-${Date.now().toString().slice(-6)}`;
    router.push(`/rezerwacja/potwierdzenie?id=${orderId}&chirurg=${surgeon.slug}&zabieg=${procedure.slug}&dzien=${selectedDay}&godz=${selectedTime}`);
  };

  return (
    <>
      <TopNav />

      {/* Page header */}
      <section className="bg-nude-100 border-b border-champagne-500/30 py-10 md:py-14">
        <Container size="editorial">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-charcoal-500 mb-4">
            <Link href="/" className="hover:text-champagne-600">Strona główna</Link>
            <span>·</span>
            <Link href={`/chirurdzy/${surgeon.slug}`} className="hover:text-champagne-600">{surgeon.name}</Link>
            <span>·</span>
            <span className="text-burgundy-500">Rezerwacja</span>
          </div>
          <Eyebrow>Rezerwacja · krok {step} z 4</Eyebrow>
          <h1 className="font-display text-[40px] md:text-[56px] leading-[1.05] text-charcoal-800 mt-3">
            Umów konsultację
          </h1>
          <p className="font-serif-editorial italic text-charcoal-500 mt-3 max-w-2xl">
            Bezpieczne potwierdzenie wizyty w 4 krokach. Konsultacja jest niezobowiązująca —
            możesz ją bezpłatnie odwołać do 24h przed terminem.
          </p>
        </Container>
      </section>

      {/* Stepper */}
      <section className="border-b border-champagne-500/30 bg-nude-50">
        <Container size="editorial">
          <div className="py-6 flex items-center justify-between gap-4 overflow-x-auto">
            {stepLabels.map((s, i) => {
              const Icon = s.icon;
              const isActive = step === s.num;
              const isDone = step > s.num;
              return (
                <div key={s.num} className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className={cn(
                      'w-9 h-9 rounded-sm flex items-center justify-center border transition-colors',
                      isActive ? 'bg-burgundy-500 border-burgundy-500 text-nude-50' :
                      isDone ? 'bg-champagne-500/20 border-champagne-500 text-champagne-600' :
                      'border-champagne-500/30 text-charcoal-400'
                    )}>
                      {isDone ? <CheckCircle2 size={14} strokeWidth={1.75} /> : <Icon size={14} strokeWidth={1.5} />}
                    </div>
                    <div>
                      <div className={cn('text-[9px] uppercase tracking-widest font-semibold', isActive ? 'text-burgundy-500' : 'text-charcoal-400')}>
                        Krok {s.num}
                      </div>
                      <div className={cn('text-xs font-medium', isActive ? 'text-charcoal-800' : 'text-charcoal-500')}>
                        {s.label}
                      </div>
                    </div>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div className={cn('w-12 md:w-16 h-px', isDone ? 'bg-champagne-500' : 'bg-champagne-500/30')} />
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Main content */}
      <main className="bg-nude-100 py-12 md:py-16">
        <Container size="editorial">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            {/* Left: form */}
            <div className="min-w-0">
              {step === 1 && (
                <StepProcedure
                  surgeon={surgeon}
                  procedure={procedure}
                  consultType={consultType}
                  setConsultType={setConsultType}
                  onNext={() => setStep(2)}
                />
              )}
              {step === 2 && (
                <StepDate
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <StepDetails
                  form={form}
                  setForm={setForm}
                  onNext={() => setStep(4)}
                  onBack={() => setStep(2)}
                />
              )}
              {step === 4 && (
                <StepPayment
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  total={total}
                  onConfirm={handleConfirm}
                  onBack={() => setStep(3)}
                />
              )}
            </div>

            {/* Right: summary */}
            <aside className="lg:sticky lg:top-24 self-start">
              <div className="bg-surface-card border-t border-champagne-500/80 p-6 shadow-editorial-md">
                <div className="text-[10px] uppercase tracking-widest text-champagne-600 font-semibold mb-4">
                  Twoja rezerwacja
                </div>

                {/* Surgeon mini-card */}
                <div className="flex gap-4 pb-5 border-b border-champagne-500/30">
                  <div className="w-16 h-20 flex-shrink-0 overflow-hidden">
                    <SurgeonPortrait initials={surgeon.initials} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base text-charcoal-800 leading-tight">{surgeon.name}</h3>
                    <p className="font-serif-editorial italic text-xs text-champagne-600 mt-0.5">{surgeon.procedures[0]}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-charcoal-500">
                      <span>★ <span className="tabular-nums">{surgeon.rating.toFixed(1)}</span></span>
                      <span>·</span>
                      <MapPin size={9} strokeWidth={1.5} />
                      <span>{surgeon.city}</span>
                    </div>
                    <div className="mt-2">
                      <AIMatchBadge percentage={surgeon.aiMatch} variant="inline" />
                    </div>
                  </div>
                </div>

                {/* Summary list */}
                <dl className="py-5 space-y-3 text-xs border-b border-champagne-500/30">
                  <SummaryRow label="Zabieg" value={procedure.name} />
                  <SummaryRow label="Format" value={consultType === 'gabinet' ? 'Konsultacja w gabinecie' : 'Telekonsultacja wideo'} />
                  <SummaryRow label="Termin" value={`${selectedDay} stycznia 2026 · ${selectedTime}`} />
                  <SummaryRow label="Czas trwania" value="45 minut" />
                </dl>

                {/* Price */}
                <dl className="py-5 space-y-2.5 text-xs border-b border-champagne-500/30 tabular-nums">
                  <PriceRow label="Konsultacja" value={formatPrice(consultPrice)} />
                  <PriceRow label="Opłata serwisowa (8%)" value={formatPrice(tax)} />
                  <div className="pt-2 mt-1 border-t border-dashed border-champagne-500/40 flex items-baseline justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold">Razem dziś</span>
                    <span className="font-display text-2xl text-charcoal-800 tabular-nums">{formatPrice(total)}</span>
                  </div>
                </dl>

                {/* Trust badges */}
                <div className="pt-5 space-y-2.5 text-[11px] text-charcoal-600">
                  <div className="flex items-center gap-2">
                    <Lock size={11} strokeWidth={1.5} className="text-champagne-600" />
                    <span>Płatność szyfrowana 256-bit SSL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={11} strokeWidth={1.5} className="text-champagne-600" />
                    <span>Stripe · PCI DSS Level 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={11} strokeWidth={1.5} className="text-champagne-600" />
                    <span>Bezpłatne anulowanie do 24h</span>
                  </div>
                </div>
              </div>

              {/* Help block */}
              <div className="mt-4 px-5 py-4 bg-nude-200/40 border-l-2 border-champagne-500">
                <div className="text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold mb-1">Concierge 24/7</div>
                <div className="font-serif-editorial italic text-xs text-charcoal-600 leading-relaxed">
                  Potrzebujesz pomocy w rezerwacji?<br />
                  <a href="tel:+48800000000" className="text-burgundy-500 hover:text-burgundy-600 not-italic font-medium">800 000 000</a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}

/* ─────── Step 1: Procedure & format ─────── */
function StepProcedure({ surgeon, procedure, consultType, setConsultType, onNext }: any) {
  return (
    <div className="space-y-8">
      <header>
        <Eyebrow>Wybierz format konsultacji</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 mt-2">
          Jak chciałabyś się spotkać?
        </h2>
        <p className="font-serif-editorial italic text-charcoal-500 mt-2">
          Pierwsza konsultacja to rozmowa o Twoich oczekiwaniach i możliwościach.
          {' '}{surgeon.name} dostosuje plan do Twojej anatomii i stylu życia.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        <FormatTile
          active={consultType === 'gabinet'}
          onClick={() => setConsultType('gabinet')}
          icon={Building2}
          title="W gabinecie"
          subtitle={`${surgeon.city} · 45 minut`}
          description="Pełne badanie kliniczne, analiza zdjęć, indywidualny plan zabiegu."
          tag="Najczęściej wybierane"
        />
        <FormatTile
          active={consultType === 'telekonsultacja'}
          onClick={() => setConsultType('telekonsultacja')}
          icon={Video}
          title="Telekonsultacja"
          subtitle="Online · 30 minut"
          description="Wideo z dowolnego miejsca. Idealna na pierwsze pytania i ocenę wstępną."
          tag="Bez wychodzenia z domu"
        />
      </div>

      {/* Procedure recap */}
      <div className="bg-surface-card border border-champagne-500/30 p-6">
        <div className="text-[10px] uppercase tracking-widest text-champagne-600 font-semibold mb-3">
          Konsultacja w kierunku
        </div>
        <h3 className="font-display text-2xl text-charcoal-800">{procedure.name}</h3>
        <p className="font-serif-editorial italic text-sm text-charcoal-500 mt-2">
          {procedure.shortDescription}
        </p>
        <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-champagne-500/20">
          <Stat label="Czas zabiegu" value={procedure.duration} />
          <Stat label="Rekonwalescencja" value={procedure.recovery} />
          <Stat label="Cena zabiegu" value={`${(procedure.priceMin/1000).toFixed(0)}-${(procedure.priceMax/1000).toFixed(0)} tys. zł`} />
        </div>
      </div>

      <div className="flex justify-end">
        <ButtonPrimary onClick={onNext} size="lg">
          Wybierz termin
        </ButtonPrimary>
      </div>
    </div>
  );
}

function FormatTile({ active, onClick, icon: Icon, title, subtitle, description, tag }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative text-left p-6 bg-surface-card border transition-all duration-300',
        active
          ? 'border-burgundy-500 shadow-editorial-md ring-1 ring-burgundy-500/20'
          : 'border-champagne-500/30 hover:border-champagne-500/60 hover:shadow-editorial-sm'
      )}
    >
      {active && (
        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-burgundy-500 text-nude-50 flex items-center justify-center">
          <CheckCircle2 size={12} strokeWidth={2} />
        </span>
      )}
      <div className={cn(
        'w-11 h-11 rounded-sm flex items-center justify-center mb-4',
        active ? 'bg-burgundy-500 text-nude-50' : 'bg-champagne-500/15 text-champagne-700'
      )}>
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <div className="font-display text-xl text-charcoal-800">{title}</div>
      <div className="text-xs text-champagne-600 font-serif-editorial italic mt-0.5">{subtitle}</div>
      <p className="text-xs text-charcoal-500 mt-3 leading-relaxed">{description}</p>
      <div className="mt-4 inline-block text-[10px] uppercase tracking-widest text-charcoal-400 font-medium">
        {tag}
      </div>
    </button>
  );
}

/* ─────── Step 2: Date & time ─────── */
function StepDate({ selectedDay, setSelectedDay, selectedTime, setSelectedTime, onNext, onBack }: any) {
  // Calendar Jan 2026 (Thu starts the month)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const blocked = [3, 4, 10, 11, 17, 18, 24, 25, 31]; // weekends
  const available = days.filter((d) => !blocked.includes(d));

  return (
    <div className="space-y-8">
      <header>
        <Eyebrow>Wybierz dogodny termin</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 mt-2">
          Styczeń 2026
        </h2>
      </header>

      {/* Calendar */}
      <div className="bg-surface-card border border-champagne-500/30 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <button className="w-9 h-9 border border-champagne-500/40 flex items-center justify-center text-charcoal-700 hover:bg-champagne-500/10 transition-colors">
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <div className="font-display text-lg text-charcoal-800">Styczeń 2026</div>
          <button className="w-9 h-9 border border-champagne-500/40 flex items-center justify-center text-charcoal-700 hover:bg-champagne-500/10 transition-colors">
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map((d) => (
            <div key={d} className="text-center text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Jan 1, 2026 is Thursday → 3 empty cells */}
          {[...Array(3)].map((_, i) => <div key={`empty-${i}`} />)}
          {days.map((d) => {
            const isBlocked = blocked.includes(d);
            const isSelected = selectedDay === d;
            const isAvailable = available.includes(d) && !isBlocked;
            return (
              <button
                key={d}
                disabled={!isAvailable}
                onClick={() => isAvailable && setSelectedDay(d)}
                className={cn(
                  'aspect-square text-sm tabular-nums transition-all',
                  isSelected
                    ? 'bg-burgundy-500 text-nude-50 shadow-editorial-md'
                    : isBlocked
                    ? 'text-charcoal-300 cursor-not-allowed line-through'
                    : 'text-charcoal-800 hover:bg-champagne-500/15 border border-transparent hover:border-champagne-500/40'
                )}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="font-display text-xl text-charcoal-800">Dostępne godziny</h3>
          <span className="text-xs text-charcoal-500 font-serif-editorial italic">
            {selectedDay} stycznia 2026
          </span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {slots.map((slot, i) => {
            const disabled = i === 2; // mock: 12:00 booked
            return (
              <button
                key={slot}
                disabled={disabled}
                onClick={() => !disabled && setSelectedTime(slot)}
                className={cn(
                  'h-12 text-sm tabular-nums border transition-all',
                  selectedTime === slot
                    ? 'bg-burgundy-500 text-nude-50 border-burgundy-500'
                    : disabled
                    ? 'border-champagne-500/20 text-charcoal-300 line-through cursor-not-allowed'
                    : 'border-champagne-500/40 text-charcoal-700 hover:bg-champagne-500/10'
                )}
              >
                {slot}
              </button>
            );
          })}
        </div>
        <p className="font-serif-editorial italic text-xs text-charcoal-500 mt-3">
          Wszystkie godziny w strefie czasowej Europe/Warsaw (CET).
        </p>
      </div>

      {/* AI suggestion */}
      <div className="flex items-start gap-4 px-5 py-4 bg-rosegold-500/10 border-l-2 border-rosegold-500">
        <Sparkles size={16} strokeWidth={1.5} className="text-rosegold-500 mt-0.5 flex-shrink-0" />
        <div>
          <div className="text-[10px] uppercase tracking-widest text-rosegold-500 font-semibold mb-1">
            AI Sugestia
          </div>
          <p className="text-xs text-charcoal-700 leading-relaxed">
            Czwartki o 10:30 to najmniej zatłoczony slot — krótsze oczekiwanie,
            więcej czasu na pytania po konsultacji.
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="text-sm font-medium text-charcoal-600 hover:text-burgundy-500 flex items-center gap-1.5">
          <ChevronLeft size={14} strokeWidth={1.5} />
          Wstecz
        </button>
        <ButtonPrimary onClick={onNext} size="lg">
          Przejdź do danych
        </ButtonPrimary>
      </div>
    </div>
  );
}

/* ─────── Step 3: Personal details ─────── */
function StepDetails({ form, setForm, onNext, onBack }: any) {
  const handleChange = (field: string, val: any) => setForm({ ...form, [field]: val });
  const canContinue = form.firstName && form.lastName && form.email && form.phone && form.agreeTerms && form.agreePrivacy;

  return (
    <div className="space-y-8">
      <header>
        <Eyebrow>Twoje dane</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 mt-2">
          Powiedz nam o sobie
        </h2>
        <p className="font-serif-editorial italic text-charcoal-500 mt-2">
          Dane są szyfrowane i przekazywane bezpośrednio do gabinetu — nigdy nie udostępniamy ich osobom trzecim.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Imię *" placeholder="Anna" value={form.firstName} onChange={(v) => handleChange('firstName', v)} icon={User} />
        <Field label="Nazwisko *" placeholder="Kowalska" value={form.lastName} onChange={(v) => handleChange('lastName', v)} icon={User} />
        <Field label="E-mail *" type="email" placeholder="anna@example.com" value={form.email} onChange={(v) => handleChange('email', v)} icon={Mail} />
        <Field label="Telefon *" type="tel" placeholder="+48 600 000 000" value={form.phone} onChange={(v) => handleChange('phone', v)} icon={Phone} />
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold mb-2">
          Notatka dla chirurga (opcjonalnie)
        </label>
        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Napisz krótko, co Cię niepokoi lub na czym Ci zależy. To pomoże specjaliście przygotować się do konsultacji."
          className="input-editorial resize-none"
        />
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold mb-2">
          Kod promocyjny
        </label>
        <div className="flex gap-3">
          <input
            value={form.promo}
            onChange={(e) => handleChange('promo', e.target.value.toUpperCase())}
            placeholder="np. AESTHETIC25"
            className="input-editorial flex-1 uppercase tracking-wider"
          />
          <ButtonGold size="md">Zastosuj</ButtonGold>
        </div>
      </div>

      {/* Consent */}
      <div className="space-y-3 pt-2">
        <Checkbox
          checked={form.agreeTerms}
          onChange={(v) => handleChange('agreeTerms', v)}
          label={<>Akceptuję <Link href="#" className="text-burgundy-500 underline">regulamin</Link> ChirurgiaPiekna.com</>}
        />
        <Checkbox
          checked={form.agreePrivacy}
          onChange={(v) => handleChange('agreePrivacy', v)}
          label={<>Wyrażam zgodę na przetwarzanie danych zgodnie z <Link href="#" className="text-burgundy-500 underline">polityką prywatności</Link></>}
        />
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="text-sm font-medium text-charcoal-600 hover:text-burgundy-500 flex items-center gap-1.5">
          <ChevronLeft size={14} strokeWidth={1.5} />
          Wstecz
        </button>
        <ButtonPrimary onClick={onNext} disabled={!canContinue} size="lg">
          Przejdź do płatności
        </ButtonPrimary>
      </div>
    </div>
  );
}

/* ─────── Step 4: Payment (mock Stripe) ─────── */
function StepPayment({ paymentMethod, setPaymentMethod, total, onConfirm, onBack }: any) {
  return (
    <div className="space-y-8">
      <header>
        <Eyebrow>Płatność</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 mt-2">
          Zabezpiecz swój termin
        </h2>
        <p className="font-serif-editorial italic text-charcoal-500 mt-2">
          Płatność obsługuje Stripe — najwyższy standard PCI DSS Level 1.
          Środki są pobierane dopiero po potwierdzeniu wizyty przez gabinet.
        </p>
      </header>

      {/* Method selector */}
      <div className="grid grid-cols-3 gap-2">
        <PaymentMethodTile
          active={paymentMethod === 'card'}
          onClick={() => setPaymentMethod('card')}
          icon={CreditCard}
          label="Karta"
          sublabel="Visa · Mastercard"
        />
        <PaymentMethodTile
          active={paymentMethod === 'blik'}
          onClick={() => setPaymentMethod('blik')}
          icon={Wallet}
          label="BLIK"
          sublabel="Aplikacja banku"
        />
        <PaymentMethodTile
          active={paymentMethod === 'transfer'}
          onClick={() => setPaymentMethod('transfer')}
          icon={Banknote}
          label="Przelew"
          sublabel="Pay-by-link"
        />
      </div>

      {/* Card form (Stripe Elements style mock) */}
      {paymentMethod === 'card' && (
        <div className="bg-surface-card border border-champagne-500/30 p-6 md:p-8 space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold mb-2">
              Numer karty
            </label>
            <div className="relative">
              <input placeholder="4242 4242 4242 4242" className="input-editorial pr-20 tabular-nums tracking-wider" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <span className="px-1.5 py-0.5 bg-charcoal-800 text-nude-50 text-[8px] font-bold rounded-[2px]">VISA</span>
                <span className="px-1.5 py-0.5 bg-burgundy-500 text-nude-50 text-[8px] font-bold rounded-[2px]">MC</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold mb-2">
                Data ważności
              </label>
              <input placeholder="MM / YY" className="input-editorial tabular-nums" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold mb-2">
                CVC
              </label>
              <input placeholder="000" className="input-editorial tabular-nums" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold mb-2">
              Imię i nazwisko na karcie
            </label>
            <input placeholder="ANNA KOWALSKA" className="input-editorial uppercase tracking-wider" />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-charcoal-500 pt-2 border-t border-champagne-500/20">
            <Lock size={11} strokeWidth={1.5} className="text-champagne-600" />
            <span>Twoje dane są szyfrowane end-to-end. Stripe nigdy nie udostępnia ich sprzedawcy.</span>
          </div>
        </div>
      )}

      {paymentMethod === 'blik' && (
        <div className="bg-surface-card border border-champagne-500/30 p-6 md:p-8">
          <div className="text-center py-6">
            <Wallet size={40} strokeWidth={1.25} className="text-champagne-600 mx-auto mb-4" />
            <p className="font-serif-editorial italic text-charcoal-600 mb-5">
              Po kliknięciu „Potwierdź rezerwację" otworzy się ekran do wpisania kodu BLIK.
              Następnie zaakceptuj transakcję w swojej aplikacji bankowej.
            </p>
            <input placeholder="Kod BLIK (6 cyfr)" maxLength={6} className="input-editorial tabular-nums text-center text-2xl tracking-[0.5em] max-w-xs mx-auto" />
          </div>
        </div>
      )}

      {paymentMethod === 'transfer' && (
        <div className="bg-surface-card border border-champagne-500/30 p-6 md:p-8">
          <div className="text-[10px] uppercase tracking-widest text-champagne-600 font-semibold mb-3">
            Wybierz bank
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {['mBank', 'PKO BP', 'Santander', 'ING', 'Pekao', 'Millennium', 'BNP Paribas', 'Alior'].map((bank) => (
              <button key={bank} className="px-3 py-3 border border-champagne-500/30 hover:border-burgundy-500 hover:bg-burgundy-500/5 text-xs text-charcoal-700 transition-colors">
                {bank}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Total CTA */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-champagne-500/30">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold">Razem do zapłaty</div>
          <div className="font-display text-3xl text-charcoal-800 tabular-nums">{formatPrice(total)}</div>
        </div>
        <ButtonPrimary onClick={onConfirm} size="xl" icon={<Lock size={14} strokeWidth={1.75} />}>
          Potwierdź rezerwację
        </ButtonPrimary>
      </div>

      <div className="flex justify-start">
        <button onClick={onBack} className="text-sm font-medium text-charcoal-600 hover:text-burgundy-500 flex items-center gap-1.5">
          <ChevronLeft size={14} strokeWidth={1.5} />
          Wstecz
        </button>
      </div>
    </div>
  );
}

/* ─────── Atoms ─────── */
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold flex-shrink-0">{label}</dt>
      <dd className="text-xs text-charcoal-800 text-right">{value}</dd>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-charcoal-500">{label}</span>
      <span className="text-charcoal-800 font-medium">{value}</span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold mb-1">{label}</div>
      <div className="font-display text-base text-charcoal-800 tabular-nums">{value}</div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', icon: Icon }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; icon?: any }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold mb-2">{label}</label>
      <div className="relative">
        {Icon && <Icon size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn('input-editorial', Icon && 'pl-9')}
        />
      </div>
    </div>
  );
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: React.ReactNode }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <span className={cn(
        'mt-0.5 w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors',
        checked ? 'bg-burgundy-500 border-burgundy-500 text-nude-50' : 'border-champagne-500/60 group-hover:border-champagne-500'
      )}>
        {checked && <CheckCircle2 size={11} strokeWidth={2} />}
      </span>
      <span className="text-xs text-charcoal-600 leading-relaxed">{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
    </label>
  );
}

function PaymentMethodTile({ active, onClick, icon: Icon, label, sublabel }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-2 p-5 border transition-all',
        active
          ? 'border-burgundy-500 bg-burgundy-500/5'
          : 'border-champagne-500/30 hover:border-champagne-500/60'
      )}
    >
      <Icon size={20} strokeWidth={1.5} className={active ? 'text-burgundy-500' : 'text-charcoal-600'} />
      <div className="text-center">
        <div className={cn('font-display text-sm', active ? 'text-burgundy-500' : 'text-charcoal-800')}>{label}</div>
        <div className="text-[10px] text-charcoal-500 font-serif-editorial italic mt-0.5">{sublabel}</div>
      </div>
    </button>
  );
}
