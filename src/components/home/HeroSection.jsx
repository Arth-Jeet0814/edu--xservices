import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { homeContent } from '../../data/content';
import Button from '../common/Button';

export default function HeroSection() {
  const { hero } = homeContent;
  const navigate = useNavigate();

  const [country, setCountry] = useState('');
  const [courseName, setCourseName] = useState('');
  const [level, setLevel] = useState('');
  const [intake, setIntake] = useState('');

  const scrollToForm = () => {
    const el = document.getElementById('partnerFormMain');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (courseName) params.set('q', courseName);
    if (country) params.set('country', country);
    if (level) params.set('level', level);
    if (intake) params.set('intake', intake);
    navigate(`/course-finder?${params.toString()}`);
  };

  return (
    <section className="relative gradient-hero text-foreground pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-18 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-border">
      {/* Ambient Pulsing Gradient Glow Behind Hero */}
      <div 
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] h-[350px] sm:h-[450px] bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />

      {/* Dynamic Animated Orbital / Celestial Network SVG */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.14] flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <svg 
          className="w-[1100px] h-[1100px] text-primary max-w-none" 
          viewBox="0 0 1000 1000" 
          fill="none" 
          stroke="currentColor"
        >
          {/* Outer orbital plane rotating slowly clockwise */}
          <g className="animate-spin-slow">
            <circle cx="500" cy="500" r="450" strokeWidth="1" strokeDasharray="8 8" />
            <ellipse cx="500" cy="500" rx="450" ry="180" strokeWidth="1.2" transform="rotate(-25 500 500)" />
            <circle cx="950" cy="500" r="6" fill="currentColor" opacity="0.6" />
            <circle cx="50" cy="500" r="4" fill="currentColor" opacity="0.4" />
          </g>

          {/* Inner orbital plane counter-rotating */}
          <g className="animate-spin-reverse-slow">
            <circle cx="500" cy="500" r="350" strokeWidth="1.5" />
            <circle cx="500" cy="500" r="250" strokeWidth="1" strokeDasharray="6 6" />
            <ellipse cx="500" cy="500" rx="420" ry="160" strokeWidth="1.2" transform="rotate(45 500 500)" />
            <circle cx="850" cy="500" r="5" fill="currentColor" opacity="0.6" />
          </g>

          {/* Core harmonic anchor rings */}
          <circle cx="500" cy="500" r="160" strokeWidth="1.5" />
          <ellipse cx="500" cy="500" rx="380" ry="140" strokeWidth="1.2" transform="rotate(85 500 500)" />
          <circle cx="500" cy="500" r="6" fill="currentColor" opacity="0.3" className="animate-ping" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow with Pulsing Live Status Radar Dot */}
        <div className="animate-hero-1 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-background/95 border border-border text-primary text-xs font-bold tracking-wide shadow-soft mb-4 sm:mb-5 hover:border-primary/30 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>{hero.eyebrow}</span>
        </div>

        {/* H1 */}
        <h1 className="animate-hero-2 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold tracking-tight text-foreground leading-[1.1] mb-3 sm:mb-4 max-w-4xl">
          {hero.h1}
        </h1>

        {/* H2 */}
        <h2 className="animate-hero-3 font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground/85 leading-snug mb-4 sm:mb-5 max-w-3xl">
          {hero.h2Part1}
          <span className="text-primary font-extrabold">
            {hero.h2Highlight}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="animate-hero-3 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-6 sm:mb-8 font-normal">
          {hero.sub}
        </p>

        {/* Action Buttons */}
        <div className="animate-hero-4 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-6 sm:mb-8">
          <Button
            to="/book-a-demo"
            variant="accent"
            size="lg"
            icon={ArrowRight}
            className="w-full sm:w-auto"
          >
            {hero.primaryCta}
          </Button>

          <Button
            onClick={scrollToForm}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            {hero.secondaryCta}
          </Button>
        </div>

        {/* Target Site Hero Search Form Console */}
        <div className="w-full max-w-4xl mb-6 sm:mb-8 text-left animate-hero-4">
          <div className="rounded-3xl border border-border bg-card/95 p-4 sm:p-5 shadow-card backdrop-blur">
            <form onSubmit={handleSearch} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <select
                aria-label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 cursor-pointer"
              >
                <option value="">Country</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Ireland">Ireland</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Dubai">Dubai</option>
                <option value="Singapore">Singapore</option>
                <option value="Malta">Malta</option>
                <option value="Europe">Europe</option>
              </select>

              <input
                type="text"
                aria-label="Course name"
                placeholder="Course name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
              />

              <select
                aria-label="Education level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 cursor-pointer"
              >
                <option value="">Education level</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="Diploma">Diploma</option>
                <option value="PhD">PhD</option>
              </select>

              <select
                aria-label="Intake"
                value={intake}
                onChange={(e) => setIntake(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 cursor-pointer"
              >
                <option value="">Intake</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
              </select>

              <button
                type="submit"
                className="gradient-accent inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5 cursor-pointer w-full"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>
          </div>
        </div>

        {/* Quick Highlights Row (Target Website Metric Badges) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-2xl mb-5">
          <div className="rounded-2xl border border-border bg-card/90 p-3.5 shadow-soft backdrop-blur-xs text-center card-hover-lift hover:border-primary/40 hover:scale-[1.02] cursor-default">
            <p className="text-xl sm:text-2xl font-extrabold text-primary">24+</p>
            <p className="text-xs font-semibold text-muted-foreground mt-0.5">Study Destinations</p>
          </div>
          <div className="rounded-2xl border border-border bg-card/90 p-3.5 shadow-soft backdrop-blur-xs text-center card-hover-lift hover:border-crimson/40 hover:scale-[1.02] cursor-default">
            <p className="text-xl sm:text-2xl font-extrabold text-crimson">500+</p>
            <p className="text-xs font-semibold text-muted-foreground mt-0.5">Partner Universities</p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-border bg-card/90 p-3.5 shadow-soft backdrop-blur-xs text-center card-hover-lift hover:border-accent/40 hover:scale-[1.02] cursor-default">
            <p className="text-xl sm:text-2xl font-extrabold text-accent">96,000+</p>
            <p className="text-xs font-semibold text-muted-foreground mt-0.5">Indexed Programs</p>
          </div>
        </div>

        {/* Tagline */}
        <div className="pt-4 border-t border-border max-w-xl text-center">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium tracking-wide leading-relaxed">
            "{hero.tagline}"
          </p>
        </div>
      </div>
    </section>
  );
}
