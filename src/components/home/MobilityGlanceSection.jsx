import React from 'react';
import { homeContent } from '../../data/content';
import Section from '../common/Section';
import Card from '../common/Card';

export default function MobilityGlanceSection() {
  const { mobilityGlance } = homeContent;

  return (
    <Section
      id="mobility-at-a-glance"
      background="light"
      align="center"
      eyebrow={mobilityGlance.eyebrow}
      title={mobilityGlance.title}
      subtitle={mobilityGlance.subtitle}
      className="py-12 sm:py-16 !border-t-0 !border-b-0"
    >
      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {mobilityGlance.stats.map((stat, idx) => {
          const displayValue = stat.value ? stat.value.replace(/\[|\]/g, '') : '';
          return (
            <Card
              key={idx}
              variant="light"
              hoverEffect={true}
              className="p-8 text-center border-border shadow-soft"
            >
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-primary mb-2 tracking-tight">
                {displayValue}
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">
                {stat.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {stat.desc}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Institutional Mandate Statement */}
      <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-card border border-border text-center shadow-soft">
        <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
          {mobilityGlance.mandate.label}
        </span>
        <p className="font-display text-lg sm:text-xl font-bold text-foreground leading-relaxed">
          "{mobilityGlance.mandate.text}"
        </p>
      </div>
    </Section>
  );
}
