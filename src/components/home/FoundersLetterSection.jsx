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
      className="border-b border-slate-200"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 sm:p-12 md:p-14 border border-slate-200/90 shadow-card text-left relative">
        {/* Institutional Memorandum Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <FileCheck className="w-4 h-4 text-gold-600" />
            <span>Executive Memorandum · Strategic Framework</span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
            Official Release
          </span>
        </div>

        {/* Editorial Body */}
        <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
          <p className="text-slate-900 font-medium leading-relaxed">
            {foundersLetter.paragraphs[0]}
          </p>

          <p>{foundersLetter.paragraphs[1]}</p>

          <p className="font-semibold text-slate-900">
            {foundersLetter.paragraphs[2]}
          </p>

          <p>{foundersLetter.paragraphs[3]}</p>

          {/* Modern Executive Pull Quote */}
          <div className="my-8 p-6 sm:p-7 bg-slate-50/90 border-l-4 border-gold-500 rounded-r-2xl border border-slate-200/60 shadow-soft card-hover-lift hover:border-gold-500/70 transition-all">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-700 mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
              Institutional Axiom
            </p>
            <blockquote className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              "{foundersLetter.pullQuote}"
            </blockquote>
          </div>

          <p>{foundersLetter.paragraphs[4]}</p>

          <p>{foundersLetter.paragraphs[5]}</p>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 font-display font-semibold text-slate-900 text-base card-hover-lift">
            "{foundersLetter.paragraphs[6]}"
          </div>

          <p>{foundersLetter.paragraphs[7]}</p>

          <p>{foundersLetter.paragraphs[8]}</p>

          <p className="font-semibold text-slate-900">
            {foundersLetter.paragraphs[9]}
          </p>
        </div>

        {/* Executive Signature Block */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-display text-xl font-bold text-slate-900 tracking-tight">
              {foundersLetter.signature.name}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gold-600 mt-0.5">
              {foundersLetter.signature.role}
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200/70 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>Verified Executive Letter</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
