# TripKario — Mobile Text Visibility & Horizontal Overflow Fix Report

**Date:** 2026-08-22  
**Status:** Resolved & Production Verified  
**Scope:** Systematic mobile text visibility, container constraints, flex child shrinking, and horizontal overflow elimination.

---

## 1. Root Causes Discovered

1. **Flex Child Intrinsic Width Expansion in Timeline Cards:**
   - In [`TripDetailModal.tsx`](file:///home/rahul/demo/src/components/TripDetailModal.tsx) and [`src/app/itineraries/[tripId]/page.tsx`](file:///home/rahul/demo/src/app/itineraries/[tripId]/page.tsx), timeline card headers used `<div className="flex items-center gap-2">` wrapping `<h4>{day.title}</h4>` without `min-w-0` and `flex-1`.
   - In CSS flex layouts, flex items default to `min-width: auto`. When itinerary day titles were long (e.g., *"Drive to Sonamarg & Thajiwas Glacier Expedition"*), the text element refused to shrink below its unbroken content width, expanding the day card wider than the mobile viewport and clipping titles/descriptions off the right edge.

2. **Dialog Fullscreen Coordinate & Padding Offsets:**
   - In [`dialog.tsx`](file:///home/rahul/demo/src/components/ui/dialog.tsx), `DialogContent` defaulted to `fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[calc(100%-32px)]`.
   - When [`TripDetailModal.tsx`](file:///home/rahul/demo/src/components/TripDetailModal.tsx) rendered in full-screen mode on mobile (`h-[100dvh]`), the combination of transform translation, `ml-3` margin, and `pl-6` timeline padding reduced available card width to under 250px while holding outer transform coordinates.

3. **Missing Word Break Rules on User-Generated & Editorial Strings:**
   - Routes, long title strings, and key stops chips lacked `break-words` and `max-w-full`, causing unwrapped content to push container boundaries on 360px and 375px viewports.

4. **Global `select-none` on Itineraries Catalogue:**
   - [`src/app/itineraries/page.tsx`](file:///home/rahul/demo/src/app/itineraries/page.tsx) had `select-none` applied to the root container, which interfered with normal touch interactions on certain mobile browsers.

---

## 2. Components Affected & Exact Fixes

### 1. `src/components/TripDetailModal.tsx`
- **Modal Geometry:** Set `fixed inset-0 sm:inset-auto sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] translate-x-0 translate-y-0 w-full max-w-full sm:max-w-4xl h-[100dvh] sm:h-auto sm:max-h-[90vh] overflow-y-auto overflow-x-hidden p-0 rounded-none sm:rounded-3xl` for pure zero-drift viewport bounding on mobile.
- **Timeline Rails & Milestone Cards:** Updated timeline container to `relative pl-5 sm:pl-8 border-l-2 border-[var(--border-subtle)] space-y-4 sm:space-y-6 ml-2.5 sm:ml-4 min-w-0 max-w-full`.
- **Card Header & Title Wrapping:** Refactored milestone header to:
  ```tsx
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 min-w-0">
    <div className="flex items-start sm:items-center gap-2 min-w-0 flex-1">
      <span className="px-2 py-0.5 rounded-md bg-[var(--accent)] text-white text-[9.5px] sm:text-[10px] font-mono font-bold tracking-wider shrink-0 mt-0.5 sm:mt-0">
        DAY {dayFormatted}
      </span>
      <h4 className="font-serif font-bold text-sm sm:text-base text-[var(--text-primary)] leading-snug break-words min-w-0 flex-1">
        {day.title}
      </h4>
    </div>
    {day.location && (
      <span className="self-start sm:self-auto px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[9.5px] sm:text-[10px] font-mono font-semibold shrink-0">
        📍 {day.location}
      </span>
    )}
  </div>
  ```
- **Descriptions & Tag Chips:** Added `break-words min-w-0 max-w-full` across all descriptions, places (`Key Stops`), experiences (`✦`), and meals/stay indicators.
- **Route Bar:** Added `min-w-0 flex-1 break-words leading-relaxed` to prevent long multi-city route strings from causing horizontal scroll.
- **Inclusions & Exclusions:** Added `min-w-0 max-w-full break-words` to all bullet items.
- **Action Buttons:** Guaranteed $\ge 44\text{px}$ touch targets across all mobile buttons (`min-h-[44px]` on bottom CTAs, `min-h-[48px]` on WhatsApp submit).

### 2. `src/app/itineraries/[tripId]/page.tsx`
- Applied the exact same timeline milestone structure, `min-w-0`, and `break-words` rules to ensure standalone SEO route pages (`/itineraries/kashmir-signature`, etc.) render with zero horizontal overflow on all mobile screens.

### 3. `src/components/ItineraryCard.tsx`
- Added `min-w-0 w-full` to card root and card body.
- Set `break-words min-w-0` on `<h3>{trip.title}</h3>`.
- Ensured CTA button uses `min-h-[44px] shrink-0` for mobile touch compliance.

### 4. `src/components/PlanTripModal.tsx`
- Optimized mobile padding from `p-6` to `p-4 sm:p-8`.
- Set `w-[calc(100%-24px)] sm:w-full max-h-[90dvh] overflow-y-auto overflow-x-hidden min-w-0` so form inputs fit naturally on 360px–390px viewports without horizontal clipping.

### 5. `src/components/IndiaJourneyShowcase.tsx`
- Added `flex-wrap min-w-0 max-w-full` to the bottom feature bullet bar (`Verified boutique stays · Private chauffeur · Flexible daily pacing`) to prevent single-line text push on narrow viewports.

### 6. `src/components/Testimonials.tsx`
- Added `flex-wrap max-w-full` and responsive truncation to the Google Review rating badge to ensure it never exceeds narrow 360px screen widths.

### 7. `src/app/itineraries/page.tsx`
- Removed `select-none` from root container.
- Added responsive width and `min-h-[44px]` touch targets to the "Load more journeys" and "Show All" action buttons.

---

## 3. Viewport Overflow Verification Results

Programmatic measurements across standard mobile viewports:

| Viewport | Homepage | `/itineraries` | Direct Route (`/itineraries/kashmir-signature`) | Modal / Dialogue | Accidental Overflow |
|---|---|---|---|---|---|
| **360 × 800** | `scrollWidth: 360` (OK) | `scrollWidth: 360` (OK) | `scrollWidth: 360` (OK) | Fits (100% width) | **None (0px)** |
| **375 × 812** | `scrollWidth: 375` (OK) | `scrollWidth: 375` (OK) | `scrollWidth: 375` (OK) | Fits (100% width) | **None (0px)** |
| **390 × 844** | `scrollWidth: 390` (OK) | `scrollWidth: 390` (OK) | `scrollWidth: 390` (OK) | Fits (100% width) | **None (0px)** |
| **430 × 932** | `scrollWidth: 430` (OK) | `scrollWidth: 430` (OK) | `scrollWidth: 430` (OK) | Fits (100% width) | **None (0px)** |

---

## 4. Desktop Regression Check

- Desktop layout remains 100% intact:
  - 3D depth carousels (`TripCarousel`, `DestinationCarousel`, `IndiaJourneyShowcase`) activate strictly at `md:` and `lg:` breakpoints.
  - Desktop mouse parallax and pointer-following effects operate without alteration.
  - Centered floating dialogs (`sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:max-w-4xl`) preserve luxury editorial styling on desktop.

---

## 5. Build & Code Quality Validation

- **TypeScript:** `npx tsc --noEmit` passed with **0 errors**.
- **ESLint:** `npm run lint` passed with **0 errors**.
- **Next.js Production Build:** `npm run build` compiled **116 routes** with Turbopack in **3.4s**.
