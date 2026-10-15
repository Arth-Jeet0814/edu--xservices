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
      background="navy-dark"
      align="center"
      className="border-b border-navy-800"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-widest text-gold-400">
          {finalCta.eyebrow}
        </span>

        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
          {finalCta.h2}
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            to={finalCta.buttonPrimaryLink}
            variant="gold"
            size="lg"
            icon={GraduationCap}
            className="w-full sm:w-auto"
          >
            {finalCta.buttonPrimary}
          </Button>

          <Button
            to={finalCta.buttonSecondaryLink}
            variant="outlineLight"
            size="lg"
            icon={ArrowRight}
            className="w-full sm:w-auto"
          >
            {finalCta.buttonSecondary}
          </Button>
        </div>

        <p className="text-xs text-slate-400 tracking-wide">
          {finalCta.footnote}
        </p>
      </div>
    </Section>
  );
}
