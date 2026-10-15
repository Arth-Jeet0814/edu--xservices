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
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-border/80 bg-background/95 backdrop-blur-md ${
        isScrolled ? 'shadow-soft' : ''
      }`}
    >
      {/* Top Institutional Utility Bar (Desktop) */}
      {!isScrolled && (
        <div className="hidden lg:block bg-primary text-primary-foreground border-b border-white/10 text-xs py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 opacity-90">
              <span className="font-medium">Direct Institutional Framework · 24+ Study Destinations · Verified African School Consoles</span>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 opacity-90">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>{siteConfig.officeHours}</span>
              </div>
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>{siteConfig.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>{siteConfig.email}</span>
              </a>
              <a
                href={siteConfig.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-bold text-accent hover:underline ml-1"
              >
                <span>{siteConfig.portalText}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Nav Container */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-200 ${!isScrolled ? 'py-3 sm:py-3.5' : 'py-2 sm:py-2.5'}`}>
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-1 shrink-0"
            aria-label={`${siteConfig.brandName} Home`}
          >
            {/* Official Favicon / Emblem Mark */}
            <div className="w-10 h-10 rounded-2xl bg-primary-soft/80 p-1.5 border border-primary/20 flex items-center justify-center shadow-xs group-hover:border-primary/40 transition-colors shrink-0">
              <img
                src="/favicon.png"
                alt="Education eXcellence Services Emblem"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Official Wordmark Logo */}
            <div className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="Education eXcellence Services"
                className="h-9 sm:h-10 w-auto object-contain shrink-0 hidden sm:block"
              />
              <div className="sm:hidden flex flex-col">
                <span className="font-display text-base font-extrabold text-foreground leading-tight whitespace-nowrap">
                  Education <span className="text-primary">eXcellence</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-muted-foreground whitespace-nowrap">
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
                      ? 'text-primary bg-primary-soft/80 font-bold shadow-xs'
                      : 'text-muted-foreground hover:bg-secondary hover:text-primary'
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
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-secondary flex items-center gap-1.5 whitespace-nowrap shadow-xs"
              title="Open Institutional Partner Portal"
            >
              <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Portal Access</span>
              <ArrowUpRight className="w-3 h-3 text-muted-foreground shrink-0" />
            </a>

            <Button
              to="/book-a-demo"
              variant="accent"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
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
        <div className="lg:hidden bg-background border-b border-border px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-card">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary-soft text-primary font-bold shadow-xs'
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Portal Link & CTAs */}
          <div className="pt-2 border-t border-border space-y-2">
            <a
              href={siteConfig.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-primary border border-border bg-secondary/50 hover:bg-secondary"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <span>Portal: {siteConfig.portalText}</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </a>

            <Button
              to="/book-a-demo"
              variant="accent"
              size="lg"
              className="w-full text-center"
              icon={ArrowRight}
            >
              Book A Meeting
            </Button>
          </div>

          {/* Mobile Contact & Operating Hours */}
          <div className="pt-3 border-t border-border text-xs text-muted-foreground space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>{siteConfig.officeHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-primary">
                {siteConfig.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
