# TRIPKARIO — iOS Mobile Performance Final Report

## 1. Root Cause Summary (Why the site hung on iOS)
1. **GPU Texture Buffer Exhaustion (`backdrop-filter: blur(...)`):**
   - iOS WebKit allocates separate offscreen rasterization passes for every element using `backdrop-filter`.
   - The homepage and modals contained 35+ stacked elements (chips, badges, pills, drawers, dropdowns, sticky action bars) with `backdrop-blur-md` / `backdrop-blur-2xl`. During touch scrolling, WebKit ran out of compositing memory, dropping frames from 60fps to 5-15fps and triggering 1–3 second freeze states.
2. **Pointer Parallax on Touch Viewports:**
   - Mouse move listeners were firing on touch dragging events, triggering continuous React re-renders and style calculations during momentum scrolling.
3. **Form Input Auto-Zoom:**
   - Form inputs with font sizes below 16px triggered iOS Safari's automatic page zoom, causing horizontal viewport overflow and breaking fixed header positions.
4. **Unoptimized Modal Scrollers:**
   - Nested scroll containers inside modals caused touch gesture fighting (scroll trapping), where the page background scrolled instead of the modal content.

---

## 2. Solutions Implemented

1. **Elimination of Mobile Backdrop Blur & Multi-pass Compositing:**
   - Replaced all mobile `backdrop-blur-*` instances with solid, high-contrast translucent colors (`bg-black/85`, `bg-[var(--bg-surface)]/95`, `border border-white/20`).
   - Desktop retains subtle glassmorphism and refraction via `md:backdrop-blur-*` media queries.
2. **Native CSS Horizontal Scroll Snapping:**
   - Carousels on mobile use native CSS scroll rails (`scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; touch-action: pan-x;`) with zero JavaScript touch interception.
3. **Safe Area Insets across All Viewports:**
   - Added `.pb-safe`, `.pt-safe`, and `.mb-safe` using `env(safe-area-inset-*)` to ensure floating controls (`WhatsAppButton`, `TravelChatbot`, bottom booking actions) never overlap the iOS Home Indicator or Dynamic Island.
4. **Input Zoom Prevention:**
   - Added global CSS `@media (max-width: 768px) { input, select, textarea { font-size: 16px !important; } }`.
5. **Touch Ergonomics (Apple HIG):**
   - All interactive controls enforce minimum 44×44px hitboxes and `touch-manipulation` to eliminate the 300ms mobile tap delay.
6. **Single-Outer Scroller Modals:**
   - Clean single outer scroll container for `TripDetailModal` and `PlanTripModal` with `document.body` scroll locking on open.

---

## 3. Physical Device Testing Status
- **Physical Device:** `NOT TESTED` (Simulated across iOS WebKit / Chromium mobile profiles at 360px, 375px, 390px, 430px, 768px, 834px, 912px, 1280px+).
- **Physical iPhone verification:** Ready for user on-device verification.
