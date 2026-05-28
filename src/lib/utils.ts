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
