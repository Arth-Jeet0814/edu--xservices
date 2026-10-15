import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Target,
  MapPin,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { universityContent, siteConfig } from '../data/content';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const iconMap = {
  GraduationCap: GraduationCap,
  ShieldCheck: ShieldCheck,
  Target: Target,
  MapPin: MapPin,
};

export default function UniversityPartnershipsPage() {
  useDocumentTitle('University Partnerships | Direct African Institutional Access');

  const [formData, setFormData] = useState({
    universityName: '',
    country: '',
    institutionType: '',
    intakeLevel: '',
    scholarshipAvailability: '',
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
    if (!formData.institutionType) errs.institutionType = 'Please select institution type';
    if (!formData.intakeLevel) errs.intakeLevel = 'Please select target intake level';
    if (!formData.contactName.trim()) errs.contactName = 'Contact name is required';
    if (!formData.contactTitle.trim()) errs.contactTitle = 'Contact title is required';
    if (!formData.email.trim()) {
      errs.email = 'Official university email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    /**
     * TODO: Connect this university partnership form to your backend API or email service (EmailJS, Formspree, etc.)
     */
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-navy-800 text-center relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="animate-hero-1 inline-block text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/30">
            {universityContent.hero.eyebrow}
          </span>
          <h1 className="animate-hero-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {universityContent.hero.title}
          </h1>
          <p className="animate-hero-3 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {universityContent.hero.lead}
          </p>
        </div>
      </section>

      {/* Benefits List for Universities */}
      <Section
        id="university-benefits"
        background="light"
        align="center"
        eyebrow="STRATEGIC INSTITUTIONAL VALUE"
        title="Why Global Universities Partner With Us"
        subtitle="Establish direct institutional engagement with Africa's leading high schools and lycées without third-party commission agents."
        className="border-b border-slate-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
          {universityContent.benefits.map((benefit, idx) => {
            const IconComponent = iconMap[benefit.icon] || ShieldCheck;
            return (
              <Card
                key={idx}
                variant="light"
                hoverEffect={true}
                className="p-8 border-l-4 border-l-gold-500 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center mb-5 shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold uppercase tracking-wider text-gold-700">
                  Institutional Accord 0{idx + 1}
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* University Partnership Inquiry Form */}
      <Section
        id="university-form"
        background="dark"
        align="center"
        eyebrow="GLOBAL ADMISSIONS ACCORD"
        title="University Partnership Inquiry"
        subtitle="Submit your university's interest in receiving verified African student applications and co-hosting institutional briefings."
      >
        <div className="max-w-3xl mx-auto bg-navy-950 border border-navy-700/80 rounded-2xl p-6 sm:p-10 shadow-2xl text-left">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                Partnership Inquiry Successfully Logged
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                Thank you for your interest. Our University Partnerships Directorate will review your curriculum criteria and schedule an introductory alignment exchange.
              </p>
              <div className="pt-4">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outlineLight"
                  size="sm"
                >
                  Submit Another Inquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* University Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="universityName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    University / Higher Education Institution <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="universityName"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleChange}
                    placeholder="e.g. University of Edinburgh"
                    className={`w-full bg-navy-900 border rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                      errors.universityName ? 'border-red-500' : 'border-navy-700'
                    }`}
                  />
                  {errors.universityName && <p className="text-red-400 text-xs mt-1">{errors.universityName}</p>}
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="uCountry" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Country <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="uCountry"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g. United Kingdom"
                    className={`w-full bg-navy-900 border rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                      errors.country ? 'border-red-500' : 'border-navy-700'
                    }`}
                  />
                  {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
                </div>

                {/* Institution Type */}
                <div>
                  <label htmlFor="institutionType" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Institution Classification <span className="text-gold-400">*</span>
                  </label>
                  <select
                    id="institutionType"
                    name="institutionType"
                    value={formData.institutionType}
                    onChange={handleChange}
                    className={`w-full bg-navy-900 border rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                      errors.institutionType ? 'border-red-500' : 'border-navy-700'
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
                  {errors.institutionType && <p className="text-red-400 text-xs mt-1">{errors.institutionType}</p>}
                </div>

                {/* Intake Level */}
                <div>
                  <label htmlFor="intakeLevel" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Primary Outbound Focus <span className="text-gold-400">*</span>
                  </label>
                  <select
                    id="intakeLevel"
                    name="intakeLevel"
                    value={formData.intakeLevel}
                    onChange={handleChange}
                    className={`w-full bg-navy-900 border rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                      errors.intakeLevel ? 'border-red-500' : 'border-navy-700'
                    }`}
                  >
                    <option value="">Select Target Level</option>
                    <option value="Undergraduate / Bachelor's Degrees">Undergraduate / Bachelor's Degrees</option>
                    <option value="Postgraduate / Master's & PhD">Postgraduate / Master's & PhD</option>
                    <option value="Direct Pathway / University Foundation">Direct Pathway / University Foundation</option>
                    <option value="All Levels (Comprehensive Accord)">All Levels (Comprehensive Accord)</option>
                  </select>
                  {errors.intakeLevel && <p className="text-red-400 text-xs mt-1">{errors.intakeLevel}</p>}
                </div>

                {/* Scholarship Availability */}
                <div>
                  <label htmlFor="scholarshipAvailability" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Scholarship / Merit Consideration
                  </label>
                  <select
                    id="scholarshipAvailability"
                    name="scholarshipAvailability"
                    value={formData.scholarshipAvailability}
                    onChange={handleChange}
                    className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="Available (Full & Partial Merit)">Available (Full & Partial Merit)</option>
                    <option value="Partial Merit Scholarships Only">Partial Merit Scholarships Only</option>
                    <option value="Case-by-case Institutional Grants">Case-by-case Institutional Grants</option>
                    <option value="Self-Funded Only">Self-Funded Only</option>
                  </select>
                </div>

                {/* Contact Name */}
                <div>
                  <label htmlFor="uContactName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Contact Full Name <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="uContactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Eleanor Wright"
                    className={`w-full bg-navy-900 border rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                      errors.contactName ? 'border-red-500' : 'border-navy-700'
                    }`}
                  />
                  {errors.contactName && <p className="text-red-400 text-xs mt-1">{errors.contactName}</p>}
                </div>

                {/* Contact Title */}
                <div>
                  <label htmlFor="uContactTitle" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Contact Title / Role <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="uContactTitle"
                    name="contactTitle"
                    value={formData.contactTitle}
                    onChange={handleChange}
                    placeholder="e.g. Dean of International Admissions"
                    className={`w-full bg-navy-900 border rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                      errors.contactTitle ? 'border-red-500' : 'border-navy-700'
                    }`}
                  />
                  {errors.contactTitle && <p className="text-red-400 text-xs mt-1">{errors.contactTitle}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="uEmail" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Official University Email <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="uEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admissions@university.ac.uk"
                    className={`w-full bg-navy-900 border rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                      errors.email ? 'border-red-500' : 'border-navy-700'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="uPhone" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Direct Phone / Office
                  </label>
                  <input
                    type="tel"
                    id="uPhone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44 131 XXX XXXX"
                    className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label htmlFor="uNotes" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Target Criteria & African Corridor Priorities
                  </label>
                  <textarea
                    id="uNotes"
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Provide specific academic thresholds, language policies, or faculty areas of strategic interest..."
                    className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-navy-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  disabled={isSubmitting}
                  icon={Send}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? 'Registering Accord...' : 'Submit University Partnership Accord'}
                </Button>
                <div className="text-xs text-slate-400 space-y-0.5">
                  <div>Direct Inquiries: <a href={`mailto:${siteConfig.email}`} className="text-gold-400 hover:underline">{siteConfig.email}</a></div>
                  <div>Telephone: <a href={`tel:${siteConfig.phone}`} className="text-slate-300 hover:underline">{siteConfig.phone}</a> ({siteConfig.officeHours})</div>
                </div>
              </div>
            </form>
          )}
        </div>
      </Section>
    </div>
  );
}
