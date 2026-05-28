import Link from 'next/link';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow, Subtitle } from '@/components/ui/Typography';
import { BeautyEditorial } from '@/components/ui/Visuals';
import { VerifiedBadge, RatingStars } from '@/components/ui/Badges';
import { LuxuryMap, type LuxuryMapPin } from '@/components/map/LuxuryMap';

const clinics = [
  { slug: 'estetica-warszawa', name: 'Klinika Estetica', city: 'Warszawa', district: 'Mokotów', surgeonsCount: 12, rating: 4.9, reviews: 1240, established: 2008, badge: 'premium' as const, x: 56, y: 44 },
  { slug: 'medi-spa-krakow', name: 'Medi Spa Kraków', city: 'Kraków', district: 'Stare Miasto', surgeonsCount: 8, rating: 4.8, reviews: 893, established: 2011, badge: 'medical-tourism' as const, x: 50, y: 68 },
  { slug: 'beauty-clinic-wroclaw', name: 'Beauty Clinic Wrocław', city: 'Wrocław', district: 'Krzyki', surgeonsCount: 6, rating: 4.7, reviews: 612, established: 2014, badge: 'board-certified' as const, x: 32, y: 55 },
  { slug: 'aesthetic-house-poznan', name: 'Aesthetic House', city: 'Poznań', district: 'Centrum', surgeonsCount: 7, rating: 4.8, reviews: 745, established: 2010, badge: 'premium' as const, x: 38, y: 38 },
  { slug: 'gdansk-derm-medical', name: 'Gdańsk Derm Medical', city: 'Gdańsk', district: 'Oliwa', surgeonsCount: 5, rating: 4.6, reviews: 458, established: 2015, badge: 'board-certified' as const, x: 44, y: 22 },
  { slug: 'estetique-lodz', name: 'Estetique Łódź', city: 'Łódź', district: 'Polesie', surgeonsCount: 4, rating: 4.7, reviews: 387, established: 2017, badge: 'premium' as const, x: 48, y: 50 },
];

const mapPins: LuxuryMapPin[] = clinics.map((c) => ({
  id: c.slug,
  label: c.name,
  sublabel: `${c.city} · ${c.surgeonsCount} chirurgów`,
  x: c.x,
  y: c.y,
  variant: c.badge === 'premium' ? 'featured' : c.badge === 'medical-tourism' ? 'tourism' : 'default',
}));

export default function KlinikiPage() {
  return (
    <>
      <TopNav />
      <main className="pb-24">
        <Container size="editorial-wide">
          <header className="text-center pt-14 pb-12">
            <Eyebrow>Kliniki Premium 2026</Eyebrow>
            <h1 className="font-display text-[44px] md:text-[72px] lg:text-[92px] leading-[1.05] tracking-tightest text-charcoal-800 mt-3">
              Kliniki Premium
            </h1>
            <Subtitle className="mt-3 text-xl">200+ klinik medycyny estetycznej zweryfikowanych przez redakcję</Subtitle>
          </header>

          {/* Luxury map */}
          <div className="mb-12">
            <LuxuryMap
              pins={mapPins}
              title="Mapa klinik premium"
              subtitle="6 wybranych miast · kliknij pin, by zobaczyć szczegóły"
              height="lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {clinics.map((c) => (
              <Link key={c.slug} href={`/kliniki/${c.slug}`} className="group">
                <article className="card-editorial p-3">
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <BeautyEditorial variant="interior" />
                  </div>
                  <div className="px-3 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <VerifiedBadge tier={c.badge} />
                    </div>
                    <h3 className="font-display text-2xl text-charcoal-800 group-hover:text-burgundy-500 transition-colors">{c.name}</h3>
                    <p className="font-serif-editorial italic text-sm text-champagne-700 mt-1">{c.city} · {c.district}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-champagne-500/20">
                      <RatingStars value={c.rating} count={c.reviews} size={12} />
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-charcoal-500 font-serif-editorial italic">
                      <span>{c.surgeonsCount} chirurgów</span>
                      <span>Od {c.established} roku</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
