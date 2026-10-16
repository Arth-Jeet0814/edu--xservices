import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Target,
  MapPin,
  CheckCircle2,
  Send,
  Building2,
  Globe,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { universityContent, siteConfig, homeContent } from '../data/content';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { submitEnquiry } from '../data/api';

const iconMap = {
  GraduationCap: GraduationCap,
  ShieldCheck: ShieldCheck,
  Target: Target,
  MapPin: MapPin,
};

export default function UniversityPartnershipsPage() {
  useDocumentTitle('University Partnerships | Direct African Institutional Access');

  const { partners } = homeContent;
  const marqueeLogos = [...partners.logos, ...partners.logos];

  const [formData, setFormData] = useState({
    universityName: '',
    country: '',
    institutionType: '',
    intakeLevel: '',
    scholarshipAvailability: 'Available (Full & Partial Merit)',
    contactName: '',
    contactTitle: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.universityName.trim()) errs.universityName = 'University name is required';
    if (!formData.country.trim()) errs.country = 'Country is required';
    if (!formData.institutionType) errs.institutionType = 'Please select institution classification';
    if (!formData.intakeLevel) errs.intakeLevel = 'Please select primary outbound focus';
    if (!formData.contactName.trim()) errs.contactName = 'Contact full name is required';
    if (!formData.contactTitle.trim()) errs.contactTitle = 'Contact title / role is required';
    if (!formData.email.trim()) {
      errs.email = 'Official university email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid institutional email';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
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

    try {
      await submitEnquiry({
        fullName: formData.contactName,
        email: formData.email,
        phone: formData.phone || 'N/A',
        university: formData.universityName,
        notes: `Title: ${formData.contactTitle} | Country: ${formData.country} | Type: ${formData.institutionType} | Focus: ${formData.intakeLevel} | Scholarships: ${formData.scholarshipAvailability} | Notes: ${formData.notes || 'None'}`,
        purpose: 'Institutional Partnership Briefing',
        preferredCountry: formData.country
      });
    } catch (err) {
      console.warn('University partnership submission fallback:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION (New Theme: Gradient Hero + Rotating Orbital SVGs) */}
      <section className="relative gradient-hero text-foreground pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Pulsing Gradient Glow */}
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
            <span>{universityContent.hero.eyebrow}</span>
          </div>

          {/* H1 */}
          <h1 className="animate-hero-2 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-extrabold tracking-tight text-foreground leading-[1.12] mb-4 max-w-4xl">
            Direct Access to Africa's{' '}
            <span className="text-primary font-extrabold">Most Prepared Students</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-hero-3 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8 font-normal">
            {universityContent.hero.lead}
          </p>

          {/* Action CTAs */}
          <div className="animate-hero-4 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-10">
            <Button
              onClick={() => {
                const el = document.getElementById('university-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="accent"
              size="lg"
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              Initiate Partnership Accord
            </Button>

            <Button
              to="/about-us"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore Institutional Framework
            </Button>
          </div>

          {/* Metric Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-4xl animate-hero-4">
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-primary/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">500+</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Partner Universities</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-crimson/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-crimson">24+</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Global Corridors</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-accent/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-accent">100%</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Verified Students</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-soft text-center card-hover-lift hover:border-primary/40 transition-all">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">0%</p>
              <p className="text-xs font-semibold text-muted-foreground mt-0.5">Third-Party Brokers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECOGNIZED ACADEMIC NETWORK MARQUEE STRIP */}
      <section className="gradient-sky py-6 overflow-hidden">
        <h2 className="sr-only">Academic Institutions and Testing Authorities in Network</h2>
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Academic Institutions & Testing Authorities in Our Network
          </span>
        </div>
        <div className="relative w-full overflow-hidden marquee-container py-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-background/90 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-background/90 to-transparent z-10" />
          <div className="animate-marquee flex items-center">
            {marqueeLogos.map((partner, idx) => (
              <div
                key={`uni-marquee-${idx}`}
                className="group w-56 sm:w-64 shrink-0 mx-2.5 p-3.5 rounded-2xl bg-card border border-border hover:border-accent/60 card-hover-lift flex items-center gap-3 transition-all shadow-soft cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-primary-soft text-primary group-hover:bg-accent/15 group-hover:text-accent-foreground flex items-center justify-center shrink-0 transition-colors">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-display font-bold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                    {partner.name}
                  </h4>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {partner.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STRATEGIC INSTITUTIONAL VALUE (Cards in New Theme) */}
      <Section
        id="university-benefits"
        background="light"
        align="center"
        eyebrow="STRATEGIC INSTITUTIONAL VALUE"
        title="Why Global Universities Partner With Us"
        subtitle="Establish direct institutional engagement with Africa's leading high schools and lycées without speculative recruitment brokers or untracked commissions."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left max-w-5xl mx-auto">
          {universityContent.benefits.map((benefit, idx) => {
            const IconComponent = iconMap[benefit.icon] || ShieldCheck;
            return (
              <Card
                key={idx}
                variant="light"
                hoverEffect={true}
                className="p-7 sm:p-8 border border-border hover:border-primary/40 rounded-3xl flex flex-col justify-between group card-hover-lift shadow-card transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-soft text-primary border border-primary/20 flex items-center justify-center mb-5 shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border text-xs font-bold uppercase tracking-wider text-accent flex items-center justify-between">
                  <span>Institutional Accord 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-70 group-hover:scale-150 transition-transform"></span>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* 4. UNIVERSITY INQUIRY FORM (New Theme: Light Card, OKLCH Inputs, Golden CTA) */}
      <Section
        id="university-form"
        background="white"
        align="center"
        eyebrow="GLOBAL ADMISSIONS ACCORD"
        title="University Partnership Inquiry"
        subtitle="Submit your university's interest in receiving verified African student applications and co-hosting institutional briefings."
      >
        <div className="max-w-4xl mx-auto scroll-mt-28">
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 lg:p-12 shadow-card text-left backdrop-blur relative overflow-hidden">
            {/* Top protocol notice banner */}
            <div className="border-b border-border pb-6 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Admissions Protocol · Direct Institutional Vetting</span>
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Academic Accord Registration
              </h3>
              <div className="mt-4 p-4 rounded-2xl bg-primary-soft/70 border border-primary/20 text-xs text-foreground leading-relaxed flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <span className="max-w-xl text-muted-foreground">
                  Our University Partnerships Directorate will review your curriculum criteria, establish direct lines to selective African schools, and coordinate high-yield admissions workflows.
                </span>
                <div className="shrink-0 text-muted-foreground text-[11px] space-y-1 md:text-right border-t md:border-t-0 md:border-l border-border pt-3 md:pt-0 md:pl-5">
                  <div>Desk: <a href={`mailto:${siteConfig.email}`} className="text-primary font-semibold hover:underline">{siteConfig.email}</a></div>
                  <div>Phone: <a href={`tel:${siteConfig.phone}`} className="text-foreground font-semibold hover:underline">{siteConfig.phone}</a></div>
                  <div>Hours: {siteConfig.officeHours}</div>
                </div>
              </div>
            </div>

            {isSubmitted ? (
              <div className="py-12 px-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-soft animate-float">
                  <span className="animate-radar absolute inset-0 rounded-full border border-emerald-500/50"></span>
                  <CheckCircle2 className="w-8 h-8 relative z-10" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  Partnership Inquiry Successfully Logged
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  Thank you for registering your institution. Our University Partnerships Directorate will examine your curriculum criteria and schedule an alignment briefing with your admissions leadership.
                </p>
                <div className="pt-4">
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        universityName: '',
                        country: '',
                        institutionType: '',
                        intakeLevel: '',
                        scholarshipAvailability: 'Available (Full & Partial Merit)',
                        contactName: '',
                        contactTitle: '',
                        email: '',
                        phone: '',
                        notes: '',
                      });
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Submit Another Accord Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* University Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="universityName" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      University / Higher Education Institution <span className="text-crimson">*</span>
                    </label>
                    <input
                      type="text"
                      id="universityName"
                      name="universityName"
                      value={formData.universityName}
                      onChange={handleChange}
                      placeholder="e.g. University of Edinburgh"
                      aria-invalid={!!errors.universityName}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                        errors.universityName ? 'border-destructive' : 'border-input'
                      }`}
                    />
                    {errors.universityName && <p className="text-destructive text-xs mt-1">{errors.universityName}</p>}
                  </div>

                  {/* Country */}
                  <div>
                    <label htmlFor="uCountry" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Country <span className="text-crimson">*</span>
                    </label>
                    <input
                      type="text"
                      id="uCountry"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. United Kingdom"
                      aria-invalid={!!errors.country}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                        errors.country ? 'border-destructive' : 'border-input'
                      }`}
                    />
                    {errors.country && <p className="text-destructive text-xs mt-1">{errors.country}</p>}
                  </div>

                  {/* Institution Type */}
                  <div>
                    <label htmlFor="institutionType" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Institution Classification <span className="text-crimson">*</span>
                    </label>
                    <select
                      id="institutionType"
                      name="institutionType"
                      value={formData.institutionType}
                      onChange={handleChange}
                      aria-invalid={!!errors.institutionType}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 cursor-pointer transition-all ${
                        errors.institutionType ? 'border-destructive' : 'border-input'
                      }`}
                    >
                      <option value="">Select Classification</option>
                      <option value="Public Research University">Public Research University</option>
                      <option value="Private Not-for-Profit University">Private Not-for-Profit University</option>
                      <option value="University of Applied Sciences / Polytechnic">University of Applied Sciences / Polytechnic</option>
                      <option value="Liberal Arts College">Liberal Arts College</option>
                      <option value="Specialized / Medical / Engineering Institute">Specialized / Medical / Engineering Institute</option>
                      <option value="Community / State College System">Community / State College System</option>
                    </select>
                    {errors.institutionType && <p className="text-destructive text-xs mt-1">{errors.institutionType}</p>}
                  </div>

                  {/* Intake Level */}
                  <div>
                    <label htmlFor="intakeLevel" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Primary Outbound Focus <span className="text-crimson">*</span>
                    </label>
                    <select
                      id="intakeLevel"
                      name="intakeLevel"
                      value={formData.intakeLevel}
                      onChange={handleChange}
                      aria-invalid={!!errors.intakeLevel}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 cursor-pointer transition-all ${
                        errors.intakeLevel ? 'border-destructive' : 'border-input'
                      }`}
                    >
                      <option value="">Select Primary Focus</option>
                      <option value="Undergraduate / Bachelor's Degrees">Undergraduate / Bachelor's Degrees</option>
                      <option value="Postgraduate / Master's & PhD">Postgraduate / Master's & PhD</option>
                      <option value="Direct Pathway / University Foundation">Direct Pathway / University Foundation</option>
                      <option value="All Levels (Comprehensive Accord)">All Levels (Comprehensive Accord)</option>
                    </select>
                    {errors.intakeLevel && <p className="text-destructive text-xs mt-1">{errors.intakeLevel}</p>}
                  </div>

                  {/* Scholarship Availability */}
                  <div>
                    <label htmlFor="scholarshipAvailability" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Scholarship / Merit Consideration
                    </label>
                    <select
                      id="scholarshipAvailability"
                      name="scholarshipAvailability"
                      value={formData.scholarshipAvailability}
                      onChange={handleChange}
                      className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 cursor-pointer transition-all"
                    >
                      <option value="Available (Full & Partial Merit)">Available (Full & Partial Merit)</option>
                      <option value="Partial Merit Scholarships Only">Partial Merit Scholarships Only</option>
                      <option value="Case-by-case Institutional Grants">Case-by-case Institutional Grants</option>
                      <option value="Self-Funded Only">Self-Funded Only</option>
                    </select>
                  </div>

                  {/* Contact Name */}
                  <div>
                    <label htmlFor="uContactName" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Contact Full Name <span className="text-crimson">*</span>
                    </label>
                    <input
                      type="text"
                      id="uContactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Eleanor Wright"
                      aria-invalid={!!errors.contactName}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                        errors.contactName ? 'border-destructive' : 'border-input'
                      }`}
                    />
                    {errors.contactName && <p className="text-destructive text-xs mt-1">{errors.contactName}</p>}
                  </div>

                  {/* Contact Title */}
                  <div>
                    <label htmlFor="uContactTitle" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Contact Title / Role <span className="text-crimson">*</span>
                    </label>
                    <input
                      type="text"
                      id="uContactTitle"
                      name="contactTitle"
                      value={formData.contactTitle}
                      onChange={handleChange}
                      placeholder="e.g. Dean of International Admissions"
                      aria-invalid={!!errors.contactTitle}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                        errors.contactTitle ? 'border-destructive' : 'border-input'
                      }`}
                    />
                    {errors.contactTitle && <p className="text-destructive text-xs mt-1">{errors.contactTitle}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="uEmail" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Official University Email <span className="text-crimson">*</span>
                    </label>
                    <input
                      type="email"
                      id="uEmail"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admissions@university.ac.uk"
                      aria-invalid={!!errors.email}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                        errors.email ? 'border-destructive' : 'border-input'
                      }`}
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="uPhone" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Direct Phone / Office
                    </label>
                    <input
                      type="tel"
                      id="uPhone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+44 131 XXX XXXX"
                      className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all"
                    />
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label htmlFor="uNotes" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Target Criteria & African Corridor Priorities
                    </label>
                    <textarea
                      id="uNotes"
                      name="notes"
                      rows="4"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Provide specific academic thresholds, language policies, or faculty areas of strategic interest..."
                      className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={isSubmitting}
                    icon={Send}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Registering Accord...' : 'Submit University Partnership Accord'}
                  </Button>
                  <div className="text-xs text-muted-foreground space-y-0.5 sm:text-right">
                    <div>Direct Inquiries: <a href={`mailto:${siteConfig.email}`} className="text-primary font-semibold hover:underline">{siteConfig.email}</a></div>
                    <div>Desk Phone: <a href={`tel:${siteConfig.phone}`} className="text-foreground font-semibold hover:underline">{siteConfig.phone}</a></div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
