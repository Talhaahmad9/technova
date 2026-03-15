'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HERO_BG_IMAGES } from '@/constants/site-data';

const INTERVAL_MS = 6000;
const TRANSITION_DURATION = 1.8;

export function HeroBgSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_BG_IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* ── Photo layers ── */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 hero-bg-scale"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: TRANSITION_DURATION, ease: 'easeInOut' } }}
        >
          <Image
            src={HERO_BG_IMAGES[index].src}
            alt={HERO_BG_IMAGES[index].alt}
            fill
            className="object-cover"
            style={{ objectPosition: HERO_BG_IMAGES[index].mobilePosition }}
            priority={index === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Layer 1: Dark gradient ──
           Heavier at top and bottom on mobile (more content stacked vertically)
           Slightly lighter in middle on desktop (wider viewport, less overlap)
      ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.75) 0%,
            rgba(0,0,0,0.45) 30%,
            rgba(0,0,0,0.45) 60%,
            rgba(0,0,0,0.80) 100%
          )`,
        }}
      />

      {/* ── Layer 2: Frosted glass blur ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backdropFilter:       'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
        }}
      />

      {/* ── Layer 3: Theme color tint ── */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'var(--gradient-hero)', opacity: 0.55 }}
      />

      {/* ── Layer 4: Scanlines ── */}
      <div className="absolute inset-0 z-10 scanlines opacity-20 pointer-events-none" />

      {/* ── Dot indicators — moved up on mobile so they clear the scroll hint ── */}
      <div className="absolute bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_BG_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width:      i === index ? '24px' : '6px',
              height:     '6px',
              background: i === index ? 'var(--accent-glow)' : 'rgba(255,255,255,0.35)',
              boxShadow:  i === index ? 'var(--glow-card)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}
