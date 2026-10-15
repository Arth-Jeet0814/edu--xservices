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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-950/95 backdrop-blur-md shadow-lg shadow-navy-950/20 py-2 sm:py-2.5 border-b border-navy-800/80'
          : 'bg-navy-950/90 backdrop-blur-sm border-b border-white/10'
      }`}
    >
      {/* Top Institutional Utility Bar (Desktop) */}
      {!isScrolled && (
        <div className="hidden lg:block bg-navy-950/90 border-b border-navy-800/60 text-[11px] text-slate-300 py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>{siteConfig.officeHours}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-gold-400" />
                <a
                  href={siteConfig.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 text-gold-400 font-medium transition-colors flex items-center gap-1"
                >
                  <span>{siteConfig.portalText}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Nav Container */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-200 ${!isScrolled ? 'py-3 sm:py-3.5' : 'py-1.5 sm:py-2'}`}>
        <div className="flex items-center justify-between gap-3 xl:gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 xl:gap-3 group focus:outline-none focus:ring-2 focus:ring-gold-400 rounded-lg p-1 shrink-0"
            aria-label={`${siteConfig.brandName} Home`}
          >
            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-lg bg-gradient-to-br from-navy-900 to-navy-950 border border-gold-500/40 flex items-center justify-center text-gold-400 shadow-md group-hover:border-gold-400 transition-colors shrink-0">
              <svg className="w-5 h-5 xl:w-6 xl:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base xl:text-lg font-bold tracking-tight text-white leading-tight whitespace-nowrap">
                Education <span className="text-gold-400">eXcellence</span> Services
              </span>
              <span className="text-[9px] xl:text-[10px] tracking-widest uppercase font-semibold text-slate-400 whitespace-nowrap hidden sm:block">
                Institutional Infrastructure · Africa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 xl:px-3.5 xl:py-2 text-xs xl:text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-150 border ${
                    isActive
                      ? 'text-gold-400 bg-gold-500/10 border-gold-500/30 font-semibold shadow-xs'
                      : 'text-slate-200 hover:text-white hover:bg-white/5 border-transparent'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <a
              href={siteConfig.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 xl:px-3.5 xl:py-2 text-xs font-semibold rounded-lg text-slate-200 hover:text-white border border-slate-700/80 hover:border-gold-400/80 bg-white/5 hover:bg-white/10 transition-colors whitespace-nowrap"
              title="Open Institutional Partner Portal"
            >
              <Globe className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>Portal Access</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 shrink-0" />
            </a>

            <Button
              to="/book-a-demo"
              variant="gold"
              size="sm"
              icon={ArrowRight}
              className="whitespace-nowrap px-3.5 py-1.5 xl:px-4 xl:py-2 text-xs xl:text-sm shadow-sm"
            >
              Book A Meeting
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gold-400"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950 border-b border-navy-800 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                    isActive
                      ? 'bg-gold-500/10 text-gold-400 border-gold-500/30 font-semibold shadow-xs'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white border-transparent'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Portal Link & CTAs */}
          <div className="pt-2 border-t border-navy-800/80 space-y-2">
            <a
              href={siteConfig.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-200 border border-navy-800 bg-white/5 hover:bg-white/10"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gold-400" />
                <span>Portal: {siteConfig.portalText}</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>

            <Button
              to="/book-a-demo"
              variant="gold"
              size="lg"
              className="w-full text-center"
              icon={ArrowRight}
            >
              Book A Meeting
            </Button>
          </div>

          {/* Mobile Contact & Operating Hours */}
          <div className="pt-3 border-t border-navy-800/80 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <span>{siteConfig.officeHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
