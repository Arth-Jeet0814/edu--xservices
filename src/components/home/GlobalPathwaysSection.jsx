import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { homeContent } from '../../data/content';
import Section from '../common/Section';
import Card from '../common/Card';

export default function GlobalPathwaysSection() {
  const { globalPathways } = homeContent;

  return (
    <Section
      id="global-academic-pathways"
      background="light"
      align="center"
      eyebrow={globalPathways.eyebrow}
      title={globalPathways.title}
      subtitle={globalPathways.subtitle}
      className="border-b border-slate-200"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {globalPathways.highlightCountries.map((item) => (
          <Card
            key={item.name}
            variant="light"
            hoverEffect={true}
            className="p-5 flex items-start gap-4 text-left group border-slate-200"
          >
            {/* Flag thumbnail */}
            <div className="w-10 h-7 rounded overflow-hidden shadow-sm border border-slate-200 shrink-0 bg-slate-100 mt-1">
              <img
                src={`https://flagcdn.com/w80/${item.code}.png`}
                alt={`${item.name} flag`}
                loading="lazy"
                width="40"
                height="28"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-display font-bold text-base text-slate-900 group-hover:text-gold-700 transition-colors flex items-center justify-between tracking-tight">
                <span>{item.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold-600 transition-colors" />
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                {item.highlight}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
