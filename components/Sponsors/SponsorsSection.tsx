'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';
import { ParallaxBlob } from '@/components/ui/ParallaxBlob';
import { GlowButton } from '@/components/ui/GlowButton';
import type { SPONSORS } from '@/constants/site-data';

type SponsorsData = typeof SPONSORS;

interface SponsorsSectionProps {
  data: SponsorsData;
}

export function SponsorsSection({ data }: SponsorsSectionProps) {
  return (
    <SectionWrapper id="sponsors" className="relative py-28 overflow-hidden" direction="up">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--bg-surface)' }} />
      <div className="absolute inset-0 section-grid-bg opacity-20 pointer-events-none" />

      <ParallaxBlob
        speed={0.2}
        className="w-[600px] h-[300px] rounded-full top-1/2 left-1/2"
        style={{
          background: 'radial-gradient(ellipse, var(--accent-primary) 0%, transparent 70%)',
          opacity: 0.04,
          filter: 'blur(80px)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn className="flex flex-col items-center text-center gap-4 mb-16">
          <SectionEyebrow text={data.eyebrow} />
          <h2 className="font-bold text-4xl md:text-5xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {data.heading}
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-muted)' }}>
            {data.subheading}
          </p>
        </FadeIn>

        {/* Uniform grid — staggered entry */}
        <Stagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-20" baseDelay={0.05}>
          {data.sponsors.map((sponsor) => (
            <StaggerItem key={sponsor.id}>
              <motion.a
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={sponsor.name}
                className="card-glass rounded-xl flex items-center justify-center p-6 group aspect-[3/2] w-full"
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {sponsor.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    className="h-10 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                ) : (
                  <span
                    className="mono font-bold text-sm tracking-wide text-center leading-snug opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: 'var(--accent-glow)' }}
                  >
                    {sponsor.name}
                  </span>
                )}
              </motion.a>
            </StaggerItem>
          ))}
        </Stagger>

        {/* CTA */}
        <FadeIn delay={0.1}>
          <div className="gradient-border rounded-3xl overflow-hidden">
            <div className="rounded-3xl p-10 md:p-14 text-center flex flex-col items-center gap-6" style={{ background: 'var(--gradient-card)' }}>
              <h3 className="font-bold text-2xl md:text-3xl" style={{ color: 'var(--text-primary)' }}>
                {data.cta.heading}
              </h3>
              <p className="text-base max-w-xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {data.cta.body}
              </p>
              <GlowButton label={data.cta.buttonLabel} href={data.cta.buttonHref} size="lg" icon={<ArrowRight size={18} />} />
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
