import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow, Subtitle, PullQuote } from '@/components/ui/Typography';
import { ButtonPrimary, ButtonGhost } from '@/components/ui/Buttons';
import { BeforeAfterCard, SurgeonCard } from '@/components/ui/Cards';
import { BeautyEditorial } from '@/components/ui/Visuals';
import { procedures, surgeons, beforeAfterCases } from '@/data/mock';
import { formatPriceRange } from '@/lib/utils';

export default async function ProcedurePage({ params }: { params: Promise<{ procedure: string }> }) {
  const { procedure } = await params;
  const proc = procedures.find((p) => p.slug === procedure);
  if (!proc) return notFound();
  const relatedSurgeons = surgeons.filter((s) => s.procedures.some((sp) => proc.name.toLowerCase().includes(sp.toLowerCase().split(' ')[0]))).slice(0, 3);

  return (
    <>
      <TopNav />
      <main className="pb-24">
        <Container size="editorial">
          {/* Breadcrumb */}
          <div className="pt-6 pb-4 text-xs text-charcoal-400">
            <Link href="/" className="hover:text-burgundy-500">Strona główna</Link>
            <span className="mx-2">/</span>
            <Link href="/zabiegi" className="hover:text-burgundy-500">Zabiegi</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal-700">{proc.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-6">
            <div className="lg:col-span-7">
              <Eyebrow>{proc.category} · Premium Guide</Eyebrow>
              <h1 className="font-display text-[40px] md:text-[60px] leading-[1.05] tracking-tighter text-charcoal-800 mt-3">
                {proc.name}
              </h1>
              <Subtitle className="mt-4 text-xl">{proc.shortDescription}</Subtitle>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                <Stat label="Czas zabiegu" value={proc.duration} />
                <Stat label="Rekonwalescencja" value={proc.recovery} />
                <Stat label="Anestezja" value={proc.anesthesia} />
                <Stat label="Pobyt" value="1 noc" />
              </div>

              <div className="mt-10 space-y-5 font-serif-editorial text-[18px] leading-relaxed text-charcoal-700">
                <p>
                  {proc.shortDescription} W polskich klinikach premium ten zabieg wykonywany jest przez 67 wyspecjalizowanych chirurgów z certyfikatami FEBOPRAS lub PTChP.
                </p>
                <p>
                  Procedura odbywa się w sterylnych warunkach blokowych z anestezjologiem na sali. Każda pacjentka otrzymuje indywidualny plan rekonwalescencji, dostęp do konsultacji 24/7 i opieki pooperacyjnej przez 14 dni.
                </p>
              </div>

              <PullQuote attribution="Dr Anna Kowalska, Premium Surgeon 2026">
                Najważniejsza w {proc.name.toLowerCase()} jest indywidualizacja — każdy nos, każda powieka, każda anatomia jest inna i wymaga osobnego planu chirurgicznego.
              </PullQuote>
            </div>

            <aside className="lg:col-span-5">
              <div className="bg-nude-50 border-t border-champagne-500/60 p-6 md:p-8">
                <div className="aspect-[4/3] overflow-hidden mb-4">
                  <BeautyEditorial variant="molecular" />
                </div>
                <div className="flex items-baseline justify-between mb-3">
                  <Eyebrow>Cena orientacyjna</Eyebrow>
                </div>
                <div className="font-display text-3xl text-charcoal-800 tabular-nums">
                  {formatPriceRange(proc.priceMin, proc.priceMax)}
                </div>
                <p className="text-xs text-charcoal-500 mt-2 font-serif-editorial italic leading-relaxed">
                  Cena obejmuje konsultację, zabieg, anestezję, pobyt 1 noc, kontrole pooperacyjne (×6) i opiekę AI Recovery przez 14 dni.
                </p>
                <hr className="gold-divider my-5" />
                <ButtonPrimary href="/chirurdzy" className="w-full">
                  Znajdź chirurga
                </ButtonPrimary>
                <p className="text-[11px] text-center text-charcoal-400 italic mt-3 font-serif-editorial">
                  Konsultacja medyczna obowiązkowa przed decyzją
                </p>
              </div>
            </aside>
          </div>

          {/* Specialists section */}
          {relatedSurgeons.length > 0 && (
            <section className="mt-24">
              <Eyebrow>Specjaliści w tym zabiegu</Eyebrow>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 mt-3 mb-8">Top chirurdzy</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedSurgeons.map((s) => (
                  <SurgeonCard key={s.slug} surgeon={s} />
                ))}
              </div>
            </section>
          )}

          {/* Before/after */}
          <section className="mt-24">
            <Eyebrow>Rezultaty pacjentek</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 mt-3 mb-8">Before/After galeria</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {beforeAfterCases.slice(0, 4).map((c) => (
                <BeforeAfterCard key={c.id} caseData={c as any} />
              ))}
            </div>
            <div className="text-center mt-8">
              <ButtonGhost href="/galeria">Pełna galeria</ButtonGhost>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-editorial p-4">
      <div className="text-[10px] uppercase tracking-widest text-champagne-600 font-semibold mb-1">{label}</div>
      <div className="font-display text-lg text-charcoal-800">{value}</div>
    </div>
  );
}
