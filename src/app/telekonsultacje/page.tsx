import Link from 'next/link';
import {
  Video, Shield, Lock, Clock, Calendar, Sparkles, CheckCircle2, ArrowRight,
  Headphones, FileText, Eye, ChevronRight
} from 'lucide-react';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow, DisplayHero } from '@/components/ui/Typography';
import { ButtonPrimary, ButtonGold, ButtonGhost } from '@/components/ui/Buttons';
import { SurgeonPortrait } from '@/components/ui/Visuals';
import { AIMatchBadge } from '@/components/ui/Badges';
import { surgeons, teleconsultations } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

export default function TelekonsultacjePage() {
  const featuredSurgeons = surgeons.slice(0, 4);

  return (
    <>
      <TopNav />

      {/* Hero */}
      <section className="relative bg-nude-100 overflow-hidden border-b border-champagne-500/30">
        <Container size="editorial">
          <div className="py-20 md:py-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-burgundy-500/10 border border-burgundy-500/20 mb-6">
                <Video size={12} strokeWidth={1.5} className="text-burgundy-500" />
                <span className="text-[10px] uppercase tracking-widest text-burgundy-500 font-semibold">
                  Telekonsultacja medyczna · END-TO-END encrypted
                </span>
              </div>

              <DisplayHero className="text-charcoal-800">
                Konsultacja<br />
                <span className="font-serif-editorial italic text-burgundy-500">bez wychodzenia z domu</span>
              </DisplayHero>

              <p className="font-serif-editorial italic text-lg text-charcoal-600 mt-6 leading-relaxed max-w-xl">
                Spotkanie wideo z certyfikowanym chirurgiem plastycznym. 30 minut, szyfrowane,
                bez instalacji. Idealne na pierwsze pytania, ocenę wstępną i drugą opinię.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonPrimary size="lg" href="#chirurdzy">
                  Wybierz chirurga
                </ButtonPrimary>
                <ButtonGold size="lg" href="/telekonsultacje/T-1024">
                  Demo · zobacz pokój
                </ButtonGold>
              </div>

              {/* Trust */}
              <div className="mt-10 pt-8 border-t border-champagne-500/30 grid grid-cols-3 gap-6 max-w-md">
                <TrustStat value="HD" label="Wideo 1080p" />
                <TrustStat value="E2E" label="Szyfrowanie" />
                <TrustStat value="30 min" label="Konsultacja" />
              </div>
            </div>

            {/* Right: video room preview */}
            <div className="relative">
              <div className="relative aspect-[4/5] md:aspect-[5/6] bg-charcoal-800 overflow-hidden shadow-editorial-xl">
                {/* Main video */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 via-charcoal-800 to-charcoal-900" />
                  {/* Surgeon "video" */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-full max-w-[240px]">
                      <SurgeonPortrait initials="AK" />
                      <div className="absolute -bottom-1 left-0 right-0 px-3 py-2 bg-charcoal-900/85 backdrop-blur-sm">
                        <div className="text-[10px] uppercase tracking-widest text-champagne-400 font-semibold">Połączono</div>
                        <div className="font-display text-sm text-nude-50">Dr Anna Kowalska</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live indicator */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2 py-1 bg-burgundy-500 text-nude-50 text-[10px] uppercase tracking-widest font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-nude-50 animate-pulse" />
                  Live
                </div>

                {/* Encryption badge */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2 py-1 bg-charcoal-900/85 backdrop-blur-sm border border-champagne-500/30 text-[10px] uppercase tracking-widest text-champagne-300 font-semibold">
                  <Lock size={10} strokeWidth={1.75} />
                  E2E
                </div>

                {/* PiP self-view */}
                <div className="absolute bottom-20 right-4 w-24 h-32 bg-gradient-to-br from-champagne-500/30 to-burgundy-500/20 border-2 border-champagne-500/40">
                  <div className="absolute bottom-1 left-1 right-1 text-[8px] uppercase tracking-widest text-nude-50 font-semibold bg-charcoal-900/70 px-1.5 py-0.5">
                    Ty
                  </div>
                </div>

                {/* Controls bar */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-charcoal-900/85 backdrop-blur-md flex items-center justify-center gap-2">
                  <button className="w-10 h-10 rounded-full bg-charcoal-700 text-nude-50 flex items-center justify-center hover:bg-charcoal-600">
                    <Video size={14} strokeWidth={1.5} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-charcoal-700 text-nude-50 flex items-center justify-center hover:bg-charcoal-600">
                    <Headphones size={14} strokeWidth={1.5} />
                  </button>
                  <button className="w-12 h-10 rounded-full bg-burgundy-500 text-nude-50 flex items-center justify-center hover:bg-burgundy-600">
                    <span className="text-xs">End</span>
                  </button>
                </div>

                {/* Decorative gold frame */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-champagne-500/40 pointer-events-none" />
                <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-champagne-500/40 pointer-events-none" />
              </div>

              {/* Floating timer */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-nude-50 border border-champagne-500/40 shadow-editorial-md">
                <div className="flex items-center gap-2 text-xs">
                  <Clock size={12} strokeWidth={1.5} className="text-champagne-600" />
                  <span className="font-display text-base text-charcoal-800 tabular-nums">12:38</span>
                  <span className="text-charcoal-500 font-serif-editorial italic">z 30 min</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="bg-nude-50 py-20 md:py-24 border-b border-champagne-500/20">
        <Container size="editorial">
          <div className="max-w-2xl mb-12">
            <Eyebrow>Jak działa</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal-800 mt-3">
              Bezpieczeństwo medycznej platformy<br />
              <span className="font-serif-editorial italic text-burgundy-500">prostota Zoom-a</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard icon={Shield} title="Zgodność HIPAA" description="Pełna zgodność z RODO i HIPAA. Sesje nie są nagrywane bez Twojej zgody." />
            <FeatureCard icon={Lock} title="Szyfrowanie end-to-end" description="WebRTC + DTLS-SRTP. Nawet my nie widzimy zawartości Twoich rozmów." />
            <FeatureCard icon={Eye} title="Współdzielenie zdjęć" description="Bezpieczne przesyłanie zdjęć referencyjnych podczas konsultacji." />
            <FeatureCard icon={FileText} title="Raport po sesji" description="Notatki chirurga, plan zabiegu i kosztorys w skrzynce w ciągu 24h." />
            <FeatureCard icon={Sparkles} title="AI co-pilot" description="AI sugeruje pytania, analizuje wcześniejszy raport AI Analiza." />
            <FeatureCard icon={Calendar} title="Bez instalacji" description="Działa w przeglądarce. Na telefonie, laptopie, tablecie." />
          </div>
        </Container>
      </section>

      {/* Surgeons */}
      <section id="chirurdzy" className="bg-nude-100 py-20 md:py-24 border-b border-champagne-500/20">
        <Container size="editorial">
          <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
            <div>
              <Eyebrow>Chirurdzy online</Eyebrow>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal-800 mt-3">
                Wybierz specjalistę<br/>
                <span className="font-serif-editorial italic text-burgundy-500">i umów telekonsultację</span>
              </h2>
            </div>
            <Link href="/chirurdzy" className="text-sm text-burgundy-500 hover:text-burgundy-600 inline-flex items-center gap-1">
              Wszyscy chirurdzy <ChevronRight size={14} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredSurgeons.map((s) => (
              <article key={s.slug} className="group bg-surface-card border-t border-champagne-500/60 hover:shadow-editorial-md transition-shadow">
                <div className="relative aspect-square overflow-hidden">
                  <SurgeonPortrait initials={s.initials} />
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 bg-charcoal-900/80 backdrop-blur-sm text-[10px] uppercase tracking-widest text-champagne-300 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse" />
                    Online
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-charcoal-800">{s.name}</h3>
                  <p className="font-serif-editorial italic text-xs text-champagne-600 mt-0.5 line-clamp-1">{s.procedures.join(' · ')}</p>
                  <div className="mt-4 pt-4 border-t border-champagne-500/20 flex items-baseline justify-between">
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-charcoal-400 font-semibold">Telekonsultacja</div>
                      <div className="font-display text-base text-charcoal-800 tabular-nums">{formatPrice(Math.round(s.consultationPrice * 0.7))}</div>
                    </div>
                    <Link href={`/rezerwacja?chirurg=${s.slug}`} className="inline-flex items-center gap-1 px-3 py-1.5 bg-burgundy-500 text-nude-50 text-[10px] uppercase tracking-widest font-medium hover:bg-burgundy-600 transition-colors">
                      <Video size={11} strokeWidth={1.75} />
                      Umów
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Upcoming / demo room */}
      <section className="bg-nude-50 py-20">
        <Container size="editorial">
          <div className="max-w-3xl mx-auto">
            <Eyebrow>Nadchodzące sesje</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 mt-3 mb-8">
              Otwarte pokoje konferencyjne (demo)
            </h2>

            <ul className="space-y-3">
              {teleconsultations.slice(0, 3).map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/telekonsultacje/${t.id}`}
                    className="group flex items-center gap-4 p-5 bg-surface-card border border-champagne-500/20 hover:border-champagne-500/60 hover:shadow-editorial-sm transition-all"
                  >
                    <div className="w-14 h-16 flex-shrink-0 overflow-hidden">
                      <SurgeonPortrait initials={t.surgeonInitials} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base text-charcoal-800 truncate">{t.surgeonName} <span className="text-charcoal-400 font-sans font-normal">×</span> {t.patientName}</h3>
                      <p className="font-serif-editorial italic text-xs text-charcoal-500 mt-0.5 line-clamp-1">{t.topic}</p>
                      <div className="mt-1.5 flex items-center gap-3 text-[11px] text-charcoal-500">
                        <span className="flex items-center gap-1"><Calendar size={10} strokeWidth={1.5} />{t.date}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Clock size={10} strokeWidth={1.5} />{t.time} · {t.duration} min</span>
                      </div>
                    </div>
                    <ArrowRight size={16} strokeWidth={1.5} className="text-charcoal-400 group-hover:text-burgundy-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}

function TrustStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-charcoal-800">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-charcoal-500 mt-1 font-semibold">{label}</div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <article className="p-6 bg-surface-card border-t border-champagne-500/60 hover:shadow-editorial-sm transition-shadow">
      <Icon size={22} strokeWidth={1.5} className="text-champagne-600 mb-4" />
      <h3 className="font-display text-lg text-charcoal-800 mb-2">{title}</h3>
      <p className="font-serif-editorial italic text-sm text-charcoal-500 leading-relaxed">{description}</p>
    </article>
  );
}
