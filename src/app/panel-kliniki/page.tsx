import { KpiCard } from '@/components/ui/Cards';
import { SurgeonPortrait } from '@/components/ui/Visuals';
import { Calendar, Download } from 'lucide-react';
import { surgeons } from '@/data/mock';

export default function PanelDashboard() {
  return (
    <main className="p-6 md:p-10">
      {/* Topbar */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="font-display text-[36px] md:text-[44px] leading-tight tracking-tight text-charcoal-800">
            Dashboard <span className="text-champagne-700">· Listopad 2026</span>
          </h1>
          <p className="font-serif-editorial italic text-sm text-charcoal-500 mt-1">
            Witaj ponownie. Twoje wyniki rosną 22% szybciej niż średnia krajowa.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-champagne-500/40 rounded-sm text-sm text-charcoal-700 hover:bg-champagne-100/30 transition-colors">
            <Calendar size={14} strokeWidth={1.5} />
            <span>Date picker</span>
            <span className="text-champagne-600 text-base leading-none">⌄</span>
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-burgundy-500 text-burgundy-500 rounded-sm text-xs uppercase tracking-wider hover:bg-burgundy-500 hover:text-nude-50 transition-colors">
            <Download size={14} strokeWidth={1.5} />
            Eksportuj raport
          </button>
        </div>
      </header>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <KpiCard label="Nowe leady" value="247" delta="+18%" />
        <KpiCard label="Konsultacje umówione" value="89" />
        <KpiCard label="Przychód MRR" value="142 800 zł" delta="+12%" variant="accent" />
        <KpiCard label="AI Match Score" value="4.8/5" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Trends */}
        <div className="lg:col-span-2 card-editorial p-6">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl text-charcoal-800">Trendy leadów (30 dni)</h2>
              <p className="text-xs text-charcoal-500 font-serif-editorial italic mt-0.5">
                Średnio 8.2 leadów dziennie · +18% vs poprzedni miesiąc
              </p>
            </div>
          </header>
          <LineChartPlaceholder />
        </div>

        {/* Top performers */}
        <div className="card-editorial p-6">
          <h2 className="font-display text-xl text-charcoal-800 mb-5">Top performing chirurdzy</h2>
          <ul className="space-y-4">
            {surgeons.slice(0, 5).map((s, i) => (
              <li key={s.slug} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                  <SurgeonPortrait initials={s.initials} className="w-9 h-9 aspect-square" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-sm text-charcoal-800 truncate">{s.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-base text-charcoal-800 tabular-nums">{68 - i * 12}</div>
                  <div className="text-[10px] text-burgundy-500 tabular-nums">↗ +{32 - i * 5}%</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Activity feed */}
      <div className="card-editorial p-6">
        <h2 className="font-display text-xl text-charcoal-800 mb-5">Ostatnia aktywność</h2>
        <div className="space-y-3 text-sm">
          {[
            { time: '14:32', label: 'Nowy lead', detail: 'Maria K. · Rhinoplastyka', kind: 'lead' },
            { time: '13:15', label: 'Konsultacja umówiona', detail: 'Anna Z. · Powiększanie biustu', kind: 'consult' },
            { time: '12:45', label: 'Zaktualizowano profil kliniki', detail: 'Dr Robert Nowak', kind: 'update' },
            { time: '11:20', label: 'Nowa opinia 5★', detail: 'Katarzyna M. · Lifting', kind: 'review' },
            { time: '10:05', label: 'Płatność potwierdzona', detail: 'Pakiet Premium 24 900 zł', kind: 'payment' },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-4 py-2 border-b border-champagne-500/15 last:border-b-0">
              <span className="text-xs text-charcoal-400 tabular-nums w-12">{a.time}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-champagne-500" />
              <span className="font-medium text-charcoal-700">{a.label}</span>
              <span className="font-serif-editorial italic text-charcoal-500">· {a.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function LineChartPlaceholder() {
  // Editorial line chart in SVG with champagne gradient
  return (
    <div className="relative h-64">
      <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A961" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#E5E5E5" strokeWidth="0.5" strokeDasharray="2,3" />
        ))}
        {/* Filled area */}
        <path
          d="M 0 140 L 50 130 L 100 120 L 150 100 L 200 110 L 250 85 L 300 70 L 350 80 L 400 60 L 450 50 L 500 65 L 550 55 L 600 70 L 600 200 L 0 200 Z"
          fill="url(#lineGrad)"
        />
        {/* Line */}
        <path
          d="M 0 140 L 50 130 L 100 120 L 150 100 L 200 110 L 250 85 L 300 70 L 350 80 L 400 60 L 450 50 L 500 65 L 550 55 L 600 70"
          fill="none"
          stroke="#C9A961"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Points */}
        {[[50, 130], [200, 110], [350, 80], [500, 65]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#C9A961" stroke="#FDFBF7" strokeWidth="1.5" />
        ))}
        {/* Highlighted point with label */}
        <circle cx="450" cy="50" r="5" fill="#7A2E3E" stroke="#FDFBF7" strokeWidth="2" />
      </svg>
      {/* Hover tooltip */}
      <div className="absolute" style={{ top: '15%', left: '70%' }}>
        <div className="bg-nude-50 border border-champagne-500/40 rounded-sm px-3 py-2 text-xs shadow-editorial-md whitespace-nowrap">
          <div className="text-[10px] uppercase tracking-widest text-champagne-700 font-medium">23 listopada</div>
          <div className="font-display text-charcoal-800 tabular-nums">14 leadów</div>
        </div>
      </div>
      {/* X axis */}
      <div className="absolute left-0 right-0 bottom-[-20px] flex justify-between text-[10px] text-charcoal-400 tabular-nums px-1">
        <span>11.11.</span>
        <span>13.11.</span>
        <span>15.11.</span>
        <span>17.11.</span>
        <span>19.11.</span>
        <span>21.11.</span>
        <span>23.11.</span>
      </div>
    </div>
  );
}
