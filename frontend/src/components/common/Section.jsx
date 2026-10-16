import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export default function Section({
  children,
  id,
  className = '',
  containerClassName = '',
  background = 'light', // 'light' (slate-50), 'dark' (navy-900), 'white', 'navy-dark', 'gradient-navy'
  eyebrow,
  title,
  subtitle,
  align = 'center',
  animate = true,
  ...props
}) {
  const [sectionRef, isVisible] = useIntersectionObserver();

  const bgStyles = {
    light: "bg-[#f0f9ff] text-[#082f49]",
    white: "bg-white text-[#082f49]",
    sky: "bg-gradient-to-b from-[#f0f9ff] via-[#e0f2fe]/40 to-[#f0f9ff] text-[#082f49]",
    hero: "bg-gradient-to-b from-[#f0f9ff] via-[#e0f2fe]/50 to-[#f0f9ff] text-[#082f49]",
    tint: "bg-[#e0f2fe] text-[#082f49] border-y border-[#cfe6f5]",
    dark: "bg-[#e0f2fe] text-[#082f49] border-y border-[#cfe6f5]",
    'navy-dark': "bg-[#e0f2fe] text-[#082f49] border-y border-[#cfe6f5]",
    'gradient-navy': "bg-[#f0f9ff] text-[#082f49]",
    'gradient-hero': "bg-gradient-to-b from-[#f0f9ff] via-[#e0f2fe]/50 to-[#f0f9ff] text-[#082f49]",
    'gradient-sky': "bg-gradient-to-b from-[#f0f9ff] via-[#e0f2fe]/40 to-[#f0f9ff] text-[#082f49]",
  };

  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <section
      id={id}
      ref={animate ? sectionRef : undefined}
      className={`-mt-px py-16 sm:py-24 relative z-10 overflow-hidden ${bgStyles[background] || bgStyles.light} ${animate ? `reveal-init ${isVisible ? 'reveal-visible' : ''}` : ''} ${className}`}
      {...props}
    >
      {/* Ambient subtle glow for depth */}
      <div 
        className="absolute -top-32 right-1/4 w-[500px] h-[350px] bg-[#0ea5e9]/[0.06] rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${containerClassName}`}>
        {(eyebrow || title || subtitle) && (
          <div className={`max-w-3xl mb-12 sm:mb-16 flex flex-col ${alignStyles[align]}`}>
            {eyebrow && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase mb-3 text-[#0369a1]">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#082f49]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base sm:text-lg leading-relaxed text-[#4b6b82] font-normal">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
