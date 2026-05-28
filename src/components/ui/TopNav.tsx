'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import { Container } from './Container';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/chirurdzy', label: 'Chirurdzy' },
  { href: '/kliniki', label: 'Kliniki' },
  { href: '/zabiegi', label: 'Zabiegi' },
  { href: '/galeria', label: 'Before/After' },
  { href: '/ai-doradca', label: 'AI Doradca' },
  { href: '/telekonsultacje', label: 'Telekonsultacje' },
  { href: '/magazyn', label: 'Magazyn' },
];

const navLinksSecondary = [
  { href: '/ai-analiza', label: 'AI Analiza' },
  { href: '/finansowanie', label: 'Finansowanie' },
  { href: '/turystyka-medyczna', label: 'Medical Tourism' },
];

export function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-nude-100/90 backdrop-blur-md border-b border-champagne-500/20">
      <Container size="editorial-wide">
        <nav className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-base tracking-[0.18em] text-charcoal-800 hover:text-burgundy-500 transition-colors">
            CHIRURGIA<span className="text-champagne-600">PIEKNA</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-[13px] font-medium tracking-wide transition-colors editorial-link',
                      active ? 'text-burgundy-500' : 'text-charcoal-700 hover:text-burgundy-500'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/ai-analiza"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-[11px] uppercase tracking-widest font-semibold text-rosegold-500 border border-rosegold-500/40 hover:bg-rosegold-500/10 transition-colors"
            >
              <span className="w-1 h-1 rounded-full bg-rosegold-500 animate-pulse" />
              AI Analiza
            </Link>
            <button aria-label="Szukaj" className="p-2 text-charcoal-700 hover:text-champagne-600 transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button aria-label="Profil" className="p-2 text-charcoal-700 hover:text-champagne-600 transition-colors hidden md:inline-flex">
              <User size={18} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Menu"
              className="lg:hidden p-2 text-charcoal-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>

        {/* Secondary nav bar */}
        <div className="hidden lg:flex items-center justify-end gap-5 -mt-2 pb-2 text-[11px] uppercase tracking-widest text-charcoal-500 font-semibold">
          {navLinksSecondary.map((link, i) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors',
                  active ? 'text-burgundy-500' : 'hover:text-champagne-600',
                  link.label === 'AI Analiza' && !active && 'text-rosegold-500/80 hover:text-rosegold-500'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-champagne-500/20 py-6">
            <ul className="flex flex-col gap-4">
              {[...navLinks, ...navLinksSecondary].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-sm font-medium text-charcoal-800 hover:text-burgundy-500 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}
