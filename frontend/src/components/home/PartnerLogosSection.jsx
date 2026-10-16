import React from 'react';
import { GraduationCap } from 'lucide-react';
import { homeContent } from '../../data/content';
import Section from '../common/Section';

export default function PartnerLogosSection() {
  const { partners } = homeContent;
  
  // Create duplicated arrays for seamless infinite loop
  const row1 = [...partners.logos, ...partners.logos];
  const row2 = [...partners.logos.slice().reverse(), ...partners.logos.slice().reverse()];

  return (
    <Section
      id="partner-logos"
      background="white"
      align="center"
      eyebrow="GLOBAL INSTITUTIONAL ACCESS"
      title="Partner University & Academic Network"
      subtitle="Connecting our partner schools directly to selective international institutions, examination bodies, and accredited pathways."
      className="overflow-hidden"
    >
      {/* Infinite Scrolling Marquee Showcase */}
      <div className="relative w-full overflow-hidden py-3 marquee-container">
        {/* Left & Right Seamless Gradient Fade Masks (blending with sky background) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-background/90 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-background/90 to-transparent z-10" />

        {/* Row 1: Scrolling Left */}
        <div className="animate-marquee flex items-center mb-4">
          {row1.map((partner, idx) => (
            <div
              key={`row1-${idx}`}
              className="group w-60 sm:w-64 shrink-0 mx-2.5 sm:mx-3 p-4 sm:p-5 rounded-2xl bg-card/90 border border-border/80 hover:border-accent/60 card-hover-lift flex flex-col items-center justify-center text-center h-28 sm:h-32 transition-all shadow-soft cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-primary-soft text-primary group-hover:bg-accent/15 group-hover:text-accent-foreground flex items-center justify-center mb-2 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-1">
                {partner.name}
              </h3>
              <span className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                {partner.type}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Reverse Scrolling Right */}
        <div className="animate-marquee-reverse flex items-center">
          {row2.map((partner, idx) => (
            <div
              key={`row2-${idx}`}
              className="group w-60 sm:w-64 shrink-0 mx-2.5 sm:mx-3 p-4 sm:p-5 rounded-2xl bg-card/90 border border-border/80 hover:border-primary/50 card-hover-lift flex flex-col items-center justify-center text-center h-28 sm:h-32 transition-all shadow-soft cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-primary-soft text-primary group-hover:bg-primary/20 group-hover:text-primary flex items-center justify-center mb-2 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-1">
                {partner.name}
              </h3>
              <span className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                {partner.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center flex flex-col items-center justify-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-semibold text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span>Hover over any institution to pause stream</span>
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">
          Direct lines to admissions leadership · Transparent merit & scholarship consideration
        </p>
      </div>
    </Section>
  );
}
