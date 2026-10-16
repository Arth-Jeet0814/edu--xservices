import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ArrowRight, ArrowUpRight, Phone, Mail, Clock } from 'lucide-react';
import { siteConfig, navLinks } from '../../data/content';
import Button from '../common/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-[#cfe6f5] bg-white/95 backdrop-blur-md ${
        isScrolled ? 'shadow-soft' : ''
      }`}
    >
      {/* Top Institutional Utility Bar (Desktop) */}
      {!isScrolled && (
        <div className="hidden lg:block bg-[#0369a1] text-white border-b border-[#cfe6f5]/20 text-xs py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 opacity-95">
              <span className="font-medium">Direct Institutional Framework · 24+ Study Destinations · Verified African School Consoles</span>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 opacity-95">
                <Clock className="w-3.5 h-3.5 text-[#bae6fd]" />
                <span>{siteConfig.officeHours}</span>
              </div>
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 opacity-95 hover:opacity-100 transition-opacity">
                <Phone className="w-3.5 h-3.5 text-[#bae6fd]" />
                <span>{siteConfig.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 opacity-95 hover:opacity-100 transition-opacity">
                <Mail className="w-3.5 h-3.5 text-[#bae6fd]" />
                <span>{siteConfig.email}</span>
              </a>
              <a
                href={siteConfig.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-bold text-[#e0f2fe] hover:underline hover:text-white ml-1"
              >
                <span>{siteConfig.portalText}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Nav Container */}
      <div className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 transition-all duration-200 ${!isScrolled ? 'py-3 sm:py-3.5' : 'py-2 sm:py-2.5'}`}>
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-[#0369a1] rounded-xl p-0.5 sm:p-1 shrink-0"
            aria-label={`${siteConfig.brandName} Home`}
          >
            {/* Official Favicon / Emblem Mark */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#e0f2fe] p-1.5 border border-[#cfe6f5] flex items-center justify-center shadow-xs group-hover:border-[#0369a1]/40 transition-colors shrink-0">
              <img
                src="/favicon.png"
                alt="Education eXcellence Services Emblem"
                width="40"
                height="40"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Official Wordmark Logo */}
            <div className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="Education eXcellence Services"
                width="200"
                height="40"
                className="h-9 sm:h-10 w-auto object-contain shrink-0 hidden sm:block"
              />
              <div className="sm:hidden flex flex-col">
                <span className="font-display text-sm font-extrabold text-[#082f49] leading-tight whitespace-nowrap">
                  Education <span className="text-[#0369a1]">eXcellence</span>
                </span>
                <span className="text-[9px] tracking-wider uppercase font-semibold text-[#4b6b82] whitespace-nowrap">
                  Services · Africa
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation (Pill buttons) */}
          <nav className="hidden lg:flex items-center gap-1.5 shrink-0" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-[#0369a1] bg-[#e0f2fe] font-bold shadow-xs'
                      : 'text-[#4b6b82] hover:bg-[#e0f2fe] hover:text-[#0369a1] nav-link-animated'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a
              href={siteConfig.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full border border-[#cfe6f5] px-4 py-2 text-sm font-semibold text-[#0369a1] transition-all hover:bg-[#e0f2fe] hover:border-[#0369a1]/40 flex items-center gap-2 whitespace-nowrap shadow-xs hover:-translate-y-0.5"
              title="Open Institutional Partner Portal"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-[#0ea5e9] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0369a1]"></span>
              </span>
              <Globe className="w-3.5 h-3.5 text-[#0369a1] shrink-0 transition-transform group-hover:rotate-12" />
              <span>Portal Access</span>
              <ArrowUpRight className="w-3 h-3 text-[#4b6b82] group-hover:text-[#0369a1] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </a>

            <Button
              to="/book-a-demo"
              variant="primary"
              size="sm"
              icon={ArrowRight}
              className="whitespace-nowrap px-5 py-2 text-xs xl:text-sm font-bold shadow-soft"
            >
              Book A Meeting
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[#cfe6f5] text-[#0369a1] hover:bg-[#e0f2fe] focus:outline-none focus:ring-2 focus:ring-[#0369a1] transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#cfe6f5] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-card">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#e0f2fe] text-[#0369a1] font-bold shadow-xs'
                      : 'text-[#082f49] hover:bg-[#e0f2fe]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Portal Link & CTAs */}
          <div className="pt-2 border-t border-[#cfe6f5] space-y-2">
            <a
              href={siteConfig.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#0369a1] border border-[#cfe6f5] bg-[#e0f2fe]/60 hover:bg-[#e0f2fe]"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#0369a1]" />
                <span>Portal: {siteConfig.portalText}</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#4b6b82]" />
            </a>

            <Button
              to="/book-a-demo"
              variant="primary"
              size="lg"
              className="w-full text-center"
              icon={ArrowRight}
            >
              Book A Meeting
            </Button>
          </div>

          {/* Mobile Contact & Operating Hours */}
          <div className="pt-3 border-t border-[#cfe6f5] text-xs text-[#4b6b82] space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#0369a1] shrink-0" />
              <span>{siteConfig.officeHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#0369a1] shrink-0" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-[#0369a1]">
                {siteConfig.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#0369a1] shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-[#0369a1]">
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
