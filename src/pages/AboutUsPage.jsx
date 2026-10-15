import React from 'react';
import { ShieldCheck, Award, Database, Compass, ArrowRight } from 'lucide-react';
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
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-navy-800 text-center relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="animate-hero-1 inline-block text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/30">
            {aboutContent.hero.eyebrow}
          </span>
          <h1 className="animate-hero-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {aboutContent.hero.title}
          </h1>
          <p className="animate-hero-3 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {aboutContent.hero.lead}
          </p>
        </div>
      </section>

      {/* Key Institutional Pillars */}
      <Section
        id="about-pillars"
        background="light"
        align="center"
        eyebrow="CORE GOVERNANCE PRINCIPLES"
        title="Engineered for Institutional Trust"
        subtitle="Our operational standard rests upon three uncompromised institutional pillars designed exclusively for leadership teams."
        className="border-b border-slate-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {aboutContent.pillars.map((pillar, idx) => {
            const IconComponent = iconMap[pillar.icon] || ShieldCheck;
            return (
              <Card
                key={idx}
                variant="light"
                hoverEffect={true}
                className="p-8 border-t-4 border-t-gold-500 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center mb-6 shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold uppercase tracking-wider text-gold-700">
                  Standard 0{idx + 1}
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Key Stats Showcase */}
      <Section
        id="about-stats"
        background="dark"
        align="center"
        eyebrow="MEASURABLE IMPACT"
        title="Coverage Across Five Continents"
        className="border-b border-navy-800"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {mobilityGlance.stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-navy-950/80 border border-navy-800 text-center">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-gold-400 mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Executive Leadership Profile */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-subtle flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-md shrink-0 bg-navy-950">
              <img
                src={siteConfig.founderImage}
                alt={siteConfig.founderName}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="space-y-1.5 flex-1">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-gold-600">
                Institutional Leadership
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {siteConfig.founderName}
              </h3>
              <p className="text-sm font-semibold text-slate-700">
                {siteConfig.founderTitle}
              </p>
              <p className="text-xs text-slate-500 max-w-xl leading-relaxed pt-1">
                Based in {siteConfig.address}. Architect of private institutional pathways equipping selected African lycées and colleges with direct, accredited university entry worldwide.
              </p>
              <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
                <a href={`mailto:${siteConfig.email}`} className="text-navy-950 font-medium hover:text-gold-600 transition-colors">
                  {siteConfig.email}
                </a>
                <span className="text-slate-300">•</span>
                <a href={`tel:${siteConfig.phone}`} className="text-navy-950 font-medium hover:text-gold-600 transition-colors">
                  {siteConfig.phone}
                </a>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{siteConfig.officeHours}</span>
                <span className="text-slate-300">•</span>
                <a
                  href={siteConfig.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-600 font-semibold hover:underline"
                >
                  {siteConfig.portalText} ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Message Section */}
      <FoundersLetterSection />

      {/* Governance Model */}
      <GovernanceSection />

      {/* About CTA */}
      <section className="bg-navy-950 py-16 px-4 text-center border-t border-navy-800">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">
            Engage with our Institutional Leadership
          </h2>
          <p className="text-slate-300 text-base">
            Request an alignment briefing for your school board or executive council.
          </p>
          <Button
            to="/book-a-demo"
            variant="gold"
            size="lg"
            icon={ArrowRight}
          >
            Request Private Presentation
          </Button>
        </div>
      </section>
    </div>
  );
}
