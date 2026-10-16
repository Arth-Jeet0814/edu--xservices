import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import RouteLoadingBar from './components/common/RouteLoadingBar';
import PageTransition from './components/common/PageTransition';
import BackToTop from './components/common/BackToTop';

import HomePage from './pages/HomePage';
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const CourseFinderPage = lazy(() => import('./pages/CourseFinderPage'));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'));
const UniversityPartnershipsPage = lazy(() => import('./pages/UniversityPartnershipsPage'));
const BookDemoPage = lazy(() => import('./pages/BookDemoPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage'));

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground">
      {/* WCAG 2.4.1 Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-primary focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-lift focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <ScrollToTop />
      {/* Top Route Progress Bar for Smooth Page Transitions */}
      <RouteLoadingBar />

      {/* Sticky Institutional Navbar */}
      <Navbar />

      {/* Main Content Area with Subtle Page Entrance Animation */}
      <main id="main-content" className="flex-grow focus:outline-none">
        <PageTransition>
          <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/course-finder" element={<CourseFinderPage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/university-partnerships" element={<UniversityPartnershipsPage />} />
              <Route path="/book-a-demo" element={<BookDemoPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-conditions" element={<TermsConditionsPage />} />
              {/* Fallback to Home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Floating Animated Back-to-Top Button */}
      <BackToTop />
    </div>
  );
}
