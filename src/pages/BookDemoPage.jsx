import React, { useState } from 'react';
import { Calendar, Clock, Video, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
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
      errs.email = 'Please provide a valid email';
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

    /**
     * TODO: Connect this briefing booking to your calendar API, Calendly webhook, or email backend
     */
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-navy-800 text-center relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="animate-hero-1 inline-block text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/30">
            {bookDemoContent.hero.eyebrow}
          </span>
          <h1 className="animate-hero-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            {bookDemoContent.hero.title}
          </h1>
          <p className="animate-hero-3 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {bookDemoContent.hero.lead}
          </p>
        </div>
      </section>

      {/* Main Booking Container */}
      <Section
        id="booking-section"
        background="light"
        align="left"
        className="py-12 sm:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Left Column: Briefing Agenda & Overview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="light" className="p-8 border-slate-200 shadow-subtle space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
                  Private Session
                </span>
                <h3 className="font-display text-2xl font-bold text-slate-900 mt-1 mb-2 tracking-tight">
                  Institutional Briefing Parameters
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Conducted by senior institutional architects from Education eXcellence Services.
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-navy-950">Duration</h4>
                    <p className="text-xs text-slate-500">45 Minutes Executive Review</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-navy-950">Format</h4>
                    <p className="text-xs text-slate-500">Secure Institutional Video Conference or In-Person Executive Visit</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-navy-950">Confidentiality</h4>
                    <p className="text-xs text-slate-500">Subject to mutual non-disclosure and strict institutional discretion</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="font-semibold text-navy-950">Key Briefing Deliverables:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Curriculum equivalency mapping for your graduates</li>
                  <li>Live demonstration of your co-branded console</li>
                  <li>Partner university scholarship quota estimates</li>
                  <li>Founding cohort activation timeline</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Executive Desk:</span>
                  <a href={`mailto:${siteConfig.email}`} className="text-navy-950 font-medium hover:text-gold-600 transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Institutional Office:</span>
                  <a href={`tel:${siteConfig.phone}`} className="text-navy-950 font-medium hover:text-gold-600 transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Operating Hours:</span>
                  <span className="text-navy-950 font-medium">{siteConfig.officeHours}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span>Partner Portal:</span>
                  <a
                    href={siteConfig.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-600 font-semibold hover:underline"
                  >
                    {siteConfig.portalText} ↗
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Scheduler / Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-card">
              {/* Selector Tabs: Form vs Calendly Embed Placeholder */}
              <div className="flex items-center gap-2 mb-8 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveTab('form')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === 'form'
                      ? 'bg-white text-navy-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Direct Request Form
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('scheduler')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                    activeTab === 'scheduler'
                      ? 'bg-white text-navy-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-gold-600" />
                  <span>Calendly Scheduler</span>
                </button>
              </div>

              {activeTab === 'scheduler' ? (
                /* Calendly Embed Placeholder Area */
                <div className="border border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50/60 min-h-[460px] flex flex-col items-center justify-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-gold-500/10 text-gold-600 flex items-center justify-center border border-gold-500/20">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 tracking-tight">
                    Embedded Scheduler (Calendly)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
                    This designated container is configured to host your Calendly inline scheduling widget (e.g., using <code className="bg-slate-200 px-1 py-0.5 rounded text-navy-900">https://calendly.com/your-organization</code>).
                  </p>
                  <div className="p-4 bg-white rounded-lg border border-slate-200 text-xs text-left text-slate-600 w-full max-w-md font-mono space-y-1">
                    <div className="text-slate-400">// To embed your live Calendly widget:</div>
                    <div className="text-navy-900">&lt;iframe src="https://calendly.com/[your-slug]" ... /&gt;</div>
                  </div>
                  <Button
                    onClick={() => setActiveTab('form')}
                    variant="navy"
                    size="sm"
                  >
                    Or Use Direct Request Form Below
                  </Button>
                </div>
              ) : isSubmitted ? (
                /* Success View */
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 border border-green-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
                    Briefing Request Confirmed
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our executive office will contact you within 24 hours to confirm your private institutional briefing for {formData.institutionName}.
                  </p>
                  <div className="pt-4">
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outlineDark"
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
                      <label htmlFor="bName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Full Name <span className="text-gold-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="bName"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Aissatou Ndiaye"
                        className={`w-full bg-slate-50 border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                          errors.name ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Role */}
                    <div>
                      <label htmlFor="bRole" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Institutional Role <span className="text-gold-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="bRole"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="e.g. Head of School / Provost"
                        className={`w-full bg-slate-50 border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                          errors.role ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                    </div>

                    {/* Institution Name */}
                    <div className="sm:col-span-2">
                      <label htmlFor="bInst" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Institution Name <span className="text-gold-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="bInst"
                        name="institutionName"
                        value={formData.institutionName}
                        onChange={handleChange}
                        placeholder="e.g. Lycée Français Jean Mermoz"
                        className={`w-full bg-slate-50 border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                          errors.institutionName ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.institutionName && <p className="text-red-500 text-xs mt-1">{errors.institutionName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="bEmail" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Official Institutional Email <span className="text-gold-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="bEmail"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="director@school.org"
                        className={`w-full bg-slate-50 border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                          errors.email ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="bPhone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone / WhatsApp <span className="text-gold-600">*</span>
                      </label>
                      <input
                        type="tel"
                        id="bPhone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+225 XX XX XX XX"
                        className={`w-full bg-slate-50 border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                          errors.phone ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label htmlFor="bDate" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="bDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>

                    {/* Preferred Time Window */}
                    <div>
                      <label htmlFor="bTime" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Preferred Window (GMT)
                      </label>
                      <select
                        id="bTime"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      >
                        <option value="Morning (09:00 - 12:00 GMT)">Morning (09:00 - 12:00 GMT)</option>
                        <option value="Afternoon (13:00 - 16:00 GMT)">Afternoon (13:00 - 16:00 GMT)</option>
                        <option value="Evening (17:00 - 19:00 GMT)">Evening (17:00 - 19:00 GMT)</option>
                      </select>
                    </div>

                    {/* Discussion Focus */}
                    <div className="sm:col-span-2">
                      <label htmlFor="bFocus" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Strategic Focus or Primary Inquiries
                      </label>
                      <textarea
                        id="bFocus"
                        name="discussionFocus"
                        rows="3"
                        value={formData.discussionFocus}
                        onChange={handleChange}
                        placeholder="Tell us about your upcoming graduating class, current overseas placement workflows, or target universities..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <Button
                      type="submit"
                      variant="gold"
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
