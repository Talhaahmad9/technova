'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { FadeIn } from '@/components/ui/FadeIn';
import type { PRIZE_POOL } from '@/constants/site-data';

type PrizePoolData = typeof PRIZE_POOL;

function AnimatedAmount({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Split "Rs. 3,00,000+" into currency label + number
  // so we can size them differently on one line
  const parts = value.match(/^(Rs\.)\s*(.+)$/) ?? [value, '', value];
  const currency = parts[1]; // "Rs."
  const amount   = parts[2]; // "3,00,000+"

  return (
    <motion.div
      ref={ref}
      className="flex items-baseline gap-2 flex-wrap justify-center md:justify-start"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
    >
      {/* "Rs." — smaller, muted */}
      <span
        className="mono font-semibold"
        style={{
          fontSize: 'clamp(1rem, 3vw, 1.8rem)',
          color: 'var(--accent-primary)',
          lineHeight: 1,
        }}
      >
        {currency}
      </span>
      {/* Amount — big gradient number */}
      <span
        className="mono font-bold"
        style={{
          fontSize: 'clamp(2rem, 7vw, 4.5rem)',
          lineHeight: 1,
          background: 'var(--gradient-accent)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 24px var(--accent-glow))',
          whiteSpace: 'nowrap',
        }}
      >
        {amount}
      </span>
    </motion.div>
  );
}

export function PrizePoolSection({ data }: { data: PrizePoolData }) {
  return (
    <SectionWrapper id="prize-pool" className="relative py-16 overflow-hidden" direction="up">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--bg-surface)' }} />
      <div className="absolute inset-0 section-grid-bg opacity-25 pointer-events-none" />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, var(--accent-primary) 0%, transparent 70%)',
          opacity: 0.07,
          filter: 'blur(70px)',
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Single row: trophy + content side by side on md+, stacked on mobile */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

          {/* Left — trophy */}
          <FadeIn direction="right" className="flex-shrink-0">
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center"
              style={{ background: 'var(--gradient-accent)', boxShadow: 'var(--glow-primary)' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Trophy size={32} className="text-white" />
            </motion.div>
          </FadeIn>

          {/* Right — text content */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <FadeIn>
              <SectionEyebrow text={data.eyebrow} />
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-bold text-2xl md:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {data.heading}
              </h2>
            </FadeIn>
            <AnimatedAmount value={data.amount} />
            <FadeIn delay={0.25}>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {data.subtext}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Highlight pills — compact row below */}
        <FadeIn delay={0.3} className="mt-8">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            {data.highlight.map((h, i) => (
              <motion.div
                key={h.label}
                className="card-glass rounded-xl px-5 py-3 text-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -3, scale: 1.03 }}
              >
                <div className="mono font-bold text-lg sm:text-xl" style={{ color: 'var(--accent-glow)' }}>
                  {h.value}
                </div>
                <div className="text-xs uppercase tracking-wider mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {h.label}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
