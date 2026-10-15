import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * RouteLoadingBar
 * A slim, high-performance top progress indicator that animates across the top of the viewport
 * whenever a page route change is triggered, creating a crisp, responsive feel without blocking content.
 */
export default function RouteLoadingBar() {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] pointer-events-none bg-transparent"
    >
      <div className="h-full bg-gradient-to-r from-navy-600 via-gold-400 to-gold-500 route-progress-bar shadow-[0_0_8px_rgba(217,119,6,0.6)]" />
    </div>
  );
}
