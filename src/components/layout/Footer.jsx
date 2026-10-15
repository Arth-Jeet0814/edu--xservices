import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Shield, ArrowUpRight, Clock, Globe } from 'lucide-react';
import { siteConfig } from '../../data/content';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-navy-800/60">
          {/* Brand Info (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-navy-900 border border-gold-500/40 flex items-center justify-center text-gold-500">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Education <span className="text-gold-400">eXcellence</span> Services
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{siteConfig.officeHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gold-500 shrink-0" />
                <a
                  href={siteConfig.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 font-medium transition-colors flex items-center gap-1"
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
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about-us" className="text-slate-400 hover:text-gold-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/course-finder" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Course Finder
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/university-partnerships" className="text-slate-400 hover:text-gold-400 transition-colors">
                  University Partnerships
                </Link>
              </li>
              <li>
                <Link to="/book-a-demo" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Book A Meeting
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 flex items-center gap-1 font-medium transition-colors"
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
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-gold-500" />
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
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-slate-400 hover:text-gold-400 transition-colors">
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
            <Link to="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-conditions" className="hover:text-slate-300">Terms & Conditions</Link>
            <span>•</span>
            <a href="#partnerFormMain" className="hover:text-gold-400 flex items-center gap-1">
              Institutional Pre-Screening <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
