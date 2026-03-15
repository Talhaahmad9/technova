'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { FadeIn } from '@/components/ui/FadeIn';
import type { PRIZE_POOL } from '@/constants/site-data';

type PrizePoolData = typeof PRIZE_POOL;

// ── Rolling number counter ─────────────────────────────────────────────────

function RollingCounter({ target }: { target: number }) {
  const ref        = useRef<HTMLSpanElement>(null);
  const isInView   = useInView(ref, { once: true, margin: '-60px' });
  const motionVal  = useMotionValue(0);
  const rounded    = useTransform(motionVal, (v) => Math.floor(v).toLocaleString('en-US'));

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(motionVal, target, {
      duration: 2.5,
      ease:     [0.16, 1, 0.3, 1], // expo-out — fast early, slow landing
    });
    return ctrl.stop;
  }, [isInView, motionVal, target]);

  // Subscribe to rounded and update DOM directly for perf
  useEffect(() => {
    return rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = v;
    });
  }, [rounded]);

  return (
    <span
      ref={ref}
      className="mono font-bold tabular-nums"
      style={{
        fontSize:             'clamp(2rem, 7vw, 4.5rem)',
        lineHeight:           1,
        background:           'var(--gradient-accent)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor:  'transparent',
        backgroundClip:       'text',
        filter:               'drop-shadow(0 0 24px var(--accent-glow))',
      }}
    >
      0
    </span>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

export function PrizePoolSection({ data }: { data: PrizePoolData }) {
  // Parse numeric target from amount string e.g. "300000"
  const numericTarget = parseInt((data.amount as string).replace(/\D/g, ''), 10) || 300000;

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

        {/* Trophy + content side by side */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

          {/* Trophy */}
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

          {/* Text */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <FadeIn><SectionEyebrow text={data.eyebrow} /></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-bold text-2xl md:text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {data.heading}
              </h2>
            </FadeIn>

            {/* Rs. + rolling number on one line */}
            <FadeIn delay={0.15}>
              <div className="flex items-baseline gap-2">
                <span
                  className="mono font-semibold"
                  style={{
                    fontSize: 'clamp(1rem, 3vw, 1.8rem)',
                    color:    'var(--accent-primary)',
                    lineHeight: 1,
                  }}
                >
                  Rs.
                </span>
                <RollingCounter target={numericTarget} />
                <span
                  className="mono font-bold"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                    color:    'var(--accent-glow)',
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {data.subtext}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Highlight pills */}
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
