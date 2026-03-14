'use client';

import { Zap, Users, Trophy, Globe } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';
import { ParallaxBlob } from '@/components/ui/ParallaxBlob';
import { StatCard } from './StatCard';
import type { ABOUT } from '@/constants/site-data';

type AboutData = typeof ABOUT;

interface AboutSectionProps {
  data: AboutData;
}

const iconMap: Record<string, React.ElementType> = { Zap, Users, Trophy, Globe };

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <SectionWrapper id="about" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 section-grid-bg opacity-40 pointer-events-none" />

      {/* Parallax decorative blob */}
      <ParallaxBlob
        speed={0.3}
        className="w-[500px] h-[500px] rounded-full -top-32 -right-32"
        style={{
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          opacity: 0.05,
          filter: 'blur(80px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — fades in from below */}
        <FadeIn className="flex flex-col items-center text-center gap-4 mb-16">
          <SectionEyebrow text={data.eyebrow} />
          <h2 className="font-bold text-4xl md:text-5xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {data.heading}
          </h2>
        </FadeIn>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Body paragraphs — stagger left */}
          <Stagger className="flex flex-col gap-5" baseDelay={0.1}>
            {data.body.map((paragraph, i) => (
              <StaggerItem key={i} direction="left">
                <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {paragraph}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Highlight cards — stagger up with delay */}
          <Stagger className="grid grid-cols-2 gap-4" baseDelay={0.2}>
            {data.highlights.map((h, i) => {
              const Icon = iconMap[h.icon];
              return (
                <StaggerItem key={i}>
                  <div className="card-glass rounded-2xl p-5 flex flex-col gap-3 h-full">
                    {Icon && (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: 'var(--gradient-accent-2)' }}
                      >
                        <Icon size={20} className="text-white" />
                      </div>
                    )}
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {h.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {h.body}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* Stats — stagger with counter animation already inside StatCard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.stats.map((stat, i) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
