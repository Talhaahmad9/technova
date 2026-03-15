'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PRESENTER_LOGOS } from '@/constants/site-data';

interface HeroHeadlineProps {
  presentsText: string;
  subheadline: string;
  body: string;
}

export function HeroHeadline({ presentsText, subheadline, body }: HeroHeadlineProps) {
  return (
    <div className="flex flex-col items-center text-center gap-5 px-4 w-full">

      {/* ── Org logos → PRESENTS row ── */}
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Three org logos — no wrapper circle, images are already circular */}
        <div className="flex items-center justify-center gap-6 sm:gap-10">
          {PRESENTER_LOGOS.map((logo, i) => (
            <motion.div
              key={logo.src}
              className="relative flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
              style={{
                width:  'clamp(64px, 14vw, 100px)',
                height: 'clamp(64px, 14vw, 100px)',
              }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain drop-shadow-lg"
              />
            </motion.div>
          ))}
        </div>

        {/* PRESENTS text */}
        <motion.span
          className="mono font-semibold uppercase tracking-[0.35em] text-xs sm:text-sm"
          style={{ color: 'rgba(255,255,255,0.65)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {presentsText}
        </motion.span>
      </motion.div>

      {/* ── TECHNOVA headline ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1
          className="font-bold leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 9rem)' }}
        >
          <span className="text-gradient glow-text">TECH</span>
          <span style={{ color: 'var(--text-primary)' }}>NOVA</span>
        </h1>
      </motion.div>

      {/* ── Tagline ── */}
      <motion.p
        className="mono text-sm sm:text-base md:text-xl font-medium tracking-[0.12em] uppercase"
        style={{ color: 'var(--accent-primary)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {subheadline}
      </motion.p>

      {/* ── Body ── */}
      <motion.p
        className="text-sm sm:text-base md:text-lg max-w-xl leading-relaxed"
        style={{ color: 'var(--text-muted)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.95 }}
      >
        {body}
      </motion.p>
    </div>
  );
}
