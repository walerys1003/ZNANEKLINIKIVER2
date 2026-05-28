# 🏥 CHIRURGIAPIEKNA.COM — Premium Luxury Health-Tech Marketplace

**Editorial Luxury Medical Design System 2026** — premium marketplace dla chirurgii plastycznej w Polsce.

Pozycjonowanie: **ultra-premium editorial × medical authority × AI-first**.

---

## 🎨 Design DNA

| Token | Wartość |
|---|---|
| Background | `#F8F4EE` cream (NIGDY pure white) |
| Tekst | `#1A1A1A` deep charcoal |
| Accent | `#C9A961` champagne gold |
| CTA | `#7A2E3E` burgundy |
| AI features | `#B85A4E` rose-gold (orb) |
| Display font | Playfair Display |
| Editorial font | Cormorant Garamond (italic dla podtytułów) |
| UI font | Inter |

Pełne tokeny: `src/app/globals.css` + `tailwind.config.js`.

---

## 🚀 Uruchomienie

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 📂 Struktura projektu

```
src/
├── app/                          ← Next.js App Router
│   ├── layout.tsx                ← Root layout + fonty Google
│   ├── globals.css               ← Design system tokens + utilities
│   ├── page.tsx                  ← / (Homepage)
│   ├── chirurdzy/
│   │   ├── page.tsx              ← Katalog chirurgów z filtrami
│   │   └── [slug]/page.tsx       ← Profil chirurga
│   ├── kliniki/page.tsx          ← Katalog klinik
│   ├── zabiegi/
│   │   ├── page.tsx              ← Katalog zabiegów
│   │   └── [procedure]/page.tsx  ← Procedure educational hub
│   ├── galeria/page.tsx          ← Before/After gallery (silhouettes)
│   ├── ai-doradca/page.tsx       ← AI matcher flow (7 kroków) + wyniki
│   ├── magazyn/
│   │   ├── page.tsx              ← Magazyn Aesthetic Insight (lista)
│   │   └── [slug]/page.tsx       ← Article single page
│   ├── cennik/page.tsx           ← Cennik + tiers
│   ├── turystyka-medyczna/page.tsx ← Medical tourism marketplace
│   └── panel-kliniki/
│       ├── layout.tsx            ← Sidebar B2B
│       └── page.tsx              ← Dashboard KPI + charts
├── components/
│   ├── ui/                       ← Container, TopNav, Footer, Buttons,
│   │                                Cards, Badges, AIOrb, Visuals,
│   │                                Typography
│   └── sections/                 ← Homepage sections
├── data/mock.ts                  ← Mock surgeons/articles/procedures
└── lib/utils.ts                  ← cn() + formatters
```

---

## ✅ Zaimplementowane widoki

### Tier 1 — MVP marketplace

| Trasa | Widok | Status |
|---|---|---|
| `/` | Homepage (Editorial Hero + Featured + Categories + AI CTA + Before/After + Magazine) | ✅ |
| `/chirurdzy` | Katalog z sidebar filterami + grid + paginacja | ✅ |
| `/chirurdzy/[slug]` | Profil chirurga (portret + tabs + booking + reviews + before/after) | ✅ |
| `/kliniki` | Katalog klinik premium + **luxury map** | ✅ |
| `/zabiegi` | Katalog zabiegów + kategorie | ✅ |
| `/zabiegi/[procedure]` | Procedure educational hub | ✅ |
| `/galeria` | Before/After masonry + filter pills | ✅ |
| `/ai-doradca` | 7-step matcher flow + AI orb + results page | ✅ |
| `/magazyn` | Editorial blog hub | ✅ |
| `/magazyn/[slug]` | Article single page (drop cap, pull quotes) | ✅ |
| `/cennik` | Pricing tiers + procedure menu + financing | ✅ |
| `/turystyka-medyczna` | Medical tourism landing + pakiety + **destination map** | ✅ |
| `/panel-kliniki` | B2B Dashboard (KPI + line chart + activity feed) | ✅ |

### Tier 2 — Advanced features

| Trasa | Widok | Status |
|---|---|---|
| `/rezerwacja` | **Checkout flow** 4-step (Zabieg → Termin → Dane → Płatność) + Stripe-style UI | ✅ |
| `/rezerwacja/potwierdzenie` | Order confirmation z appointment card, next-steps, concierge | ✅ |
| `/ai-analiza` | **AI Face Visualization** — upload → analiza (468 landmarks) → raport + ranking chirurgów | ✅ |
| `/telekonsultacje` | Landing wideo z preview pokoju + lista chirurgów online + nadchodzące sesje | ✅ |
| `/telekonsultacje/[id]` | **Pełnoekranowy pokój wideo** — kontrolki, czat E2E, AI notatki live | ✅ |
| `/finansowanie` | **Kalkulator rat** — slidery + 4 partnerów bankowych + FAQ + AI sugestie | ✅ |
| `/panel-kliniki/leady` | **CRM Inbox** — 2-pane (lista + detail), filtry, AI score, timeline, reply box | ✅ |

---

## 🧩 Komponenty designu

### Foundation
`Container` · `TopNav` (sticky + mobile menu) · `Footer` · `Buttons` (Primary burgundy / Gold outline / Ghost)

### Typography
`DisplayHero` · `H1` · `Eyebrow` · `Subtitle` · `PullQuote`

### Cards
`SurgeonCard` · `FeaturedSurgeonCard` (z gold corner brackets) · `ArticleCard` (default / feature / small) · `BeforeAfterCard` · `KpiCard`

### AI
`AIOrb` (4-rozmiarowy, pulsujący rose-gold gradient, 4s animation)
`AIMatchBadge` (corner / large / inline) — gold shimmer
`AIInsightCard` (rose-gold subtle)

### Medical
`VerifiedBadge` (board-certified / premium / medical-tourism)
`BeforeAfterVisual` — abstrakcyjne SVG silhouettes (profile / hands / eyes / silhouette / back) — **żadnych rozpoznawalnych twarzy** zgodnie z compliance.

### Visuals
`SurgeonPortrait` — deterministyczny gradient + abstrakcyjny silhouette zamiast stock photo
`BeautyEditorial` — 4 warianty: portrait / silk / interior / molecular (do hero magazine + medical tourism)

---

## 🎯 Compliance & Legal

- ✅ Wszystkie CTA: **"Umów konsultację"** (NIE "Zarezerwuj zabieg")
- ✅ Before/After: **abstrakcyjne silhouettes** — żadnych twarzy
- ✅ AI rekomendacje z disclaimerem "informacyjne · konsultacja medyczna obowiązkowa"
- ✅ Polish microcopy w 100%
- ✅ Tabular nums dla cen / dat / statystyk
- ✅ Reduced motion respektowane
- ✅ Focus rings 2px champagne
- ✅ Stopka z linkami RODO / Regulamin / Polityka prywatności

---

## 🎬 Stack

- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind v3.4 + CSS Variables (premium tokens)
- **Fonts**: Google Fonts (Playfair Display, Cormorant Garamond, Inter) — wszystkie z latin-ext (PL)
- **Icons**: Lucide React (1.5px stroke, editorial)
- **Animacje**: CSS keyframes + Tailwind utilities (ease-editorial cubic-bezier)

---

## 📐 Layout zasady

- Grid 12 col, gutter 24px, max-width **editorial 1280px** / wide 1440px / prose 680px
- Spacing 8px base (4, 8, 12, 16, 24, 32, 48, 64, 96, 128px)
- Hero min-height 80vh z massive whitespace
- Cards: thin 1px gold top border, hover → shadow + translateY(-2px)
- Inputs: **underline-only** (border-bottom), editorial minimalism
- Shadows: ZAWSZE warm-toned (rgba 26,26,26)
- Radius: preferuj 0 lub 2-4px

---

## 🔌 Integracje (mock / ready)

| Integracja | Status | Lokalizacja |
|---|---|---|
| **Stripe** checkout (Card / BLIK / Bank transfer) | UI mock | `/rezerwacja` (krok 4) |
| **Mapbox** luxury style map | SVG mock — gotowy do podpięcia | `src/components/map/LuxuryMap.tsx` |
| **Cloudinary** image patterns | Komponent gotowy | `src/components/ui/Visuals.tsx` (zamiana abstract → real images = drop-in) |
| **WebRTC** wideo konsultacja | UI mock | `/telekonsultacje/[id]` |
| **TensorFlow.js** face landmarks | UI symulacja (12s timer + 468 punktów SVG) | `/ai-analiza` |
| **Bank Finance APIs** (mBank / Santander / BNP / PKO) | UI + kalkulator | `/finansowanie` |

`LuxuryMap` zawiera komentarz z instrukcją podpięcia prawdziwego Mapboxa: zamień `<svg>` na `<div ref={mapRef}>` i zainicjalizuj `mapbox-gl` ze stylem dopasowanym do tokenów cream/champagne/charcoal.

---

## 🚧 Następne kroki (Tier 3)

- [ ] Realny upload zdjęć + TensorFlow.js face mesh (zamiast symulacji)
- [ ] Realna integracja Stripe (Payment Intents API)
- [ ] Realny Mapbox z custom style URL
- [ ] WebRTC peer-to-peer dla telekonsultacji (Daily.co / Twilio)
- [ ] Mobile dedicated screens (drawer nav + touch gestures)
- [ ] Multi-language (EN / DE / SE dla medical tourism)
- [ ] CMS dla magazyn editorial (Sanity / Contentful)
- [ ] CRM kalendarz integration (Google Calendar / Cal.com)
- [ ] Cloudinary integration dla obrazów (gdy będą real photos)
- [ ] Stripe integration dla pricing
- [ ] WordPress/Sanity headless backend

---

© 2026 ChirurgiaPiekna · Editorial Luxury Medical Design System v1.0
