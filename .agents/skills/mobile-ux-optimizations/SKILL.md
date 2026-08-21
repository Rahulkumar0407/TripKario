---
name: mobile-ux-optimizations
description: >-
  Expert mobile-first UX optimization workflows, touch target ergonomics, thumb-zone CTA design,
  responsive form inputs (prevent iOS zoom), safe-area handling, gesture navigation, and mobile viewports.
---

# Mobile UX Optimizations Skill

This skill defines the technical and design standards for creating world-class mobile user experiences.

---

## 1. Touch Target Ergonomics & Tap Targets
- **Minimum Tap Target:** Every interactive element (buttons, links, inputs, icons) must have a touch target of at least **44 × 44px** (ideally 48 × 48px for primary actions).
- **Adequate Touch Spacing:** Ensure at least **8px** of separation between adjacent interactive elements to prevent accidental miss-clicks.
- **Fast Tap Response:** Include `touch-action: manipulation` or active states (`active:scale-95`, `active:opacity-90`) to provide instant tactile haptic visual feedback without 300ms click delay.

---

## 2. Input Fields & iOS Zoom Prevention
- **Font Size Minimum:** All `<input>`, `<select>`, and `<textarea>` elements must have a `font-size` of at least **16px** (or `text-base` / `text-sm sm:text-base` with 16px minimum on mobile) to prevent iOS Safari from automatically zooming in when focused.
- **Appropriate Input Types & Virtual Keyboards:**
  - Phone: `type="tel"` or `inputMode="tel"`
  - Numbers / Currency / Days: `inputMode="numeric"`
  - Email: `type="email"`
  - Search: `type="search"` with clear button
- **Auto-Capitalization & Autofill:** Use `autoComplete`, `autoCorrect="off"`, and `spellCheck="false"` where applicable to reduce mobile typing friction.

---

## 3. Thumb-Zone Architecture & Sticky CTAs
- **Natural Thumb Zone:** Place high-frequency actions (WhatsApp CTA, Search, Book/Inquire, Filter) in the lower 50% of the screen.
- **Bottom Navigation / Floating Action Bar:** For critical flows, provide a bottom-anchored or thumb-accessible CTA container.
- **Safe Area Insets:** Always support modern mobile notch/home indicators:
  - `padding-bottom: max(16px, env(safe-area-inset-bottom))`
  - `margin-bottom: env(safe-area-inset-bottom)`

---

## 4. Mobile Modal & Sheet Interactions
- **Bottom Sheets for Mobile:** Present modal dialogs as bottom sheets on `<768px` viewports (`rounded-t-3xl`, full width, bottom-0) for effortless one-handed thumb interaction.
- **Backdrop Dismiss:** Tapping outside the modal backdrop must immediately dismiss the sheet.
- **Body Scroll Lock:** Always prevent underlying document scrolling (`document.body.style.overflow = 'hidden'`) while modal is active, and restore on close.
- **Sticky Close Button:** Keep modal close buttons in a visible, easy-to-tap location with high contrast.

---

## 5. Horizontal Carousel & Scroll Snapping
- **Native Momentum:** Use `-webkit-overflow-scrolling: touch;` with CSS `scroll-snap-type: x mandatory;` and `scroll-snap-align: start / center;` for native-feeling horizontal browsing without JavaScript lag.
- **Visual Peek Affordance:** Ensure the edge of the next card is partially visible (e.g. 15–20% peek) so mobile users intuitively know horizontal scrolling is available.
- **No Scrollbar Clutter:** Use `.no-scrollbar` classes to hide scrollbars while maintaining full touch drag capability.

---

## 6. Viewport Adaptability
- Target viewports:
  - `360 × 800` (Budget Android)
  - `375 × 812` (iPhone SE / Standard)
  - `390 × 844` (Modern iPhone)
  - `430 × 932` (iPhone Pro Max / Large Android)
- **Zero Horizontal Overflow:** Enforce `max-w-full overflow-x-hidden` on main layouts to prevent accidental horizontal page drifting.
