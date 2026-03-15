'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { HeroHeadline } from './HeroHeadline';
import { HeroBgSlideshow } from './HeroBgSlideshow';
import { CountdownTimer } from './CountdownTimer';
import { GlowButton } from '@/components/ui/GlowButton';
import type { HERO } from '@/constants/site-data';

type HeroData = typeof HERO;

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <HeroBgSlideshow />

      {/* Ambient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          opacity: 0.12,
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.2, 1], x: [-20, 20, -20], y: [-10, 10, -10] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-56 sm:w-80 h-56 sm:h-80 rounded-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
          opacity: 0.1,
          filter: 'blur(50px)',
        }}
        animate={{ scale: [1.1, 0.9, 1.1], x: [15, -15, 15], y: [10, -10, 10] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Main content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32 flex flex-col items-center gap-8 sm:gap-10">

        {/* Org logos → PRESENTS → TECHNOVA */}
        <HeroHeadline
          presentsText={data.presentsText as string}
          subheadline={data.subheadline}
          body={data.body}
        />

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
        >
          <GlowButton
            label={data.ctaPrimary.label}
            href={data.ctaPrimary.href}
            size="lg"
            icon={<ArrowRight size={18} />}
            className="w-full sm:w-auto justify-center"
          />
          <GlowButton
            label={data.ctaSecondary.label}
            href={data.ctaSecondary.href}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto justify-center"
          />
        </motion.div>

        {/* Countdown only — stats moved to About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="w-full flex justify-center"
        >
          <CountdownTimer
            target={data.countdownTarget as string}
            label={data.countdownLabel}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-16 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="mono text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--accent-primary)' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
