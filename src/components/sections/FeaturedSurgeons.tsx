import { Container } from '@/components/ui/Container';
import { FeaturedSurgeonCard } from '@/components/ui/Cards';
import { ButtonGhost } from '@/components/ui/Buttons';
import { Eyebrow, Subtitle } from '@/components/ui/Typography';
import { surgeons } from '@/data/mock';

export function FeaturedSurgeons() {
  const featured = surgeons.slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-surface-page">
      <Container size="editorial-wide">
        <header className="text-center mb-12 md:mb-16 reveal">
          <Eyebrow>Wyselekcjonowani przez redakcję</Eyebrow>
          <h2 className="font-display text-[40px] md:text-[56px] lg:text-[64px] leading-tight tracking-tight text-charcoal-800 mt-3">
            Chirurdzy Roku 2026
          </h2>
          <Subtitle className="mt-3">Wyselekcjonowani przez redakcję Aesthetic Insight</Subtitle>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {featured.map((s, i) => (
            <FeaturedSurgeonCard key={s.slug} surgeon={s} className={`reveal`} />
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-champagne-500/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-champagne-500/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-champagne-500/30" />
        </div>

        <div className="text-center mt-8">
          <ButtonGhost href="/chirurdzy">Zobacz wszystkich 547 chirurgów</ButtonGhost>
        </div>

        <hr className="gold-divider mt-16" />

        <p className="text-center font-serif-editorial italic text-sm text-charcoal-500 mt-6">
          Każdy chirurg w naszym katalogu przeszedł 47-punktową weryfikację medyczną
        </p>
      </Container>
    </section>
  );
}
