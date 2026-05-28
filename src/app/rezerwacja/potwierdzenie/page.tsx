import Link from 'next/link';
import { CheckCircle2, Calendar, Clock, MapPin, Download, Mail, Phone, ArrowRight, Sparkles, FileText, Heart } from 'lucide-react';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Typography';
import { ButtonPrimary, ButtonGold, ButtonGhost } from '@/components/ui/Buttons';
import { SurgeonPortrait } from '@/components/ui/Visuals';
import { AIMatchBadge } from '@/components/ui/Badges';
import { surgeons, procedures } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

type PageProps = {
  searchParams: Promise<{
    id?: string;
    chirurg?: string;
    zabieg?: string;
    dzien?: string;
    godz?: string;
  }>;
};

export default async function PotwierdzeniePage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const orderId = sp.id ?? 'CP-000000';
  const surgeon = surgeons.find((s) => s.slug === sp.chirurg) ?? surgeons[0];
  const procedure = procedures.find((p) => p.slug === sp.zabieg) ?? procedures[0];
  const day = sp.dzien ?? '15';
  const time = sp.godz ?? '10:30';

  return (
    <>
      <TopNav />

      {/* Success hero */}
      <section className="relative bg-nude-100 border-b border-champagne-500/30 py-16 md:py-24 overflow-hidden">
        {/* Subtle gold shimmer accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-champagne-500 to-transparent" />

        <Container size="prose">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-champagne-500/15 border border-champagne-500 mb-6">
              <CheckCircle2 size={36} strokeWidth={1.25} className="text-champagne-700" />
            </div>
            <Eyebrow className="text-champagne-600">Potwierdzono · {orderId}</Eyebrow>
            <h1 className="font-display text-[44px] md:text-[68px] leading-[1.05] text-charcoal-800 mt-4">
              Twoja konsultacja
              <span className="block font-serif-editorial italic text-burgundy-500">jest zarezerwowana</span>
            </h1>
            <p className="font-serif-editorial italic text-charcoal-500 text-lg mt-5 leading-relaxed">
              Potwierdzenie wraz z instrukcją przygotowania zostało wysłane na Twój e-mail.
              Cieszymy się, że wybrałaś najwyższy standard opieki.
            </p>
          </div>
        </Container>
      </section>

      {/* Appointment card */}
      <section className="bg-nude-100 py-12">
        <Container size="editorial">
          <div className="max-w-3xl mx-auto bg-surface-card shadow-editorial-lg">
            {/* Top — gold strip */}
            <div className="h-1 bg-gradient-to-r from-champagne-500/20 via-champagne-500 to-champagne-500/20" />

            <div className="p-8 md:p-12">
              <div className="flex items-start justify-between gap-6 pb-8 border-b border-champagne-500/30">
                <div>
                  <Eyebrow>Szczegóły wizyty</Eyebrow>
                  <h2 className="font-display text-3xl text-charcoal-800 mt-2">{procedure.name}</h2>
                  <p className="font-serif-editorial italic text-champagne-600 mt-1">
                    Konsultacja wstępna · 45 minut
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold">Nr rezerwacji</div>
                  <div className="font-display text-xl text-charcoal-800 tabular-nums mt-1">{orderId}</div>
                </div>
              </div>

              {/* Surgeon + datetime grid */}
              <div className="grid md:grid-cols-2 gap-8 py-8 border-b border-champagne-500/30">
                {/* Surgeon */}
                <div className="flex gap-4">
                  <div className="w-20 h-24 flex-shrink-0 overflow-hidden">
                    <SurgeonPortrait initials={surgeon.initials} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-champagne-600 font-semibold mb-1">
                      Twój chirurg
                    </div>
                    <h3 className="font-display text-xl text-charcoal-800 leading-tight">{surgeon.name}</h3>
                    <p className="font-serif-editorial italic text-xs text-charcoal-500 mt-0.5">
                      {surgeon.specialty}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <AIMatchBadge percentage={surgeon.aiMatch} variant="inline" />
                      <span className="text-[11px] text-charcoal-500">★ {surgeon.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* Date/Time/Location */}
                <div className="space-y-3 text-sm">
                  <DetailRow icon={Calendar} label="Data" value={`${day} stycznia 2026, czwartek`} />
                  <DetailRow icon={Clock} label="Godzina" value={`${time} (Europe/Warsaw)`} />
                  <DetailRow icon={MapPin} label="Miejsce" value={`${surgeon.city} · adres w mailu`} />
                </div>
              </div>

              {/* Payment summary */}
              <div className="flex items-baseline justify-between py-6 border-b border-champagne-500/30">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold">Opłacono</div>
                  <div className="font-serif-editorial italic text-xs text-charcoal-500 mt-1">
                    Stripe · karta •••• 4242
                  </div>
                </div>
                <div className="font-display text-3xl text-charcoal-800 tabular-nums">
                  {formatPrice(Math.round(surgeon.consultationPrice * 1.08))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-8 flex flex-col sm:flex-row gap-3">
                <ButtonPrimary size="lg" className="flex-1" icon={<Calendar size={14} strokeWidth={1.75} />}>
                  Dodaj do kalendarza
                </ButtonPrimary>
                <ButtonGold size="lg" className="flex-1" icon={<Download size={14} strokeWidth={1.5} />}>
                  Pobierz potwierdzenie (PDF)
                </ButtonGold>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What's next */}
      <section className="bg-nude-50 py-16 md:py-20 border-t border-champagne-500/20">
        <Container size="editorial">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Eyebrow>Co dalej?</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal-800 mt-3">
              Twoja podróż dopiero się zaczyna
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <NextStepCard
              num="01"
              icon={Mail}
              title="Sprawdź skrzynkę"
              description="Potwierdzenie z instrukcją przygotowania, listą badań i mapą dojazdu czeka w Twoim e-mailu."
            />
            <NextStepCard
              num="02"
              icon={Sparkles}
              title="Skorzystaj z AI Analizy"
              description="Wgraj zdjęcie i otrzymaj raport AI gotowy do omówienia z chirurgiem podczas wizyty."
              cta={{ label: 'Rozpocznij AI Analizę', href: '/ai-analiza' }}
            />
            <NextStepCard
              num="03"
              icon={FileText}
              title="Czytaj magazyn"
              description="Eksperckie artykuły o procedurze, opowieści pacjentek i przewodnik po rekonwalescencji."
              cta={{ label: 'Magazyn redakcyjny', href: '/magazyn' }}
            />
          </div>
        </Container>
      </section>

      {/* Care concierge */}
      <section className="bg-nude-100 py-16">
        <Container size="editorial">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center max-w-4xl mx-auto px-6 py-10 bg-charcoal-800 text-nude-50">
            <div>
              <Eyebrow className="text-champagne-400">Concierge 24/7</Eyebrow>
              <h3 className="font-display text-3xl text-nude-50 mt-3 leading-tight">
                Masz pytania przed wizytą?
              </h3>
              <p className="font-serif-editorial italic text-nude-200 mt-3 leading-relaxed">
                Zespół ChirurgiaPiekna jest do Twojej dyspozycji o każdej porze.
                Pomożemy zmienić termin, dosłać dokumenty lub odpowiedzieć na pytania.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <a href="tel:+48800000000" className="inline-flex items-center gap-2 px-6 py-3 bg-champagne-500 text-charcoal-800 text-sm font-medium uppercase tracking-wide">
                <Phone size={14} strokeWidth={1.75} />
                800 000 000
              </a>
              <a href="mailto:concierge@chirurgiapiekna.com" className="inline-flex items-center gap-2 px-6 py-3 border border-champagne-500/40 text-champagne-300 text-sm uppercase tracking-wide hover:bg-champagne-500/10">
                <Mail size={14} strokeWidth={1.5} />
                Napisz e-mail
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA footer */}
      <section className="bg-nude-50 py-12 border-t border-champagne-500/20">
        <Container size="editorial">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-charcoal-600">
              <Heart size={16} strokeWidth={1.5} className="text-burgundy-500" />
              <span className="font-serif-editorial italic">Dziękujemy za zaufanie.</span>
            </div>
            <ButtonGhost href="/">Wróć na stronę główną</ButtonGhost>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={14} strokeWidth={1.5} className="text-champagne-600 mt-0.5 flex-shrink-0" />
      <div>
        <div className="text-[10px] uppercase tracking-widest text-charcoal-400 font-semibold">{label}</div>
        <div className="text-charcoal-800 mt-0.5">{value}</div>
      </div>
    </div>
  );
}

function NextStepCard({
  num, icon: Icon, title, description, cta,
}: { num: string; icon: any; title: string; description: string; cta?: { label: string; href: string } }) {
  return (
    <article className="bg-surface-card border-t border-champagne-500/80 p-6 hover:shadow-editorial-md transition-shadow">
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-display text-3xl text-champagne-500/70 tabular-nums">{num}</span>
        <Icon size={18} strokeWidth={1.5} className="text-champagne-600" />
      </div>
      <h3 className="font-display text-xl text-charcoal-800 mb-2">{title}</h3>
      <p className="font-serif-editorial italic text-sm text-charcoal-500 leading-relaxed mb-4">{description}</p>
      {cta && <ButtonGhost href={cta.href}>{cta.label}</ButtonGhost>}
    </article>
  );
}
