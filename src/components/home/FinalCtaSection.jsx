import React from 'react';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { homeContent } from '../../data/content';
import Section from '../common/Section';
import Button from '../common/Button';

export default function FinalCtaSection() {
  const { finalCta } = homeContent;

  return (
    <Section
      id="final-cta"
      background="gradient-hero"
      align="center"
      className="py-16 sm:py-24 border-t border-border"
    >
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary">
          {finalCta.eyebrow}
        </span>

        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-snug tracking-tight">
          {finalCta.h2}
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            to={finalCta.buttonPrimaryLink}
            variant="accent"
            size="lg"
            icon={GraduationCap}
            className="w-full sm:w-auto"
          >
            {finalCta.buttonPrimary}
          </Button>

          <Button
            to={finalCta.buttonSecondaryLink}
            variant="outline"
            size="lg"
            icon={ArrowRight}
            className="w-full sm:w-auto"
          >
            {finalCta.buttonSecondary}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground tracking-wide pt-2">
          {finalCta.footnote}
        </p>
      </div>
    </Section>
  );
}
