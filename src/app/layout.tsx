import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CHIRURGIAPIEKNA — Premium chirurgia plastyczna w Polsce',
  description: 'Twój ekskluzywny przewodnik po świecie luksusowej medycyny estetycznej. 547 zweryfikowanych chirurgów, 200+ klinik premium, AI Doradca, before/after gallery.',
  keywords: ['chirurgia plastyczna', 'medycyna estetyczna', 'rhinoplastyka', 'lifting twarzy', 'powiększanie piersi', 'kliniki premium', 'medical tourism Polska'],
  openGraph: {
    title: 'CHIRURGIAPIEKNA — Editorial luxury medical marketplace',
    description: 'Odkryj piękno, które odmienia życie. 547 zweryfikowanych chirurgów plastycznych w Polsce.',
    type: 'website',
    locale: 'pl_PL',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
