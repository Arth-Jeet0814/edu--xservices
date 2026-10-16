import React from 'react';
import { FileCheck, ShieldCheck } from 'lucide-react';
import { homeContent } from '../../data/content';
import Section from '../common/Section';

export default function FoundersLetterSection() {
  const { foundersLetter } = homeContent;

  return (
    <Section
      id="founders-letter"
      background="light"
      align="center"
      eyebrow={foundersLetter.eyebrow}
      title={foundersLetter.title}
      subtitle={foundersLetter.subtitle}
    >
      <div className="max-w-3xl mx-auto bg-card/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 md:p-14 border border-border/80 shadow-lift text-left relative ring-1 ring-black/[0.02]">
        {/* Institutional Memorandum Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-border">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <FileCheck className="w-4 h-4 text-accent" />
            <span>Executive Memorandum · Strategic Framework</span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
            Official Release
          </span>
        </div>

        {/* Editorial Body */}
        <div className="space-y-6 text-foreground/90 text-base sm:text-lg leading-relaxed font-normal">
          <p className="text-foreground font-semibold leading-relaxed">
            {foundersLetter.paragraphs[0]}
          </p>

          <p>{foundersLetter.paragraphs[1]}</p>

          <p className="font-semibold text-foreground">
            {foundersLetter.paragraphs[2]}
          </p>

          <p>{foundersLetter.paragraphs[3]}</p>

          {/* Modern Executive Pull Quote */}
          <div className="my-8 p-6 sm:p-7 bg-primary-soft/40 rounded-2xl border border-primary/20 shadow-soft card-hover-lift hover:border-primary/40 transition-all">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Institutional Axiom
            </p>
            <blockquote className="font-display text-xl sm:text-2xl font-bold text-foreground leading-snug">
              "{foundersLetter.pullQuote}"
            </blockquote>
          </div>

          <p>{foundersLetter.paragraphs[4]}</p>

          <p>{foundersLetter.paragraphs[5]}</p>

          <div className="p-4 rounded-xl bg-secondary border border-border font-display font-semibold text-foreground text-base card-hover-lift">
            "{foundersLetter.paragraphs[6]}"
          </div>

          <p>{foundersLetter.paragraphs[7]}</p>

          <p>{foundersLetter.paragraphs[8]}</p>

          <p className="font-semibold text-foreground">
            {foundersLetter.paragraphs[9]}
          </p>
        </div>

        {/* Executive Signature Block */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-display text-xl font-bold text-foreground tracking-tight">
              {foundersLetter.signature.name}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-accent mt-0.5">
              {foundersLetter.signature.role}
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-muted-foreground border border-border text-xs font-semibold hover:text-foreground transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>Verified Executive Letter</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
