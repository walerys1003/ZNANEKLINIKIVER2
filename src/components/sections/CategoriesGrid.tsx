import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { procedures } from '@/data/mock';
import { Eyebrow } from '@/components/ui/Typography';
import { formatPriceRange } from '@/lib/utils';

export function CategoriesGrid() {
  return (
    <section className="py-20 md:py-24 bg-nude-50">
      <Container size="editorial">
        <header className="text-center mb-12">
          <Eyebrow>Katalog Zabiegów</Eyebrow>
          <h2 className="font-display text-[36px] md:text-[48px] leading-tight tracking-tight text-charcoal-800 mt-3">
            Najczęściej wybierane zabiegi
          </h2>
          <p className="font-serif-editorial italic text-champagne-600 mt-3 text-lg">
            Editorial guide po świecie chirurgii plastycznej
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {procedures.slice(0, 6).map((p) => (
            <Link key={p.slug} href={`/zabiegi/${p.slug}`} className="group">
              <article className="card-editorial p-6 md:p-8 flex items-start gap-6">
                <div className="hidden md:flex w-16 h-16 rounded-full bg-champagne-100/60 items-center justify-center text-2xl text-champagne-700 font-display flex-shrink-0">
                  ⚜
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-display text-xl md:text-2xl text-charcoal-800 group-hover:text-burgundy-500 transition-colors">
                      {p.name}
                    </h3>
                    <span className="text-[11px] uppercase tracking-widest text-champagne-600 font-medium flex-shrink-0">
                      {p.category}
                    </span>
                  </div>
                  <p className="font-serif-editorial italic text-sm text-charcoal-500 leading-relaxed mb-3">
                    {p.shortDescription}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-champagne-500/20">
                    <span className="text-xs text-charcoal-500">
                      <span className="font-serif-editorial italic">{p.duration} · rekonwalescencja {p.recovery}</span>
                    </span>
                    <span className="font-display text-base text-charcoal-800 tabular-nums">
                      {formatPriceRange(p.priceMin, p.priceMax)}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
