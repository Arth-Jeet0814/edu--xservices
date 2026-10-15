import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { homeContent, siteConfig } from '../../data/content';
import Section from '../common/Section';
import Button from '../common/Button';

export default function InstitutionalPartnershipSection() {
  const { partnership } = homeContent;
  const { formOptions } = partnership;

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
      errs.email = 'Please enter a valid email address';
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
      // scroll to first error
      return;
    }

    setIsSubmitting(true);

    /**
     * TODO: Connect this form submission to your backend API or email service:
     * Examples:
     * 1. EmailJS: emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_PUBLIC_KEY')
     * 2. Formspree: fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: JSON.stringify(formData) })
     * 3. Custom Node/Express endpoint: fetch('/api/institutional-applications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
     */
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <Section
      id="institutional-partnership"
      background="light"
      align="center"
      eyebrow={partnership.eyebrow}
      title={partnership.title}
      subtitle={partnership.intro}
    >
      {/* 4 Numbered Steps in a Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-left">
        {partnership.selectionProcess.map((step) => (
          <div
            key={step.step}
            className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all relative"
          >
            <div className="font-display text-3xl font-extrabold text-primary mb-3">
              {step.step}
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2 tracking-tight">
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Main Pre-Screening Form Card */}
      <div id="partnerFormMain" className="max-w-5xl mx-auto scroll-mt-28">
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 lg:p-12 shadow-card text-left">
          <div className="border-b border-border pb-6 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Application Protocol
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mt-1 mb-3 tracking-tight">
              {partnership.formNotice.title}
            </h3>
            <div className="p-4 rounded-2xl bg-primary-soft/80 border border-primary/20 text-xs text-foreground leading-relaxed flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <span className="max-w-xl text-muted-foreground">{partnership.formNotice.disclaimer}</span>
              <div className="shrink-0 text-muted-foreground text-[11px] space-y-1 md:text-right border-t md:border-t-0 md:border-l border-border pt-3 md:pt-0 md:pl-5">
                <div>Desk: <a href={`mailto:${siteConfig.email}`} className="text-primary font-semibold hover:underline">{siteConfig.email}</a></div>
                <div>Office: <a href={`tel:${siteConfig.phone}`} className="text-foreground font-semibold hover:underline">{siteConfig.phone}</a></div>
                <div className="text-muted-foreground">Hours: {siteConfig.officeHours}</div>
              </div>
            </div>
          </div>

          {isSubmitted ? (
            <div className="py-12 px-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-2xl font-bold text-white tracking-tight">
                Application Received for Institutional Review
              </h4>
              <p className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                Thank you for submitting your institution's profile. Your submission has been securely logged. Education eXcellence Services admissions and governance leadership will review your parameters within 10 business days.
              </p>
              <div className="pt-4">
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
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
                  }}
                  variant="outlineLight"
                  size="sm"
                >
                  Submit Another Institutional Inquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Institution Name */}
                <div>
                  <label htmlFor="institutionName" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Institution Name <span className="text-crimson">*</span>
                  </label>
                  <input
                    type="text"
                    id="institutionName"
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleChange}
                    placeholder="e.g. Collège International Sainte-Marie"
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.institutionName ? 'border-red-500' : 'border-input'
                    }`}
                  />
                  {errors.institutionName && <p className="text-red-400 text-xs mt-1">{errors.institutionName}</p>}
                </div>

                {/* 2. Institution Type */}
                <div>
                  <label htmlFor="institutionType" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Institution Type <span className="text-crimson">*</span>
                  </label>
                  <select
                    id="institutionType"
                    name="institutionType"
                    value={formData.institutionType}
                    onChange={handleChange}
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.institutionType ? 'border-red-500' : 'border-input'
                    }`}
                  >
                    <option value="">Select Institution Type</option>
                    {formOptions.institutionTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.institutionType && <p className="text-red-400 text-xs mt-1">{errors.institutionType}</p>}
                </div>

                {/* 3. Ownership Type */}
                <div>
                  <label htmlFor="ownershipType" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Ownership Type <span className="text-crimson">*</span>
                  </label>
                  <select
                    id="ownershipType"
                    name="ownershipType"
                    value={formData.ownershipType}
                    onChange={handleChange}
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.ownershipType ? 'border-red-500' : 'border-input'
                    }`}
                  >
                    <option value="">Select Ownership Type</option>
                    {formOptions.ownershipTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.ownershipType && <p className="text-red-400 text-xs mt-1">{errors.ownershipType}</p>}
                </div>

                {/* 4. Curriculum Type */}
                <div>
                  <label htmlFor="curriculumType" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Curriculum Type <span className="text-crimson">*</span>
                  </label>
                  <select
                    id="curriculumType"
                    name="curriculumType"
                    value={formData.curriculumType}
                    onChange={handleChange}
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.curriculumType ? 'border-red-500' : 'border-input'
                    }`}
                  >
                    <option value="">Select Curriculum Type</option>
                    {formOptions.curriculumTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.curriculumType && <p className="text-red-400 text-xs mt-1">{errors.curriculumType}</p>}
                </div>

                {/* 5. Institutional Positioning */}
                <div>
                  <label htmlFor="institutionalPositioning" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Institutional Positioning <span className="text-crimson">*</span>
                  </label>
                  <select
                    id="institutionalPositioning"
                    name="institutionalPositioning"
                    value={formData.institutionalPositioning}
                    onChange={handleChange}
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.institutionalPositioning ? 'border-red-500' : 'border-input'
                    }`}
                  >
                    <option value="">Select Positioning Tier</option>
                    {formOptions.institutionalPositioning.map((tier) => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>
                  {errors.institutionalPositioning && <p className="text-red-400 text-xs mt-1">{errors.institutionalPositioning}</p>}
                </div>

                {/* 6. Language of Instruction */}
                <div>
                  <label htmlFor="languageOfInstruction" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Main Language of Instruction <span className="text-crimson">*</span>
                  </label>
                  <select
                    id="languageOfInstruction"
                    name="languageOfInstruction"
                    value={formData.languageOfInstruction}
                    onChange={handleChange}
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.languageOfInstruction ? 'border-red-500' : 'border-input'
                    }`}
                  >
                    <option value="">Select Language</option>
                    {formOptions.languagesOfInstruction.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  {errors.languageOfInstruction && <p className="text-red-400 text-xs mt-1">{errors.languageOfInstruction}</p>}
                </div>

                {/* 7. Country */}
                <div>
                  <label htmlFor="country" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Country <span className="text-crimson">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.country ? 'border-red-500' : 'border-input'
                    }`}
                  >
                    <option value="">Select African Country / Other</option>
                    {formOptions.countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
                </div>

                {/* 8. Student Population Range */}
                <div>
                  <label htmlFor="studentPopulation" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Student Population Range <span className="text-crimson">*</span>
                  </label>
                  <select
                    id="studentPopulation"
                    name="studentPopulation"
                    value={formData.studentPopulation}
                    onChange={handleChange}
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.studentPopulation ? 'border-red-500' : 'border-input'
                    }`}
                  >
                    <option value="">Select Size Bracket</option>
                    {formOptions.studentPopulationRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                  {errors.studentPopulation && <p className="text-red-400 text-xs mt-1">{errors.studentPopulation}</p>}
                </div>

                {/* 9. International Orientation Level */}
                <div>
                  <label htmlFor="internationalOrientation" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    International Orientation Level <span className="text-crimson">*</span>
                  </label>
                  <select
                    id="internationalOrientation"
                    name="internationalOrientation"
                    value={formData.internationalOrientation}
                    onChange={handleChange}
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.internationalOrientation ? 'border-red-500' : 'border-input'
                    }`}
                  >
                    <option value="">Select Current Level</option>
                    {formOptions.internationalOrientationLevels.map((lvl) => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                  {errors.internationalOrientation && <p className="text-red-400 text-xs mt-1">{errors.internationalOrientation}</p>}
                </div>

                {/* 10. Parent Market Type */}
                <div>
                  <label htmlFor="parentMarketType" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Parent Market Type <span className="text-crimson">*</span>
                  </label>
                  <select
                    id="parentMarketType"
                    name="parentMarketType"
                    value={formData.parentMarketType}
                    onChange={handleChange}
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.parentMarketType ? 'border-red-500' : 'border-input'
                    }`}
                  >
                    <option value="">Select Demographics</option>
                    {formOptions.parentMarketTypes.map((mkt) => (
                      <option key={mkt} value={mkt}>{mkt}</option>
                    ))}
                  </select>
                  {errors.parentMarketType && <p className="text-red-400 text-xs mt-1">{errors.parentMarketType}</p>}
                </div>

                {/* 11. Contact Full Name */}
                <div>
                  <label htmlFor="contactName" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Contact Full Name <span className="text-crimson">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Jean-Baptiste Koffi"
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.contactName ? 'border-red-500' : 'border-input'
                    }`}
                  />
                  {errors.contactName && <p className="text-red-400 text-xs mt-1">{errors.contactName}</p>}
                </div>

                {/* 12. Decision-Maker Type */}
                <div>
                  <label htmlFor="decisionMakerType" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Decision-Maker Type <span className="text-crimson">*</span>
                  </label>
                  <select
                    id="decisionMakerType"
                    name="decisionMakerType"
                    value={formData.decisionMakerType}
                    onChange={handleChange}
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.decisionMakerType ? 'border-red-500' : 'border-input'
                    }`}
                  >
                    <option value="">Select Role</option>
                    {formOptions.decisionMakerTypes.map((dm) => (
                      <option key={dm} value={dm}>{dm}</option>
                    ))}
                  </select>
                  {errors.decisionMakerType && <p className="text-red-400 text-xs mt-1">{errors.decisionMakerType}</p>}
                </div>

                {/* 13. Contact Title */}
                <div>
                  <label htmlFor="contactTitle" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Contact Title <span className="text-crimson">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactTitle"
                    name="contactTitle"
                    value={formData.contactTitle}
                    onChange={handleChange}
                    placeholder="e.g. Proviseur / Head of School"
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.contactTitle ? 'border-red-500' : 'border-input'
                    }`}
                  />
                  {errors.contactTitle && <p className="text-red-400 text-xs mt-1">{errors.contactTitle}</p>}
                </div>

                {/* 14. Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Official Institutional Email <span className="text-crimson">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="leadership@institution.edu"
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.email ? 'border-red-500' : 'border-input'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* 15. Phone / WhatsApp */}
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Phone / WhatsApp (with country code) <span className="text-crimson">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+221 XX XXX XX XX"
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.phone ? 'border-red-500' : 'border-input'
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* 16. Why your institution is seeking this partnership */}
                <div className="md:col-span-2">
                  <label htmlFor="rationale" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Why your institution is seeking this partnership <span className="text-crimson">*</span>
                  </label>
                  <textarea
                    id="rationale"
                    name="rationale"
                    rows="4"
                    value={formData.rationale}
                    onChange={handleChange}
                    placeholder="Briefly state your strategic objectives, upcoming graduating cohorts, and international pathway goals..."
                    className={`w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                      errors.rationale ? 'border-red-500' : 'border-input'
                    }`}
                  />
                  {errors.rationale && <p className="text-red-400 text-xs mt-1">{errors.rationale}</p>}
                </div>
              </div>

              {/* Submit Button & Footnote */}
              <div className="pt-4 border-t border-border space-y-4">
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  disabled={isSubmitting}
                  icon={Send}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? 'Verifying Submission...' : 'Submit Pre-Screening Application'}
                </Button>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  {partnership.formNotice.footnote}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
