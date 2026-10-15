import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import RouteLoadingBar from './components/common/RouteLoadingBar';
import PageTransition from './components/common/PageTransition';

import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import CourseFinderPage from './pages/CourseFinderPage';
import DestinationsPage from './pages/DestinationsPage';
import UniversityPartnershipsPage from './pages/UniversityPartnershipsPage';
import BookDemoPage from './pages/BookDemoPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-gold-500 selection:text-navy-950">
      <ScrollToTop />
      {/* Top Route Progress Bar for Smooth Page Transitions */}
      <RouteLoadingBar />

      {/* Sticky Institutional Navbar */}
      <Navbar />

      {/* Main Content Area with Subtle Page Entrance Animation */}
      <main className="flex-grow">
        <PageTransition>
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
        </PageTransition>
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}
