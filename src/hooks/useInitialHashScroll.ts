import { useEffect } from 'react';

export default function useInitialHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    if (!id) return;

    let cancelled = false;
    // The lazy page must render and web fonts must settle before positioning
    // its anchor; otherwise a font swap can move the target behind the header.
    const frame = requestAnimationFrame(() => {
      void document.fonts.ready.then(() => {
        if (!cancelled && window.location.hash === hash) {
          document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
        }
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);
}
