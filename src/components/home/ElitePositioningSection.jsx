import React from 'react';
import { Shield, UserCheck, BarChart3, Globe2, Layers, Users, ArrowRight } from 'lucide-react';
import { homeContent } from '../../data/content';
import Section from '../common/Section';
import Card from '../common/Card';
import Button from '../common/Button';

const iconMap = {
  Shield: Shield,
  UserCheck: UserCheck,
  BarChart3: BarChart3,
  Globe2: Globe2,
  Layers: Layers,
  Users: Users,
};

export default function ElitePositioningSection() {
  const { elitePositioning } = homeContent;

  return (
    <Section
      id="elite-positioning"
      background="light"
      align="center"
      eyebrow={elitePositioning.eyebrow}
      title={elitePositioning.title}
      subtitle={elitePositioning.description}
    >
      {/* 6 Feature Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14 text-left">
        {elitePositioning.tiles.map((tile, idx) => {
          const IconComponent = iconMap[tile.icon] || Shield;
          return (
            <Card
              key={idx}
              variant="light"
              hoverEffect={true}
              className="group border border-slate-200/90 hover:border-navy-600/50 p-7 flex flex-col justify-between shadow-subtle hover:shadow-card-hover bg-white"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 group-hover:bg-navy-800 flex items-center justify-center mb-5 transition-colors shadow-sm">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2 leading-tight tracking-tight">
                  {tile.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {tile.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>SPEC-0{idx + 1}</span>
                <span className="text-navy-700 font-semibold">Active Framework</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Closing Bar */}
      <div className="pt-8 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
        <p className="font-display text-lg sm:text-xl font-semibold text-slate-200 tracking-tight">
          "{elitePositioning.closingLine}"
        </p>
        <Button
          to="/book-a-demo"
          variant="gold"
          size="md"
          icon={ArrowRight}
          className="shrink-0"
        >
          {elitePositioning.buttonText}
        </Button>
      </div>
    </Section>
  );
}
