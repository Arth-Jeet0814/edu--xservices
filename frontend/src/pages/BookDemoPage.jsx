import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, ShieldCheck, CheckCircle2, Send, Sparkles, Building2 } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { siteConfig, bookDemoContent, homeContent } from '../data/content';
import { submitEnquiry } from '../data/api';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function BookDemoPage() {
  useDocumentTitle('Book A Meeting | Private Institutional Briefing');

  const { formOptions } = homeContent.partnership;
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'scheduler'
  const [inquiredCourse, setInquiredCourse] = useState(null);

  const [formData, setFormData] = useState({
    institutionName: '',
    institutionType: '',
    ownershipType: '',
    curriculumType: '',
    institutionalPositioning: '',
    languageOfInstruction: '',
    country: '',
    studentPopulation: '',
    internationalOrientation: '',
    parentMarketType: '',
    contactName: '',
    decisionMakerType: '',
    contactTitle: '',
    email: '',
    phone: '',
    rationale: '',
  });

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const course = params.get('course');
      const uni = params.get('uni');
      const country = params.get('country');
      if (course || uni || country) {
        setInquiredCourse({ course, uni, country });
        setFormData((prev) => ({
          ...prev,
          institutionName: prev.institutionName || uni || '',
          country: prev.country || country || '',
          rationale: prev.rationale || `Seeking institutional partnership for degree cohort: ${course || ''}${uni ? ` at ${uni}` : ''}${country ? ` (${country})` : ''}`.trim()
        }));
      }
    } catch (e) {
      // URL parsing fallback
    }
  }, []);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.institutionName.trim()) errs.institutionName = 'Institution Name is required';
    if (!formData.institutionType) errs.institutionType = 'Please select institution type';
    if (!formData.ownershipType) errs.ownershipType = 'Please select ownership type';
    if (!formData.curriculumType) errs.curriculumType = 'Please select curriculum type';
    if (!formData.institutionalPositioning) errs.institutionalPositioning = 'Please select institutional positioning';
    if (!formData.languageOfInstruction) errs.languageOfInstruction = 'Please select language of instruction';
    if (!formData.country) errs.country = 'Please select country';
    if (!formData.studentPopulation) errs.studentPopulation = 'Please select student population range';
    if (!formData.internationalOrientation) errs.internationalOrientation = 'Please select orientation level';
    if (!formData.parentMarketType) errs.parentMarketType = 'Please select parent market type';
    if (!formData.contactName.trim()) errs.contactName = 'Contact full name is required';
    if (!formData.decisionMakerType) errs.decisionMakerType = 'Please select decision-maker role';
    if (!formData.contactTitle.trim()) errs.contactTitle = 'Contact title is required';
    if (!formData.email.trim()) {
      errs.email = 'Official institutional email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid institutional email';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone / WhatsApp is required';
    if (!formData.rationale.trim()) errs.rationale = 'Please provide brief institutional context';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorEl = document.querySelector('[aria-invalid="true"], .border-destructive');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    submitEnquiry({
      ...formData,
      fullName: formData.contactName,
      university: formData.institutionName,
      preferredCountry: formData.country,
      courseName: inquiredCourse?.course || '',
      targetIntake: 'Upcoming Academic Cycle',
      notes: `Title: ${formData.contactTitle} | Role: ${formData.decisionMakerType} | Type: ${formData.institutionType} | Ownership: ${formData.ownershipType} | Curriculum: ${formData.curriculumType} | Positioning: ${formData.institutionalPositioning} | Language: ${formData.languageOfInstruction} | Population: ${formData.studentPopulation} | Orientation: ${formData.internationalOrientation} | Market: ${formData.parentMarketType} | Rationale: ${formData.rationale}`,
      purpose: inquiredCourse ? 'Degree & Program Admission' : 'Private Institutional Briefing'
    }).finally(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION (Gradient Hero + Rotating Orbital SVGs) */}
      <section className="relative gradient-hero text-foreground pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-border">
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
            <Building2 className="w-4 h-4 text-primary" />
            <span>{bookDemoContent.hero.eyebrow}</span>
          </div>

          {/* H1 */}
          <h1 className="animate-hero-2 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-extrabold tracking-tight text-foreground leading-[1.12] mb-4 max-w-4xl">
            Schedule an{' '}
            <span className="text-primary font-extrabold">Executive Briefing</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-hero-3 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8 font-normal">
            {bookDemoContent.hero.lead}
          </p>

          {/* Metric Highlights Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-4xl animate-hero-4">
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-primary/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">45 Min</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Executive Review</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-crimson/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-crimson">1-on-1</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Institutional Lead</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-accent/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-accent">100%</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Confidential Protocol</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-primary/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">Custom</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Cohort Roadmap</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN BOOKING SECTION */}
      <Section
        id="booking-section"
        background="light"
        align="left"
        className="py-12 sm:py-20"
      >
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Briefing Parameters Overview Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-card border border-border shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Session Duration</h4>
                <p className="text-sm font-bold text-foreground">45 Min Executive Review</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-card border border-border shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Briefing Format</h4>
                <p className="text-sm font-bold text-foreground">Secure Video or In-Person</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-card border border-border shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Confidentiality</h4>
                <p className="text-sm font-bold text-foreground">Strict Discretion & NDA</p>
              </div>
            </div>
          </div>

          {/* Form Container Card */}
          <div className="bg-card rounded-3xl p-6 sm:p-10 border border-border shadow-card">
            {/* Selector Tabs */}
            <div className="flex items-center gap-2 mb-8 p-1.5 bg-secondary rounded-2xl max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'form'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Direct Request Form
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('scheduler')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'scheduler'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>Calendly Scheduler</span>
              </button>
            </div>

            {activeTab === 'scheduler' ? (
              /* Calendly Embed Placeholder Area */
              <div className="border border-dashed border-border rounded-2xl p-8 text-center bg-secondary/30 min-h-[460px] flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-accent/15 text-accent-foreground flex items-center justify-center border border-accent/30 animate-float">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
                  Embedded Scheduler (Calendly)
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
                  This designated container is configured to host your Calendly inline scheduling widget (e.g., using <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground font-mono">https://calendly.com/your-organization</code>).
                </p>
                <Button
                  onClick={() => setActiveTab('form')}
                  variant="primary"
                  size="sm"
                >
                  Or Use Direct Request Form
                </Button>
              </div>
            ) : isSubmitted ? (
              /* Success View */
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-soft animate-float">
                  <span className="animate-radar absolute inset-0 rounded-full border border-emerald-500/50"></span>
                  <CheckCircle2 className="w-8 h-8 relative z-10" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground tracking-tight">
                  Briefing Request Confirmed
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.contactName}. Our executive office will contact you within 24 hours to confirm your private institutional briefing for {formData.institutionName}.
                </p>
                <div className="pt-4">
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    size="sm"
                  >
                    Submit Another Briefing Request
                  </Button>
                </div>
              </div>
            ) : (
              /* Direct Booking Form with Requested 16 Fields */
              <form onSubmit={handleSubmit} noValidate className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* 1. INSTITUTION NAME */}
                  <div>
                    <label htmlFor="bInstitutionName" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Institution Name <span className="text-crimson">*</span>
                    </label>
                    <input
                      type="text"
                      id="bInstitutionName"
                      name="institutionName"
                      value={formData.institutionName}
                      onChange={handleChange}
                      placeholder="Full official name"
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                        errors.institutionName ? 'border-destructive' : 'border-input'
                      }`}
                    />
                    {errors.institutionName && <p className="text-destructive text-xs mt-1">{errors.institutionName}</p>}
                  </div>

                  {/* 2. INSTITUTION TYPE */}
                  <div>
                    <label htmlFor="bInstitutionType" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Institution Type <span className="text-crimson">*</span>
                    </label>
                    <select
                      id="bInstitutionType"
                      name="institutionType"
                      value={formData.institutionType}
                      onChange={handleChange}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all cursor-pointer ${
                        errors.institutionType ? 'border-destructive' : 'border-input'
                      }`}
                    >
                      <option value="">Select</option>
                      {formOptions.institutionTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.institutionType && <p className="text-destructive text-xs mt-1">{errors.institutionType}</p>}
                  </div>

                  {/* 3. OWNERSHIP TYPE */}
                  <div>
                    <label htmlFor="bOwnershipType" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Ownership Type <span className="text-crimson">*</span>
                    </label>
                    <select
                      id="bOwnershipType"
                      name="ownershipType"
                      value={formData.ownershipType}
                      onChange={handleChange}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all cursor-pointer ${
                        errors.ownershipType ? 'border-destructive' : 'border-input'
                      }`}
                    >
                      <option value="">Select</option>
                      {formOptions.ownershipTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.ownershipType && <p className="text-destructive text-xs mt-1">{errors.ownershipType}</p>}
                  </div>

                  {/* 4. CURRICULUM TYPE */}
                  <div>
                    <label htmlFor="bCurriculumType" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Curriculum Type <span className="text-crimson">*</span>
                    </label>
                    <select
                      id="bCurriculumType"
                      name="curriculumType"
                      value={formData.curriculumType}
                      onChange={handleChange}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all cursor-pointer ${
                        errors.curriculumType ? 'border-destructive' : 'border-input'
                      }`}
                    >
                      <option value="">Select</option>
                      {formOptions.curriculumTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.curriculumType && <p className="text-destructive text-xs mt-1">{errors.curriculumType}</p>}
                  </div>

                  {/* 5. INSTITUTIONAL POSITIONING */}
                  <div>
                    <label htmlFor="bInstitutionalPositioning" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Institutional Positioning <span className="text-crimson">*</span>
                    </label>
                    <select
                      id="bInstitutionalPositioning"
                      name="institutionalPositioning"
                      value={formData.institutionalPositioning}
                      onChange={handleChange}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all cursor-pointer ${
                        errors.institutionalPositioning ? 'border-destructive' : 'border-input'
                      }`}
                    >
                      <option value="">Select</option>
                      {formOptions.institutionalPositioning.map((pos) => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                    {errors.institutionalPositioning && <p className="text-destructive text-xs mt-1">{errors.institutionalPositioning}</p>}
                  </div>

                  {/* 6. MAIN LANGUAGE OF INSTRUCTION */}
                  <div>
                    <label htmlFor="bLanguageOfInstruction" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Main Language of Instruction <span className="text-crimson">*</span>
                    </label>
                    <select
                      id="bLanguageOfInstruction"
                      name="languageOfInstruction"
                      value={formData.languageOfInstruction}
                      onChange={handleChange}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all cursor-pointer ${
                        errors.languageOfInstruction ? 'border-destructive' : 'border-input'
                      }`}
                    >
                      <option value="">Select</option>
                      {formOptions.languagesOfInstruction.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                    {errors.languageOfInstruction && <p className="text-destructive text-xs mt-1">{errors.languageOfInstruction}</p>}
                  </div>

                  {/* 7. COUNTRY */}
                  <div>
                    <label htmlFor="bCountry" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Country <span className="text-crimson">*</span>
                    </label>
                    <select
                      id="bCountry"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all cursor-pointer ${
                        errors.country ? 'border-destructive' : 'border-input'
                      }`}
                    >
                      <option value="">Select</option>
                      {formOptions.countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.country && <p className="text-destructive text-xs mt-1">{errors.country}</p>}
                  </div>

                  {/* 8. STUDENT POPULATION RANGE */}
                  <div>
                    <label htmlFor="bStudentPopulation" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Student Population Range <span className="text-crimson">*</span>
                    </label>
                    <select
                      id="bStudentPopulation"
                      name="studentPopulation"
                      value={formData.studentPopulation}
                      onChange={handleChange}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all cursor-pointer ${
                        errors.studentPopulation ? 'border-destructive' : 'border-input'
                      }`}
                    >
                      <option value="">Select</option>
                      {formOptions.studentPopulationRanges.map((pop) => (
                        <option key={pop} value={pop}>{pop}</option>
                      ))}
                    </select>
                    {errors.studentPopulation && <p className="text-destructive text-xs mt-1">{errors.studentPopulation}</p>}
                  </div>

                  {/* 9. INTERNATIONAL ORIENTATION LEVEL */}
                  <div>
                    <label htmlFor="bInternationalOrientation" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      International Orientation Level <span className="text-crimson">*</span>
                    </label>
                    <select
                      id="bInternationalOrientation"
                      name="internationalOrientation"
                      value={formData.internationalOrientation}
                      onChange={handleChange}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all cursor-pointer ${
                        errors.internationalOrientation ? 'border-destructive' : 'border-input'
                      }`}
                    >
                      <option value="">Select</option>
                      {formOptions.internationalOrientationLevels.map((lvl) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                    {errors.internationalOrientation && <p className="text-destructive text-xs mt-1">{errors.internationalOrientation}</p>}
                  </div>

                  {/* 10. PARENT MARKET TYPE */}
                  <div>
                    <label htmlFor="bParentMarketType" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Parent Market Type <span className="text-crimson">*</span>
                    </label>
                    <select
                      id="bParentMarketType"
                      name="parentMarketType"
                      value={formData.parentMarketType}
                      onChange={handleChange}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all cursor-pointer ${
                        errors.parentMarketType ? 'border-destructive' : 'border-input'
                      }`}
                    >
                      <option value="">Select</option>
                      {formOptions.parentMarketTypes.map((pm) => (
                        <option key={pm} value={pm}>{pm}</option>
                      ))}
                    </select>
                    {errors.parentMarketType && <p className="text-destructive text-xs mt-1">{errors.parentMarketType}</p>}
                  </div>

                  {/* 11. CONTACT FULL NAME */}
                  <div>
                    <label htmlFor="bContactName" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Contact Full Name <span className="text-crimson">*</span>
                    </label>
                    <input
                      type="text"
                      id="bContactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="Contact Full Name"
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                        errors.contactName ? 'border-destructive' : 'border-input'
                      }`}
                    />
                    {errors.contactName && <p className="text-destructive text-xs mt-1">{errors.contactName}</p>}
                  </div>

                  {/* 12. DECISION-MAKER TYPE */}
                  <div>
                    <label htmlFor="bDecisionMakerType" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Decision-Maker Type <span className="text-crimson">*</span>
                    </label>
                    <select
                      id="bDecisionMakerType"
                      name="decisionMakerType"
                      value={formData.decisionMakerType}
                      onChange={handleChange}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all cursor-pointer ${
                        errors.decisionMakerType ? 'border-destructive' : 'border-input'
                      }`}
                    >
                      <option value="">Select</option>
                      {formOptions.decisionMakerTypes.map((dm) => (
                        <option key={dm} value={dm}>{dm}</option>
                      ))}
                    </select>
                    {errors.decisionMakerType && <p className="text-destructive text-xs mt-1">{errors.decisionMakerType}</p>}
                  </div>

                  {/* 13. CONTACT TITLE */}
                  <div>
                    <label htmlFor="bContactTitle" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Contact Title <span className="text-crimson">*</span>
                    </label>
                    <input
                      type="text"
                      id="bContactTitle"
                      name="contactTitle"
                      value={formData.contactTitle}
                      onChange={handleChange}
                      placeholder="Contact Title"
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                        errors.contactTitle ? 'border-destructive' : 'border-input'
                      }`}
                    />
                    {errors.contactTitle && <p className="text-destructive text-xs mt-1">{errors.contactTitle}</p>}
                  </div>

                  {/* 14. EMAIL */}
                  <div>
                    <label htmlFor="bEmail" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Email <span className="text-crimson">*</span>
                    </label>
                    <input
                      type="email"
                      id="bEmail"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                        errors.email ? 'border-destructive' : 'border-input'
                      }`}
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* 15. PHONE / WHATSAPP */}
                  <div>
                    <label htmlFor="bPhone" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Phone / WhatsApp <span className="text-crimson">*</span>
                    </label>
                    <input
                      type="tel"
                      id="bPhone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone / WhatsApp"
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                        errors.phone ? 'border-destructive' : 'border-input'
                      }`}
                    />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* 16. WHY YOUR INSTITUTION IS SEEKING THIS PARTNERSHIP */}
                  <div className="md:col-span-2 lg:col-span-3">
                    <label htmlFor="bRationale" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Why your institution is seeking this partnership <span className="text-crimson">*</span>
                    </label>
                    <textarea
                      id="bRationale"
                      name="rationale"
                      rows={4}
                      value={formData.rationale}
                      onChange={handleChange}
                      placeholder=""
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                        errors.rationale ? 'border-destructive' : 'border-input'
                      }`}
                    />
                    {errors.rationale && <p className="text-destructive text-xs mt-1">{errors.rationale}</p>}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground">
                    All submissions are reviewed individually under strict institutional confidentiality.
                  </p>
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={isSubmitting}
                    icon={Send}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Submitting Request...' : 'Submit Institutional Request'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
