import Link from 'next/link';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow, Subtitle, PullQuote } from '@/components/ui/Typography';
import { ButtonPrimary, ButtonGhost } from '@/components/ui/Buttons';
import { BeautyEditorial } from '@/components/ui/Visuals';
import { Plane, Hotel, UserCheck, Calendar } from 'lucide-react';

const packages = [
  { slug: 'rhinoplastyka-warszawa-7-days', name: 'Rhinoplastyka Premium · Warszawa', duration: '7 dni', priceMin: 28000, surgeon: 'Dr Michał Kowalski', highlights: ['Konsultacja AI Aesthetic Insight', 'Pakiet hotelowy 5★', 'Concierge 24/7', 'Transport VIP'] },
  { slug: 'lifting-krakow-10-days', name: 'Lifting twarzy · Kraków', duration: '10 dni', priceMin: 38000, surgeon: 'Dr Tomasz Wiśniewski', highlights: ['Pre-op konsultacja online', 'Apartament w Starym Mieście', 'AI Recovery Plan 14 dni', 'Prywatny szofer'] },
  { slug: 'breast-augmentation-warsaw', name: 'Powiększanie piersi · Warszawa', duration: '5 dni', priceMin: 32000, surgeon: 'Dr Anna Kowalska', highlights: ['Implanty Motiva Ergonomix', 'Hotel 5★ z basenem', 'Mammografia AI', 'Spa pooperacyjne'] },
];

export default function TurystykaPage() {
  return (
    <>
      <TopNav />
      <main className="pb-24">
        {/* Editorial Hero */}
        <section className="relative py-16 md:py-24">
          <Container size="editorial-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Eyebrow>Medical Tourism Polska 2026</Eyebrow>
                <h1 className="font-display text-[44px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-tightest text-charcoal-800 mt-4">
                  Premium chirurgia<br />
                  <span className="italic">w sercu Europy</span>
                </h1>
                <Subtitle className="mt-4 text-xl">
                  Najwyższy poziom medyczny + luksusowe doświadczenie
                </Subtitle>
                <p className="mt-6 font-serif-editorial text-lg text-charcoal-700 leading-relaxed max-w-md">
                  Pakiety all-inclusive dla pacjentek z UE i UK. Konsultacja online, transport, hotel 5★, opieka 24/7 i AI Recovery Plan w cenie.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <ButtonPrimary size="lg" href="#pakiety">Zobacz pakiety</ButtonPrimary>
                  <ButtonGhost href="#concierge">Concierge 24/7</ButtonGhost>
                </div>
              </div>
              <div className="aspect-[4/5] overflow-hidden">
                <BeautyEditorial variant="interior" />
              </div>
            </div>
          </Container>
        </section>

        {/* Why Poland */}
        <section className="py-16 bg-nude-50">
          <Container size="editorial">
            <header className="text-center mb-12">
              <Eyebrow>Dlaczego Polska</Eyebrow>
              <h2 className="font-display text-3xl md:text-5xl text-charcoal-800 mt-3">Premium na europejskim poziomie</h2>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <UserCheck size={28} />, title: '547', label: 'zweryfikowanych chirurgów' },
                { icon: <Hotel size={28} />, title: '200+', label: 'klinik premium' },
                { icon: <Plane size={28} />, title: '40%', label: 'taniej niż w UK / DE' },
                { icon: <Calendar size={28} />, title: '7-14 dni', label: 'pełny pakiet' },
              ].map((s, i) => (
                <div key={i} className="text-center p-6 bg-surface-card border-t border-champagne-500/60">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-champagne-100/60 text-champagne-700 mb-3">{s.icon}</div>
                  <div className="font-display text-3xl text-charcoal-800 tabular-nums">{s.title}</div>
                  <div className="text-xs uppercase tracking-widest text-charcoal-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Packages */}
        <section id="pakiety" className="py-16 md:py-24">
          <Container size="editorial-wide">
            <header className="text-center mb-12">
              <Eyebrow>All-inclusive pakiety</Eyebrow>
              <h2 className="font-display text-4xl md:text-6xl text-charcoal-800 mt-3">Wybierz swoją podróż</h2>
              <Subtitle className="mt-3 text-xl">Wszystkie pakiety obejmują transport, hotel, opiekę 24/7 i AI Recovery Plan</Subtitle>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {packages.map((p) => (
                <Link key={p.slug} href={`/pakiety/${p.slug}`} className="group">
                  <article className="card-editorial p-3 h-full flex flex-col">
                    <div className="aspect-[4/3] overflow-hidden mb-4">
                      <BeautyEditorial variant="interior" />
                    </div>
                    <div className="px-3 pb-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-champagne-600 font-semibold">{p.duration}</span>
                      </div>
                      <h3 className="font-display text-xl text-charcoal-800 group-hover:text-burgundy-500 transition-colors">{p.name}</h3>
                      <p className="font-serif-editorial italic text-sm text-champagne-700 mt-1">{p.surgeon}</p>
                      <ul className="mt-4 space-y-1.5 text-xs text-charcoal-600 flex-1">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2">
                            <span className="text-champagne-600">◆</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-baseline justify-between mt-5 pt-4 border-t border-champagne-500/20">
                        <span className="text-[10px] uppercase tracking-widest text-charcoal-400">Pakiet od</span>
                        <span className="font-display text-xl text-charcoal-800 tabular-nums">{p.priceMin.toLocaleString('pl-PL')} zł</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* Pull quote */}
        <section className="py-16 bg-burgundy-500 text-nude-50">
          <Container size="prose" className="text-center">
            <blockquote className="font-display text-[28px] md:text-[40px] leading-tight italic">
              "Polska stała się jednym z najgorętszych kierunków medical tourism w Europie. Wybiór nie jest między „budżetowo a profesjonalnie" — jest między „luksusowo a luksusowo z wyższą wartością"."
            </blockquote>
            <p className="mt-6 text-sm text-champagne-300 font-serif-editorial italic">— Forbes Health Europe, listopad 2026</p>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
