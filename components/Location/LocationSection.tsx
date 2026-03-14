import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { FadeIn } from '@/components/ui/FadeIn';
import { ParallaxBlob } from '@/components/ui/ParallaxBlob';
import { VenueDetails } from './VenueDetails';
import { RegisterCTA } from './RegisterCTA';
import type { LOCATION } from '@/constants/site-data';

type LocationData = typeof LOCATION;

interface LocationSectionProps {
  data: LocationData;
}

export function LocationSection({ data }: LocationSectionProps) {
  return (
    <SectionWrapper id="location" className="relative py-28 overflow-hidden" direction="up">
      <div className="absolute inset-0 section-grid-bg opacity-30 pointer-events-none" />

      <ParallaxBlob
        speed={0.3}
        className="w-[500px] h-[500px] rounded-full top-0 right-0"
        style={{
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          opacity: 0.06,
          filter: 'blur(80px)',
          transform: 'translate(20%, -20%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col items-center text-center gap-4 mb-16">
          <SectionEyebrow text={data.eyebrow} />
          <h2 className="font-bold text-4xl md:text-5xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {data.heading}
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <FadeIn direction="left" delay={0.1} className="flex flex-col gap-6">
            <div className="card-glass rounded-2xl overflow-hidden" style={{ height: '280px' }}>
              <iframe
                src={data.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TechNova venue map"
              />
            </div>
            <VenueDetails details={data.details} venue={data.venue} address={data.address} />
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <RegisterCTA cta={data.cta} />
          </FadeIn>
        </div>
      </div>
    </SectionWrapper>
  );
}
