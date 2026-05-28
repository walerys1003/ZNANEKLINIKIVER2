import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('pl-PL').format(amount) + ' zł';
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min).replace(' zł', '')} – ${formatPrice(max)}`;
}

export function formatPriceShort(amount: number): string {
  if (amount >= 1000) {
    const k = amount / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)} tys. zł`;
  }
  return `${amount} zł`;
}

/**
 * Compute monthly installment using simplified annuity formula.
 * @param amount Loan amount in PLN
 * @param months Number of installments
 * @param annualRatePercent APR as percent (e.g. 9.9 for 9.9% RRSO). Use 0 for 0% promotional installments.
 */
export function calculateMonthlyInstallment(amount: number, months: number, annualRatePercent: number): number {
  if (months <= 0) return amount;
  if (annualRatePercent <= 0) return amount / months;
  const r = annualRatePercent / 100 / 12;
  const m = (amount * r) / (1 - Math.pow(1 + r, -months));
  return m;
}
