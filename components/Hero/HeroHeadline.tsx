'use client';

import { motion } from 'framer-motion';

interface HeroHeadlineProps {
  eyebrow: string;
  badge: string;
  subheadline: string;
  body: string;
}

export function HeroHeadline({ eyebrow, badge, subheadline, body }: HeroHeadlineProps) {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      {/* Eyebrow + badge */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span
          className="mono text-xs uppercase tracking-[0.25em] font-semibold"
          style={{ color: 'var(--text-muted)' }}
        >
          {eyebrow}
        </span>
        <span
          className="mono text-xs font-semibold px-2.5 py-1 rounded-full border"
          style={{
            color: 'var(--accent-glow)',
            borderColor: 'var(--border-color)',
            background: 'rgba(64,101,240,0.1)',
          }}
        >
          {badge}
        </span>
      </motion.div>

      {/* Main title — logo image replaces text, but we keep a fallback heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1
          className="font-bold leading-none tracking-tight"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            color: 'var(--text-primary)',
          }}
        >
          <span className="text-gradient glow-text">TECH</span>
          <span style={{ color: 'var(--text-primary)' }}>NOVA</span>
          <span
            className="mono ml-3"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              color: 'var(--accent-secondary)',
              verticalAlign: 'super',
            }}
          >
            &apos;26
          </span>
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="mono text-lg md:text-xl font-medium tracking-[0.15em] uppercase"
        style={{ color: 'var(--accent-primary)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {subheadline}
      </motion.p>

      {/* Body */}
      <motion.p
        className="text-base md:text-lg max-w-2xl leading-relaxed"
        style={{ color: 'var(--text-muted)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
      >
        {body}
      </motion.p>
    </div>
  );
}
