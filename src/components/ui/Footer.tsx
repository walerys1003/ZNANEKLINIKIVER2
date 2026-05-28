import Link from 'next/link';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="mt-32 border-t border-champagne-500/20 bg-nude-50">
      <Container size="editorial-wide">
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-lg tracking-[0.16em] text-charcoal-800 mb-4">
              CHIRURGIA<span className="text-champagne-600">PIEKNA</span>
            </div>
            <p className="font-serif-editorial italic text-sm text-charcoal-500 leading-relaxed">
              Premium luxury health-tech marketplace dla chirurgii plastycznej w Polsce. Editorial × Medical × AI.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-champagne-600 font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-sm text-charcoal-600">
              <li><Link href="/chirurdzy" className="hover:text-burgundy-500 transition-colors">Chirurdzy</Link></li>
              <li><Link href="/kliniki" className="hover:text-burgundy-500 transition-colors">Kliniki</Link></li>
              <li><Link href="/zabiegi" className="hover:text-burgundy-500 transition-colors">Zabiegi</Link></li>
              <li><Link href="/galeria" className="hover:text-burgundy-500 transition-colors">Galeria Before/After</Link></li>
              <li><Link href="/cennik" className="hover:text-burgundy-500 transition-colors">Cennik</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-champagne-600 font-semibold mb-4">AI & Innowacje</h4>
            <ul className="space-y-2.5 text-sm text-charcoal-600">
              <li><Link href="/ai-doradca" className="hover:text-burgundy-500 transition-colors">AI Doradca</Link></li>
              <li><Link href="/aesthetic-insight" className="hover:text-burgundy-500 transition-colors">Aesthetic Insight</Link></li>
              <li><Link href="/magazyn" className="hover:text-burgundy-500 transition-colors">Magazyn</Link></li>
              <li><Link href="/turystyka-medyczna" className="hover:text-burgundy-500 transition-colors">Medical Tourism</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-champagne-600 font-semibold mb-4">Dla Klinik</h4>
            <ul className="space-y-2.5 text-sm text-charcoal-600">
              <li><Link href="/panel-kliniki" className="hover:text-burgundy-500 transition-colors">Panel Kliniki</Link></li>
              <li><Link href="/dla-chirurgow" className="hover:text-burgundy-500 transition-colors">Dla Chirurgów</Link></li>
              <li><Link href="/cennik-b2b" className="hover:text-burgundy-500 transition-colors">Cennik B2B</Link></li>
              <li><Link href="/kontakt" className="hover:text-burgundy-500 transition-colors">Kontakt</Link></li>
            </ul>
          </div>
        </div>

        <hr className="gold-divider" />

        <div className="py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-charcoal-400">
          <p className="font-serif-editorial italic">
            © 2026 ChirurgiaPiekna. Wszelkie prawa zastrzeżone. AI Aesthetic Insight™ powered by Aesthetic Insight Engine.
          </p>
          <div className="flex gap-6">
            <Link href="/regulamin" className="hover:text-charcoal-700 transition-colors">Regulamin</Link>
            <Link href="/polityka-prywatnosci" className="hover:text-charcoal-700 transition-colors">Polityka prywatności</Link>
            <Link href="/rodo" className="hover:text-charcoal-700 transition-colors">RODO</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
