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
              className="flex flex-col justify-between border-t-4 border-t-gold-500 text-left h-full"
            >
              <div>
                {/* Icon & Highlight Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-navy-900/70 bg-navy-900/5 px-2.5 py-1 rounded-md border border-navy-900/10">
                    {card.highlight}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-4 leading-snug tracking-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold uppercase tracking-wider text-gold-700">
                Institutional Capability
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
