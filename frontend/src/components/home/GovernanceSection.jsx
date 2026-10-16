import React from 'react';
import {
  ShieldAlert,
  ClipboardCheck,
  Monitor,
  TrendingUp,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { homeContent } from '../../data/content';
import Section from '../common/Section';
import Card from '../common/Card';

const iconMap = {
  ShieldAlert: ShieldAlert,
  ClipboardCheck: ClipboardCheck,
  Monitor: Monitor,
  TrendingUp: TrendingUp,
  CheckCircle2: CheckCircle2,
  Lock: Lock,
};

export default function GovernanceSection() {
  const { governance } = homeContent;

  return (
    <Section
      id="infrastructure-and-governance"
      background="light"
      align="center"
      eyebrow={governance.eyebrow}
      title={governance.title}
      subtitle={governance.lead}
      className="!pt-10 sm:!pt-16"
    >
      {/* 6 Icon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 text-left">
        {governance.cards.map((card, idx) => {
          const IconComponent = iconMap[card.icon] || CheckCircle2;
          return (
            <Card
              key={idx}
              variant="light"
              hoverEffect={true}
              className="p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary border border-primary/20 flex items-center justify-center mb-4 shadow-xs transition-transform group-hover:scale-110">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Institutional Assurance
              </div>
            </Card>
          );
        })}
      </div>

      {/* Three Phases as a Vertical List with Numbered Markers */}
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Adoption Roadmap
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-1 tracking-tight">
            Three Phases to School Activation
          </h3>
        </div>

        <div className="space-y-4">
          {governance.phases.map((phase) => (
            <div
              key={phase.phase}
              className="p-6 rounded-2xl bg-card/95 border border-border/80 shadow-soft hover:border-primary/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <span className="px-3 py-1 rounded-lg bg-primary-soft text-primary border border-primary/20 font-mono text-xs font-bold uppercase tracking-wider shrink-0 mt-0.5">
                  {phase.phase}
                </span>
                <div>
                  <h4 className="font-display font-bold text-lg text-foreground tracking-tight">
                    {phase.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
