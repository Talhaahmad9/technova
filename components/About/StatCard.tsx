'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

export function StatCard({ value, label, delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState('0');

  // If value is purely numeric, animate it
  useEffect(() => {
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');
    if (!isInView || isNaN(numeric)) {
      setDisplayed(value);
      return;
    }
    let start = 0;
    const duration = 1200;
    const step = 16;
    const steps = duration / step;
    const increment = numeric / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numeric) {
        setDisplayed(value);
        clearInterval(timer);
      } else {
        setDisplayed(
          Number.isInteger(numeric)
            ? `${Math.floor(current)}${suffix}`
            : `${current.toFixed(1)}${suffix}`
        );
      }
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="card-glass rounded-2xl p-6 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, scale: 1.03 }}
    >
      <div
        className="mono font-bold text-3xl md:text-4xl"
        style={{ color: 'var(--accent-glow)' }}
      >
        {displayed}
      </div>
      <div
        className="text-sm mt-2 uppercase tracking-wider"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </div>
    </motion.div>
  );
}
