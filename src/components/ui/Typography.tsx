import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-block text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne-600',
        className
      )}
    >
      {children}
    </span>
  );
}

export function Subtitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('font-serif-editorial italic text-xl md:text-2xl text-champagne-600 leading-snug', className)}>
      {children}
    </p>
  );
}

export function DisplayHero({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={cn(
        'font-display text-[44px] sm:text-[60px] md:text-[76px] lg:text-[88px]',
        'leading-[1.05] tracking-tightest text-charcoal-800',
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H1({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={cn('font-display text-[40px] md:text-[56px] lg:text-[64px] leading-[1.05] tracking-tighter text-charcoal-800', className)}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn('font-display text-[32px] md:text-[42px] lg:text-[48px] leading-tight tracking-tight text-charcoal-800', className)}>
      {children}
    </h2>
  );
}

export function H3({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn('font-display text-[24px] md:text-[30px] lg:text-[36px] leading-tight tracking-tight text-charcoal-800', className)}>
      {children}
    </h3>
  );
}

export function PullQuote({ children, attribution, className }: { children: ReactNode; attribution?: string; className?: string }) {
  return (
    <figure className={cn('my-8', className)}>
      <blockquote className="font-display italic text-[28px] md:text-[36px] leading-snug text-charcoal-800">
        “{children}”
      </blockquote>
      {attribution && <figcaption className="mt-4 text-sm text-charcoal-500 font-serif-editorial italic">— {attribution}</figcaption>}
    </figure>
  );
}
