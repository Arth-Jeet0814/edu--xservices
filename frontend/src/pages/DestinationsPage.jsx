import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Search, Filter, Globe, Sparkles, MapPin } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { homeContent } from '../data/content';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const REGIONS = ['All', 'Europe', 'Asia', 'Americas', 'Middle East', 'Africa', 'Oceania'];

export default function DestinationsPage() {
  useDocumentTitle('Destinations | 24 Global Academic Corridors');
  const [activeRegion, setActiveRegion] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { countries } = homeContent.destinationsGrid;

  const filteredCountries = countries.filter((country) => {
    const matchesRegion = activeRegion === 'All' || country.region === activeRegion;
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION (New Theme: Gradient Hero + Rotating Orbital SVGs) */}
      <section className="relative gradient-hero text-foreground pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Pulsing Glow */}
        <div 
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] h-[350px] sm:h-[450px] bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
          aria-hidden="true"
        />

        {/* Dynamic Animated Orbital Network SVG */}
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
            <g className="animate-spin-slow">
              <circle cx="500" cy="500" r="450" strokeWidth="1" strokeDasharray="8 8" />
              <ellipse cx="500" cy="500" rx="450" ry="180" strokeWidth="1.2" transform="rotate(-25 500 500)" />
              <circle cx="950" cy="500" r="6" fill="currentColor" opacity="0.6" />
            </g>
            <g className="animate-spin-reverse-slow">
              <circle cx="500" cy="500" r="350" strokeWidth="1.5" />
              <circle cx="500" cy="500" r="250" strokeWidth="1" strokeDasharray="6 6" />
              <ellipse cx="500" cy="500" rx="420" ry="160" strokeWidth="1.2" transform="rotate(45 500 500)" />
            </g>
            <circle cx="500" cy="500" r="160" strokeWidth="1.5" />
            <circle cx="500" cy="500" r="6" fill="currentColor" opacity="0.3" className="animate-ping" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow Badge */}
          <div className="animate-hero-1 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-background/95 border border-border text-primary text-xs font-bold tracking-wide shadow-soft mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <Globe className="w-4 h-4 text-primary" />
            <span>Global Academic Corridors</span>
          </div>

          {/* H1 */}
          <h1 className="animate-hero-2 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-extrabold tracking-tight text-foreground leading-[1.12] mb-4 max-w-4xl">
            24 Destination Countries Across{' '}
            <span className="text-primary font-extrabold">Five Continents</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-hero-3 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8 font-normal">
            Curated higher education pathways connecting selected African secondary schools directly to accredited universities, visa authorities, and merit scholarship quotas.
          </p>

          {/* Action CTAs */}
          <div className="animate-hero-4 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-10">
            <Button
              to="/course-finder"
              variant="accent"
              size="lg"
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              Search Degree Programs
            </Button>
            <Button
              to="/book-a-demo"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Request School Console
            </Button>
          </div>

          {/* Metric Highlights Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-4xl animate-hero-4">
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-primary/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">24</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Study Destinations</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-crimson/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-crimson">5</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Global Continents</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-accent/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-accent">500+</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Partner Universities</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-primary/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">100%</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Arrival Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY REGION FILTER & SEARCH BAR */}
      <section className="bg-card/95 backdrop-blur py-4 px-4 sm:px-6 lg:px-8 sticky top-[62px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Region Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Region:
            </span>
            {REGIONS.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                className={`px-4 py-2 min-h-[40px] inline-flex items-center justify-center rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeRegion === region
                    ? 'bg-primary text-primary-foreground shadow-xs font-bold'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="destination-search-input"
              name="searchTerm"
              type="text"
              placeholder="Search destination country..."
              aria-label="Search destination countries"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 min-h-[40px] bg-background border border-input rounded-full text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary placeholder:text-muted-foreground transition-all"
            />
          </div>
        </div>
      </section>

      {/* 3. DESTINATIONS GRID */}
      <Section
        id="destinations-list"
        background="light"
        align="left"
        className="py-12 sm:py-16"
      >
        <h2 className="sr-only">International Degree Pathways by Country</h2>
        <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {filteredCountries.length} destination pathways</span>
          <span>Region Filter: <strong className="text-foreground">{activeRegion}</strong></span>
        </div>

        {filteredCountries.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-3xl border border-border p-8 shadow-soft">
            <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-2 animate-float" />
            <p className="text-foreground font-semibold">No destinations match your search or filter.</p>
            <button
              onClick={() => { setActiveRegion('All'); setSearchTerm(''); }}
              className="mt-3 text-xs text-primary font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <Card
                key={country.name}
                variant="light"
                hoverEffect={true}
                className="p-6 flex flex-col justify-between border-border rounded-3xl group shadow-soft hover:shadow-card hover:border-primary/40 card-hover-lift transition-all duration-300 bg-card"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-9 rounded-md overflow-hidden shadow-xs border border-border shrink-0 bg-secondary">
                      <img
                        src={`https://flagcdn.com/w80/${country.code}.png`}
                        srcSet={`https://flagcdn.com/w160/${country.code}.png 2x`}
                        alt={`${country.name} flag`}
                        loading="lazy"
                        width="56"
                        height="36"
                        className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full">
                      {country.region}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors tracking-tight">
                    {country.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Accredited undergraduate and postgraduate institutional pathways with structured arrival support.
                  </p>

                  <div className="space-y-1.5 text-xs text-muted-foreground pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>Direct Admissions Lines</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>Merit Scholarship Auditing</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>Institutional Visa Coordination</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    Partner Access
                  </span>
                  <Button
                    to="/book-a-demo"
                    variant="accent"
                    size="sm"
                  >
                    Inquire
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* 4. BOTTOM INSTITUTIONAL ACCORD BANNER */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-card border border-border text-center shadow-card relative overflow-hidden">
          <div 
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow" 
            aria-hidden="true" 
          />
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Curriculum Equivalency Mapping</span>
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Expand Your School's Worldwide Corridors
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our admissions infrastructure maps high school curricula (French Baccalauréat, WAEC, Cambridge A-Levels, IB Diploma) directly into university entry equivalencies worldwide.
            </p>
            <div className="pt-2">
              <Button
                to="/book-a-demo"
                variant="accent"
                size="md"
                icon={ArrowRight}
              >
                Request Institutional Briefing
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
