import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import HeroSection from '../components/home/HeroSection';
import BeyondRecruitmentSection from '../components/home/BeyondRecruitmentSection';
import PartnerLogosSection from '../components/home/PartnerLogosSection';
import CourseDirectorySection from '../components/home/CourseDirectorySection';
import InstitutionalClaritySection from '../components/home/InstitutionalClaritySection';
import ElitePositioningSection from '../components/home/ElitePositioningSection';
import DestinationsGridSection from '../components/home/DestinationsGridSection';
import VisionSection from '../components/home/VisionSection';
import FoundersLetterSection from '../components/home/FoundersLetterSection';
import InstitutionalPartnershipSection from '../components/home/InstitutionalPartnershipSection';
import GlobalPathwaysSection from '../components/home/GlobalPathwaysSection';
import MobilityGlanceSection from '../components/home/MobilityGlanceSection';
import GovernanceSection from '../components/home/GovernanceSection';
import FinalCtaSection from '../components/home/FinalCtaSection';

export default function HomePage() {
  useDocumentTitle('B2B Institutional Platform for African Schools');

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. BEYOND TRADITIONAL RECRUITMENT */}
      <BeyondRecruitmentSection />

      {/* 3. PARTNER LOGOS */}
      <PartnerLogosSection />

      {/* 4. COURSE DIRECTORY – Find Your Program */}
      <CourseDirectorySection />

      {/* 5. INSTITUTIONAL CLARITY */}
      <InstitutionalClaritySection />

      {/* 6. ELITE POSITIONING */}
      <ElitePositioningSection />

      {/* 7. DESTINATIONS GRID */}
      <DestinationsGridSection />

      {/* 8. OUR VISION */}
      <VisionSection />

      {/* 9. FOUNDER'S LETTER */}
      <FoundersLetterSection />

      {/* 10. INSTITUTIONAL PARTNERSHIP (Includes Pre-screening Form) */}
      <InstitutionalPartnershipSection />

      {/* 11. GLOBAL ACADEMIC PATHWAYS */}
      <GlobalPathwaysSection />

      {/* 12. MOBILITY AT A GLANCE */}
      <MobilityGlanceSection />

      {/* 13. INFRASTRUCTURE & GOVERNANCE */}
      <GovernanceSection />

      {/* 14. FINAL CTA BANNER */}
      <FinalCtaSection />
    </div>
  );
}
