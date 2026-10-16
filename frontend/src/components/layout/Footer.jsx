import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Shield, ArrowUpRight, Clock, Globe } from 'lucide-react';
import { siteConfig } from '../../data/content';

export default function Footer() {
  return (
    <footer className="mt-0 border-t border-[#0c4a6e] bg-[#082f49] text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-[#0c4a6e]/70">
          {/* Brand Info (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="inline-flex items-center gap-2.5 rounded-2xl bg-white p-2.5 shadow-md border border-white/20 transition-transform group-hover:scale-105">
                <img
                  src="/favicon.png"
                  alt="Education eXcellence Services Emblem"
                  className="h-8 w-8 object-contain"
                />
                <img
                  src="/logo.png"
                  alt="Education eXcellence Services"
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
            <div className="pt-2 text-xs text-slate-300 space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white hover:underline transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white hover:underline transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <span>{siteConfig.officeHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <a
                  href={siteConfig.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#38bdf8] hover:text-white hover:underline font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>{siteConfig.portalText}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/about-us" className="hover:text-[#38bdf8] transition-colors inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/course-finder" className="hover:text-[#38bdf8] transition-colors inline-block">
                  Course Finder
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-[#38bdf8] transition-colors inline-block">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/university-partnerships" className="hover:text-[#38bdf8] transition-colors inline-block">
                  University Partnerships
                </Link>
              </li>
              <li>
                <Link to="/book-a-demo" className="hover:text-[#38bdf8] transition-colors inline-block">
                  Book A Meeting
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#38bdf8] hover:text-white hover:underline flex items-center gap-1 font-semibold transition-colors"
                >
                  <span>Institutional Portal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Governance */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Governance
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Institutional Screening</span>
              </li>
              <li>Co-branded Architecture</li>
              <li>Board Mobility Audits</li>
              <li>Data Protection & Privacy</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Legal & Compliance
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/privacy-policy" className="hover:text-[#38bdf8] transition-colors inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-[#38bdf8] transition-colors inline-block">
                  Terms & Conditions
                </Link>
              </li>
              <li className="pt-2 text-xs text-slate-400">
                Private Institutional Network — By Application & Invitation Only.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {siteConfig.copyrightYear} {siteConfig.brandName}. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/#partnerFormMain" className="hover:text-[#38bdf8] flex items-center gap-1 transition-colors">
              Institutional Pre-Screening <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
