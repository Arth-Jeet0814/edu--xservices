import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { siteConfig } from '../data/content';
import Section from '../components/common/Section';

export default function PrivacyPolicyPage() {
  useDocumentTitle('Privacy Policy | Institutional Data Protection');

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-navy-950 text-white py-16 sm:py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="animate-hero-1 text-xs font-bold uppercase tracking-widest text-gold-400">
            Governance & Compliance
          </span>
          <h1 className="animate-hero-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Institutional Privacy Policy
          </h1>
          <p className="animate-hero-3 text-sm text-slate-300">
            Last updated: January 2026 · Effective for all partner schools, universities, and institutional users.
          </p>
        </div>
      </section>

      {/* Legal Content */}
      <Section background="light" align="left" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-card text-slate-800 space-y-8 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              1. Institutional Commitment & Data Sovereignty
            </h2>
            <p className="text-slate-600">
              {siteConfig.brandName} ("we", "our", or "us") operates a private B2B institutional framework dedicated to African schools, lycées, and international university partners. We recognize that student records, parent communications, and institutional transcripts represent sensitive sovereign data. We do not sell, license, or monetize student information to advertising networks, commercial third-party aggregators, or speculative recruiters.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              2. Information We Process on Behalf of Partner Schools
            </h2>
            <p className="text-slate-600 mb-2">
              Within our co-branded institutional portal, we process academic mobility data strictly under the authorization of member institutions:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 ml-2">
              <li><strong>Student Profile & Trajectory Data:</strong> Academic transcripts, standardized test scores, predicted baccalaureate grades, and university program preferences.</li>
              <li><strong>Leadership & Counselor Contact:</strong> Name, professional title, official institutional email, and telephone contact for designated school administrators.</li>
              <li><strong>University Application Records:</strong> Live application statuses, merit scholarship determinations, conditional offers, and enrollment confirmations.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              3. Data Security & Storage Architecture
            </h2>
            <p className="text-slate-600">
              All data transmitted through our institutional infrastructure is protected using industry-standard TLS 1.3 encryption in transit and AES-256 encryption at rest. Access within each partner school’s console is restricted by role-based access controls (RBAC) ensuring only authorized administrative personnel and assigned counselors can view student records.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              4. Transfer to Vetted International Universities
            </h2>
            <p className="text-slate-600">
              Student application portfolios are only transmitted to accredited international higher education institutions with the explicit sanction of the partner school leadership and the student's legal guardians.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              5. Institutional Inquiries & Data Protection Officer
            </h2>
            <p className="text-slate-600 mb-3">
              School leaders and university registrars wishing to exercise data audit rights, request record deletion, or obtain compliance certifications can contact our Data Protection Office:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-slate-700 space-y-1">
              <div><strong>Entity:</strong> {siteConfig.brandName}</div>
              <div><strong>Attention:</strong> Institutional Privacy & Governance Office</div>
              <div><strong>Address:</strong> {siteConfig.address}</div>
              <div><strong>Email:</strong> <a href={`mailto:${siteConfig.email}`} className="text-navy-900 underline">{siteConfig.email}</a></div>
              <div><strong>Phone:</strong> <a href={`tel:${siteConfig.phone}`} className="text-navy-900 underline">{siteConfig.phone}</a></div>
              <div><strong>Hours:</strong> {siteConfig.officeHours}</div>
              <div><strong>Institutional Portal:</strong> <a href={siteConfig.portalUrl} target="_blank" rel="noopener noreferrer" className="text-gold-600 underline">{siteConfig.portalText}</a></div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
