import React, { useState, useMemo } from 'react';
import {
  Search,
  Building,
  Lock,
  ArrowRight,
  ArrowUpRight,
  Compass,
  RefreshCw
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { siteConfig, homeContent } from '../data/content';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// Sample accredited program database for interactive live demonstration
const SAMPLE_PROGRAMS = [
  {
    id: 1,
    title: 'B.Eng. Artificial Intelligence & Robotics',
    university: 'McGill University',
    country: 'Canada',
    code: 'ca',
    level: "Undergraduate / Bachelor's",
    field: 'Computer Science & Artificial Intelligence',
    duration: '4 Years',
    language: 'English',
    curricula: 'French Bac (14+), IB (34+), A-Levels (AAB)',
    scholarship: 'Up to 40% Merit Quota'
  },
  {
    id: 2,
    title: 'B.Sc. Mechanical & Aerospace Engineering',
    university: 'University of Utah',
    country: 'United States',
    code: 'us',
    level: "Undergraduate / Bachelor's",
    field: 'Engineering & Technology',
    duration: '4 Years',
    language: 'English',
    curricula: 'WAEC (Distinction), IB (32+), French Bac (13.5+)',
    scholarship: 'Direct Institutional Grant'
  },
  {
    id: 3,
    title: 'M.Sc. Global Public Health & Epidemiology',
    university: 'Middle Tennessee State University',
    country: 'United States',
    code: 'us',
    level: "Postgraduate / Master's",
    field: 'Medicine, Health & Biomedical Sciences',
    duration: '2 Years',
    language: 'English',
    curricula: 'Accredited Bachelor (GPA 3.2+)',
    scholarship: 'Research Assistantship'
  },
  {
    id: 4,
    title: 'Licence en Finance Internationale & Gestion',
    university: 'Université de Moncton',
    country: 'Canada',
    code: 'ca',
    level: "Undergraduate / Bachelor's",
    field: 'Business, Finance & Management',
    duration: '3-4 Years',
    language: 'French',
    curricula: 'Baccalauréat Français / Africain (Mention Bien)',
    scholarship: 'Bourse d\'Excellence Francophone'
  },
  {
    id: 5,
    title: 'B.Sc. Applied Computing & Software Engineering',
    university: 'Sheridan College Institute of Technology',
    country: 'Canada',
    code: 'ca',
    level: "Undergraduate / Bachelor's",
    field: 'Computer Science & Artificial Intelligence',
    duration: '4 Years (with Co-op)',
    language: 'English',
    curricula: 'WAEC / French Bac / Cambridge A-Levels',
    scholarship: 'Co-op Work Term Placement'
  },
  {
    id: 6,
    title: 'International Foundation Year in Engineering',
    university: 'Seattle Colleges Higher Education District',
    country: 'United States',
    code: 'us',
    level: 'University Foundation Year',
    field: 'Engineering & Technology',
    duration: '1 Year (Pathways to Tier-1)',
    language: 'English',
    curricula: 'Completed Secondary Terminale / High School',
    scholarship: 'Guaranteed University Transfer'
  },
  {
    id: 7,
    title: 'B.Sc. Biomedical Science & Genetics',
    university: 'Clayton State University',
    country: 'United States',
    code: 'us',
    level: "Undergraduate / Bachelor's",
    field: 'Medicine, Health & Biomedical Sciences',
    duration: '4 Years',
    language: 'English',
    curricula: 'French Bac (S), WAEC Sciences, IB Diploma',
    scholarship: 'International Merit Waiver'
  },
  {
    id: 8,
    title: 'Advanced Diploma in Interactive Media & Web',
    university: 'St. Clair College of Applied Arts',
    country: 'Canada',
    code: 'ca',
    level: 'Executive & Specialized Diploma',
    field: 'Computer Science & Artificial Intelligence',
    duration: '2-3 Years (PGWP Eligible)',
    language: 'English',
    curricula: 'High School Diploma / Baccalauréat',
    scholarship: 'Applied Technology Bursary'
  }
];

export default function CourseFinderPage() {
  useDocumentTitle('Course Finder | 96,083 Global Degree Programs');

  const { courseDirectory } = homeContent;

  const [keyword, setKeyword] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [activeQuickField, setActiveQuickField] = useState('');

  // Filtered Programs
  const filteredPrograms = useMemo(() => {
    return SAMPLE_PROGRAMS.filter((prog) => {
      const matchKeyword =
        !keyword ||
        prog.title.toLowerCase().includes(keyword.toLowerCase()) ||
        prog.university.toLowerCase().includes(keyword.toLowerCase());

      const matchDestination =
        !selectedDestination ||
        selectedDestination === 'All' ||
        prog.country === selectedDestination;

      const matchLevel =
        !selectedLevel ||
        selectedLevel === 'All' ||
        prog.level === selectedLevel;

      const matchField =
        (!selectedField || prog.field === selectedField) &&
        (!activeQuickField || prog.field === activeQuickField);

      return matchKeyword && matchDestination && matchLevel && matchField;
    });
  }, [keyword, selectedDestination, selectedLevel, selectedField, activeQuickField]);

  const resetFilters = () => {
    setKeyword('');
    setSelectedDestination('');
    setSelectedLevel('');
    setSelectedField('');
    setActiveQuickField('');
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-navy-800 text-center relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="animate-hero-1 inline-block text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/30">
            Global Search Engine & Academic Directory
          </span>
          <h1 className="animate-hero-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Course Finder
          </h1>
          <p className="animate-hero-3 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Index of 96,083 programs across accredited institutions in 24 destination countries, directly matched to African secondary school curricula.
          </p>
        </div>
      </section>

      {/* Main Search & Directory Body */}
      <Section
        id="finder-console"
        background="light"
        align="left"
        className="py-12 sm:py-16 border-b border-slate-200"
      >
        {/* Interactive Filter Control Panel */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card mb-10">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            {/* Search Keyword */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search programs by degree title, subject or university (e.g. Artificial Intelligence, Robotics, Finance)..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-navy-600 placeholder-slate-400"
              />
            </div>

            {/* Quick Reset */}
            {(keyword || selectedDestination || selectedLevel || selectedField || activeQuickField) && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Secondary Dropdown Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
            {/* Destination */}
            <div>
              <label htmlFor="finder-dest" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Destination Country
              </label>
              <select
                id="finder-dest"
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-navy-600"
              >
                <option value="">All Destinations (24 Countries)</option>
                {courseDirectory.destinations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Study Level */}
            <div>
              <label htmlFor="finder-lvl" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Degree Level
              </label>
              <select
                id="finder-lvl"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-navy-600"
              >
                <option value="">All Degree Levels</option>
                {courseDirectory.studyLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            {/* Field of Study */}
            <div>
              <label htmlFor="finder-field" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Academic Discipline
              </label>
              <select
                id="finder-field"
                value={selectedField}
                onChange={(e) => {
                  setSelectedField(e.target.value);
                  setActiveQuickField('');
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-navy-600"
              >
                <option value="">All Disciplines</option>
                {courseDirectory.fieldsOfStudy.map((fld) => (
                  <option key={fld} value={fld}>{fld}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter & Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
              Indexed Degree Programs
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing representative program index. 96,083 full records available via verified school consoles.
            </p>
          </div>
          <div className="text-xs font-semibold text-navy-800 bg-navy-50 px-3 py-1.5 rounded-full border border-navy-200">
            {filteredPrograms.length} Featured Pathways Found
          </div>
        </div>

        {/* Program Cards Grid */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredPrograms.map((prog) => (
              <Card
                key={prog.id}
                variant="light"
                hoverEffect={true}
                className="p-6 bg-white border border-slate-200/90 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold-700 bg-gold-50 border border-gold-200 px-2.5 py-0.5 rounded-md">
                      {prog.level}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 shrink-0">
                      <img
                        src={`https://flagcdn.com/w40/${prog.code}.png`}
                        alt={`${prog.country} flag`}
                        className="w-4 h-3 object-cover rounded shadow-xs"
                      />
                      <span>{prog.country}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-slate-900 mb-1.5 leading-snug tracking-tight">
                    {prog.title}
                  </h3>

                  <p className="text-sm font-semibold text-navy-800 mb-4 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{prog.university}</span>
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Duration & Language:</span>
                      <span className="font-medium text-slate-800">{prog.duration} · {prog.language}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Accredited Equivalency:</span>
                      <span className="font-medium text-slate-800">{prog.curricula}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Institutional Accord:</span>
                      <span className="font-semibold text-gold-700">{prog.scholarship}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Partner School Allocation
                  </span>
                  <Button
                    to="/book-a-demo"
                    variant="navy"
                    size="sm"
                  >
                    Inquire for Cohort
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-subtle mb-12 space-y-3">
            <Compass className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-display text-lg font-bold text-slate-900">
              No matching sample programs found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your keyword, destination, or study level filters, or request full institutional directory access.
            </p>
            <Button
              onClick={resetFilters}
              variant="outlineDark"
              size="sm"
            >
              Reset All Filters
            </Button>
          </div>
        )}

        {/* Gated Institutional Access Callout */}
        <div className="p-8 sm:p-10 rounded-2xl bg-navy-950 text-white border border-navy-800 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-gold-400" />
              <span>Full Directory Reserved for Partner Institutions</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Looking for specific degree thresholds, tuition matrices, or scholarship quotas?
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Complete course indices, curriculum equivalency tables, and direct university submission pathways are accessible exclusively through authorized partner school consoles.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                to="/book-a-demo"
                variant="gold"
                size="md"
                icon={ArrowRight}
                className="w-full sm:w-auto"
              >
                Request Institutional Briefing
              </Button>
              <a
                href={siteConfig.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-navy-800 hover:bg-navy-700 border border-gold-500/30 transition-colors w-full sm:w-auto"
              >
                <span>Partner Portal ({siteConfig.portalText})</span>
                <ArrowUpRight className="w-4 h-4 text-gold-400" />
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
