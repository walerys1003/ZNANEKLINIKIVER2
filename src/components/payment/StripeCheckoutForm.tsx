'use client';

/**
 * Real Stripe Elements checkout form.
 *
 * - Calls POST /api/checkout/create-payment-intent on mount.
 * - When the publishable key is missing OR the server returns demo=true,
 *   we render a styled mock card form that simulates a successful
 *   confirmation after ~1.2 s — so reviewers and previewers can complete
 *   the booking flow without Stripe credentials.
 * - Otherwise, mounts a real <PaymentElement /> and calls stripe.confirmPayment.
 *
 * Editorial styling: champagne accent, charcoal underlines, no rounded corners.
 */

import { useEffect, useState, useCallback } from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import type { Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Lock, Loader2, CheckCircle2, AlertTriangle, CreditCard } from 'lucide-react';
import { getStripePromise, STRIPE_ELEMENTS_APPEARANCE } from '@/lib/stripe/client';
import { cn } from '@/lib/utils';

interface Props {
  amount: number; // PLN
  surgeonSlug: string;
  procedureSlug: string;
  patientEmail?: string;
  onSuccess: (paymentIntentId: string) => void;
}

interface IntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  demo: boolean;
  error?: string;
}

export function StripeCheckoutForm(props: Props) {
  const [intent, setIntent] = useState<IntentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stripePromise] = useState<Promise<Stripe | null> | null>(() => getStripePromise());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/checkout/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: props.amount,
            surgeonSlug: props.surgeonSlug,
            procedureSlug: props.procedureSlug,
            patientEmail: props.patientEmail,
            currency: 'pln',
          }),
        });
        const data = (await res.json()) as IntentResponse;
        if (cancelled) return;
        if (!res.ok) {
          setError(data.error ?? 'Nie udało się utworzyć płatności.');
          return;
        }
        setIntent(data);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Błąd sieci.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [props.amount, props.surgeonSlug, props.procedureSlug, props.patientEmail]);

  if (error) {
    return <StripeError message={error} />;
  }
  if (!intent) {
    return <StripeLoading />;
  }

  // Demo branch — no key configured. Render the editorial mock form.
  if (intent.demo || !stripePromise) {
    return <MockCardForm intentId={intent.paymentIntentId} amount={props.amount} onSuccess={props.onSuccess} />;
  }

  // Real Stripe Elements
  const elementsOptions: StripeElementsOptions = {
    clientSecret: intent.clientSecret,
    appearance: STRIPE_ELEMENTS_APPEARANCE,
    locale: 'pl',
  };

  return (
    <Elements stripe={stripePromise} options={elementsOptions}>
      <RealStripeForm amount={props.amount} onSuccess={props.onSuccess} intentId={intent.paymentIntentId} />
    </Elements>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function RealStripeForm({ amount, onSuccess, intentId }: { amount: number; onSuccess: (id: string) => void; intentId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Stripe needs a return_url. We pass our confirmation page.
        return_url: `${window.location.origin}/rezerwacja/potwierdzenie?id=${intentId}`,
      },
      redirect: 'if_required',
    });

    if (result.error) {
      setError(result.error.message ?? 'Płatność nie powiodła się.');
      setSubmitting(false);
      return;
    }

    if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      onSuccess(result.paymentIntent.id);
    } else {
      // Stripe will have redirected — but in some flows we end up here.
      onSuccess(intentId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement options={{ layout: 'tabs' }} />

      {error && (
        <div className="flex items-start gap-2 rounded-none border-l-2 border-burgundy-500 bg-burgundy-50 px-3 py-2 text-sm text-burgundy-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <SubmitButton submitting={submitting} amount={amount} live />
      <StripeFooter live />
    </form>
  );
}

/* ─── Mock fallback form (no Stripe key) ────────────────────────────── */

function MockCardForm({ intentId, amount, onSuccess }: { intentId: string; amount: number; onSuccess: (id: string) => void }) {
  const [card, setCard] = useState({ number: '', exp: '', cvc: '', name: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid =
    card.number.replace(/\s/g, '').length >= 13 &&
    /^\d{2}\s*\/\s*\d{2}$/.test(card.exp) &&
    card.cvc.length >= 3 &&
    card.name.length > 1;

  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, '').slice(0, 19).replace(/(\d{4})/g, '$1 ').trim();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValid) {
        setError('Sprawdź dane karty — niektóre pola są niepoprawne.');
        return;
      }
      setSubmitting(true);
      setError(null);
      // Simulate Stripe confirmation latency
      setTimeout(() => onSuccess(intentId), 1200);
    },
    [isValid, intentId, onSuccess]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-none border border-charcoal-200 bg-cream/40 p-5">
        <div className="flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold">
            Karta płatnicza
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-charcoal-500">
            <CreditCard className="h-3 w-3" /> Visa · Mastercard · Apple Pay
          </div>
        </div>

        <div className="mt-5 space-y-5">
          <MockField
            label="Numer karty"
            value={card.number}
            onChange={(v) => setCard({ ...card, number: formatCardNumber(v) })}
            placeholder="4242 4242 4242 4242"
            inputMode="numeric"
          />
          <div className="grid grid-cols-2 gap-5">
            <MockField
              label="MM / RR"
              value={card.exp}
              onChange={(v) => setCard({ ...card, exp: v.replace(/[^\d/ ]/g, '').slice(0, 7) })}
              placeholder="06 / 28"
            />
            <MockField
              label="CVC"
              value={card.cvc}
              onChange={(v) => setCard({ ...card, cvc: v.replace(/\D/g, '').slice(0, 4) })}
              placeholder="123"
              inputMode="numeric"
            />
          </div>
          <MockField
            label="Właściciel karty"
            value={card.name}
            onChange={(v) => setCard({ ...card, name: v })}
            placeholder="JAN KOWALSKI"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 border-l-2 border-burgundy-500 bg-burgundy-50 px-3 py-2 text-sm text-burgundy-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="rounded-none border border-champagne-500/40 bg-champagne-50/40 px-4 py-3 text-[11px] text-charcoal-600">
        <strong className="text-charcoal-800">Tryb demo</strong> · Stripe niesklonfigurowany.
        Dodaj <code className="bg-cream px-1 py-0.5 text-[10px]">STRIPE_SECRET_KEY</code> i
        {' '}<code className="bg-cream px-1 py-0.5 text-[10px]">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>, by
        włączyć prawdziwe Elements + 3-D Secure.
      </div>

      <SubmitButton submitting={submitting} amount={amount} live={false} />
      <StripeFooter live={false} />
    </form>
  );
}

function MockField({
  label, value, onChange, placeholder, inputMode,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; inputMode?: 'numeric' | 'text';
}) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold mb-1.5">
        {label}
      </div>
      <input
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-0 border-b border-charcoal-300 bg-transparent py-2 text-sm focus:border-rose-gold-500 focus:outline-none focus:ring-0 font-mono tracking-wider"
      />
    </label>
  );
}

/* ─── Shared bits ───────────────────────────────────────────────────── */

function SubmitButton({ submitting, amount, live }: { submitting: boolean; amount: number; live: boolean }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className={cn(
        'group relative w-full overflow-hidden bg-charcoal-900 px-6 py-4 text-cream transition disabled:cursor-not-allowed disabled:opacity-70',
        !submitting && 'hover:bg-charcoal-800'
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {live ? 'Autoryzacja 3-D Secure…' : 'Przetwarzanie…'}
          </>
        ) : (
          <>
            <Lock className="h-4 w-4 text-champagne-500" />
            Zapłać {amount.toLocaleString('pl-PL')} zł
          </>
        )}
      </span>
      <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-champagne-500/25 to-transparent transition-all duration-700 group-hover:left-full" />
    </button>
  );
}

function StripeFooter({ live }: { live: boolean }) {
  return (
    <div className="flex items-center justify-between text-[11px] text-charcoal-500">
      <span className="flex items-center gap-1.5">
        <Lock className="h-3 w-3" /> Płatność zabezpieczona przez Stripe · PCI-DSS L1
      </span>
      <span className={cn('rounded-full border px-2 py-0.5', live ? 'border-champagne-500 text-champagne-700' : 'border-charcoal-300')}>
        {live ? 'Live mode' : 'Demo'}
      </span>
    </div>
  );
}

function StripeLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-charcoal-500">
      <Loader2 className="h-5 w-5 animate-spin text-rose-gold-500" />
      <span className="text-sm">Inicjalizacja bezpiecznej płatności…</span>
    </div>
  );
}

function StripeError({ message }: { message: string }) {
  return (
    <div className="border-l-2 border-burgundy-500 bg-burgundy-50 p-5 text-sm text-burgundy-900">
      <div className="flex items-start gap-2">
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
        <div>
          <div className="font-medium">Nie można zainicjalizować płatności</div>
          <p className="mt-1 text-burgundy-800">{message}</p>
        </div>
      </div>
    </div>
  );
}
