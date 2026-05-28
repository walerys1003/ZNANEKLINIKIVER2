import { cn } from '@/lib/utils';

const sizes = {
  sm: 'w-16 h-16',
  md: 'w-28 h-28',
  lg: 'w-44 h-44',
  xl: 'w-60 h-60',
};

export function AIOrb({ size = 'md', className }: { size?: keyof typeof sizes; className?: string }) {
  return (
    <div className={cn('relative inline-block', className)}>
      {/* Soft outer glow */}
      <div className={cn('absolute inset-[-30%] rounded-full opacity-60 blur-3xl pointer-events-none', sizes[size])}
        style={{ background: 'radial-gradient(circle, rgba(246,221,215,0.6) 0%, transparent 70%)' }} />
      {/* Main orb */}
      <div className={cn('ai-orb relative', sizes[size])} />
      {/* Tiny shimmer dots */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-white/80 rounded-full animate-pulse" />
        <div className="absolute top-[35%] right-[25%] w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[25%] left-[30%] w-0.5 h-0.5 bg-champagne-200/80 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}
