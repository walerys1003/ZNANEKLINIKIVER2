'use client';

/**
 * Client-side Stripe singleton (loaded once via Stripe.js).
 *
 * If NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing, returns null so
 * the checkout UI can fall back to a mock confirmation flow.
 */

import { loadStripe, type Stripe } from '@stripe/stripe-js';

let cached: Promise<Stripe | null> | null = null;

export function getStripePromise(): Promise<Stripe | null> | null {
  if (cached) return cached;
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) return null;
  cached = loadStripe(key);
  return cached;
}

export function isStripeConfiguredClient(): boolean {
  return !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
}

/** Editorial style overrides for Stripe Elements (charcoal/cream/champagne). */
export const STRIPE_ELEMENTS_APPEARANCE = {
  theme: 'flat' as const,
  variables: {
    colorPrimary: '#B85A4E',
    colorBackground: '#FBF8F3',
    colorText: '#1A1A1A',
    colorDanger: '#7A2B2E',
    fontFamily: 'Inter, system-ui, sans-serif',
    borderRadius: '0px',
    spacingUnit: '4px',
    fontSizeBase: '14px',
  },
  rules: {
    '.Input': {
      borderRadius: '0px',
      border: 'none',
      borderBottom: '1px solid rgba(26,26,26,0.18)',
      padding: '10px 0',
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    '.Input:focus': {
      borderBottomColor: '#B85A4E',
      boxShadow: 'none',
    },
    '.Label': {
      fontSize: '10px',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.15em',
      color: '#6B6660',
    },
    '.Error': {
      color: '#7A2B2E',
      fontSize: '12px',
    },
  },
};
