import React from 'react';
import { ShieldCheck, Award, Database, Compass, ArrowRight, Building2, Globe, Users } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { siteConfig, aboutContent, homeContent } from '../data/content';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import FoundersLetterSection from '../components/home/FoundersLetterSection';
import GovernanceSection from '../components/home/GovernanceSection';

const iconMap = {
  Award: Award,
  Database: Database,
  Compass: Compass,
};

export default function AboutUsPage() {
  useDocumentTitle('About Us | Institutional Governance & Mission');
  const { mobilityGlance } = homeContent;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION (New Light Theme with Rotating Celestial SVGs) */}
      <section className="relative gradient-hero text-foreground pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-border">
        {/* Ambient Pulsing Glow */}
        <div 
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] h-[350px] sm:h-[450px] bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
          aria-hidden="true"
        />

        {/* Dynamic Animated Orbital Network SVG */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.14] flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <svg 
            className="w-[1100px] h-[1100px] text-primary max-w-none" 
            viewBox="0 0 1000 1000" 
            fill="none" 
            stroke="currentColor"
          >
            <g className="animate-spin-slow">
              <circle cx="500" cy="500" r="450" strokeWidth="1" strokeDasharray="8 8" />
              <ellipse cx="500" cy="500" rx="450" ry="180" strokeWidth="1.2" transform="rotate(-25 500 500)" />
              <circle cx="950" cy="500" r="6" fill="currentColor" opacity="0.6" />
            </g>
            <g className="animate-spin-reverse-slow">
              <circle cx="500" cy="500" r="350" strokeWidth="1.5" />
              <circle cx="500" cy="500" r="250" strokeWidth="1" strokeDasharray="6 6" />
              <ellipse cx="500" cy="500" rx="420" ry="160" strokeWidth="1.2" transform="rotate(45 500 500)" />
            </g>
            <circle cx="500" cy="500" r="160" strokeWidth="1.5" />
            <circle cx="500" cy="500" r="6" fill="currentColor" opacity="0.3" className="animate-ping" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow Badge */}
          <div className="animate-hero-1 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-background/95 border border-border text-primary text-xs font-bold tracking-wide shadow-soft mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <Building2 className="w-4 h-4 text-primary" />
            <span>{aboutContent.hero.eyebrow}</span>
          </div>

          {/* H1 */}
          <h1 className="animate-hero-2 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-extrabold tracking-tight text-foreground leading-[1.12] mb-4 max-w-4xl">
            The Architecture Behind Africa's{' '}
            <span className="text-primary font-extrabold">Global Scholars</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-hero-3 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8 font-normal">
            {aboutContent.hero.lead}
          </p>

          {/* Action CTAs */}
          <div className="animate-hero-4 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-10">
            <Button
              to="/book-a-demo"
              variant="accent"
              size="lg"
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              Request Executive Briefing
            </Button>
            <Button
              to="/university-partnerships"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Partner Universities
            </Button>
          </div>

          {/* Metric Highlights Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-4xl animate-hero-4">
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-primary/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">100%</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">School Autonomy</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-crimson/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-crimson">24+</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Global Destinations</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-accent/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-accent">5</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Continents Covered</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-primary/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">96,000+</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Indexed Degrees</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY INSTITUTIONAL PILLARS */}
      <Section
        id="about-pillars"
        background="light"
        align="center"
        eyebrow="CORE GOVERNANCE PRINCIPLES"
        title="Engineered for Institutional Trust"
        subtitle="Our operational standard rests upon three uncompromised institutional pillars designed exclusively for leadership teams."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left max-w-6xl mx-auto">
          {aboutContent.pillars.map((pillar, idx) => {
            const IconComponent = iconMap[pillar.icon] || ShieldCheck;
            return (
              <Card
                key={idx}
                variant="light"
                hoverEffect={true}
                className="p-7 sm:p-8 border border-border hover:border-primary/40 rounded-3xl flex flex-col justify-between group card-hover-lift shadow-card transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-soft text-primary border border-primary/20 flex items-center justify-center mb-6 shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-border text-xs font-bold uppercase tracking-wider text-accent flex items-center justify-between">
                  <span>Standard 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-70 group-hover:scale-150 transition-transform"></span>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* 3. MEASURABLE IMPACT STATS (Light Sky Gradient) */}
      <Section
        id="about-stats"
        background="gradient-sky"
        align="center"
        eyebrow="MEASURABLE IMPACT"
        title="Coverage Across Five Continents"
        subtitle="Scale and depth powering institutional decision-making across selective African secondary education."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {mobilityGlance.stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-6 sm:p-7 rounded-3xl bg-card border border-border text-center card-hover-lift hover:border-primary/40 hover:scale-[1.03] shadow-card transition-all duration-300 group cursor-default"
            >
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-primary mb-2 tracking-tight group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-foreground">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. EXECUTIVE LEADERSHIP PROFILE */}
      <section className="py-16 sm:py-20 gradient-sky">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-card card-hover-lift flex flex-col sm:flex-row items-center gap-7 text-center sm:text-left hover:border-primary/40 transition-all duration-300">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-accent/60 shadow-md shrink-0 bg-primary animate-gold-glow">
              <img
                src={siteConfig.founderImage}
                alt={siteConfig.founderName}
                width="128"
                height="128"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Institutional Leadership</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {siteConfig.founderName}
              </h3>
              <p className="text-sm font-semibold text-accent-foreground/90">
                {siteConfig.founderTitle}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed pt-1">
                Based in {siteConfig.address}. Architect of private institutional pathways equipping selected African lycées and colleges with direct, accredited university entry worldwide.
              </p>
              <div className="pt-3 border-t border-border flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                <a href={`mailto:${siteConfig.email}`} className="text-foreground font-semibold hover:text-primary transition-colors">
                  {siteConfig.email}
                </a>
                <span className="text-border">•</span>
                <a href={`tel:${siteConfig.phone}`} className="text-foreground font-semibold hover:text-primary transition-colors">
                  {siteConfig.phone}
                </a>
                <span className="text-border">•</span>
                <span>{siteConfig.officeHours}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOUNDER MESSAGE MEMORANDUM */}
      <FoundersLetterSection />

      {/* 6. GOVERNANCE MODEL */}
      <GovernanceSection />

      {/* 7. ABOUT CTA BANNER */}
      <section className="relative gradient-hero text-foreground py-16 sm:py-20 px-4 text-center overflow-hidden">
        <div 
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow" 
          aria-hidden="true" 
        />
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Leadership Engagement
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            Equip Your School With The International Pathways Architecture
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            Reserve a confidential briefing with our executive directorate to review curriculum mapping and cohort activation timelines.
          </p>
          <div className="pt-2">
            <Button
              to="/book-a-demo"
              variant="accent"
              size="lg"
              icon={ArrowRight}
            >
              Request Leadership Briefing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
