import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow, Subtitle } from '@/components/ui/Typography';
import { ButtonPrimary } from '@/components/ui/Buttons';
import { procedures } from '@/data/mock';
import { formatPrice, formatPriceRange } from '@/lib/utils';

const tiers = [
  {
    name: 'Konsultacja',
    price: 450,
    period: '30 min / spotkanie',
    features: ['Konsultacja z chirurgiem', 'Plan operacyjny'],
    cta: 'Wybierz',
    highlight: false,
  },
  {
    name: 'Zabieg standardowy',
    price: 18500,
    period: '2.5h · Anestezja ogólna',
    features: ['Konsultacja z chirurgiem', 'Plan operacyjny', 'Anestezja ogólna', 'Pobyt 1 noc', 'AI Recovery Plan', 'Konsultacje pooperacyjne (×6)'],
    cta: 'Rezerwuj',
    highlight: true,
    badge: 'MOST POPULAR',
  },
  {
    name: 'Pakiet premium',
    price: 24900,
    period: 'pełna opieka / 14 dni',
    features: ['Konsultacja z chirurgiem', 'Plan operacyjny', 'Anestezja ogólna', 'Pobyt 2 noce', 'AI Recovery Plan', 'Konsultacje pooperacyjne (×6)', 'Concierge 24/7', 'Prywatny szofer', 'Pakiet kosmetyków premium'],
    cta: 'Rezerwuj premium',
    highlight: false,
  },
];

export default function CennikPage() {
  return (
    <>
      <TopNav />
      <main className="pb-24">
        <Container size="editorial-wide">
          <header className="text-center pt-14 pb-10">
            <Eyebrow>Cennik · Aktualne stawki 2026</Eyebrow>
            <h1 className="font-display text-[44px] md:text-[68px] lg:text-[88px] leading-[1.05] tracking-tightest text-charcoal-800 mt-3">
              Cennik zabiegów
            </h1>
            <Subtitle className="mt-3 text-xl">
              Wszystkie ceny zawierają konsultację, zabieg, kontrole pooperacyjne i opiekę 24/7 przez 14 dni
            </Subtitle>
          </header>

          {/* Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-20 max-w-5xl mx-auto">
            {tiers.map((t) => (
              <article
                key={t.name}
                className={`relative bg-surface-card border-t-2 p-6 md:p-8 transition-all hover:shadow-editorial-lg
                  ${t.highlight ? 'border-burgundy-500 shadow-editorial-md md:scale-105' : 'border-champagne-500'}
                `}
              >
                {t.badge && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-charcoal-800 text-champagne-300 text-[10px] uppercase tracking-widest font-semibold">
                    {t.badge}
                  </span>
                )}
                <h3 className="font-display text-2xl text-charcoal-800">{t.name}</h3>
                <div className="mt-4 font-display text-[44px] leading-none text-charcoal-800 tabular-nums">
                  {formatPrice(t.price)}
                </div>
                <p className="text-xs text-charcoal-500 font-serif-editorial italic mt-2">{t.period}</p>
                <hr className="my-5 border-t border-champagne-500/30" />
                <ul className="space-y-2.5 text-sm text-charcoal-700 mb-6">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-champagne-600 mt-0.5">◆</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {t.highlight ? (
                  <ButtonPrimary className="w-full">{t.cta}</ButtonPrimary>
                ) : (
                  <button className="w-full px-6 py-3 border border-champagne-500 text-charcoal-800 text-xs uppercase tracking-wider font-medium hover:bg-champagne-500 transition-colors rounded-sm">
                    {t.cta}
                  </button>
                )}
              </article>
            ))}
          </div>

          {/* Procedure menu */}
          <section className="mb-16">
            <header className="text-center mb-10">
              <Eyebrow>Procedure menu</Eyebrow>
              <h2 className="font-display text-3xl md:text-5xl text-charcoal-800 mt-3">Pełna lista zabiegów</h2>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {procedures.map((p) => (
                <div key={p.slug} className="card-editorial p-4 md:p-5 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base md:text-lg text-charcoal-800">{p.name}</h3>
                    <p className="text-[11px] text-charcoal-500 font-serif-editorial italic mt-0.5">
                      {p.duration} · rekonwalescencja {p.recovery}
                    </p>
                  </div>
                  <div className="font-display text-base md:text-lg text-charcoal-800 tabular-nums whitespace-nowrap">
                    {formatPriceRange(p.priceMin, p.priceMax)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Financing strip */}
          <section className="bg-nude-50 border-t border-champagne-500/40 p-8 md:p-10 text-center">
            <div className="text-2xl text-champagne-700 mb-2">⚜</div>
            <h2 className="font-display text-2xl md:text-3xl text-charcoal-800">Dostępne finansowanie · raty 0%</h2>
            <p className="text-xs text-charcoal-500 mt-3 font-serif-editorial italic max-w-2xl mx-auto leading-relaxed">
              Rzeczywista roczna stopa oprocentowania (RRSO) wynosi 0%. Szczegółowe warunki finansowania dostępne podczas konsultacji.
            </p>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
