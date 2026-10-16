import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { siteConfig } from '../data/content';
import Section from '../components/common/Section';

export default function TermsConditionsPage() {
  useDocumentTitle('Terms & Conditions | Institutional Framework');

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-navy-950 text-white py-16 sm:py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="animate-hero-1 text-xs font-bold uppercase tracking-widest text-gold-400">
            Legal Framework
          </span>
          <h1 className="animate-hero-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Institutional Terms & Conditions
          </h1>
          <p className="animate-hero-3 text-sm text-slate-300">
            Governing institutional membership, portal access, and university coordination protocols.
          </p>
        </div>
      </section>

      {/* Legal Content */}
      <Section background="light" align="left" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-card text-slate-800 space-y-8 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              1. Acceptance of Institutional Framework
            </h2>
            <p className="text-slate-600">
              Access to and utilization of the digital pathways console, institutional briefings, and international admissions frameworks provided by {siteConfig.brandName} is governed by these Terms and Conditions. By submitting an Institutional Pre-Screening Application or executing an Institutional Accord, participating schools and universities agree to uphold these standards.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              2. Membership by Invitation and Pre-Screening
            </h2>
            <p className="text-slate-600">
              {siteConfig.brandName} operates on a selective basis. Submission of the Phase 1 Pre-Screening Form does not constitute a binding acceptance into the partner network. {siteConfig.brandName} reserves complete discretion to determine alignment with our standards of academic rigour, leadership stewardship, and institutional readiness.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              3. Co-Branded Portal & Intellectual Property
            </h2>
            <p className="text-slate-600">
              Participating institutions retain full proprietary ownership of their trademarks, crests, logos, and academic transcripts. {siteConfig.brandName} retains all intellectual property rights to its proprietary software architecture, data models, mobility reporting templates, and institutional console codebase.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              4. Admissions Integrity & Verification
            </h2>
            <p className="text-slate-600">
              Partner schools certify that all academic records, predicted grades, counselor recommendations, and student portfolios submitted through the institutional console are authentic and unaltered. Any intentional misrepresentation may result in immediate suspension of network privileges.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              5. Governing Law and Formal Communications
            </h2>
            <p className="text-slate-600 mb-3">
              These terms are established in accordance with international institutional governance best practices. For legal inquiries or official executive correspondence:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-slate-700 space-y-1">
              <div><strong>Organization:</strong> {siteConfig.brandName}</div>
              <div><strong>Executive Leadership:</strong> {siteConfig.founderName}, {siteConfig.founderTitle}</div>
              <div><strong>Address:</strong> {siteConfig.address}</div>
              <div><strong>Official Email:</strong> <a href={`mailto:${siteConfig.email}`} className="text-navy-900 underline">{siteConfig.email}</a></div>
              <div><strong>Direct Phone:</strong> <a href={`tel:${siteConfig.phone}`} className="text-navy-900 underline">{siteConfig.phone}</a></div>
              <div><strong>Hours:</strong> {siteConfig.officeHours}</div>
              <div><strong>Institutional Portal:</strong> <a href={siteConfig.portalUrl} target="_blank" rel="noopener noreferrer" className="text-gold-600 underline">{siteConfig.portalText}</a></div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
