import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import { SurgeonCard } from '@/components/ui/Cards';
import { Eyebrow, Subtitle } from '@/components/ui/Typography';
import { surgeons, cities } from '@/data/mock';
import { Search, LayoutGrid, List } from 'lucide-react';

export default function SurgeonsPage() {
  const allProcedures = ['Rhinoplastyka', 'Lifting twarzy', 'Powiększanie piersi', 'Liposukcja', 'Blefaroplastyka', 'Lipotransfer', 'Botoks', 'Korekta uszu'];

  return (
    <>
      <TopNav />
      <main className="pb-24">
        <Container size="editorial-wide">
          {/* Breadcrumb */}
          <div className="pt-6 pb-4 text-xs text-charcoal-400">
            <a href="/" className="hover:text-burgundy-500">Strona główna</a>
            <span className="mx-2">/</span>
            <span className="text-charcoal-700">Chirurdzy</span>
          </div>

          {/* Hero */}
          <header className="text-center pt-10 pb-12">
            <Eyebrow>Katalog Premium</Eyebrow>
            <h1 className="font-display text-[44px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-tighter text-charcoal-800 mt-3">
              Katalog Chirurgów
            </h1>
            <Subtitle className="mt-3">547 zweryfikowanych specjalistów w Polsce</Subtitle>
          </header>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center gap-3 px-4 py-3 bg-nude-50 border border-champagne-500/40 rounded-sm">
              <Search size={16} strokeWidth={1.5} className="text-champagne-600" />
              <input
                type="text"
                placeholder="Wpisz nazwisko, miasto lub zabieg..."
                className="flex-1 bg-transparent outline-none text-sm text-charcoal-800 placeholder:text-charcoal-400"
              />
              <button className="px-4 py-1.5 bg-burgundy-500 text-nude-50 text-[11px] uppercase tracking-wider rounded-sm hover:bg-burgundy-600 transition-colors">
                Szukaj
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar filters */}
            <aside className="lg:col-span-3 space-y-8">
              <FilterGroup title="Lokalizacja">
                {cities.map((c) => (
                  <FilterCheckbox key={c.name} label={c.name} count={c.count} />
                ))}
              </FilterGroup>

              <FilterGroup title="Zabieg">
                {allProcedures.map((p) => (
                  <FilterCheckbox key={p} label={p} />
                ))}
              </FilterGroup>

              <FilterGroup title="Cena konsultacji">
                <div className="space-y-3 pt-2">
                  <div className="relative h-1 bg-champagne-100 rounded-full">
                    <div className="absolute h-1 bg-gradient-to-r from-champagne-400 to-champagne-600 rounded-full" style={{ left: '15%', right: '15%' }} />
                    <div className="absolute w-3 h-3 bg-champagne-500 rounded-full -mt-1 border-2 border-nude-50 shadow" style={{ left: '15%' }} />
                    <div className="absolute w-3 h-3 bg-champagne-500 rounded-full -mt-1 border-2 border-nude-50 shadow" style={{ right: '15%' }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-charcoal-500 tabular-nums">
                    <span>200 zł</span>
                    <span>2000 zł</span>
                  </div>
                </div>
              </FilterGroup>

              <FilterGroup title="Ocena">
                <div className="flex gap-0.5 text-champagne-500 text-lg">★★★★★</div>
                <div className="text-xs text-charcoal-500 mt-1 font-serif-editorial italic">4.0+ tylko</div>
              </FilterGroup>

              <div className="pt-4 border-t border-champagne-500/30 space-y-3">
                <ToggleRow label="AI Match Score" defaultChecked />
                <ToggleRow label="Tylko zweryfikowani" />
              </div>
            </aside>

            {/* Main grid */}
            <div className="lg:col-span-9">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-champagne-500/20">
                <div className="text-sm text-charcoal-600">
                  <span className="font-display text-lg text-charcoal-800 tabular-nums">{surgeons.length}</span>{' '}
                  <span className="font-serif-editorial italic">chirurgów wybranych dla Ciebie</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-1 text-xs">
                    <button className="px-2.5 py-1.5 border border-champagne-500 text-charcoal-800 bg-champagne-100/40 rounded-sm flex items-center gap-1.5">
                      <LayoutGrid size={12} /> siatka
                    </button>
                    <button className="px-2.5 py-1.5 border border-champagne-500/30 text-charcoal-500 hover:bg-champagne-100/30 rounded-sm flex items-center gap-1.5">
                      <List size={12} /> lista
                    </button>
                  </div>
                  <select className="text-xs bg-transparent border border-champagne-500/30 px-3 py-1.5 rounded-sm text-charcoal-700 outline-none">
                    <option>Sortuj: Najwyżej oceniani</option>
                    <option>Sortuj: AI Match</option>
                    <option>Sortuj: Cena</option>
                    <option>Sortuj: Najwięcej opinii</option>
                  </select>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                {surgeons.map((s) => (
                  <SurgeonCard key={s.slug} surgeon={s} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex items-center justify-center gap-2">
                <button className="w-9 h-9 flex items-center justify-center rounded-sm border border-champagne-500/30 text-charcoal-500 hover:bg-champagne-100/30">‹</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-sm bg-champagne-500 text-charcoal-800 font-medium">1</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-sm border border-champagne-500/30 text-charcoal-700 hover:bg-champagne-100/30">2</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-sm border border-champagne-500/30 text-charcoal-700 hover:bg-champagne-100/30">3</button>
                <span className="px-2 text-charcoal-400">...</span>
                <button className="w-9 h-9 flex items-center justify-center rounded-sm border border-champagne-500/30 text-charcoal-700 hover:bg-champagne-100/30">23</button>
                <button className="w-9 h-9 flex items-center justify-center rounded-sm border border-champagne-500/30 text-charcoal-500 hover:bg-champagne-100/30">›</button>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-lg text-charcoal-800 mb-3">{title}</h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function FilterCheckbox({ label, count }: { label: string; count?: number }) {
  return (
    <label className="flex items-center justify-between text-sm text-charcoal-700 cursor-pointer hover:text-burgundy-500 transition-colors">
      <div className="flex items-center gap-2.5">
        <span className="w-3.5 h-3.5 border border-champagne-500/50 rounded-sm" />
        <span>{label}</span>
      </div>
      {count !== undefined && <span className="text-xs text-charcoal-400 font-serif-editorial italic">({count})</span>}
    </label>
  );
}

function ToggleRow({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm text-charcoal-700">
      <span>{label}</span>
      <span className={`relative inline-block w-9 h-5 rounded-full transition-colors ${defaultChecked ? 'bg-champagne-500' : 'bg-champagne-100'}`}>
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-nude-50 shadow transition-transform ${defaultChecked ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
      </span>
    </div>
  );
}
