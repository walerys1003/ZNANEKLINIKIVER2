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

## 🔌 Integracje Tier 3 (REAL + graceful fallback)

Wszystkie integracje działają w trybie **dual-mode**: gdy klucz/token jest skonfigurowany w `.env.local` — używamy prawdziwego SDK; gdy nie — graceful fallback (mock UI lub in-page demo). Aplikacja działa end-to-end bez żadnej konfiguracji.

| Integracja | Realna implementacja | Fallback | Env var |
|---|---|---|---|
| **TensorFlow.js** Face Mesh | `@tensorflow-models/face-landmarks-detection` — MediaPipe FaceMesh, 468 landmarków, on-device w przeglądarce. Webcam + upload. Real-time canvas overlay z punktami, liniami złotego podziału i obliczonymi metrykami harmonia/symetria/proporcje. | — (model zawsze pobierany z tfhub, ~3 MB) | brak (auto) |
| **Stripe** Payment Intents | `@stripe/stripe-js` + `@stripe/react-stripe-js` + `stripe` SDK. `<PaymentElement>` (Card + Apple Pay + Google Pay + Link + BLIK gdy w PL). API route `/api/checkout/create-payment-intent` z 3-D Secure. | Editorial mock card form z `pi_demo_*` IDs | `STRIPE_SECRET_KEY` + `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
| **Mapbox GL** | `mapbox-gl` + `react-map-gl/mapbox` — custom HTML markery, popupy, NavigationControl, ScaleControl. Real lng/lat dla 6 klinik i 5 destynacji. | SVG `LuxuryMap` (Poland silhouette, animowane piny) | `NEXT_PUBLIC_MAPBOX_TOKEN` (+ opcj. `NEXT_PUBLIC_MAPBOX_STYLE`) |
| **WebRTC** P2P video | `RTCPeerConnection` z STUN (Google + Twilio), `getUserMedia`, `getDisplayMedia` (screen share), `replaceTrack`. Hook `useWebRTCRoom` z 3 trybami: `self` / `loopback` (real PC↔PC w jednej karcie — domyślny demo) / `signaling` (Socket.IO). | `loopback` jest pełnoprawnym real WebRTC — bez serwera | `NEXT_PUBLIC_SIGNALING_URL` (dla produkcji) |
| **Cloudinary** image patterns | Komponent gotowy (`SurgeonPortrait`, `BeautyEditorial`) — wystarczy `<Image src="res.cloudinary.com/...">` | Abstract SVG kompozycje | (drop-in) |

Pełna lista env vars w `.env.example`. Wszystkie są **opcjonalne** — bez żadnej konfiguracji każda integracja działa w trybie demo, więc preview na sandboxie pokazuje pełen UX bez payload kluczy.

### Architektura graceful fallback

```
TensorFlow.js: hook → real detection LUB demo numbers
Stripe:        api/checkout → real PI LUB pi_demo_<ts>; client → <PaymentElement> LUB <MockCardForm>
Mapbox:        <LuxuryMap> → <RealMapboxMap> LUB <SvgLuxuryMap> (auto-switch po token + lng/lat)
WebRTC:        useWebRTCRoom mode=loopback (default) LUB mode=signaling (gdy env)
```

---

## 🚧 Następne kroki (Tier 4)

- [ ] Produkcyjny serwer signaling (Socket.IO + TURN servers Twilio/Cloudflare)
- [ ] Stripe webhook handler (`/api/stripe/webhook`) + payment confirmation email
- [ ] Mapbox custom style URL z paletą cream/champagne (Studio)
- [ ] Real Cloudinary upload + transformacje (face-aware crop dla portretów chirurgów)
- [ ] Mobile dedicated screens (drawer nav + touch gestures)
- [ ] Multi-language (EN / DE / SE dla medical tourism)
- [ ] CMS dla magazyn editorial (Sanity / Contentful)
- [ ] CRM kalendarz integration (Google Calendar / Cal.com)
- [ ] WordPress/Sanity headless backend

---

© 2026 ChirurgiaPiekna · Editorial Luxury Medical Design System v1.0
