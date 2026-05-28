import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/ui/Cards';
import { Eyebrow, Subtitle } from '@/components/ui/Typography';
import { articles } from '@/data/mock';

const categories = ['Wszystkie', 'Analiza', 'Reportaż', 'AI Trend', 'Wywiad', 'Poradnik', 'Trendy'];

export default function MagazynPage() {
  const [hero, ...rest] = articles;
  const featured = rest.slice(0, 2);
  const more = articles.slice(0, 6);

  return (
    <>
      <TopNav />
      <main className="pb-24">
        <Container size="editorial-wide">
          {/* Hero header */}
          <header className="text-center pt-14 pb-10">
            <Eyebrow>Premium Editorial · Listopad 2026</Eyebrow>
            <h1 className="font-display text-[44px] md:text-[80px] lg:text-[100px] leading-[1.02] tracking-tightest text-charcoal-800 mt-3">
              MAGAZYN<br />
              <span className="italic">Aesthetic Insight</span>
            </h1>
            <Subtitle className="mt-4 text-xl md:text-2xl">Najnowsze trendy chirurgii estetycznej 2026</Subtitle>
          </header>

          {/* Category nav */}
          <div className="flex items-center justify-center gap-1 md:gap-2 mb-14 overflow-x-auto">
            {categories.map((c, i) => (
              <button
                key={c}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors whitespace-nowrap
                  ${i === 0 ? 'border-b border-champagne-500 text-burgundy-500' : 'text-charcoal-500 hover:text-charcoal-800'}
                `}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Feature row: 1 big + 2 small */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16">
            <div className="lg:col-span-7">
              <ArticleCard article={hero} variant="feature" />
            </div>
            <div className="lg:col-span-5 grid grid-rows-2 gap-6">
              {featured.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="default" />
              ))}
            </div>
          </div>

          {/* Editorial divider */}
          <div className="text-center my-16">
            <Eyebrow>Najnowsze publikacje</Eyebrow>
            <hr className="gold-divider mt-4" />
          </div>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {more.map((a) => (
              <ArticleCard key={a.slug} article={a} variant="default" />
            ))}
          </div>

          {/* Newsletter block */}
          <section className="mt-24 bg-burgundy-500 text-nude-50 p-10 md:p-16 text-center">
            <Eyebrow className="text-champagne-300">Aesthetic Insight Newsletter</Eyebrow>
            <h2 className="font-display text-[32px] md:text-[48px] leading-tight tracking-tight mt-3 text-nude-50">
              Co tydzień ekskluzywne treści<br />redakcji
            </h2>
            <p className="font-serif-editorial italic text-champagne-200 mt-3 max-w-md mx-auto">
              Dołącz do 12 000+ czytelników. Premium content, AI trendy, wywiady z najlepszymi chirurgami.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Twój adres email"
                className="flex-1 bg-burgundy-600/50 border border-champagne-300/40 px-4 py-3 text-sm text-nude-50 placeholder:text-champagne-300/70 outline-none focus:border-champagne-300"
              />
              <button className="px-6 py-3 bg-champagne-500 text-charcoal-800 text-[11px] uppercase tracking-widest font-semibold hover:bg-champagne-400 transition-colors">
                Subskrybuj
              </button>
            </form>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
