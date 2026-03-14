import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { FadeIn } from '@/components/ui/FadeIn';
import { ParallaxBlob } from '@/components/ui/ParallaxBlob';
import { MemberGrid } from './MemberGrid';
import type { TEAM } from '@/constants/site-data';

type TeamData = typeof TEAM;

interface TeamSectionProps {
  data: TeamData;
}

export function TeamSection({ data }: TeamSectionProps) {
  return (
    <SectionWrapper id="team" className="relative py-28 overflow-hidden" direction="up">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--bg-surface)' }} />

      <ParallaxBlob
        speed={0.2}
        className="w-[500px] h-[500px] rounded-full bottom-0 left-0"
        style={{
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          opacity: 0.05,
          filter: 'blur(90px)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col items-center text-center gap-4 mb-16">
          <SectionEyebrow text={data.eyebrow} />
          <h2 className="font-bold text-4xl md:text-5xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {data.heading}
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-muted)' }}>
            {data.subheading}
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mb-16">
          <MemberGrid members={data.faculty} heading={data.facultyHeading} variant="faculty" />
        </FadeIn>

        <div className="w-full h-px mb-16" style={{ background: 'var(--border-color)' }} />

        <FadeIn delay={0.15}>
          <MemberGrid members={data.students} heading={data.studentsHeading} variant="student" />
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
