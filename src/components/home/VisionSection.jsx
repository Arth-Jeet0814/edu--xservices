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
            className="p-6 sm:p-8 text-left transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
              {/* Founder Photo with Breathing Gold Aura */}
              <div className="w-20 h-20 rounded-2xl bg-primary border-2 border-accent/60 flex items-center justify-center text-accent shrink-0 shadow-lg relative overflow-hidden animate-gold-glow">
                {vision.founderCard.image ? (
                  <img
                    src={vision.founderCard.image}
                    alt={vision.founderCard.name}
                    width="80"
                    height="80"
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <User className="w-10 h-10 opacity-70" />
                )}
                <div className="absolute inset-x-0 bottom-0 py-0.5 bg-primary/95 text-[9px] text-center uppercase tracking-wider text-accent font-bold">
                  Founder
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  {vision.founderCard.name}
                </h3>
                <p className="text-sm font-semibold text-accent mt-0.5">
                  {vision.founderCard.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {vision.founderCard.role}
                </p>
              </div>
            </div>

            <div className="relative pl-6 border-l-2 border-accent my-4">
              <Quote className="w-5 h-5 text-accent/40 absolute -left-2.5 -top-2 animate-float" />
              <p className="text-foreground/90 text-sm sm:text-base leading-relaxed italic">
                "{vision.founderCard.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Institutional Leadership
              </span>
              <span className="text-primary font-semibold">B2B Private Framework</span>
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
              className="p-6 text-left group cursor-default"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary-soft text-primary group-hover:bg-accent/15 group-hover:text-accent-foreground transition-all duration-300 flex items-center justify-center shrink-0">
                  {idx === 0 ? <Globe className="w-4 h-4 transition-transform group-hover:rotate-12" /> : <Calendar className="w-4 h-4 transition-transform group-hover:rotate-12" />}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-primary tracking-tight transition-colors">
                {stat.value}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
