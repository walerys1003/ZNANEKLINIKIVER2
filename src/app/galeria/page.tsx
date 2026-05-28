import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { BeforeAfterCard } from '@/components/ui/Cards';
import { Eyebrow, Subtitle } from '@/components/ui/Typography';
import { beforeAfterCases } from '@/data/mock';

const filterPills = [
  { label: 'Zabieg', dropdown: 'Rhinoplastyka, Lifting, Powiększanie piersi, Liposukcja, Blefaroplastyka' },
  { label: 'Chirurg' },
  { label: 'Miasto' },
  { label: 'Wiek pacjentki' },
  { label: 'Czas od zabiegu' },
];

export default function GaleriaPage() {
  // Build more cases for masonry effect
  const allCases = [...beforeAfterCases, ...beforeAfterCases.map((c) => ({ ...c, id: c.id + 'x' }))];

  return (
    <>
      <TopNav />
      <main className="pb-24">
        <Container size="editorial-wide">
          <header className="text-center pt-12 pb-10">
            <Eyebrow>Galeria publikowana za zgodą pacjentek · Indywidualne wyniki</Eyebrow>
            <h1 className="font-display text-[48px] md:text-[80px] lg:text-[100px] leading-[1.02] tracking-tightest text-charcoal-800 mt-3">
              Galeria Transformacji
            </h1>
            <Subtitle className="mt-4 text-2xl">Realne efekty zweryfikowanych chirurgów</Subtitle>
          </header>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
            {filterPills.map((p) => (
              <button
                key={p.label}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-champagne-500/40 bg-nude-50 hover:border-champagne-500 hover:bg-champagne-100/40 text-xs text-charcoal-700 transition-colors"
              >
                <span className="font-medium">{p.label}</span>
                {p.dropdown && <span className="font-serif-editorial italic text-charcoal-500 hidden md:inline">({p.dropdown.split(',').slice(0, 5).join(', ')})</span>}
                <span className="text-champagne-600 text-sm leading-none">⌄</span>
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
            {allCases.map((c, i) => (
              <BeforeAfterCard
                key={c.id + i}
                caseData={c as any}
                showCTA={i === 2}
              />
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <hr className="gold-divider mb-6" />
            <p className="text-xs italic font-serif-editorial text-charcoal-500 leading-relaxed">
              Wszystkie zdjęcia publikowane wyłącznie za zgodą pacjentek. Indywidualne wyniki mogą się różnić w zależności od anatomii, stylu życia i regeneracji. Decyzja o zabiegu zawsze poprzedzona jest konsultacją medyczną.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
