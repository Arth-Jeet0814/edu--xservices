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
            className="group bg-white rounded-2xl p-4 border border-[#cfe6f5] shadow-xs hover:border-[#0ea5e9] hover:shadow-md hover:-translate-y-1.5 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer"
          >
            {/* Flag Image from flagcdn.com */}
            <div className="w-12 h-8 rounded-md overflow-hidden shadow-xs border border-[#cfe6f5] mb-3 bg-[#f0f9ff] flex items-center justify-center shrink-0">
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

            <h4 className="font-display font-bold text-sm text-[#082f49] group-hover:text-[#0369a1] transition-colors duration-200">
              {country.name}
            </h4>
            <span className="text-[11px] text-[#4b6b82] mt-0.5 group-hover:text-[#082f49] transition-colors">
              {country.region}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center pt-2">
        <Button
          to="/destinations"
          variant="primary"
          size="md"
          icon={ArrowRight}
        >
          Explore All Destination Details & Criteria
        </Button>
      </div>
    </Section>
  );
}
