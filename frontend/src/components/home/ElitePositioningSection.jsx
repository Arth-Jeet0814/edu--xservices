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
              className="group p-7 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary-soft text-primary border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center mb-5 transition-all duration-300 shadow-xs">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2 leading-tight tracking-tight group-hover:text-primary transition-colors">
                  {tile.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tile.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                <span>SPEC-0{idx + 1}</span>
                <span className="text-primary font-semibold">Active Framework</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Closing Bar */}
      <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
        <p className="font-display text-lg sm:text-xl font-bold text-foreground tracking-tight">
          "{elitePositioning.closingLine}"
        </p>
        <Button
          to="/book-a-demo"
          variant="accent"
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
