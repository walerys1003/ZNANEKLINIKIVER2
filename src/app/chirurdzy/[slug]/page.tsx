import { notFound } from 'next/navigation';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow, Subtitle, PullQuote } from '@/components/ui/Typography';
import { ButtonPrimary, ButtonGold, ButtonGhost } from '@/components/ui/Buttons';
import { VerifiedBadge, AIMatchBadge, RatingStars } from '@/components/ui/Badges';
import { SurgeonPortrait, BeforeAfterVisual } from '@/components/ui/Visuals';
import { surgeons, reviews, beforeAfterCases } from '@/data/mock';
import { formatPrice } from '@/lib/utils';
import { MapPin, Award, Clock, Users, MessageCircle, Calendar } from 'lucide-react';
import Link from 'next/link';

export default async function SurgeonProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const surgeon = surgeons.find((s) => s.slug === slug);
  if (!surgeon) return notFound();

  return (
    <>
      <TopNav />
      <main className="pb-24">
        <Container size="editorial">
          {/* Breadcrumb */}
          <div className="pt-6 pb-4 text-xs text-charcoal-400">
            <Link href="/" className="hover:text-burgundy-500">Strona główna</Link>
            <span className="mx-2">/</span>
            <Link href="/chirurdzy" className="hover:text-burgundy-500">Chirurdzy</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal-700">{surgeon.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-6">
            {/* LEFT — Portrait + trust */}
            <div className="lg:col-span-5">
              <div className="relative">
                <SurgeonPortrait initials={surgeon.initials} className="rounded-sm shadow-editorial-md" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                  <VerifiedBadge tier={surgeon.badge} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-12">
                <TrustBlock icon={<Award size={20} />} title="Board" subtitle="Certified" />
                <TrustBlock icon={<Clock size={20} />} title={`${surgeon.experience}+ lat`} subtitle="doświadczenia" />
                <TrustBlock icon={<Users size={20} />} title="FEBOPRAS" subtitle="członek" />
              </div>
            </div>

            {/* RIGHT — Main content */}
            <div className="lg:col-span-7">
              <h1 className="font-display text-[44px] md:text-[56px] leading-[1.05] tracking-tighter text-charcoal-800">
                {surgeon.name}
              </h1>
              <p className="font-serif-editorial italic text-lg text-champagne-700 mt-2">
                {surgeon.specialty} · {surgeon.procedures.join(' · ')} · {surgeon.city}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-sm text-charcoal-600">
                <RatingStars value={surgeon.rating} count={surgeon.reviewCount} />
                <span className="font-serif-editorial italic">
                  📋 {surgeon.patientsCount.toLocaleString('pl-PL')}+ zabiegów
                </span>
                <span className="font-serif-editorial italic">
                  🎓 {surgeon.experience} lat praktyki
                </span>
              </div>

              {/* Pull quote */}
              <PullQuote attribution={surgeon.name}>
                Piękno to równowaga między naturą a nauką. Moim celem jest podkreślenie Twojej indywidualności, zachowując harmonię rysów.
              </PullQuote>

              {/* Tabs */}
              <div className="border-b border-champagne-500/30 mt-4">
                <div className="flex gap-6 md:gap-8 text-sm overflow-x-auto">
                  {['Sylwetka', 'Zabiegi', 'Before/After', 'Opinie', 'Konsultacja', 'Cennik'].map((tab, i) => (
                    <button
                      key={tab}
                      className={`pb-3 whitespace-nowrap ${i === 0 ? 'text-burgundy-500 border-b-2 border-champagne-500 -mb-px' : 'text-charcoal-500 hover:text-charcoal-800'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mt-8 space-y-4 text-charcoal-700 font-serif-editorial text-[17px] leading-relaxed">
                <p>
                  {surgeon.name.split(' ').slice(-1)[0]} został doceniony za nowoczesne podejście do chirurgii plastycznej — łączenie sztuki, anatomii i wieloletniego doświadczenia z technologiami AI w planowaniu zabiegów.
                </p>
                <p>
                  Specjalizuje się przede wszystkim w {surgeon.procedures[0].toLowerCase()} — w technologii ultrasonograficznej oraz metodzie SMAS. Każdy zabieg poprzedzony jest szczegółową konsultacją z analizą 3D, aby wynik harmonijnie wpisał się w Twoją indywidualność i naturalne proporcje twarzy.
                </p>
              </div>

              {/* Booking card */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <BookingCard surgeon={surgeon} />
                <AIPanel surgeon={surgeon} />
              </div>
            </div>
          </div>

          {/* Before/After section */}
          <section className="mt-24">
            <header className="text-center mb-10">
              <Eyebrow>Galeria pacjentek</Eyebrow>
              <h2 className="font-display text-[32px] md:text-[44px] leading-tight tracking-tight text-charcoal-800 mt-3">
                Rezultaty Before/After
              </h2>
              <Subtitle className="mt-2">Wszystkie publikacje za zgodą pacjentek</Subtitle>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {beforeAfterCases.slice(0, 3).map((c) => (
                <div key={c.id} className="card-editorial p-3">
                  <BeforeAfterVisual type={c.type as any} />
                  <div className="pt-3 px-1">
                    <h3 className="font-display text-base text-charcoal-800">{c.procedure}</h3>
                    <p className="text-xs text-charcoal-500 font-serif-editorial italic mt-1">{c.timeAfter} po zabiegu</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs italic text-charcoal-400 font-serif-editorial mt-6">
              Indywidualne wyniki mogą się różnić. Decyzja o zabiegu zawsze po konsultacji medycznej.
            </p>
          </section>

          {/* Reviews preview */}
          <section className="mt-24">
            <header className="text-center mb-10">
              <Eyebrow>Opinie zweryfikowane</Eyebrow>
              <h2 className="font-display text-[32px] md:text-[44px] leading-tight tracking-tight text-charcoal-800 mt-3">
                Opinie Pacjentek
              </h2>
              <Subtitle className="mt-2">{surgeon.reviewCount} zweryfikowanych opinii · ★ {surgeon.rating.toFixed(1)}</Subtitle>
            </header>

            {/* Rating distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-12">
              <div className="space-y-2">
                {[
                  { stars: 5, pct: 87 },
                  { stars: 4, pct: 9 },
                  { stars: 3, pct: 3 },
                  { stars: 2, pct: 0.5 },
                  { stars: 1, pct: 0.5 },
                ].map((r) => (
                  <div key={r.stars} className="flex items-center gap-3 text-xs text-charcoal-600">
                    <span className="w-6 tabular-nums">{r.stars}★</span>
                    <div className="flex-1 h-1.5 bg-champagne-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-champagne-400 to-champagne-600" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="w-10 text-right tabular-nums">{r.pct}%</span>
                  </div>
                ))}
              </div>
              <div className="border-l-2 border-champagne-500/50 pl-6 italic font-serif-editorial text-charcoal-700">
                <p className="text-[20px] leading-relaxed">
                  "Dr {surgeon.name.split(' ').slice(-1)[0]} zmienił moje życie. Nie tylko nos — odzyskałam pewność siebie."
                </p>
                <p className="text-xs not-italic mt-3 text-charcoal-500">— Anna K., 34 lata, Warszawa</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {reviews.map((r) => (
                <ReviewCard key={r.initials} review={r} />
              ))}
            </div>

            <div className="text-center mt-8">
              <ButtonGhost href="#">Zobacz wszystkie {surgeon.reviewCount} opinii</ButtonGhost>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function TrustBlock({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center text-center p-4 bg-nude-50 border-t border-champagne-500/60">
      <div className="w-10 h-10 rounded-full bg-champagne-100/60 text-champagne-700 flex items-center justify-center mb-2">{icon}</div>
      <div className="font-display text-sm text-charcoal-800">{title}</div>
      <div className="text-[10px] text-charcoal-500 mt-0.5 uppercase tracking-widest">{subtitle}</div>
    </div>
  );
}

function BookingCard({ surgeon }: { surgeon: typeof surgeons[number] }) {
  return (
    <div className="bg-nude-50 border border-burgundy-500/40 p-5 rounded-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-widest text-burgundy-500 font-semibold">Umów konsultację</span>
        <span className="font-display text-lg text-burgundy-500 tabular-nums">{formatPrice(surgeon.consultationPrice)}</span>
      </div>
      {/* Mini calendar visual */}
      <div className="grid grid-cols-7 gap-1 text-[10px] text-charcoal-500 mb-3 mt-4">
        {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'].map((d) => (
          <div key={d} className="text-center font-medium">{d}</div>
        ))}
        {Array.from({ length: 21 }).map((_, i) => {
          const day = i + 1;
          const isAvailable = [3, 5, 8, 11, 17, 19, 20].includes(day);
          const isSelected = day === 17;
          return (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center rounded-sm text-charcoal-700 tabular-nums
                ${isSelected ? 'bg-champagne-500 text-charcoal-800 font-medium' : ''}
                ${isAvailable && !isSelected ? 'border border-champagne-500/40' : ''}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="text-[11px] text-champagne-700 italic font-serif-editorial mb-3">
        AI Match — {surgeon.aiMatch}% dopasowanie do Twojego profilu
      </div>
      <ButtonPrimary size="sm" className="w-full" href={`/rezerwacja?chirurg=${surgeon.slug}`} icon={<Calendar size={14} />}>
        Zarezerwuj termin
      </ButtonPrimary>
      <Link href="/finansowanie" className="block text-center text-[11px] uppercase tracking-widest text-champagne-700 hover:text-champagne-600 mt-3 font-semibold">
        Raty 0% → kalkulator
      </Link>
    </div>
  );
}

function AIPanel({ surgeon }: { surgeon: typeof surgeons[number] }) {
  return (
    <div className="bg-rosegold-50/60 border border-rosegold-200/60 p-5 rounded-sm">
      <Eyebrow className="text-rosegold-600">AI Insight Personal</Eyebrow>
      <div className="flex items-baseline gap-2 mt-3 mb-2">
        <AIMatchBadge percentage={surgeon.aiMatch} variant="large" />
        <div className="flex-1 ml-3">
          <div className="font-display text-2xl text-charcoal-800 tabular-nums leading-none">{surgeon.aiMatch}%</div>
          <p className="text-[11px] uppercase tracking-widest text-rosegold-700 mt-1">dopasowanie</p>
        </div>
      </div>
      <p className="font-serif-editorial italic text-sm text-charcoal-600 leading-relaxed mt-2">
        Profil chirurga zgodny z 9 z 10 parametrów Twojego planu estetycznego.
      </p>
      <Link href="/ai-doradca" className="inline-flex items-center gap-1 text-xs font-medium text-burgundy-500 mt-3 hover:text-burgundy-600">
        Zobacz pełną analizę →
      </Link>
    </div>
  );
}

function ReviewCard({ review }: { review: typeof reviews[number] }) {
  return (
    <article className="card-editorial p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-champagne-100 text-champagne-700 flex items-center justify-center font-serif-editorial italic text-sm">
          {review.initials}
        </div>
        <div>
          <div className="font-display text-base text-charcoal-800">{review.name} · {review.age} lat</div>
          <div className="text-[11px] text-charcoal-500 font-serif-editorial italic">
            Zabieg: {review.procedure} · {review.timeAgo}
          </div>
        </div>
      </div>
      <div className="text-champagne-500 mb-2 text-sm">★★★★★</div>
      <p className="text-sm text-charcoal-700 leading-relaxed font-serif-editorial">
        {review.body}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-champagne-500/20">
        {review.verified && (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-champagne-600 font-medium">
            ✓ Zweryfikowany pacjent
          </span>
        )}
        {review.hasPhoto && (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-champagne-600 font-medium">
            ☷ Z fotografią before/after
          </span>
        )}
      </div>
    </article>
  );
}
