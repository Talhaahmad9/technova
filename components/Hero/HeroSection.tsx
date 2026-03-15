'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
      {/* ── Background slideshow — sits behind everything ── */}
      <HeroBgSlideshow />

      {/* ── Animated ambient orbs — sit above photo, below content ── */}
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

      {/* ── Main content ── */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32 flex flex-col items-center gap-8 sm:gap-10">

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-20 h-20 sm:w-28 sm:h-28"
          style={{ filter: 'drop-shadow(0 0 24px var(--accent-glow))' }}
        >
          <Image
            src="/technova-logo.png"
            alt="TechNova logo"
            fill
            className="object-contain"
            priority
            style={{ mixBlendMode: 'screen' }}
          />
        </motion.div>

        {/* Headline + badge + body */}
        <HeroHeadline
          eyebrow={data.eyebrow}
          badge={data.badge}
          subheadline={data.subheadline}
          body={data.body}
        />

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
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

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="w-full flex justify-center"
        >
          <CountdownTimer
            target={data.countdownTarget as string}
            label={data.countdownLabel}
          />
        </motion.div>

        {/* Stats grid — 2 cols on mobile, 4 on md+ */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          {data.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="card-glass rounded-xl p-3 sm:p-4 text-center"
              whileHover={{ y: -4, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.08 }}
            >
              <div
                className="mono font-bold text-xl sm:text-2xl md:text-3xl"
                style={{ color: 'var(--accent-glow)' }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs mt-1 uppercase tracking-wider leading-tight"
                style={{ color: 'var(--text-muted)' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-16 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span
          className="mono text-xs uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
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
