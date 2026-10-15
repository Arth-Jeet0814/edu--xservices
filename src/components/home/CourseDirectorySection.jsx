import React, { useState } from 'react';
import { Search, Lock, ArrowRight, ArrowUpRight, RefreshCw } from 'lucide-react';
import { homeContent, siteConfig } from '../../data/content';
import Section from '../common/Section';
import Button from '../common/Button';

export default function CourseDirectorySection() {
  const { courseDirectory } = homeContent;

  const [destination, setDestination] = useState('');
  const [studyLevel, setStudyLevel] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const handleReset = () => {
    setHasSearched(false);
  };

  return (
    <Section
      id="course-directory"
      background="light"
      align="center"
      eyebrow={courseDirectory.eyebrow}
      title={courseDirectory.headline}
      subtitle={courseDirectory.description}
      className="border-b border-slate-200"
    >
      <div className="max-w-4xl mx-auto">
        {/* Search Card Container */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-card relative overflow-hidden">
          {/* Subtle gold accent corner border */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-gold-500/5 rounded-bl-full pointer-events-none" />

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
              {/* Destination Dropdown */}
              <div>
                <label htmlFor="destination-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Preferred Destination
                </label>
                <select
                  id="destination-select"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    if (hasSearched) setHasSearched(false);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-navy-600 transition-colors"
                >
                  <option value="">Select Destination</option>
                  {courseDirectory.destinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              {/* Study Level Dropdown */}
              <div>
                <label htmlFor="study-level-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Study Level
                </label>
                <select
                  id="study-level-select"
                  value={studyLevel}
                  onChange={(e) => {
                    setStudyLevel(e.target.value);
                    if (hasSearched) setHasSearched(false);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-navy-600 transition-colors"
                >
                  <option value="">Select Study Level</option>
                  {courseDirectory.studyLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field of Study Dropdown */}
              <div>
                <label htmlFor="field-study-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Field of Study
                </label>
                <select
                  id="field-study-select"
                  value={fieldOfStudy}
                  onChange={(e) => {
                    setFieldOfStudy(e.target.value);
                    if (hasSearched) setHasSearched(false);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-navy-600 transition-colors"
                >
                  <option value="">Select Field of Study</option>
                  {courseDirectory.fieldsOfStudy.map((fld) => (
                    <option key={fld} value={fld}>
                      {fld}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Institutional directory indexed from 189 accredited global partners.
              </span>
              <Button
                type="submit"
                variant="gold"
                size="md"
                icon={Search}
                className="w-full sm:w-auto"
              >
                Find Programs
              </Button>
            </div>
          </form>

          {/* Submission Gate Modal / Message Box */}
          {hasSearched && (
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-navy-950 border border-gold-500/50 text-center animate-in fade-in zoom-in-95 duration-300 animate-gold-glow">
              <div className="w-14 h-14 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center justify-center mx-auto mb-3 shadow-md animate-float">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                {courseDirectory.gateNotice}
              </h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
                Complete directory indices, tuition frameworks, merit scholarship quotas, and direct university submission pathways are accessible exclusively via verified partner school consoles.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  to="/book-a-demo"
                  variant="gold"
                  size="md"
                  icon={ArrowRight}
                >
                  {courseDirectory.gateButton}
                </Button>
                <a
                  href={siteConfig.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-navy-900 hover:bg-navy-800 border border-gold-500/40 hover:border-gold-500 transition-all shadow-sm"
                >
                  <span>Partner Portal Login ({siteConfig.portalText})</span>
                  <ArrowUpRight className="w-4 h-4 text-gold-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="group inline-flex items-center text-xs text-slate-400 hover:text-white px-3 py-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1 group-hover:rotate-180 transition-transform duration-500" />
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
