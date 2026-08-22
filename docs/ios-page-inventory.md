# TripKario — iOS / Mobile Page & Component Inventory

## 1. Public Route Inventory

| Route | Primary Content | Mobile Composition Strategy | Desktop Art Direction |
| :--- | :--- | :--- | :--- |
| `/` | Landing page (Hero, Curated Trips, Destinations, India Journey, Reviews, Philosophy, Custom Trip, Final CTA, Footer) | Single column vertical flow, native horizontal snap rails, static foreground typography, no mouse parallax, solid translucent badge pills | Cinematic Awwwards layout, depth layers, subtle pointer parallax, interactive magnetic controls |
| `/itineraries` | Complete Trip Catalogue (All 12+ packages, filters, search) | Single-column cards, lightweight mobile filter drawer, native vertical scrolling, no hover scale | 3-column responsive grid, interactive filter sidebar, rich hover animations |
| `/itineraries/[tripId]` | Canonical Trip Itinerary Reader | Full-width document reader, day-by-day vertical progression, sticky bottom CTA with safe-area insets | Multi-column editorial layout, sticky booking card, rich gallery views |
| `/gallery` | Curated Photo Gallery | 1 or 2-column clean grid, solid dark lightbox overlay, touch-friendly swipe | Masonry grid with hover metadata and cinematic zoom |
| `/gallery/location/[slug]` | Location-specific Photo Gallery | 1 or 2-column grid, location hero with static text, lightweight lightbox | Full masonry layout with location stats |
| `/team` | Team & Curators Showcase | Editorial vertical cards, touch-friendly contact links, no hover layout shift | Rich portrait grid with bio drawers |

---

## 2. Admin Console Screen Inventory

| Route | Primary Function | Mobile Composition Strategy |
| :--- | :--- | :--- |
| `/adminconsole1811/login` | Administrator authentication | Centered single-column card, 16px inputs (no iOS auto-zoom) |
| `/adminconsole1811/update-password` | Password management | Single-column card with safe-area spacing |
| `/adminconsole1811/trips` | Trip management & list | Card-based vertical list instead of squeezed desktop tables |
| `/adminconsole1811/trips/[id]` | Trip itinerary builder & editor | Step-by-step full-width sections, single-day cards, 44px touch targets |
| `/adminconsole1811/team` | Team member management | Single-column member cards with prominent photo actions |
| `/adminconsole1811/gallery` | Photo management & ImageKit upload | Single-column upload zone, card-based media review |
| `/adminconsole1811/settings` | Brand signature & site preferences | Responsive form with real-time preview cards and toggle switches |

---

## 3. Shared Overlays, Dialogs & Fixed Components

| Component | Function | Mobile Optimization |
| :--- | :--- | :--- |
| `Navbar` | Primary navigation | Lightweight drawer with 180ms ease-out, solid translucent glass, no heavy blurs |
| `Footer` | Links & Contact | Vertical stacked layout, 44px tap targets, normal document flow |
| `TripDetailModal` | Deep trip exploration | Full-screen sheet (`100dvh`), single outer scroller, body scroll lock, lazy day images |
| `PlanTripModal` | Inquiry form | Bottom sheet / full-screen dialog, 16px minimum font size, keyboard-safe |
| `TravelChatbot` | AI Concierge | Safe-area aware (`bottom-[calc(1rem+env(safe-area-inset-bottom))]`), solid dark surface |
| `WhatsAppButton` | Instant WhatsApp contact | Safe-area aware, high-contrast, zero backdrop filter layering |
| `ThemeToggle` | Light/Dark theme toggle | Instant theme switch without full-page repaint spikes |
| `Preloader` | Brand opening | Lightweight 800ms fade-out, no persistent DOM overhead |

---

## 4. Device Profiles & Target Viewports

- **Small Mobile**: `360 × 800` (Budget Android / compact devices)
- **iPhone Standard**: `375 × 812` (iPhone X / XS / 11 Pro / 12 mini / 13 mini / SE)
- **iPhone Modern**: `390 × 844` (iPhone 12 / 13 / 14)
- **iPhone Dynamic Island**: `393 × 852` (iPhone 14 Pro / 15 / 15 Pro / 16)
- **iPhone Plus / Max**: `402 × 874` & `430 × 932` (iPhone 14 Plus / 15 Pro Max / 16 Pro Max)
- **Tablet**: `768 × 1024`, `820 × 1180`, `834 × 1112`, `912 × 1368`
- **Desktop**: `1280 × 800`, `1440 × 900`, `1920 × 1080`
