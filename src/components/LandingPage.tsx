import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { CustomCursor } from './CustomCursor';
import { Navbar } from './Navbar';
import { CinematicHero } from './CinematicHero';
import { BirdManagementSection } from './BirdManagementSection';
import { BreedingSection } from './BreedingSection';
import { HealthSection } from './HealthSection';
import { LensSection } from './LensSection';
import { KnowledgeSection } from './KnowledgeSection';
import { AISection } from './AISection';
import { CommunitySection } from './CommunitySection';
import { PremiumSection } from './PremiumSection';
import { FinalCTA } from './FinalCTA';
import { Footer } from './Footer';

export function LandingPage() {
  useSmoothScroll(); // Initialize Lenis smooth scrolling for the landing page

  return (
    <main className="flocka-app" style={{ backgroundColor: 'var(--bg-ivory)' }}>
      <CustomCursor />
      <Navbar />
      <div id="home">
        <CinematicHero />
      </div>
      <div id="features">
        <BirdManagementSection />
        <BreedingSection />
        <HealthSection />
        <LensSection />
      </div>
      <div id="knowledge">
        <KnowledgeSection />
        <AISection />
      </div>
      <div id="community">
        <CommunitySection />
      </div>
      <div id="premium">
        <PremiumSection />
      </div>
      <div id="about">
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
