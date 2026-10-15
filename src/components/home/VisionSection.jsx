import React from 'react';
import { User, Globe, Calendar, Quote } from 'lucide-react';
import { homeContent } from '../../data/content';
import Section from '../common/Section';
import Card from '../common/Card';

export default function VisionSection() {
  const { vision } = homeContent;

  return (
    <Section
      id="our-vision"
      background="light"
      align="center"
      eyebrow={vision.eyebrow}
      title={vision.title}
      className="border-b border-slate-200"
    >
      <div className="max-w-4xl mx-auto mb-14 text-center">
        <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-normal">
          {vision.lead}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        {/* Founder Card (7 cols) */}
        <div className="lg:col-span-7">
          <Card
            variant="light"
            hoverEffect={true}
            className="p-6 sm:p-8 border border-slate-200/90 shadow-card text-left bg-white"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
              {/* Founder Photo */}
              <div className="w-20 h-20 rounded-2xl bg-navy-950 border-2 border-gold-500/50 flex items-center justify-center text-gold-400 shrink-0 shadow-lg relative overflow-hidden">
                {vision.founderCard.image ? (
                  <img
                    src={vision.founderCard.image}
                    alt={vision.founderCard.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <User className="w-10 h-10 opacity-70" />
                )}
                <div className="absolute inset-x-0 bottom-0 py-0.5 bg-navy-950/90 text-[9px] text-center uppercase tracking-wider text-gold-300 font-bold">
                  Founder
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {vision.founderCard.name}
                </h3>
                <p className="text-sm font-semibold text-gold-700 mt-0.5">
                  {vision.founderCard.title}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {vision.founderCard.role}
                </p>
              </div>
            </div>

            <div className="relative pl-6 border-l-2 border-gold-500 my-4">
              <Quote className="w-5 h-5 text-gold-500/30 absolute -left-2.5 -top-2" />
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
                "{vision.founderCard.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Institutional Leadership</span>
              <span className="text-navy-700 font-semibold">B2B Private Framework</span>
            </div>
          </Card>
        </div>

        {/* Stats Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {vision.stats.map((stat, idx) => (
            <Card
              key={idx}
              variant="light"
              hoverEffect={true}
              className="p-6 border border-slate-200/90 text-left bg-white shadow-subtle hover:shadow-card-hover"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center">
                  {idx === 0 ? <Globe className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900 tracking-tight">
                {stat.value}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
