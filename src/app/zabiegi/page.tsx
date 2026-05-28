import Link from 'next/link';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow, Subtitle } from '@/components/ui/Typography';
import { procedures, procedureCategories } from '@/data/mock';
import { formatPriceRange } from '@/lib/utils';

export default function ZabiegiPage() {
  return (
    <>
      <TopNav />
      <main className="pb-24">
        <Container size="editorial-wide">
          <header className="text-center pt-14 pb-12">
            <Eyebrow>Katalog zabiegów</Eyebrow>
            <h1 className="font-display text-[48px] md:text-[72px] lg:text-[92px] leading-[1.05] tracking-tightest text-charcoal-800 mt-3">
              Zabiegi
            </h1>
            <Subtitle className="mt-3 text-xl">Editorial guide po świecie chirurgii plastycznej</Subtitle>
          </header>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {procedureCategories.map((cat) => (
              <div key={cat.name} className="card-editorial p-6 text-center">
                <div className="text-3xl text-champagne-600 mb-2">{cat.icon}</div>
                <h3 className="font-display text-xl text-charcoal-800">{cat.name}</h3>
                <p className="text-xs text-charcoal-500 font-serif-editorial italic mt-1">{cat.count} zabiegów</p>
              </div>
            ))}
          </div>

          {/* Procedures list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {procedures.map((p) => (
              <Link key={p.slug} href={`/zabiegi/${p.slug}`} className="group card-editorial p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-display text-xl md:text-2xl text-charcoal-800 group-hover:text-burgundy-500 transition-colors">{p.name}</h3>
                  <span className="text-[11px] uppercase tracking-widest text-champagne-600 font-medium">{p.category}</span>
                </div>
                <p className="font-serif-editorial italic text-sm text-charcoal-500 leading-relaxed mb-4">{p.shortDescription}</p>
                <div className="flex items-center justify-between pt-3 border-t border-champagne-500/20 text-xs">
                  <span className="text-charcoal-500 font-serif-editorial italic">{p.duration} · {p.recovery} · {p.anesthesia}</span>
                  <span className="font-display text-base text-charcoal-800 tabular-nums">{formatPriceRange(p.priceMin, p.priceMax)}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
