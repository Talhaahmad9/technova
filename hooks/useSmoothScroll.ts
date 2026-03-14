'use client';

/**
 * useSmoothScroll
 * Returns a click handler that smoothly scrolls to a CSS selector target.
 * Uses Framer Motion's animate() for physics-based easing instead of
 * native scroll-behavior, which gives consistent cross-browser feel.
 */
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

    const navbarHeight = 64; // matches h-16 navbar
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    animate(window.scrollY, targetTop, {
      duration: 0.9,
      ease: [0.32, 0.72, 0, 1], // expo-out — fast start, graceful stop
      onUpdate: (v) => window.scrollTo(0, v),
    });
  }, []);

  return scrollTo;
}
