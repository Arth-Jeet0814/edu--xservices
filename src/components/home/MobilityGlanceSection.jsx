import React from 'react';
import { homeContent } from '../../data/content';
import Section from '../common/Section';
import Card from '../common/Card';

export default function MobilityGlanceSection() {
  const { mobilityGlance } = homeContent;

  return (
    <Section
      id="mobility-at-a-glance"
      background="dark"
      align="center"
      eyebrow={mobilityGlance.eyebrow}
      title={mobilityGlance.title}
    >
      {/* 3 Static Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14">
        {mobilityGlance.stats.map((stat, idx) => (
          <Card
            key={idx}
            variant="darkSubtle"
            hoverEffect={true}
            className="p-8 border border-navy-700/80 text-center"
          >
            <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gold-400 mb-2 tracking-tight">
              {stat.value}
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-1 tracking-tight">
              {stat.label}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {stat.desc}
            </p>
          </Card>
        ))}
      </div>

      {/* Institutional Mandate Statement */}
      <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-navy-950 border border-gold-500/40 text-center shadow-xl">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-2">
          {mobilityGlance.mandate.label}
        </span>
        <p className="font-display text-xl sm:text-2xl font-bold text-white leading-relaxed tracking-tight">
          "{mobilityGlance.mandate.text}"
        </p>
      </div>
    </Section>
  );
}
