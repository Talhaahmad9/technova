import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { FadeIn } from '@/components/ui/FadeIn';
import { ParallaxBlob } from '@/components/ui/ParallaxBlob';
import { CategoryTabs } from './CategoryTabs';
import type { COMPETITIONS } from '@/constants/site-data';

type CompetitionsData = typeof COMPETITIONS;

interface CompetitionsSectionProps {
  data: CompetitionsData;
}

export function CompetitionsSection({ data }: CompetitionsSectionProps) {
  return (
    <SectionWrapper id="competitions" className="relative py-28 overflow-hidden" direction="up">
      <div className="absolute inset-0 section-grid-bg opacity-30 pointer-events-none" />

      <ParallaxBlob
        speed={0.25}
        className="w-[600px] h-[600px] rounded-full top-0 right-0"
        style={{
          background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 65%)',
          opacity: 0.06,
          filter: 'blur(80px)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col items-center text-center gap-4 mb-16">
          <SectionEyebrow text={data.eyebrow} />
          <h2 className="font-bold text-4xl md:text-5xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {data.heading}
          </h2>
          <p className="text-base md:text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>
            {data.subheading}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <CategoryTabs categories={data.categories} />
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
