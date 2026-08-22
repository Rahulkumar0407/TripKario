import * as React from 'react';

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

/**
 * Hydration-safe mobile viewport detection hook using React.useSyncExternalStore.
 * 
 * - SSR Snapshot: returns `false` deterministically on the server.
 * - Client Snapshot: evaluates `window.matchMedia('(max-width: 767px)').matches`.
 * - Subscription: listens to media query change events (0ms resize polling, zero unnecessary re-renders).
 */
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
