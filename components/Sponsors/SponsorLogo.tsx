'use client';

import { motion } from 'framer-motion';
import type { Sponsor } from '@/constants/site-data';

interface SponsorLogoProps {
  sponsor: Sponsor;
  size?: 'lg' | 'md' | 'sm';
}

export function SponsorLogo({ sponsor, size = 'md' }: SponsorLogoProps) {
  const sizeClass = size === 'lg' ? 'h-16' : size === 'md' ? 'h-10' : 'h-7';

  return (
    <motion.a
      href={sponsor.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="card-glass rounded-xl flex items-center justify-center p-5 group"
      whileHover={{ y: -3, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      title={sponsor.name}
    >
      {sponsor.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sponsor.logoUrl}
          alt={sponsor.name}
          className={`${sizeClass} object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      ) : (
        /* Placeholder — replaced when real logos arrive */
        <div
          className="mono font-bold text-sm tracking-wide opacity-50 group-hover:opacity-90 transition-opacity duration-300"
          style={{ color: 'var(--accent-glow)' }}
        >
          {sponsor.name}
        </div>
      )}
    </motion.a>
  );
}
