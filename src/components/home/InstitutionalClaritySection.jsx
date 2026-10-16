import React from 'react';
import { Building2, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { homeContent } from '../../data/content';
import Section from '../common/Section';
import Card from '../common/Card';

const iconMap = {
  Building2: Building2,
  LayoutDashboard: LayoutDashboard,
  ShieldCheck: ShieldCheck,
};

export default function InstitutionalClaritySection() {
  const { institutionalClarity } = homeContent;

  return (
    <Section
      id="institutional-clarity"
      background="light"
      align="center"
      eyebrow={institutionalClarity.eyebrow}
      title={institutionalClarity.title}
      subtitle={institutionalClarity.description}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {institutionalClarity.cards.map((card) => {
          const IconComponent = iconMap[card.icon] || ShieldCheck;
          return (
            <Card
              key={card.id}
              variant="light"
              hoverEffect={true}
              className="flex flex-col justify-between text-left h-full group"
            >
              <div>
                {/* Icon & Highlight Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary-soft text-primary border border-primary/20 flex items-center justify-center shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary-soft/80 px-2.5 py-1 rounded-full border border-primary/20">
                    {card.highlight}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 leading-snug tracking-tight group-hover:text-primary transition-colors">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border flex items-center text-xs font-bold uppercase tracking-wider text-accent">
                Institutional Capability
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
