'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ElementType } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
  once?: boolean;
  as?: ElementType;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 24,
  className = '',
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  const initial = {
    opacity: 0,
    ...(direction === 'up'    && { y:  distance }),
    ...(direction === 'down'  && { y: -distance }),
    ...(direction === 'left'  && { x:  distance }),
    ...(direction === 'right' && { x: -distance }),
  };

  const animate = isInView ? { opacity: 1, x: 0, y: 0 } : initial;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  );
}

// ── Stagger container ─────────────────────────────────────────────────────────

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
}

export function Stagger({
  children,
  className = '',
  staggerDelay = 0.1,
  baseDelay = 0,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden:  {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: baseDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ── StaggerItem — direct child of <Stagger> ───────────────────────────────────

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
  distance?: number;
}

export function StaggerItem({
  children,
  className = '',
  direction = 'up',
  distance = 24,
}: StaggerItemProps) {
  const hidden = {
    opacity: 0,
    ...(direction === 'up'    && { y:  distance }),
    ...(direction === 'left'  && { x:  distance }),
    ...(direction === 'right' && { x: -distance }),
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden,
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
