import React from 'react';
import { ArrowRight } from 'lucide-react';
import { homeContent } from '../../data/content';
import Section from '../common/Section';
import Button from '../common/Button';

export default function DestinationsGridSection() {
  const { destinationsGrid } = homeContent;

  return (
    <Section
      id="destinations-grid"
      background="light"
      align="center"
      eyebrow={destinationsGrid.eyebrow}
      title={destinationsGrid.title}
      subtitle={destinationsGrid.description}
      className="border-b border-slate-200"
    >
      {/* 2 columns on mobile, 3 on tablet, 6 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 mb-10">
        {destinationsGrid.countries.map((country) => (
          <div
            key={country.name}
            className="group bg-white rounded-xl p-4 border border-slate-200 shadow-subtle hover:border-gold-500/60 card-hover-lift flex flex-col items-center justify-center text-center transition-all duration-200"
          >
            {/* Flag Image from flagcdn.com */}
            <div className="w-12 h-8 rounded overflow-hidden shadow-sm border border-slate-200/80 mb-3 bg-slate-100 flex items-center justify-center shrink-0">
              <img
                src={`https://flagcdn.com/w80/${country.code}.png`}
                srcSet={`https://flagcdn.com/w160/${country.code}.png 2x`}
                alt={`${country.name} flag`}
                loading="lazy"
                width="48"
                height="32"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-gold-700 transition-colors">
              {country.name}
            </h4>
            <span className="text-[11px] text-slate-500 mt-0.5">
              {country.region}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center pt-2">
        <Button
          to="/destinations"
          variant="navy"
          size="md"
          icon={ArrowRight}
        >
          Explore All Destination Details & Criteria
        </Button>
      </div>
    </Section>
  );
}
