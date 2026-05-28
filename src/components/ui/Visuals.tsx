import { cn } from '@/lib/utils';

/**
 * Abstract Vogue-grade visual placeholders.
 * Per design DNA: no recognizable faces, no clinical/stock photos.
 * We use SVG silhouettes, gradients, and editorial pattern compositions.
 */

// Surgeon portrait placeholder — warm cream gradient with subtle silhouette
export function SurgeonPortrait({ initials, className }: { initials: string; className?: string }) {
  // Deterministic gradient seed from initials
  const seed = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
  const variants = [
    { bg: 'from-nude-200 via-nude-100 to-champagne-100', accent: '#C9A961' },
    { bg: 'from-rosegold-100 via-nude-100 to-champagne-100', accent: '#B85A4E' },
    { bg: 'from-champagne-100 via-nude-50 to-nude-200', accent: '#A8893F' },
    { bg: 'from-nude-100 via-rosegold-50 to-nude-200', accent: '#7A2E3E' },
  ];
  const v = variants[seed % variants.length];

  return (
    <div className={cn('relative w-full aspect-[4/5] overflow-hidden bg-gradient-to-br', v.bg, className)}>
      {/* Soft glow blob */}
      <div className="absolute inset-0 opacity-50"
        style={{ background: `radial-gradient(circle at 50% 40%, rgba(255,255,255,0.5) 0%, transparent 60%)` }} />
      {/* Abstract silhouette */}
      <svg viewBox="0 0 200 250" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id={`coat-${initials}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F8F4EE" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id={`face-${initials}`} cx="0.5" cy="0.4" r="0.5">
            <stop offset="0%" stopColor="#F1E9DC" />
            <stop offset="100%" stopColor="#D9BBA1" stopOpacity="0.6" />
          </radialGradient>
        </defs>
        {/* Coat / shoulders */}
        <path d="M 30 250 L 30 180 Q 50 150 75 145 L 75 130 Q 100 125 125 130 L 125 145 Q 150 150 170 180 L 170 250 Z"
          fill={`url(#coat-${initials})`} />
        <path d="M 75 145 L 75 158 Q 100 168 125 158 L 125 145 Q 100 162 75 145 Z"
          fill={v.accent} opacity="0.15" />
        {/* Head silhouette (abstract, no features) */}
        <ellipse cx="100" cy="95" rx="32" ry="40" fill={`url(#face-${initials})`} opacity="0.75" />
        {/* Hair suggestion */}
        <path d="M 68 75 Q 70 55 100 50 Q 130 55 132 80 L 132 95 Q 125 70 100 65 Q 75 70 68 95 Z"
          fill={v.accent} opacity="0.22" />
      </svg>
      {/* Initials overlay corner */}
      <div className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-serif-editorial italic text-charcoal-700 backdrop-blur-sm bg-nude-50/70 border border-champagne-500/30">
        {initials}
      </div>
    </div>
  );
}

// Before/After abstract silhouette — Hermès × medical journalism
type BAType = 'profile' | 'silhouette' | 'hands' | 'eyes' | 'back';

export function BeforeAfterVisual({ type, className }: { type: BAType; className?: string }) {
  return (
    <div className={cn('relative w-full aspect-[4/3] grid grid-cols-2 overflow-hidden', className)}>
      {/* PRZED — warm cream */}
      <div className="relative bg-gradient-to-br from-nude-100 via-nude-200 to-nude-300 flex items-center justify-center">
        <SilhouetteSVG type={type} side="before" />
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest text-charcoal-600 font-medium">Przed</span>
      </div>
      {/* Gold divider */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-champagne-500/60 z-10" />
      {/* PO — deep charcoal/burgundy */}
      <div className="relative bg-gradient-to-br from-charcoal-700 via-charcoal-800 to-burgundy-900 flex items-center justify-center">
        <SilhouetteSVG type={type} side="after" />
        <span className="absolute top-3 right-3 text-[10px] uppercase tracking-widest text-champagne-300 font-medium">Po</span>
      </div>
    </div>
  );
}

function SilhouetteSVG({ type, side }: { type: BAType; side: 'before' | 'after' }) {
  const stroke = side === 'before' ? '#1A1A1A' : '#C9A961';
  const opacity = side === 'before' ? 0.85 : 0.95;
  const common = { fill: 'none', stroke, strokeWidth: 1.2, opacity, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  if (type === 'profile') {
    return (
      <svg viewBox="0 0 100 120" className="w-3/4 h-3/4" aria-hidden>
        {/* Side profile, single line */}
        <path d="M 30 25 Q 25 35 28 50 L 32 60 Q 25 65 30 72 L 35 76 Q 28 80 32 85 L 36 88 Q 40 92 50 92 L 50 110"
          {...common} />
        {/* Hair flow */}
        <path d="M 30 25 Q 45 8 65 18 Q 75 28 70 50 Q 68 75 60 95"
          {...common} strokeWidth={0.8} opacity={opacity * 0.6} />
      </svg>
    );
  }
  if (type === 'silhouette') {
    return (
      <svg viewBox="0 0 100 120" className="w-3/4 h-3/4" aria-hidden>
        {/* Female torso silhouette */}
        <path d="M 50 15 Q 42 15 38 25 Q 36 35 40 42 Q 30 48 30 60 Q 32 70 35 78 Q 32 90 36 105 L 64 105 Q 68 90 65 78 Q 68 70 70 60 Q 70 48 60 42 Q 64 35 62 25 Q 58 15 50 15 Z"
          {...common} />
      </svg>
    );
  }
  if (type === 'hands') {
    return (
      <svg viewBox="0 0 100 120" className="w-3/4 h-3/4" aria-hidden>
        {/* Elegant hand lines */}
        <path d="M 20 80 Q 25 50 35 30 L 38 28 L 40 50 L 45 25 L 48 50 L 52 22 L 55 50 L 60 25 L 62 50 L 70 35 Q 80 50 78 80 Q 70 95 50 95 Q 30 95 20 80 Z"
          {...common} />
        {/* Ring detail */}
        <circle cx="45" cy="65" r="2" stroke={stroke} fill={side === 'after' ? '#C9A961' : 'none'} strokeWidth={0.8} opacity={opacity} />
      </svg>
    );
  }
  if (type === 'eyes') {
    return (
      <svg viewBox="0 0 100 60" className="w-3/4 h-3/4" aria-hidden>
        {/* Eye almonds */}
        <path d="M 15 30 Q 30 18 45 30 Q 30 42 15 30 Z" {...common} />
        <path d="M 55 30 Q 70 18 85 30 Q 70 42 55 30 Z" {...common} />
        <circle cx="30" cy="30" r="4" stroke={stroke} fill="none" strokeWidth={0.8} opacity={opacity * 0.7} />
        <circle cx="70" cy="30" r="4" stroke={stroke} fill="none" strokeWidth={0.8} opacity={opacity * 0.7} />
        {/* Brows */}
        <path d="M 15 20 Q 30 14 45 20" {...common} strokeWidth={0.8} />
        <path d="M 55 20 Q 70 14 85 20" {...common} strokeWidth={0.8} />
      </svg>
    );
  }
  // back
  return (
    <svg viewBox="0 0 100 120" className="w-3/4 h-3/4" aria-hidden>
      <path d="M 50 10 Q 42 12 40 22 Q 36 30 38 38 L 35 42 Q 28 48 30 58 L 33 72 Q 30 88 35 105 L 65 105 Q 70 88 67 72 L 70 58 Q 72 48 65 42 L 62 38 Q 64 30 60 22 Q 58 12 50 10 Z" {...common} />
      <path d="M 50 30 L 50 95" {...common} strokeWidth={0.6} opacity={opacity * 0.5} />
    </svg>
  );
}

// Beauty editorial visual (for magazine hero)
export function BeautyEditorial({ variant = 'portrait', className }: { variant?: 'portrait' | 'silk' | 'interior' | 'molecular'; className?: string }) {
  if (variant === 'silk') {
    return (
      <div className={cn('relative w-full h-full overflow-hidden bg-gradient-to-br from-champagne-100 via-nude-100 to-champagne-200', className)}>
        <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            <linearGradient id="silk1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5ECD9" />
              <stop offset="50%" stopColor="#DCC78A" />
              <stop offset="100%" stopColor="#A8893F" />
            </linearGradient>
            <linearGradient id="silk2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBF7F0" />
              <stop offset="100%" stopColor="#C9A961" />
            </linearGradient>
          </defs>
          <path d="M 0 200 Q 100 100 200 180 T 400 150 L 400 300 L 0 300 Z" fill="url(#silk1)" opacity="0.7" />
          <path d="M 0 100 Q 80 50 200 90 Q 300 130 400 80 L 400 200 Q 300 180 200 200 Q 100 220 0 200 Z" fill="url(#silk2)" opacity="0.5" />
          <path d="M 50 280 Q 150 200 250 250 T 400 240" fill="none" stroke="#FBF7F0" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>
    );
  }
  if (variant === 'interior') {
    return (
      <div className={cn('relative w-full h-full overflow-hidden bg-gradient-to-br from-nude-200 via-nude-100 to-champagne-100', className)}>
        <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          {/* Marble floor */}
          <rect x="0" y="200" width="400" height="100" fill="#F1E9DC" />
          <path d="M 0 220 L 400 215 M 0 245 L 400 240 M 0 270 L 400 265" stroke="#D9BBA1" strokeWidth="0.5" opacity="0.6" />
          {/* Columns */}
          <rect x="60" y="40" width="20" height="200" fill="#FBF7F0" opacity="0.9" />
          <rect x="320" y="40" width="20" height="200" fill="#FBF7F0" opacity="0.9" />
          {/* Arch */}
          <path d="M 80 200 L 80 80 Q 200 30 320 80 L 320 200" fill="none" stroke="#C9A961" strokeWidth="0.8" opacity="0.6" />
          {/* Chandelier hint */}
          <circle cx="200" cy="60" r="10" fill="#DCC78A" opacity="0.7" />
          <line x1="200" y1="40" x2="200" y2="60" stroke="#C9A961" strokeWidth="0.5" />
          {/* Window light */}
          <ellipse cx="200" cy="150" rx="100" ry="60" fill="#FBF7F0" opacity="0.4" />
        </svg>
      </div>
    );
  }
  if (variant === 'molecular') {
    return (
      <div className={cn('relative w-full h-full overflow-hidden bg-gradient-to-br from-rosegold-100 via-nude-100 to-champagne-100', className)}>
        <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          {/* Golden ratio circles */}
          <circle cx="200" cy="150" r="100" fill="none" stroke="#C9A961" strokeWidth="0.8" opacity="0.5" />
          <circle cx="200" cy="150" r="62" fill="none" stroke="#C9A961" strokeWidth="0.6" opacity="0.4" />
          <circle cx="200" cy="150" r="38" fill="none" stroke="#C9A961" strokeWidth="0.5" opacity="0.4" />
          {/* Molecular dots */}
          {[[120, 100], [280, 110], [150, 200], [260, 210], [200, 80], [200, 220]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="3" fill="#B85A4E" opacity="0.7" />
              <line x1="200" y1="150" x2={cx} y2={cy} stroke="#C9A961" strokeWidth="0.3" opacity="0.5" />
            </g>
          ))}
          {/* Center orb */}
          <circle cx="200" cy="150" r="20" fill="#F6DDD7" opacity="0.8" />
          <circle cx="200" cy="150" r="14" fill="#B85A4E" opacity="0.6" />
        </svg>
      </div>
    );
  }
  // portrait
  return (
    <div className={cn('relative w-full h-full overflow-hidden bg-gradient-to-br from-nude-100 via-rosegold-100 to-champagne-200', className)}>
      <svg viewBox="0 0 400 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <radialGradient id="bgGlow" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0%" stopColor="#FBF7F0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D9BBA1" stopOpacity="0.3" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill="url(#bgGlow)" />
        {/* Soft female silhouette - elegant */}
        <path d="M 200 80 Q 175 80 165 105 Q 160 130 175 145 Q 145 155 140 195 Q 138 240 155 260 Q 130 280 130 340 Q 130 420 165 500 L 235 500 Q 270 420 270 340 Q 270 280 245 260 Q 262 240 260 195 Q 255 155 225 145 Q 240 130 235 105 Q 225 80 200 80 Z"
          fill="#F1E9DC" opacity="0.6" />
        {/* Hair flow */}
        <path d="M 165 105 Q 130 130 135 180 Q 140 230 150 260 Q 145 240 160 200" fill="#A8893F" opacity="0.25" />
        <path d="M 235 105 Q 270 130 265 180 Q 260 230 250 260 Q 255 240 240 200" fill="#A8893F" opacity="0.25" />
        {/* Subtle gold accents */}
        <circle cx="200" cy="200" r="1.5" fill="#C9A961" opacity="0.6" />
        <circle cx="180" cy="220" r="1" fill="#C9A961" opacity="0.4" />
      </svg>
    </div>
  );
}
