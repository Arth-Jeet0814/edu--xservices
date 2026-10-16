import React, { useState, useMemo } from 'react';
import {
  Search,
  Building,
  Lock,
  ArrowRight,
  ArrowUpRight,
  Compass,
  RefreshCw,
  Sparkles,
  BookOpen,
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
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION (New Theme: Gradient Hero + Rotating Orbital SVGs) */}
      <section className="relative gradient-hero text-foreground pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Global Search Engine & Academic Directory</span>
          </div>

          {/* H1 */}
          <h1 className="animate-hero-2 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-extrabold tracking-tight text-foreground leading-[1.12] mb-4 max-w-4xl">
            Find Your Program Across{' '}
            <span className="text-primary font-extrabold">96,083 Degrees</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-hero-3 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8 font-normal">
            Directly indexed from accredited universities across 24 destination countries, cross-mapped to French Baccalauréat, WAEC, Cambridge A-Levels, and IB Diploma curricula.
          </p>

          {/* Metric Highlights Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-4xl animate-hero-4 mb-4">
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-accent/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-accent">96,083+</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Degree Programs</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-primary/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">500+</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Partner Universities</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-crimson/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-crimson">24</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Study Destinations</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-primary/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">100%</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Accredited Pathways</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SEARCH & DIRECTORY CONSOLE */}
      <Section
        id="finder-console"
        background="light"
        align="left"
        className="!pt-0 pb-16 sm:pb-24 relative overflow-hidden"
      >
        {/* Ambient Atmospheric Lighting & Depth */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/5 via-primary/[0.02] to-transparent pointer-events-none" aria-hidden="true" />
        <div className="absolute top-20 -right-20 w-[500px] h-[500px] bg-accent/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute top-96 -left-20 w-[500px] h-[500px] bg-primary/6 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        {/* Floating Overlapping Filter Control Panel (Hero Bridge) */}
        <div className="-mt-12 sm:-mt-16 lg:-mt-20 relative z-20 bg-card/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-10 border border-border/80 shadow-lift mb-10 ring-1 ring-black/[0.03]">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-border">
            {/* Search Keyword Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                aria-label="Search academic programs by degree title, subject or university"
                placeholder="Search programs by degree title, subject or university (e.g. Artificial Intelligence, Robotics, Finance)..."
                className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary placeholder:text-muted-foreground transition-all"
              />
            </div>

            {/* Quick Reset */}
            {(keyword || selectedDestination || selectedLevel || selectedField || activeQuickField) && (
              <button
                type="button"
                onClick={resetFilters}
                className="group inline-flex items-center gap-1.5 px-4 py-3 text-xs font-semibold text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Secondary Dropdown Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
            {/* Destination */}
            <div>
              <label htmlFor="finder-dest" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                Destination Country
              </label>
              <select
                id="finder-dest"
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full bg-background border border-input rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary cursor-pointer transition-all"
              >
                <option value="">All Destinations (24 Countries)</option>
                {courseDirectory.destinations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Study Level */}
            <div>
              <label htmlFor="finder-level" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                Study Level
              </label>
              <select
                id="finder-level"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-background border border-input rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary cursor-pointer transition-all"
              >
                <option value="">All Levels</option>
                {courseDirectory.studyLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            {/* Field of Study */}
            <div>
              <label htmlFor="finder-field" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                Field of Study
              </label>
              <select
                id="finder-field"
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full bg-background border border-input rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary cursor-pointer transition-all"
              >
                <option value="">All Fields of Study</option>
                {courseDirectory.fieldsOfStudy.map((fld) => (
                  <option key={fld} value={fld}>{fld}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Filter Subject Pills */}
          <div className="pt-5 mt-5 border-t border-border flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-accent" /> Popular:
            </span>
            {courseDirectory.fieldsOfStudy.slice(0, 4).map((fld) => (
              <button
                key={fld}
                type="button"
                onClick={() => setActiveQuickField(activeQuickField === fld ? '' : fld)}
                className={`px-3.5 py-2 min-h-[40px] inline-flex items-center justify-center rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeQuickField === fld
                    ? 'bg-primary text-primary-foreground shadow-xs font-bold'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                }`}
              >
                {fld}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
              Indexed Degree Programs
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Showing representative program index. 96,083 full records available via verified school consoles.
            </p>
          </div>
          <div className="text-xs font-semibold text-primary bg-primary-soft/80 px-3.5 py-1.5 rounded-full border border-primary/20">
            {filteredPrograms.length} Featured Pathways Found
          </div>
        </div>

        {/* Program Cards Grid (New Theme Cards) */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredPrograms.map((prog) => (
              <Card
                key={prog.id}
                variant="light"
                hoverEffect={true}
                className="p-7 bg-card border border-border rounded-3xl shadow-soft hover:shadow-card hover:border-primary/40 flex flex-col justify-between card-hover-lift transition-all duration-300"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent-foreground bg-accent/15 border border-accent/30 px-2.5 py-0.5 rounded-md">
                      {prog.level}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                      <img
                        src={`https://flagcdn.com/w40/${prog.code}.png`}
                        alt={`${prog.country} flag`}
                        className="w-4 h-3 object-cover rounded shadow-xs"
                      />
                      <span>{prog.country}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-foreground mb-1.5 leading-snug tracking-tight">
                    {prog.title}
                  </h3>

                  <p className="text-sm font-semibold text-primary mb-4 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span>{prog.university}</span>
                  </p>

                  <div className="space-y-1.5 text-xs text-muted-foreground pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration & Language:</span>
                      <span className="font-medium text-foreground">{prog.duration} · {prog.language}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Accredited Equivalency:</span>
                      <span className="font-medium text-foreground">{prog.curricula}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Institutional Accord:</span>
                      <span className="font-semibold text-accent">{prog.scholarship}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-medium">
                    Partner School Allocation
                  </span>
                  <Button
                    to="/book-a-demo"
                    variant="accent"
                    size="sm"
                  >
                    Inquire for Cohort
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-card rounded-3xl border border-border shadow-soft mb-12 space-y-3">
            <Compass className="w-10 h-10 text-muted-foreground mx-auto animate-float" />
            <h3 className="font-display text-lg font-bold text-foreground">
              No matching sample programs found
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Try adjusting your keyword, destination, or study level filters, or request full institutional directory access.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-primary font-bold hover:underline cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Institutional Gate Notice Box */}
        <div className="rounded-3xl bg-card border border-border p-8 text-center shadow-card relative overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-primary-soft text-primary border border-primary/20 flex items-center justify-center mx-auto mb-3 shadow-xs animate-float">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2 tracking-tight">
            Full 96,083 Program Directory Reserved for Partner Schools
          </h3>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed font-normal">
            Direct university application submission lines, tuition fee frameworks, merit scholarship quotas, and visa compliance checklists are accessible exclusively through authorized institutional consoles.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              to="/book-a-demo"
              variant="accent"
              size="md"
              icon={ArrowRight}
            >
              Request School Console Access
            </Button>
            <a
              href={siteConfig.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-foreground bg-secondary hover:bg-secondary/80 border border-border transition-all"
            >
              <span>Partner Portal Login ({siteConfig.portalText})</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
