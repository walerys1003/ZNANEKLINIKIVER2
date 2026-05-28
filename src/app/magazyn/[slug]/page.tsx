import { notFound } from 'next/navigation';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/ui/Cards';
import { BeautyEditorial } from '@/components/ui/Visuals';
import { PullQuote, Eyebrow } from '@/components/ui/Typography';
import { PremiumBadge } from '@/components/ui/Badges';
import { articles } from '@/data/mock';
import Link from 'next/link';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <TopNav />
      <main className="pb-24">
        <article>
          {/* Hero */}
          <header className="relative pt-12 pb-8 overflow-hidden">
            <Container size="editorial">
              <div className="text-center max-w-3xl mx-auto">
                <Eyebrow>{article.eyebrow}</Eyebrow>
                {article.premium && <span className="ml-2 inline-block align-middle"><PremiumBadge /></span>}
                <h1 className="font-display text-[36px] md:text-[60px] lg:text-[76px] leading-[1.05] tracking-tighter text-charcoal-800 mt-4">
                  {article.title}
                </h1>
                <p className="font-serif-editorial italic text-lg md:text-xl text-champagne-700 mt-4">
                  {article.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-charcoal-500">
                  <span className="font-medium text-charcoal-700">{article.author}</span>
                  <span>·</span>
                  <span className="font-serif-editorial italic">{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime} czytania</span>
                </div>
              </div>
            </Container>

            {/* Hero image */}
            <Container size="editorial" className="mt-10">
              <div className="aspect-[21/9] overflow-hidden relative">
                <BeautyEditorial variant={article.imageSeed.includes('clinic') ? 'interior' : article.imageSeed.includes('silk') || article.imageSeed.includes('ai') ? 'silk' : 'molecular'} />
              </div>
            </Container>
          </header>

          {/* Body */}
          <Container size="prose" className="mt-16">
            <p className="drop-cap font-serif-editorial text-[20px] md:text-[22px] leading-[1.65] text-charcoal-800 mb-8">
              Sztuczna inteligencja przestała być science-fiction medycyny estetycznej. Dziś realnie wspiera konsultacje, analizę twarzy, planowanie zabiegów i odzyskiwanie pacjentki po operacji. W 2026 roku narzędzia AI definiują nowy standard premium konsultacji w polskich klinikach.
            </p>

            <p className="font-serif-editorial text-[19px] leading-[1.7] text-charcoal-700 mb-6">
              Pierwsza dekada XXI wieku należała do klasycznych technik chirurgicznych — skalpela, młotka chirurgicznego i ręcznej oceny anatomicznej. Następna dekada będzie należała do precyzji, dynamiki obrazu i przewidywania efektów na bazie danych anatomicznych analizowanych przez modele AI dostosowane do europejskich morfotypów.
            </p>

            <PullQuote attribution="Dr Maria Wiśniewska, Redaktor Naczelna Aesthetic Insight">
              Pierwsza dekada XXI wieku należała do rhinoplastyki klasycznej. Dziś technologia ultrasonograficzna oferuje precyzję, której wcześniej nie znaliśmy.
            </PullQuote>

            <h2 className="font-display text-[32px] md:text-[40px] text-charcoal-800 mt-12 mb-4">
              Czym jest rhinoplastyka ultrasonograficzna?
            </h2>
            <p className="font-serif-editorial text-[19px] leading-[1.7] text-charcoal-700 mb-6">
              Klasyczna rhinoplastyka opiera się na fizycznym modelowaniu kości i chrząstki nosa — ze wszystkimi konsekwencjami: opuchlizną, dłuższą rekonwalescencją i większym ryzykiem mikropęknięć struktury. Rhinoplastyka ultrasonograficzna używa precyzyjnych fal w częstotliwości skupionej tylko na strukturach kostnych — bez naruszania otaczających tkanek miękkich, naczyń krwionośnych ani nerwów.
            </p>
            <p className="font-serif-editorial text-[19px] leading-[1.7] text-charcoal-700 mb-6">
              Efekt? Mniejsza opuchlizna, krótsza rekonwalescencja (zwykle 10-14 dni vs 21-28 dni), niemal niezauważalne siniaki i znacznie wyższa precyzja w modelowaniu nawet najbardziej delikatnych części grzbietu i koniuszka nosa.
            </p>

            <h2 className="font-display text-[32px] md:text-[40px] text-charcoal-800 mt-12 mb-4">
              Dlaczego pacjentki wybierają technologię ultrasonograficzną?
            </h2>
            <ul className="font-serif-editorial text-[19px] leading-[1.7] text-charcoal-700 space-y-3 list-none">
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-champagne-600 before:text-sm before:top-1.5">
                <strong className="font-display not-italic">Precyzja na poziomie chirurgii AI</strong> — modelowanie struktury kostnej z dokładnością do dziesiętnych milimetra.
              </li>
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-champagne-600 before:text-sm before:top-1.5">
                <strong className="font-display not-italic">Krótsza rekonwalescencja</strong> — pacjentki wracają do pracy biurowej już po 10-14 dniach.
              </li>
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-champagne-600 before:text-sm before:top-1.5">
                <strong className="font-display not-italic">Naturalniejszy efekt</strong> — zachowanie otaczających tkanek miękkich powoduje, że profil nosa płynnie integruje się z resztą twarzy.
              </li>
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-champagne-600 before:text-sm before:top-1.5">
                <strong className="font-display not-italic">Mniejsza opuchlizna</strong> i siniaki — często pacjentki obywają się bez gipsu zewnętrznego po 5-7 dniach.
              </li>
            </ul>

            <h2 className="font-display text-[32px] md:text-[40px] text-charcoal-800 mt-12 mb-4">
              Ekonomia: dlaczego cena to nie jedyna metryka
            </h2>
            <p className="font-serif-editorial text-[19px] leading-[1.7] text-charcoal-700 mb-6">
              Rhinoplastyka ultrasonograficzna w polskich klinikach premium kosztuje od 18 500 do 22 000 zł — czyli o 15-25% więcej niż klasyczna. Jednak biorąc pod uwagę krótszą rekonwalescencję, mniejsze ryzyko reoperacji i lepszą integrację z naturą tkanki, jest to inwestycja w długofalową satysfakcję pacjentki.
            </p>

            {/* Share bar */}
            <div className="mt-16 pt-8 border-t border-champagne-500/30 flex items-center justify-between">
              <div className="text-xs text-charcoal-500">
                Tagi: <span className="text-champagne-700">rhinoplastyka, AI, premium, technologia</span>
              </div>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'Email'].map((s) => (
                  <button key={s} className="text-xs uppercase tracking-widest text-champagne-700 hover:text-burgundy-500 font-medium">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </Container>

          {/* Related */}
          <Container size="editorial-wide" className="mt-24">
            <Eyebrow>Podobne publikacje</Eyebrow>
            <h2 className="font-display text-[32px] md:text-[44px] leading-tight tracking-tight text-charcoal-800 mt-3 mb-10">
              Czytaj dalej
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="default" />
              ))}
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
