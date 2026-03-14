'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import type { LOCATION } from '@/constants/site-data';

type CtaData = typeof LOCATION.cta;

interface RegisterCTAProps {
  cta: CtaData;
}

export function RegisterCTA({ cta }: RegisterCTAProps) {
  return (
    <motion.div
      className="gradient-border rounded-3xl overflow-hidden h-full"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="rounded-3xl p-8 md:p-10 flex flex-col gap-6 h-full"
        style={{ background: 'var(--gradient-card)' }}
      >
        {/* Pulsing accent dot */}
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: 'var(--accent-glow)' }}
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span
            className="mono text-xs uppercase tracking-widest font-semibold"
            style={{ color: 'var(--accent-primary)' }}
          >
            Registrations Open
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h3
            className="font-bold text-2xl md:text-3xl leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {cta.heading}
          </h3>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {cta.body}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <GlowButton
            label={cta.buttonLabel}
            href={cta.buttonHref}
            size="lg"
            icon={<ArrowRight size={18} />}
            className="w-full justify-center"
          />
          <p
            className="mono text-xs text-center"
            style={{ color: 'var(--text-subtle)' }}
          >
            {cta.note}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
