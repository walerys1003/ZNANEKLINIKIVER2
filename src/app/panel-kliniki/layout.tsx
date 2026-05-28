'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, UserPlus, UserCheck, Image as ImageIcon, MessageSquare,
  Calendar, Megaphone, BarChart3, CreditCard, Settings, Building2
} from 'lucide-react';

const navItems = [
  { href: '/panel-kliniki', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/panel-kliniki/leady', label: 'Leady', icon: UserPlus, badge: '24 new' },
  { href: '/panel-kliniki/chirurdzy', label: 'Chirurdzy', icon: UserCheck },
  { href: '/panel-kliniki/galeria', label: 'Galeria', icon: ImageIcon },
  { href: '/panel-kliniki/opinie', label: 'Opinie', icon: MessageSquare },
  { href: '/panel-kliniki/kalendarz', label: 'Kalendarz', icon: Calendar },
  { href: '/panel-kliniki/marketing', label: 'Marketing', icon: Megaphone },
  { href: '/panel-kliniki/analityka', label: 'Analityka', icon: BarChart3 },
  { href: '/panel-kliniki/billing', label: 'Billing', icon: CreditCard },
  { href: '/panel-kliniki/ustawienia', label: 'Ustawienia', icon: Settings },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-nude-100 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-charcoal-800 text-nude-50 sticky top-0 h-screen">
        <div className="px-6 py-8">
          <Link href="/" className="font-display text-base tracking-[0.18em] text-champagne-400">
            CHIRURGIAPIEKNA
          </Link>
        </div>

        <nav className="flex-1 px-4 py-2">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.href === '/panel-kliniki'
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors
                      ${active ? 'bg-burgundy-500/20 text-champagne-300 border-l-2 border-champagne-500' : 'text-nude-200 hover:text-nude-50 hover:bg-charcoal-700/50 border-l-2 border-transparent'}
                    `}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={16} strokeWidth={1.5} />
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-burgundy-500 text-nude-50 rounded-sm tabular-nums">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Clinic info */}
        <div className="px-4 py-4 border-t border-charcoal-700">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-sm bg-champagne-100/10 text-champagne-400 flex items-center justify-center">
              <Building2 size={16} strokeWidth={1.5} />
            </div>
            <div className="text-xs">
              <div className="font-display text-champagne-300">Klinika Estetica</div>
              <div className="text-nude-300 font-serif-editorial italic mt-0.5">Warszawa</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
