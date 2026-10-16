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
    >
      {/* 2 columns on mobile, 3 on tablet, 6 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 mb-10">
        {destinationsGrid.countries.map((country) => (
          <div
            key={country.name}
            className="group bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft hover:border-gold-500/80 hover:shadow-card hover:-translate-y-1.5 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer"
          >
            {/* Flag Image from flagcdn.com */}
            <div className="w-12 h-8 rounded-md overflow-hidden shadow-xs border border-slate-200/80 mb-3 bg-slate-100 flex items-center justify-center shrink-0">
              <img
                src={`https://flagcdn.com/w80/${country.code}.png`}
                srcSet={`https://flagcdn.com/w160/${country.code}.png 2x`}
                alt={`${country.name} flag`}
                loading="lazy"
                width="48"
                height="32"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-115"
              />
            </div>

            <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-gold-700 transition-colors duration-200">
              {country.name}
            </h4>
            <span className="text-[11px] text-slate-500 mt-0.5 group-hover:text-slate-700 transition-colors">
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
