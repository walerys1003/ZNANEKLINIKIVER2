import { Container } from '@/components/ui/Container';
import { Search, MapPin, Sparkles, CreditCard, ShieldCheck, MessageCircle, Brain, Feather } from 'lucide-react';
import { BeautyEditorial } from '@/components/ui/Visuals';

export function HeroHome() {
  return (
    <section className="relative pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20">
      <Container size="editorial-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT — Editorial text */}
          <div className="lg:col-span-6 reveal">
            <h1 className="font-display text-[48px] sm:text-[64px] md:text-[80px] lg:text-[92px] leading-[1.02] tracking-tightest text-charcoal-800">
              Odkryj piękno,<br />
              które odmienia<br />
              <span className="italic font-normal">życie</span>
            </h1>
            <p className="font-serif-editorial italic text-lg md:text-xl text-champagne-700 mt-6 md:mt-8 max-w-md leading-snug">
              Twój ekskluzywny przewodnik po świecie luksusowej medycyny estetycznej. Znajdź harmonię i pewność siebie.
            </p>

            {/* Trust strip below */}
            <div className="hidden lg:grid grid-cols-4 gap-6 mt-16 pt-8 border-t border-champagne-500/30">
              <TrustItem icon={<ShieldCheck size={18} strokeWidth={1.4} />} label="500+ zweryfikowanych chirurgów" />
              <TrustItem icon={<MessageCircle size={18} strokeWidth={1.4} />} label="12 000+ opinii" />
              <TrustItem icon={<Brain size={18} strokeWidth={1.4} />} label="AI Match" />
              <TrustItem icon={<Feather size={18} strokeWidth={1.4} />} label="Premium Editorial" />
            </div>
          </div>

          {/* RIGHT — Editorial portrait + floating search */}
          <div className="lg:col-span-6 relative reveal">
            <div className="relative aspect-[4/5] max-w-md md:max-w-lg mx-auto">
              <BeautyEditorial variant="portrait" className="w-full h-full" />
              {/* Decorative gold frame */}
              <div className="absolute -top-2 -right-2 w-12 h-12 border-t border-r border-champagne-500/60" />
              <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b border-l border-champagne-500/60" />

              {/* Floating glass search panel */}
              <div className="absolute -left-4 sm:left-auto sm:-right-6 md:-right-12 top-[15%] w-[280px] sm:w-[300px] glass-surface rounded-md p-4 shadow-editorial-lg">
                <SearchField placeholder="Znajdź swojego chirurga" icon={<Search size={14} />} primary />
                <div className="mt-3 space-y-2.5">
                  <SearchField placeholder="Miasto" icon={<MapPin size={14} />} />
                  <SearchField placeholder="Zabieg" icon={<Sparkles size={14} />} />
                  <SearchField placeholder="Budżet" icon={<CreditCard size={14} />} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile trust strip */}
        <div className="lg:hidden grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-champagne-500/30">
          <TrustItem icon={<ShieldCheck size={18} strokeWidth={1.4} />} label="500+ chirurgów" />
          <TrustItem icon={<MessageCircle size={18} strokeWidth={1.4} />} label="12 000+ opinii" />
          <TrustItem icon={<Brain size={18} strokeWidth={1.4} />} label="AI Match" />
          <TrustItem icon={<Feather size={18} strokeWidth={1.4} />} label="Editorial" />
        </div>
      </Container>
    </section>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[12px] md:text-[13px] text-charcoal-700">
      <span className="text-champagne-600">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function SearchField({ placeholder, icon, primary }: { placeholder: string; icon: React.ReactNode; primary?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-sm bg-nude-50/90 border ${primary ? 'border-burgundy-500/40' : 'border-champagne-500/40'} text-xs text-charcoal-600`}>
      <span className="text-champagne-600">{icon}</span>
      <span className="flex-1">{placeholder}</span>
      <span className="text-champagne-600 text-base leading-none">⌄</span>
    </div>
  );
}
