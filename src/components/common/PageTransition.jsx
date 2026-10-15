import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition
 * Wraps page contents to deliver a subtle, high-performance entrance transition
 * (opacity + gentle 8px rise) on load and navigation, respecting prefers-reduced-motion.
 */
export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className="animate-page-enter w-full"
    >
      {children}
    </div>
  );
}
