'use client';

/**
 * Real Mapbox GL map renderer.
 *
 * - Uses mapbox-gl + react-map-gl.
 * - Activates when NEXT_PUBLIC_MAPBOX_TOKEN is set AND pins have lng/lat.
 * - Editorial styling: cream → champagne palette overlay, no chrome,
 *   custom HTML markers (champagne dot + pulse ring on featured), and
 *   a hover Popup styled like the SVG fallback.
 *
 * Style URL is configurable via NEXT_PUBLIC_MAPBOX_STYLE
 * (e.g. mapbox://styles/<user>/<luxury-style-id>). Default: light-v11.
 */

import { useMemo, useState } from 'react';
import Map, { Marker, Popup, NavigationControl, ScaleControl, type MarkerEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Navigation2 } from 'lucide-react';
import type { LuxuryMapPin, LuxuryMapProps } from './LuxuryMap';
import { cn } from '@/lib/utils';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const STYLE_URL = process.env.NEXT_PUBLIC_MAPBOX_STYLE || 'mapbox://styles/mapbox/light-v11';

export function RealMapboxMap({
  pins = [],
  title,
  subtitle,
  height = 'md',
  className,
  showControls = true,
  showLegend = true,
  center,
  zoom = 5.4,
}: LuxuryMapProps) {
  const [hovered, setHovered] = useState<LuxuryMapPin | null>(null);

  const heights = { sm: 'h-[320px]', md: 'h-[480px]', lg: 'h-[640px]' };

  // Compute initial view: explicit `center` wins, else centroid of pins, else Poland.
  const initial = useMemo(() => {
    if (center) return { longitude: center[0], latitude: center[1], zoom };
    const located = pins.filter(
      (p) => typeof p.lng === 'number' && typeof p.lat === 'number'
    );
    if (located.length) {
      const lng = located.reduce((s, p) => s + (p.lng as number), 0) / located.length;
      const lat = located.reduce((s, p) => s + (p.lat as number), 0) / located.length;
      return { longitude: lng, latitude: lat, zoom };
    }
    return { longitude: 19.45, latitude: 51.92, zoom }; // PL centroid
  }, [center, pins, zoom]);

  return (
    <div
      className={cn(
        'relative overflow-hidden border border-champagne-500/30 map-luxury bg-nude-100',
        heights[height],
        className
      )}
    >
      <Map
        mapboxAccessToken={TOKEN}
        initialViewState={initial}
        mapStyle={STYLE_URL}
        attributionControl={false}
        style={{ width: '100%', height: '100%' }}
        cursor="grab"
      >
        {/* Pins as custom HTML markers */}
        {pins.map((p) => {
          if (typeof p.lng !== 'number' || typeof p.lat !== 'number') return null;
          const isFeatured = p.variant === 'featured';
          const isTourism = p.variant === 'tourism';
          return (
            <Marker
              key={p.id}
              longitude={p.lng}
              latitude={p.lat}
              anchor="bottom"
              onClick={(e: MarkerEvent<MouseEvent>) => {
                e.originalEvent.stopPropagation();
                setHovered(p);
              }}
            >
              <button
                type="button"
                onMouseEnter={() => setHovered(p)}
                onMouseLeave={() => setHovered((h) => (h?.id === p.id ? null : h))}
                className="group relative -mb-2 flex flex-col items-center"
                aria-label={p.label}
              >
                {isFeatured && (
                  <span
                    className="absolute -bottom-1 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full border border-champagne-500/60 animate-ping"
                    style={{ animationDuration: '2.5s' }}
                  />
                )}
                <span
                  className={cn(
                    'h-3.5 w-3.5 rounded-full border-2 transition-transform group-hover:scale-125',
                    isFeatured
                      ? 'bg-champagne-500 border-charcoal-900 shadow-[0_0_0_3px_rgba(212,175,55,0.25)]'
                      : isTourism
                      ? 'bg-rose-gold-500 border-charcoal-900'
                      : 'bg-charcoal-900 border-cream'
                  )}
                />
                <span className="mt-[-2px] block h-2 w-px bg-charcoal-900/70" />
              </button>
            </Marker>
          );
        })}

        {/* Hover/click popup */}
        {hovered && typeof hovered.lng === 'number' && typeof hovered.lat === 'number' && (
          <Popup
            longitude={hovered.lng}
            latitude={hovered.lat}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom"
            offset={20}
            className="luxury-popup"
            onClose={() => setHovered(null)}
          >
            <div className="px-3 py-2 bg-cream border border-champagne-500/60 shadow-luxury">
              <div className="text-[9px] uppercase tracking-widest font-semibold text-rose-gold-600">
                {hovered.variant === 'tourism' ? 'Destination' : 'Klinika'}
              </div>
              <div className="mt-0.5 font-serif text-sm text-charcoal-900">{hovered.label}</div>
              {hovered.sublabel && (
                <div className="mt-0.5 text-[11px] text-charcoal-600 italic">{hovered.sublabel}</div>
              )}
            </div>
          </Popup>
        )}

        {showControls && (
          <>
            <NavigationControl position="top-right" showCompass={false} />
            <ScaleControl position="bottom-left" maxWidth={100} unit="metric" />
          </>
        )}
      </Map>

      {/* Editorial overlay tint to align with cream palette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(248,244,238,0) 55%, rgba(212,175,55,0.06) 100%)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Header label */}
      {(title || subtitle) && (
        <div className="pointer-events-none absolute top-4 left-4 max-w-[60%]">
          {subtitle && (
            <div className="text-[10px] uppercase tracking-widest font-semibold text-rose-gold-600 mb-1">
              {subtitle}
            </div>
          )}
          {title && (
            <div className="font-serif text-xl text-charcoal-900 leading-tight bg-cream/90 px-3 py-1 inline-block">
              {title}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      {showLegend && pins.length > 0 && (
        <div className="pointer-events-none absolute bottom-4 right-4 bg-cream/95 border border-champagne-500/40 px-3 py-2 text-[10px] uppercase tracking-widest text-charcoal-700 shadow-editorial-md space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-champagne-500" /> Premium
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-gold-500" /> Tourism
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-charcoal-900" /> Board-certified
          </div>
        </div>
      )}

      {/* Attribution */}
      <div className="pointer-events-none absolute bottom-2 left-2 inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-charcoal-500">
        <Navigation2 className="h-2.5 w-2.5" />
        Mapbox GL · Live
      </div>
    </div>
  );
}
