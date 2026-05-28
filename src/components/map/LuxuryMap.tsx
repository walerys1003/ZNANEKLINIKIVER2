import { Navigation2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type LuxuryMapPin = {
  id: string;
  label: string;
  sublabel?: string;
  x: number; // 0–100 percentage
  y: number; // 0–100 percentage
  variant?: 'default' | 'featured' | 'tourism';
};

/**
 * LuxuryMap — editorial-luxury map component.
 *
 * NOTE: This renders a Mapbox-styled mock using SVG. To swap in real Mapbox GL,
 * replace the inner <svg> with a <div ref={mapRef}> and initialise mapbox-gl
 * with a custom style URL (e.g. mapbox://styles/{user}/{styleId}) tuned to the
 * cream + champagne + charcoal design tokens. The visual treatment below
 * mirrors what such a style would produce.
 */
export function LuxuryMap({
  pins = [],
  title,
  subtitle,
  height = 'md',
  className,
  showControls = true,
  showLegend = true,
}: {
  pins?: LuxuryMapPin[];
  title?: string;
  subtitle?: string;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
  showControls?: boolean;
  showLegend?: boolean;
}) {
  const heights = { sm: 'h-[320px]', md: 'h-[480px]', lg: 'h-[640px]' };

  return (
    <div className={cn('relative bg-nude-100 overflow-hidden border border-champagne-500/30 map-luxury', heights[height], className)}>
      {/* SVG — Poland silhouette + lifestyle grid */}
      <svg viewBox="0 0 1000 700" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F0E9DD" />
            <stop offset="50%" stopColor="#F8F4EE" />
            <stop offset="100%" stopColor="#EDE3D2" />
          </linearGradient>
          <linearGradient id="mapLand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EBE0CC" />
            <stop offset="100%" stopColor="#E0D4BA" />
          </linearGradient>
          <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A961" strokeWidth="0.4" opacity="0.18" />
          </pattern>
          <radialGradient id="mapVignette" cx="50%" cy="50%" r="60%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0.16" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="1000" height="700" fill="url(#mapBg)" />
        <rect width="1000" height="700" fill="url(#mapGrid)" />

        {/* Abstract Poland-like landmass */}
        <path
          d="M 200 200 Q 240 150 320 140 L 480 130 Q 560 145 640 170 L 760 200 Q 820 230 820 280 L 800 380 Q 780 460 720 510 L 600 570 Q 480 600 380 580 L 260 540 Q 180 490 170 410 L 170 300 Q 180 240 200 200 Z"
          fill="url(#mapLand)"
          stroke="#C9A961"
          strokeWidth="0.8"
          opacity="0.85"
        />

        {/* Sea/lake decorative */}
        <path d="M 100 180 Q 130 200 110 230 Q 90 245 100 270" fill="none" stroke="#C9A961" strokeWidth="0.6" opacity="0.4" />
        <path d="M 880 320 Q 900 350 880 380" fill="none" stroke="#C9A961" strokeWidth="0.6" opacity="0.4" />

        {/* Decorative roads */}
        <path d="M 240 260 Q 400 320 580 290 Q 700 270 780 320" fill="none" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.18" strokeDasharray="3 4" />
        <path d="M 380 180 Q 420 320 380 480" fill="none" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.18" strokeDasharray="3 4" />
        <path d="M 600 200 Q 580 380 640 500" fill="none" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.18" strokeDasharray="3 4" />

        {/* Compass rose */}
        <g transform="translate(900 130)" opacity="0.5">
          <circle r="22" fill="none" stroke="#C9A961" strokeWidth="0.6" />
          <path d="M 0 -16 L 3 0 L 0 16 L -3 0 Z" fill="#7A2E3E" />
          <path d="M -16 0 L 0 3 L 16 0 L 0 -3 Z" fill="#C9A961" opacity="0.7" />
          <text y="-26" textAnchor="middle" fontSize="9" fill="#1A1A1A" fontFamily="serif" letterSpacing="2">N</text>
        </g>

        {/* Scale bar */}
        <g transform="translate(60 640)">
          <line x1="0" y1="0" x2="120" y2="0" stroke="#1A1A1A" strokeWidth="0.8" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#1A1A1A" strokeWidth="0.8" />
          <line x1="60" y1="-3" x2="60" y2="3" stroke="#1A1A1A" strokeWidth="0.8" />
          <line x1="120" y1="-4" x2="120" y2="4" stroke="#1A1A1A" strokeWidth="0.8" />
          <text x="0" y="18" fontSize="9" fill="#1A1A1A" fontFamily="serif" letterSpacing="1.5">0</text>
          <text x="120" y="18" fontSize="9" fill="#1A1A1A" fontFamily="serif" letterSpacing="1.5">100 km</text>
        </g>

        {/* Vignette overlay */}
        <rect width="1000" height="700" fill="url(#mapVignette)" />
      </svg>

      {/* Pins overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {pins.map((p) => {
          const isFeatured = p.variant === 'featured';
          const isTourism = p.variant === 'tourism';
          return (
            <div
              key={p.id}
              className="absolute pointer-events-auto group"
              style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -100%)' }}
            >
              {/* Pulse ring for featured */}
              {isFeatured && (
                <span
                  className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-12 h-12 rounded-full border border-champagne-500/60 animate-ping"
                  style={{ animationDuration: '2.5s' }}
                />
              )}
              <div className={cn(
                'flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-1',
              )}>
                <div className={cn(
                  'relative px-3 py-1.5 bg-nude-50 border border-champagne-500/60 shadow-editorial-md',
                  'text-[10px] uppercase tracking-widest font-semibold',
                  'opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300',
                  'whitespace-nowrap mb-1',
                  isFeatured && 'opacity-100 translate-y-0',
                  isTourism ? 'text-burgundy-500' : 'text-charcoal-800'
                )}>
                  <span className="font-display normal-case tracking-tight">{p.label}</span>
                  {p.sublabel && (
                    <span className="block font-serif-editorial italic normal-case text-[10px] tracking-normal text-charcoal-500 mt-0.5">
                      {p.sublabel}
                    </span>
                  )}
                  <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2 h-2 bg-nude-50 border-r border-b border-champagne-500/60 rotate-45" />
                </div>
                <svg width="28" height="36" viewBox="0 0 28 36" className="drop-shadow-md">
                  <path
                    d="M 14 0 C 6 0 0 6 0 14 C 0 24 14 36 14 36 C 14 36 28 24 28 14 C 28 6 22 0 14 0 Z"
                    fill={isTourism ? '#7A2E3E' : isFeatured ? '#C9A961' : '#1A1A1A'}
                    stroke="#F8F4EE"
                    strokeWidth="1.5"
                  />
                  <circle cx="14" cy="13" r="4" fill="#F8F4EE" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Header */}
      {(title || subtitle) && (
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-4 pointer-events-none">
          <div className="bg-nude-50/90 backdrop-blur-sm px-4 py-2.5 border-l-2 border-champagne-500 shadow-editorial-sm">
            {title && <div className="font-display text-base text-charcoal-800">{title}</div>}
            {subtitle && <div className="font-serif-editorial italic text-xs text-charcoal-500 mt-0.5">{subtitle}</div>}
          </div>
        </div>
      )}

      {/* Controls (mock) */}
      {showControls && (
        <div className="absolute top-4 right-4 flex flex-col gap-1.5">
          <button aria-label="Powiększ" className="w-9 h-9 bg-nude-50/95 backdrop-blur-sm border border-champagne-500/40 flex items-center justify-center text-charcoal-700 hover:bg-champagne-500/20 transition-colors">
            <span className="text-base leading-none">+</span>
          </button>
          <button aria-label="Pomniejsz" className="w-9 h-9 bg-nude-50/95 backdrop-blur-sm border border-champagne-500/40 flex items-center justify-center text-charcoal-700 hover:bg-champagne-500/20 transition-colors">
            <span className="text-base leading-none">−</span>
          </button>
          <button aria-label="Moja lokalizacja" className="w-9 h-9 bg-nude-50/95 backdrop-blur-sm border border-champagne-500/40 flex items-center justify-center text-charcoal-700 hover:bg-champagne-500/20 transition-colors">
            <Navigation2 size={13} strokeWidth={1.5} />
          </button>
        </div>
      )}

      {/* Legend */}
      {showLegend && pins.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-nude-50/95 backdrop-blur-sm px-4 py-3 border border-champagne-500/40 shadow-editorial-sm">
          <div className="text-[10px] uppercase tracking-widest text-champagne-600 font-semibold mb-2">Legenda</div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-champagne-500" />
              <span className="text-charcoal-700">Premium klinika</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-charcoal-800" />
              <span className="text-charcoal-700">Klinika zweryfikowana</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-burgundy-500" />
              <span className="text-charcoal-700">Medical tourism</span>
            </div>
          </div>
        </div>
      )}

      {/* "Powered by" hint (Mapbox attribution-style) */}
      <div className="absolute bottom-2 right-3 text-[9px] uppercase tracking-widest text-charcoal-400/70 font-medium">
        Mapbox · Editorial Style
      </div>
    </div>
  );
}
