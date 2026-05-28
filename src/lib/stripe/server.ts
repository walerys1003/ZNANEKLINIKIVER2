/**
 * Server-side Stripe client.
 *
 * The Stripe SDK is loaded lazily so the build doesn't fail when
 * STRIPE_SECRET_KEY is missing (demo deploys, CI, preview).
 *
 * `getStripe()` returns null in that case — API routes should
 * gracefully fall back to a mock PaymentIntent.
 */

import type Stripe from 'stripe';

let cachedClient: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (cachedClient) return cachedClient;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;

  // Dynamic require keeps Stripe out of the bundle when not configured.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const StripeCtor: typeof Stripe = require('stripe');
  cachedClient = new StripeCtor(key, {
    // Pin to a recent stable API version. `as never` keeps us decoupled
    // from Stripe SDK type bumps (each release tightens the literal type).
    apiVersion: '2024-12-18.acacia' as never,
    typescript: true,
  });
  return cachedClient;
}

export function isStripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}
