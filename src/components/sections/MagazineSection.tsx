import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/ui/Cards';
import { ButtonGhost } from '@/components/ui/Buttons';
import { Eyebrow, Subtitle } from '@/components/ui/Typography';
import { articles } from '@/data/mock';

export function MagazineSection() {
  const [featured, ...rest] = articles;
  const top2 = rest.slice(0, 2);

  return (
    <section className="py-20 md:py-28 bg-nude-50">
      <Container size="editorial-wide">
        <header className="text-center mb-12 md:mb-16">
          <Eyebrow>Premium Editorial</Eyebrow>
          <h2 className="font-display text-[44px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-tighter text-charcoal-800 mt-3">
            MAGAZYN AESTHETIC INSIGHT
          </h2>
          <Subtitle className="mt-4">Najnowsze trendy chirurgii estetycznej 2026</Subtitle>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Big feature */}
          <div className="lg:col-span-7">
            <ArticleCard article={featured} variant="feature" />
          </div>
          {/* Right column 2 stacked */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-6 lg:gap-8">
            {top2.map((a) => (
              <ArticleCard key={a.slug} article={a} variant="default" />
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 bg-burgundy-500 text-nude-50">
          <ButtonGhost href="/magazyn" className="text-nude-50 hover:text-champagne-300">
            Czytaj wszystkie artykuły
          </ButtonGhost>
          <div className="flex items-center gap-3 text-sm">
            <span className="font-display text-base text-champagne-300">⚜</span>
            <span className="font-serif-editorial italic">12 000+ czytelników</span>
            <span className="text-champagne-300">Aesthetic Insight Premium</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
