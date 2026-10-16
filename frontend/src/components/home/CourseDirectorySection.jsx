import React, { useState, useEffect } from 'react';
import { Search, Lock, ArrowRight, ArrowUpRight, RefreshCw } from 'lucide-react';
import { homeContent, siteConfig } from '../../data/content';
import { getCountries, getLevels, getStreams } from '../../data/api';
import Section from '../common/Section';
import Button from '../common/Button';

export default function CourseDirectorySection() {
  const { courseDirectory } = homeContent;

  const [destination, setDestination] = useState('');
  const [studyLevel, setStudyLevel] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const [destinationsList, setDestinationsList] = useState(courseDirectory.destinations);
  const [levelsList, setLevelsList] = useState(courseDirectory.studyLevels);
  const [streamsList, setStreamsList] = useState(courseDirectory.fieldsOfStudy);

  useEffect(() => {
    getCountries().then((data) => {
      if (data && data.length > 0) {
        setDestinationsList(data.map((c) => c.countryname || c));
      }
    });
    getLevels().then((data) => {
      if (data && data.length > 0) {
        setLevelsList(data.map((l) => l.label || l.name || l));
      }
    });
    getStreams().then((data) => {
      if (data && data.length > 0) {
        setStreamsList(data.map((s) => s.name || s.text || s));
      }
    });
  }, []);

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
    >
      <div className="max-w-4xl mx-auto">
        {/* Search Card Container */}
        <div className="bg-card/95 backdrop-blur-md border border-border/80 rounded-3xl p-6 sm:p-10 shadow-lift relative overflow-hidden ring-1 ring-black/[0.02]">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
              {/* Destination Dropdown */}
              <div>
                <label htmlFor="destination-select" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Preferred Destination
                </label>
                <select
                  id="destination-select"
                  name="destination"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    if (hasSearched) setHasSearched(false);
                  }}
                  className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="">Select Destination</option>
                  {destinationsList.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              {/* Study Level Dropdown */}
              <div>
                <label htmlFor="study-level-select" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Study Level
                </label>
                <select
                  id="study-level-select"
                  name="studyLevel"
                  value={studyLevel}
                  onChange={(e) => {
                    setStudyLevel(e.target.value);
                    if (hasSearched) setHasSearched(false);
                  }}
                  className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="">Select Study Level</option>
                  {levelsList.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field of Study Dropdown */}
              <div>
                <label htmlFor="field-study-select" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Field of Study
                </label>
                <select
                  id="field-study-select"
                  name="fieldOfStudy"
                  value={fieldOfStudy}
                  onChange={(e) => {
                    setFieldOfStudy(e.target.value);
                    if (hasSearched) setHasSearched(false);
                  }}
                  className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="">Select Field of Study</option>
                  {streamsList.map((fld) => (
                    <option key={fld} value={fld}>
                      {fld}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground">
                Institutional directory indexed from 189 accredited global partners.
              </span>
              <Button
                type="submit"
                variant="accent"
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
            <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-secondary/80 border border-primary/20 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-14 h-14 rounded-full bg-accent/15 text-accent-foreground border border-accent/30 flex items-center justify-center mx-auto mb-3 shadow-md animate-float">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2 tracking-tight">
                {courseDirectory.gateNotice}
              </h3>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6 leading-relaxed">
                Complete directory indices, tuition frameworks, merit scholarship quotas, and direct university submission pathways are accessible exclusively via verified partner school consoles.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  to="/book-a-demo"
                  variant="accent"
                  size="md"
                  icon={ArrowRight}
                >
                  {courseDirectory.gateButton}
                </Button>
                <a
                  href={siteConfig.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold text-primary bg-background hover:bg-secondary border border-border hover:border-primary/40 transition-all shadow-xs"
                >
                  <span>Partner Portal Login ({siteConfig.portalText})</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="group inline-flex items-center text-xs text-muted-foreground hover:text-foreground px-3 py-2 transition-colors cursor-pointer"
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
