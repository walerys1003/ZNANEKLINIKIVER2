import { Container } from '@/components/ui/Container';
import { BeforeAfterCard } from '@/components/ui/Cards';
import { ButtonGhost } from '@/components/ui/Buttons';
import { Eyebrow, Subtitle } from '@/components/ui/Typography';
import { beforeAfterCases } from '@/data/mock';

export function BeforeAfterPreview() {
  return (
    <section className="py-20 md:py-28">
      <Container size="editorial-wide">
        <header className="text-center mb-12 md:mb-16">
          <Eyebrow>Realne efekty zweryfikowanych chirurgów</Eyebrow>
          <h2 className="font-display text-[40px] md:text-[60px] leading-tight tracking-tight text-charcoal-800 mt-3">
            Galeria Transformacji
          </h2>
          <Subtitle className="mt-3">Wszystkie zdjęcia publikowane za zgodą pacjentek</Subtitle>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {beforeAfterCases.slice(0, 5).map((c, i) => (
            <BeforeAfterCard key={c.id} caseData={c as any} showCTA={i === 2} />
          ))}
        </div>

        <div className="text-center mt-12">
          <ButtonGhost href="/galeria">Odkryj pełną galerię — 2400+ transformacji</ButtonGhost>
        </div>

        <p className="text-center text-xs font-serif-editorial italic text-charcoal-400 mt-4 max-w-xl mx-auto">
          Indywidualne wyniki mogą się różnić. Decyzja o zabiegu zawsze po konsultacji medycznej.
        </p>
      </Container>
    </section>
  );
}
