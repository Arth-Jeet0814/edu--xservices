import React from 'react';
import { GraduationCap } from 'lucide-react';
import { homeContent } from '../../data/content';
import Section from '../common/Section';

export default function PartnerLogosSection() {
  const { partners } = homeContent;

  return (
    <Section
      id="partner-logos"
      background="white"
      align="center"
      eyebrow="GLOBAL INSTITUTIONAL ACCESS"
      title="Partner University & Academic Network"
      subtitle="Connecting our partner schools directly to selective international institutions, examination bodies, and accredited pathways."
      className="border-b border-slate-200"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {partners.logos.map((partner, idx) => (
          <div
            key={idx}
            className="group p-5 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-gold-500/50 hover:bg-white card-hover-lift flex flex-col items-center justify-center text-center h-32 transition-all shadow-subtle"
          >
            <div className="w-9 h-9 rounded-full bg-slate-200/60 text-slate-700 group-hover:bg-gold-500/10 group-hover:text-gold-700 flex items-center justify-center mb-2.5 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-gold-700 leading-tight">
              {partner.name}
            </h4>
            <span className="text-[11px] text-slate-500 mt-1 line-clamp-1">
              {partner.type}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
          Direct lines to admissions leadership · Transparent merit & scholarship consideration
        </p>
      </div>
    </Section>
  );
}
