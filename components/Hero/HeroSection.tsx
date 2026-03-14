'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { HeroHeadline } from './HeroHeadline';
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-grid-bg"
    >
      {/* Hero radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-hero)' }}
      />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          opacity: 0.08,
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.2, 1], x: [-20, 20, -20], y: [-10, 10, -10] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
          opacity: 0.1,
          filter: 'blur(50px)',
        }}
        animate={{ scale: [1.1, 0.9, 1.1], x: [15, -15, 15], y: [10, -10, 10] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center gap-12">

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-24 h-24 md:w-32 md:h-32"
          style={{ filter: 'drop-shadow(0 0 30px var(--accent-glow))' }}
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

        {/* Headline */}
        <HeroHeadline
          eyebrow={data.eyebrow}
          badge={data.badge}
          subheadline={data.subheadline}
          body={data.body}
        />

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <GlowButton
            label={data.ctaPrimary.label}
            href={data.ctaPrimary.href}
            size="lg"
            icon={<ArrowRight size={18} />}
          />
          <GlowButton
            label={data.ctaSecondary.label}
            href={data.ctaSecondary.href}
            size="lg"
            variant="outline"
          />
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <CountdownTimer
            target={data.countdownTarget as string}
            label={data.countdownLabel}
          />
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          {data.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="card-glass rounded-xl p-4 text-center"
              whileHover={{ y: -4, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.08 }}
            >
              <div
                className="mono font-bold text-2xl md:text-3xl"
                style={{ color: 'var(--accent-glow)' }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs mt-1 uppercase tracking-wider"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span
          className="mono text-xs uppercase tracking-widest"
          style={{ color: 'var(--text-subtle)' }}
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
