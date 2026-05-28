import { NextResponse } from 'next/server';
import { getStripe, isStripeConfigured } from '@/lib/stripe/server';

/**
 * POST /api/checkout/create-payment-intent
 *
 * Body: { amount: number (PLN), surgeonSlug?: string, procedureSlug?: string, currency?: 'pln'|'eur' }
 * Returns: { clientSecret: string, demo: boolean, paymentIntentId: string }
 *
 * Falls back to a mock client_secret when STRIPE_SECRET_KEY is missing,
 * so the booking flow keeps working end-to-end in demo deploys.
 */

export const runtime = 'nodejs';

interface Body {
  amount?: number;
  surgeonSlug?: string;
  procedureSlug?: string;
  currency?: string;
  patientEmail?: string;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const amountPLN = Number(body.amount);
  if (!amountPLN || amountPLN < 1) {
    return NextResponse.json({ error: 'Missing or invalid `amount` (PLN)' }, { status: 400 });
  }

  const currency = (body.currency || 'pln').toLowerCase();
  const amountMinor = Math.round(amountPLN * 100); // grosze

  // ─── Mock branch (no STRIPE_SECRET_KEY) ──────────────────────────────
  if (!isStripeConfigured()) {
    const mockIntentId = `pi_demo_${Date.now()}`;
    return NextResponse.json({
      clientSecret: `${mockIntentId}_secret_demo`,
      paymentIntentId: mockIntentId,
      amount: amountMinor,
      currency,
      demo: true,
    });
  }

  // ─── Real Stripe branch ──────────────────────────────────────────────
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe init failed' }, { status: 500 });
  }

  try {
    const intent = await stripe.paymentIntents.create({
      amount: amountMinor,
      currency,
      automatic_payment_methods: { enabled: true },
      description: `ChirurgiaPiekna · ${body.procedureSlug ?? 'rezerwacja'} · ${body.surgeonSlug ?? '—'}`,
      receipt_email: body.patientEmail,
      metadata: {
        surgeonSlug: body.surgeonSlug ?? '',
        procedureSlug: body.procedureSlug ?? '',
        source: 'web-checkout',
      },
    });

    return NextResponse.json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
      amount: intent.amount,
      currency: intent.currency,
      demo: false,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    console.error('[stripe] create-payment-intent failed:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
