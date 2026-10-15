import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { homeContent } from '../../data/content';
import Button from '../common/Button';

export default function HeroSection() {
  const { hero } = homeContent;

  const scrollToForm = () => {
    const el = document.getElementById('partnerFormMain');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-navy-800">
      {/* Subtle Static SVG Globe/Network Illustration (No Motion) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center"
        aria-hidden="true"
      >
        <svg 
          className="w-[1200px] h-[1200px] text-gold-500/20 max-w-none" 
          viewBox="0 0 1000 1000" 
          fill="none" 
          stroke="currentColor"
        >
          {/* Subtle concentric rings */}
          <circle cx="500" cy="500" r="450" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="500" cy="500" r="350" strokeWidth="1.5" />
          <circle cx="500" cy="500" r="250" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="500" cy="500" r="150" strokeWidth="1.5" />

          {/* Ellipses representing global orbital planes */}
          <ellipse cx="500" cy="500" rx="450" ry="180" strokeWidth="1.2" transform="rotate(-25 500 500)" />
          <ellipse cx="500" cy="500" rx="450" ry="180" strokeWidth="1.2" transform="rotate(35 500 500)" />
          <ellipse cx="500" cy="500" rx="450" ry="180" strokeWidth="1.2" transform="rotate(85 500 500)" />

          {/* Institutional network nodes and interconnects */}
          <line x1="500" y1="50" x2="500" y2="950" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="50" y1="500" x2="950" y2="500" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="280" y1="320" x2="500" y2="500" strokeWidth="1.5" stroke="#C8A24A" strokeOpacity="0.4" />
          <line x1="720" y1="360" x2="500" y2="500" strokeWidth="1.5" stroke="#C8A24A" strokeOpacity="0.4" />
          <line x1="450" y1="680" x2="500" y2="500" strokeWidth="1.5" stroke="#C8A24A" strokeOpacity="0.4" />

          {/* Nodes */}
          <circle cx="500" cy="500" r="8" fill="#C8A24A" fillOpacity="0.7" />
          <circle cx="280" cy="320" r="6" fill="#C8A24A" fillOpacity="0.5" />
          <circle cx="720" cy="360" r="6" fill="#C8A24A" fillOpacity="0.5" />
          <circle cx="450" cy="680" r="6" fill="#C8A24A" fillOpacity="0.5" />
          <circle cx="340" cy="460" r="4" fill="#C8A24A" fillOpacity="0.4" />
          <circle cx="630" cy="550" r="4" fill="#C8A24A" fillOpacity="0.4" />
        </svg>
      </div>

      {/* Subtle radial ambient gradient */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="animate-hero-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-8 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
          <span>{hero.eyebrow}</span>
        </div>

        {/* H1 */}
        <h1 className="animate-hero-2 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-extrabold tracking-tight text-white leading-[1.12] mb-5 max-w-4xl">
          {hero.h1}
        </h1>

        {/* H2 */}
        <h2 className="animate-hero-3 font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-200 leading-snug mb-6 max-w-3xl">
          {hero.h2Part1}
          <span className="text-gold-400 font-bold decoration-gold-500/50">
            {hero.h2Highlight}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="animate-hero-3 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10 font-normal">
          {hero.sub}
        </p>

        {/* Action Buttons */}
        <div className="animate-hero-4 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
          <Button
            to="/book-a-demo"
            variant="gold"
            size="lg"
            icon={ArrowRight}
            className="w-full sm:w-auto shadow-md"
          >
            {hero.primaryCta}
          </Button>

          <Button
            onClick={scrollToForm}
            variant="outlineLight"
            size="lg"
            className="w-full sm:w-auto"
          >
            {hero.secondaryCta}
          </Button>
        </div>

        {/* Tagline */}
        <div className="pt-6 border-t border-white/10 max-w-xl text-center">
          <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide leading-relaxed">
            "{hero.tagline}"
          </p>
        </div>
      </div>
    </section>
  );
}
