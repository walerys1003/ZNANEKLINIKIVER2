import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { AIMatchBadge, RatingStars, PremiumBadge } from './Badges';
import { SurgeonPortrait, BeforeAfterVisual, BeautyEditorial } from './Visuals';
import { ButtonGhost } from './Buttons';
import { type Surgeon, type Article } from '@/data/mock';

export function SurgeonCard({ surgeon, variant = 'default', className }: { surgeon: Surgeon; variant?: 'default' | 'featured'; className?: string }) {
  return (
    <Link href={`/chirurdzy/${surgeon.slug}`} className={cn('group block', className)}>
      <article className={cn(
        'relative bg-surface-card border-t border-champagne-500/80',
        'transition-all duration-500 ease-out',
        'hover:shadow-editorial-lg hover:-translate-y-1',
        variant === 'featured' && 'ring-1 ring-champagne-500/40 shadow-editorial-md'
      )}>
        {/* Portrait */}
        <div className="relative">
          <SurgeonPortrait initials={surgeon.initials} />
          {/* AI Match corner */}
          <div className="absolute top-3 right-3">
            <AIMatchBadge percentage={surgeon.aiMatch} variant="corner" />
          </div>
          {/* Rating top-left */}
          <div className="absolute top-3 left-14 px-2 py-1 rounded-sm bg-nude-50/85 backdrop-blur-sm text-[11px] font-medium text-charcoal-800 flex items-center gap-1">
            <span className="text-champagne-600">★</span>
            <span className="tabular-nums">{surgeon.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <h3 className="font-display text-[20px] md:text-[22px] leading-tight text-charcoal-800">
            {surgeon.name}
          </h3>
          <p className="font-serif-editorial italic text-sm text-champagne-600 mt-1">
            {surgeon.procedures.join(' · ')}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-charcoal-500">
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} strokeWidth={1.5} />
              {surgeon.city}
            </span>
            <span>·</span>
            <span className="font-serif-editorial italic">{surgeon.reviewCount} opinii</span>
          </div>

          <hr className="my-4 border-t border-champagne-500/30" />

          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-charcoal-400 mb-0.5">Konsultacja od</div>
              <div className="font-display text-lg text-charcoal-800 tabular-nums">{formatPrice(surgeon.consultationPrice)}</div>
            </div>
            <span className="inline-flex items-center gap-1 px-4 py-2 border border-burgundy-500 text-burgundy-500 text-[11px] uppercase tracking-wider font-medium rounded-sm group-hover:bg-burgundy-500 group-hover:text-nude-50 transition-colors">
              Umów →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function FeaturedSurgeonCard({ surgeon, className }: { surgeon: Surgeon; className?: string }) {
  return (
    <Link href={`/chirurdzy/${surgeon.slug}`} className={cn('group block', className)}>
      <article className="relative bg-surface-card transition-all duration-500 ease-out hover:shadow-editorial-xl hover:-translate-y-2">
        {/* Decorative corner brackets - editorial frame */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-champagne-500/60 z-10" />
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-champagne-500/60 z-10" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-champagne-500/60 z-10" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-champagne-500/60 z-10" />

        <div className="p-3">
          <div className="relative">
            <SurgeonPortrait initials={surgeon.initials} />
            <div className="absolute top-3 right-3">
              <AIMatchBadge percentage={surgeon.aiMatch} variant="corner" />
            </div>
            <div className="absolute top-3 left-3 px-2 py-1 rounded-sm bg-nude-50/85 backdrop-blur-sm text-[11px] font-medium text-charcoal-800 flex items-center gap-1">
              <span className="text-champagne-600">★</span>
              <span className="tabular-nums">{surgeon.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="px-3 py-4 md:px-4 md:py-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-[22px] md:text-[24px] leading-tight text-charcoal-800">
                {surgeon.name}
              </h3>
              <span className="text-[11px] text-charcoal-400 tabular-nums">{surgeon.age}</span>
            </div>
            <p className="font-serif-editorial italic text-sm text-champagne-600 mt-1">
              {surgeon.procedures.join(' · ')}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs text-charcoal-500">
                <MapPin size={12} strokeWidth={1.5} />
                {surgeon.city}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-champagne-500/15 border border-champagne-500/40 text-charcoal-800 text-[11px] tracking-wider rounded-sm">
                Zobacz profil →
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function ArticleCard({ article, variant = 'default', className }: { article: Article; variant?: 'default' | 'feature' | 'small'; className?: string }) {
  const visualVariant = article.imageSeed.includes('clinic') ? 'interior'
    : article.imageSeed.includes('silk') || article.imageSeed.includes('ai') ? 'silk'
    : article.imageSeed.includes('aesthetic') || article.imageSeed.includes('medicine') ? 'molecular'
    : 'portrait';

  if (variant === 'feature') {
    return (
      <Link href={`/magazyn/${article.slug}`} className={cn('group block', className)}>
        <article className="relative overflow-hidden bg-charcoal-800 aspect-[3/4] md:aspect-[4/5]">
          <div className="absolute inset-0">
            <BeautyEditorial variant={visualVariant as any} />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-800/30 to-transparent" />
          {/* Eyebrow top */}
          <div className="absolute top-5 left-5 px-3 py-1.5 bg-charcoal-800/85 backdrop-blur-sm text-[10px] uppercase tracking-widest text-champagne-300 font-semibold">
            {article.eyebrow}
          </div>
          {article.premium && (
            <div className="absolute top-5 right-5">
              <PremiumBadge />
            </div>
          )}
          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h3 className="font-display text-[26px] md:text-[34px] leading-tight text-nude-50 mb-3 group-hover:text-champagne-200 transition-colors">
              {article.title}
            </h3>
            <p className="font-serif-editorial italic text-sm text-nude-200/90 leading-relaxed line-clamp-2 mb-3">
              {article.excerpt}
            </p>
            <p className="text-[11px] uppercase tracking-wider text-champagne-400">
              {article.author} · {article.date}
            </p>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'small') {
    return (
      <Link href={`/magazyn/${article.slug}`} className={cn('group block', className)}>
        <article className="flex gap-4 items-start">
          <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden">
            <BeautyEditorial variant={visualVariant as any} />
            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-charcoal-800/85 text-[8px] uppercase tracking-widest text-champagne-300">
              {article.eyebrow.split(' ')[0]}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base leading-tight text-charcoal-800 group-hover:text-burgundy-500 transition-colors mb-1">
              {article.title}
            </h3>
            <p className="text-xs text-charcoal-500 font-serif-editorial italic line-clamp-2">{article.excerpt}</p>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/magazyn/${article.slug}`} className={cn('group block', className)}>
      <article className="relative overflow-hidden bg-surface-card">
        <div className="relative aspect-[16/10]">
          <BeautyEditorial variant={visualVariant as any} />
          <div className="absolute top-4 left-4 px-2.5 py-1 bg-charcoal-800/85 backdrop-blur-sm text-[10px] uppercase tracking-widest text-champagne-300 font-semibold">
            {article.eyebrow}
          </div>
          {article.premium && (
            <div className="absolute bottom-4 right-4">
              <PremiumBadge />
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-display text-xl md:text-2xl leading-tight text-charcoal-800 group-hover:text-burgundy-500 transition-colors mb-2">
            {article.title}
          </h3>
          <p className="font-serif-editorial italic text-sm text-charcoal-500 line-clamp-2 mb-3">{article.excerpt}</p>
          <p className="text-[11px] uppercase tracking-wider text-champagne-600">{article.author} · {article.date}</p>
        </div>
      </article>
    </Link>
  );
}

export function BeforeAfterCard({
  caseData,
  className,
  showCTA,
}: {
  caseData: { id: string; procedure: string; surgeon: string; rating: number; timeAfter: string; type: 'profile' | 'silhouette' | 'hands' | 'eyes' | 'back' };
  className?: string;
  showCTA?: boolean;
}) {
  return (
    <Link href={`/galeria/${caseData.id}`} className={cn('group block', className)}>
      <article className="relative bg-surface-card transition-all duration-400 ease-out hover:shadow-editorial-lg hover:-translate-y-1">
        <BeforeAfterVisual type={caseData.type} />
        {showCTA && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal-800/0 group-hover:bg-charcoal-800/40">
            <span className="px-4 py-2 bg-champagne-500 text-charcoal-800 text-xs font-medium uppercase tracking-wider rounded-sm">
              Zobacz historię pacjentki →
            </span>
          </div>
        )}
        <div className="px-1 py-3">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-base text-charcoal-800">{caseData.procedure}</h3>
            <span className="text-xs text-champagne-600 tabular-nums">★ {caseData.rating.toFixed(1)}/5</span>
          </div>
          <p className="font-serif-editorial italic text-xs text-charcoal-500 mt-1">
            {caseData.surgeon} · {caseData.timeAfter} po zabiegu
          </p>
        </div>
      </article>
    </Link>
  );
}

export function KpiCard({
  label,
  value,
  delta,
  variant = 'default',
  className,
}: {
  label: string;
  value: string | number;
  delta?: string;
  variant?: 'default' | 'accent';
  className?: string;
}) {
  return (
    <div className={cn(
      'relative bg-surface-card border-t border-champagne-500/80 p-5',
      'transition-all duration-300 hover:shadow-editorial-md',
      className
    )}>
      <div className="text-[10px] uppercase tracking-widest text-champagne-600 font-semibold mb-2">{label}</div>
      <div className="flex items-baseline gap-2">
        <div className={cn('font-display text-3xl tabular-nums', variant === 'accent' ? 'text-champagne-600' : 'text-charcoal-800')}>
          {value}
        </div>
        {delta && (
          <span className="text-[11px] px-1.5 py-0.5 rounded-sm bg-burgundy-50 text-burgundy-500 font-medium tabular-nums">
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
