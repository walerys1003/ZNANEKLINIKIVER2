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
  { href: '/magazyn', label: 'Magazyn' },
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
          <div className="flex items-center gap-4">
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

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-champagne-500/20 py-6">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
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
