import { Navbar }              from '@/components/Layout/Navbar';
import { Footer }              from '@/components/Layout/Footer';
import { HeroSection }         from '@/components/Hero/HeroSection';
import { AboutSection }        from '@/components/About/AboutSection';
import { PrizePoolSection }    from '@/components/PrizePool/PrizePoolSection';
import { GallerySection }      from '@/components/Gallery/GallerySection';
import { CompetitionsSection } from '@/components/Competitions/CompetitionsSection';
import { SponsorsSection }     from '@/components/Sponsors/SponsorsSection';
import { TeamSection }         from '@/components/Team/TeamSection';
import { LocationSection }     from '@/components/Location/LocationSection';

import {
  HERO, ABOUT, PRIZE_POOL, GALLERY, COMPETITIONS,
  SPONSORS, TEAM, LOCATION, FOOTER,
  NAV_LINKS, NAV_CTA, META, THEMES, DEFAULT_THEME,
} from '@/constants/site-data';

export default function Home() {
  return (
    <>
      <Navbar
        links={NAV_LINKS}
        cta={NAV_CTA}
        siteName={META.siteName}
        logoPath={META.logoPath}
        themes={THEMES}
        defaultTheme={DEFAULT_THEME}
      />
      <main>
        <HeroSection         data={HERO} />
        <AboutSection        data={ABOUT} />
        <PrizePoolSection    data={PRIZE_POOL} />
        <GallerySection      data={GALLERY} />
        <CompetitionsSection data={COMPETITIONS} />
        <SponsorsSection     data={SPONSORS} />
        <TeamSection         data={TEAM} />
        <LocationSection     data={LOCATION} />
      </main>
      <Footer data={FOOTER} siteName={META.siteName} />
    </>
  );
}
