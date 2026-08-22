# TripKario — Hydration-Safe Responsive Detection Architecture

## 1. Executive Summary
TripKario adopts a canonical, hydration-safe responsive detection pattern built on `React.useSyncExternalStore` and native `window.matchMedia` events.

This replaces ad-hoc `window.innerWidth`, `resize` event loops, and `useEffect + useState` viewport polling patterns with a unified, zero-churn subscription model.

---

## 2. Canonical Hook Implementation

File: `src/hooks/use-mobile.ts`

```ts
import * as React from 'react';

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

export function useIsMobile(): boolean {
  const subscribe = React.useCallback((onStoreChange: () => void) => {
    const mq = window.matchMedia(QUERY);
    mq.addEventListener('change', onStoreChange);
    return () => {
      mq.removeEventListener('change', onStoreChange);
    };
  }, []);

  const getSnapshot = React.useCallback(() => {
    return window.matchMedia(QUERY).matches;
  }, []);

  const getServerSnapshot = React.useCallback(() => false, []);

  return React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}

export { useIsMobile as useMobile };
```

---

## 3. Core Architectural Principles

### A. SSR & Hydration Determinism
- **Server Snapshot**: Always returns `false`. During SSR and the initial hydration tick, the server snapshot is deterministic and identical between server and client.
- **Client Snapshot**: Evaluates `window.matchMedia('(max-width: 767px)').matches` synchronously via `useSyncExternalStore`.
- **Zero Hydration Mismatches**: Radix UI trees (`Dialog`, `Sheet`, `DropdownMenu`) maintain stable element order and IDs without subtree swapping during initial hydration.

### B. Breakpoint Subscription (No Resize Churn)
- Unlike `window.addEventListener('resize')` which fires on every pixel dragged, `matchMedia.addEventListener('change')` **only fires when crossing the 768px threshold** (or on device orientation rotation between portrait and landscape).
- Zero re-renders during continuous scrolling or browser window resizes.

### C. Separation of Concerns: CSS vs JavaScript
| Responsibility | Primary Mechanism | Usage |
| :--- | :--- | :--- |
| **Visual Layout & Spacing** | **CSS Media Queries** (`md:`, `lg:`, `sm:`) | Padding, margins, font sizes, flex/grid directions, responsive visibility (`hidden lg:block`). |
| **Interaction & Behavioral Logic** | **`useIsMobile()` Hook** | Switching interaction models (e.g. mobile bottom sheet vs desktop modal, touch gesture handlers, preloader skipping). |
| **Touch / Pointer Hardware** | **CSS `@media (hover: hover) and (pointer: fine)`** | Parallax effects, magnetic button physics, hover states (prevents mobile touch lockup). |

---

## 4. Breakpoint Spectrum

- **Mobile Viewports (`< 768px`)**:
  - `useIsMobile() === true`
  - Single-column card layouts, native touch scroll rails, bottom sheets, full-height touch readers.
- **Tablet Viewports (`768px – 1023px`)**:
  - `useIsMobile() === false`
  - 2-column grids, balanced touch/cursor spacing.
- **Desktop Viewports (`≥ 1024px`)**:
  - `useIsMobile() === false`
  - Cinematic editorial art direction, magnetic button physics, pointer refraction.
