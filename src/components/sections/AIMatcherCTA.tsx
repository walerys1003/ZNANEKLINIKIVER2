import { Container } from '@/components/ui/Container';
import { AIOrb } from '@/components/ui/AIOrb';
import { ButtonPrimary } from '@/components/ui/Buttons';
import { Eyebrow, Subtitle } from '@/components/ui/Typography';

export function AIMatcherCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <Container size="editorial">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text */}
          <div>
            <Eyebrow>Personal AI · 47 parametrów</Eyebrow>
            <h2 className="font-display text-[36px] md:text-[52px] lg:text-[60px] leading-[1.05] tracking-tight text-charcoal-800 mt-4">
              Twój personalny<br />doradca estetyczny
            </h2>
            <Subtitle className="mt-4">
              AI Aesthetic Insight analizuje 47 parametrów Twojego profilu
            </Subtitle>
            <p className="mt-6 text-charcoal-600 leading-relaxed max-w-md">
              W 7 krokach AI rekomenduje zabieg dopasowany do Twojej anatomii, stylu życia i oczekiwań. Wyniki potwierdzane przez konsylium chirurgów.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <ButtonPrimary href="/ai-doradca" size="lg">
                Sprawdź dopasowanie AI
              </ButtonPrimary>
              <span className="text-xs text-charcoal-500 font-serif-editorial italic max-w-[180px]">
                GDPR compliant · Konsultacja medyczna wymagana
              </span>
            </div>
          </div>

          {/* AI Orb */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <AIOrb size="xl" />
              {/* Rotating gold ring */}
              <div className="absolute inset-[-30%] rounded-full border border-champagne-500/30 pointer-events-none" />
              <div className="absolute inset-[-50%] rounded-full border border-champagne-500/20 pointer-events-none" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
