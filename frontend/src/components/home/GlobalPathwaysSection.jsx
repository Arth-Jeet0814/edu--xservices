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
      className="!pb-10 sm:!pb-14"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {globalPathways.highlightCountries.map((item) => (
          <Card
            key={item.name}
            variant="light"
            hoverEffect={true}
            className="p-5 flex items-start gap-4 text-left group border-border/80 shadow-soft card-hover-lift hover:border-primary/50 hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
          >
            {/* Flag thumbnail */}
            <div className="w-10 h-7 rounded-md overflow-hidden shadow-xs border border-border shrink-0 bg-secondary mt-0.5">
              <img
                src={`https://flagcdn.com/w80/${item.code}.png`}
                alt={`${item.name} flag`}
                loading="lazy"
                width="40"
                height="28"
                className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors flex items-center justify-between tracking-tight">
                <span>{item.name}</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-snug group-hover:text-foreground transition-colors">
                {item.highlight}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
