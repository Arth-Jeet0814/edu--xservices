import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <aside aria-label="Scroll to top" className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={scrollToTop}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0369a1] text-white shadow-floating transition-all duration-300 hover:scale-110 hover:bg-[#0ea5e9] focus:outline-none focus:ring-2 focus:ring-[#0369a1] focus:ring-offset-2 active:scale-95 animate-in fade-in zoom-in-75 cursor-pointer"
        aria-label="Back to top of page"
        title="Scroll to top"
      >
        {/* Subtle breathing radar ring */}
        <span 
          aria-hidden="true" 
          className="animate-radar pointer-events-none absolute inset-0 rounded-full border border-primary/50 opacity-70" 
        />
        
        {/* Icon with hover bounce */}
        <ArrowUp className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-1" />
      </button>
    </aside>
  );
}
