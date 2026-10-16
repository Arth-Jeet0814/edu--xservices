import React, { useState } from 'react';
import { Calendar, Clock, Video, ShieldCheck, CheckCircle2, Send, Sparkles, Building2, ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { siteConfig, bookDemoContent } from '../data/content';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function BookDemoPage() {
  useDocumentTitle('Book A Meeting | Private Institutional Briefing');

  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'scheduler'
  const [formData, setFormData] = useState({
    name: '',
    institutionName: '',
    role: '',
    email: '',
    phone: '',
    preferredDate: '',
    timeSlot: 'Morning (09:00 - 12:00 GMT)',
    discussionFocus: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.institutionName.trim()) errs.institutionName = 'Institution name is required';
    if (!formData.role.trim()) errs.role = 'Institutional title / role is required';
    if (!formData.email.trim()) {
      errs.email = 'Official email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid institutional email';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
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
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION (New Theme: Gradient Hero + Rotating Orbital SVGs) */}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Left Column: Briefing Agenda & Overview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="light" className="p-8 border border-border rounded-3xl shadow-card space-y-6 bg-card">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Private Session</span>
                </span>
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight">
                  Briefing Parameters
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  Conducted by senior institutional architects from Education eXcellence Services.
                </p>
              </div>

              <div className="space-y-4 pt-3 border-t border-border">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Duration</h4>
                    <p className="text-xs text-muted-foreground">45 Minutes Executive Review</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Format</h4>
                    <p className="text-xs text-muted-foreground">Secure Video Conference or In-Person Executive Visit</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Confidentiality</h4>
                    <p className="text-xs text-muted-foreground">Subject to mutual non-disclosure and strict institutional discretion</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-secondary/70 border border-border text-xs text-foreground space-y-2">
                <div className="font-bold text-foreground">Key Briefing Deliverables:</div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Curriculum equivalency mapping for your graduates</li>
                  <li>Live demonstration of your co-branded console</li>
                  <li>Partner university scholarship quota estimates</li>
                  <li>Founding cohort activation timeline</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-border text-xs text-muted-foreground space-y-2">
                <div className="flex items-center justify-between">
                  <span>Executive Desk:</span>
                  <a href={`mailto:${siteConfig.email}`} className="text-foreground font-semibold hover:text-primary transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Direct Telephone:</span>
                  <a href={`tel:${siteConfig.phone}`} className="text-foreground font-semibold hover:text-primary transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Operating Hours:</span>
                  <span className="text-foreground font-medium">{siteConfig.officeHours}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Form Container (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-card rounded-3xl p-6 sm:p-10 border border-border shadow-card">
              {/* Selector Tabs */}
              <div className="flex items-center gap-2 mb-8 p-1.5 bg-secondary rounded-2xl">
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
                    Thank you, {formData.name}. Our executive office will contact you within 24 hours to confirm your private institutional briefing for {formData.institutionName}.
                  </p>
                  <div className="pt-4">
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      size="sm"
                    >
                      Book Another Session
                    </Button>
                  </div>
                </div>
              ) : (
                /* Direct Booking Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="bName" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                        Your Full Name <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        id="bName"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Aminata Touré"
                        className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                          errors.name ? 'border-destructive' : 'border-input'
                        }`}
                      />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Institution Name */}
                    <div>
                      <label htmlFor="bInstitution" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                        Institution Name <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        id="bInstitution"
                        name="institutionName"
                        value={formData.institutionName}
                        onChange={handleChange}
                        placeholder="e.g. Lycée International de Dakar"
                        className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                          errors.institutionName ? 'border-destructive' : 'border-input'
                        }`}
                      />
                      {errors.institutionName && <p className="text-destructive text-xs mt-1">{errors.institutionName}</p>}
                    </div>

                    {/* Institutional Title / Role */}
                    <div>
                      <label htmlFor="bRole" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                        Your Role <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        id="bRole"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="e.g. Proviseur / Head of School / Owner"
                        className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                          errors.role ? 'border-destructive' : 'border-input'
                        }`}
                      />
                      {errors.role && <p className="text-destructive text-xs mt-1">{errors.role}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="bEmail" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                        Official Institutional Email <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="email"
                        id="bEmail"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="leadership@institution.edu"
                        className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                          errors.email ? 'border-destructive' : 'border-input'
                        }`}
                      />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div className="sm:col-span-2">
                      <label htmlFor="bPhone" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                        Direct Phone / WhatsApp (with country code) <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="tel"
                        id="bPhone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+221 XX XXX XX XX"
                        className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all ${
                          errors.phone ? 'border-destructive' : 'border-input'
                        }`}
                      />
                      {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label htmlFor="bDate" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="bDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-all cursor-pointer"
                      />
                    </div>

                    {/* Preferred Time Window */}
                    <div>
                      <label htmlFor="bTime" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                        Preferred Window (GMT)
                      </label>
                      <select
                        id="bTime"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-all cursor-pointer"
                      >
                        <option value="Morning (09:00 - 12:00 GMT)">Morning (09:00 - 12:00 GMT)</option>
                        <option value="Afternoon (13:00 - 16:00 GMT)">Afternoon (13:00 - 16:00 GMT)</option>
                        <option value="Evening (17:00 - 19:00 GMT)">Evening (17:00 - 19:00 GMT)</option>
                      </select>
                    </div>

                    {/* Discussion Focus */}
                    <div className="sm:col-span-2">
                      <label htmlFor="bFocus" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                        Strategic Focus or Primary Inquiries
                      </label>
                      <textarea
                        id="bFocus"
                        name="discussionFocus"
                        rows="3"
                        value={formData.discussionFocus}
                        onChange={handleChange}
                        placeholder="Tell us about your upcoming graduating class, current overseas placement workflows, or target universities..."
                        className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      disabled={isSubmitting}
                      icon={Send}
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? 'Scheduling...' : 'Confirm Briefing Request'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
