import { cn } from '@/lib/utils';
import { Check, Star, Globe, ShieldCheck } from 'lucide-react';

export function AIMatchBadge({
  percentage,
  variant = 'corner',
  className,
}: {
  percentage: number;
  variant?: 'corner' | 'large' | 'inline';
  className?: string;
}) {
  if (variant === 'large') {
    return (
      <div className={cn('flex flex-col items-center justify-center', className)}>
        <div className="relative w-24 h-24 rounded-full flex flex-col items-center justify-center text-charcoal-800"
             style={{
               background: 'radial-gradient(circle at 30% 30%, #FBF7F0 0%, #F5ECD9 40%, #DCC78A 100%)',
               boxShadow: '0 0 24px rgba(201,169,97,0.35), inset -4px -4px 12px rgba(168,137,63,0.25), inset 4px 4px 12px rgba(255,255,255,0.6)',
             }}>
          <div className="text-[10px] uppercase tracking-widest text-champagne-800 font-semibold">AI Match</div>
          <div className="font-display text-2xl leading-none tabular-nums text-charcoal-800">{percentage}%</div>
        </div>
      </div>
    );
  }
  if (variant === 'inline') {
    return (
      <span className={cn('inline-flex items-center gap-1 px-2 py-1 rounded-sm text-[11px] font-medium gold-shimmer text-charcoal-800', className)}>
        <span className="font-semibold tabular-nums">AI Match {percentage}%</span>
      </span>
    );
  }
  // corner variant
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-sm text-[10px] font-medium tabular-nums',
      'bg-champagne-100/90 backdrop-blur-sm text-charcoal-800 border border-champagne-500/40',
      className
    )}>
      AI Match {percentage}%
    </span>
  );
}

export function VerifiedBadge({
  tier = 'board-certified',
  className,
}: {
  tier?: 'board-certified' | 'premium' | 'medical-tourism';
  className?: string;
}) {
  const config = {
    'board-certified': { icon: ShieldCheck, label: 'Zweryfikowany' },
    'premium': { icon: Star, label: 'Premium Surgeon' },
    'medical-tourism': { icon: Globe, label: 'Medical Tourism' },
  }[tier];
  const Icon = config.icon;
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-champagne-500/50',
      'bg-champagne-50/80 text-charcoal-700 text-[11px] tracking-wide font-medium',
      className
    )}>
      <Icon size={12} strokeWidth={2} className="text-champagne-600" />
      {config.label}
    </span>
  );
}

export function RatingStars({ value, count, size = 14, className }: { value: number; count?: number; size?: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className="inline-flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            strokeWidth={1.5}
            className={i <= Math.round(value) ? 'fill-champagne-500 text-champagne-500' : 'text-champagne-200'}
          />
        ))}
      </span>
      <span className="font-serif-editorial italic text-charcoal-600 text-sm tabular-nums">
        {value.toFixed(1)}{count !== undefined && <> ({count} opinii)</>}
      </span>
    </span>
  );
}

export function PremiumBadge({ children = 'PREMIUM', className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-block px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold gold-shimmer text-charcoal-800 rounded-sm', className)}>
      {children}
    </span>
  );
}
