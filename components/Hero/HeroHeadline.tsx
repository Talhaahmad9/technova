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
    <div className="flex flex-col items-center text-center gap-5 px-4">

      {/* Eyebrow + badge — stacked on mobile, inline on sm+ */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span
          className="mono text-xs uppercase tracking-[0.2em] font-semibold"
          style={{ color: 'var(--text-muted)' }}
        >
          {eyebrow}
        </span>

        {/* Badge — whitespace-nowrap prevents any wrapping */}
        <span
          className="mono text-xs font-semibold px-3 py-1 rounded-full border whitespace-nowrap flex-shrink-0"
          style={{
            color:      'var(--accent-glow)',
            borderColor:'var(--border-color)',
            background: 'rgba(64,101,240,0.15)',
          }}
        >
          {badge}
        </span>
      </motion.div>

      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1
          className="font-bold leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.8rem, 9vw, 8rem)' }}
        >
          <span className="text-gradient glow-text">TECH</span>
          <span style={{ color: 'var(--text-primary)' }}>NOVA</span>
          <span
            className="mono"
            style={{
              fontSize:      'clamp(1.1rem, 3vw, 3rem)',
              color:         'var(--accent-secondary)',
              verticalAlign: 'super',
              marginLeft:    '0.2em',
            }}
          >
            &apos;26
          </span>
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="mono text-sm sm:text-base md:text-xl font-medium tracking-[0.12em] uppercase"
        style={{ color: 'var(--accent-primary)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {subheadline}
      </motion.p>

      {/* Body */}
      <motion.p
        className="text-sm sm:text-base md:text-lg max-w-xl leading-relaxed"
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
