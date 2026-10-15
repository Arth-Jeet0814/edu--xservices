import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Search, Filter } from 'lucide-react';
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
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-navy-800 text-center relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="animate-hero-1 inline-block text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/30">
            Global Academic Corridors
          </span>
          <h1 className="animate-hero-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            24 Destination Countries
          </h1>
          <p className="animate-hero-3 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Curated higher education pathways connecting selected African institutions to accredited universities across five continents.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8 sticky top-[68px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Region Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Region:
            </span>
            {REGIONS.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeRegion === region
                    ? 'bg-navy-900 text-gold-400 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <Section
        id="destinations-list"
        background="light"
        align="left"
        className="py-12 sm:py-16"
      >
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredCountries.length} destination pathways</span>
          <span>Region Filter: {activeRegion}</span>
        </div>

        {filteredCountries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
            <p className="text-slate-600 font-medium">No destinations match your search or filter.</p>
            <button
              onClick={() => { setActiveRegion('All'); setSearchTerm(''); }}
              className="mt-3 text-xs text-gold-600 font-bold hover:underline"
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
                className="p-6 flex flex-col justify-between border-slate-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-9 rounded-md overflow-hidden shadow-sm border border-slate-200 shrink-0 bg-slate-100">
                      <img
                        src={`https://flagcdn.com/w80/${country.code}.png`}
                        srcSet={`https://flagcdn.com/w160/${country.code}.png 2x`}
                        alt={`${country.name} flag`}
                        loading="lazy"
                        width="56"
                        height="36"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {country.region}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-slate-900 mb-1 group-hover:text-gold-700 transition-colors tracking-tight">
                    {country.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Accredited undergraduate and postgraduate institutional pathways with structured arrival support.
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>Direct Admissions Lines</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>Merit Scholarship Auditing</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>Institutional Visa Coordination</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    Partner Access
                  </span>
                  <Button
                    to="/book-a-demo"
                    variant="navy"
                    size="sm"
                  >
                    Inquire
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Global Directory Footer Notice */}
        <div className="mt-16 p-8 rounded-2xl bg-navy-950 text-white text-center border border-navy-800 space-y-4">
          <h3 className="font-display text-2xl font-bold tracking-tight">
            Expand Your School's Worldwide Corridors
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Our admissions infrastructure maps high school curricula (French Baccalauréat, WAEC, Cambridge A-Levels, IB Diploma) directly into university entry equivalencies.
          </p>
          <Button
            to="/book-a-demo"
            variant="gold"
            size="md"
            icon={ArrowRight}
          >
            Request Institutional Briefing
          </Button>
        </div>
      </Section>
    </div>
  );
}
