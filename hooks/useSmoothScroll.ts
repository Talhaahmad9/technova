'use client';

import { animate } from 'framer-motion';
import { useCallback } from 'react';

export function useSmoothScroll() {
  const scrollTo = useCallback((href: string) => {
    if (!href.startsWith('#')) {
      window.location.href = href;
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    const navbarHeight = 64;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    animate(window.scrollY, targetTop, {
      duration: 1.6,                          // was 0.9 — noticeably slower
      ease: [0.76, 0, 0.24, 1],              // cubic ease-in-out — slow start, slow end
      onUpdate: (v) => window.scrollTo(0, v),
    });
  }, []);

  return scrollTo;
}
