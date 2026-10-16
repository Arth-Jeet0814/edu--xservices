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
    light: "gradient-sky text-foreground",
    white: "gradient-sky text-foreground",
    sky: "gradient-sky text-foreground",
    hero: "gradient-hero text-foreground",
    dark: "bg-primary text-primary-foreground",
    'navy-dark': "bg-navy-950 text-white",
    'gradient-navy': "bg-primary text-primary-foreground",
    'gradient-hero': "gradient-hero text-foreground",
    'gradient-sky': "gradient-sky text-foreground",
  };

  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const isDarkBg = background === 'dark' || background === 'navy-dark' || background === 'gradient-navy';

  return (
    <section
      id={id}
      ref={animate ? sectionRef : undefined}
      className={`-mt-px py-16 sm:py-24 relative z-10 overflow-hidden ${bgStyles[background] || bgStyles.light} ${animate ? `reveal-init ${isVisible ? 'reveal-visible' : ''}` : ''} ${className}`}
      {...props}
    >
      {/* Ambient subtle glow for depth on light / sky gradient sections */}
      {!isDarkBg && (
        <div 
          className="absolute -top-32 right-1/4 w-[500px] h-[350px] bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
      )}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${containerClassName}`}>
        {(eyebrow || title || subtitle) && (
          <div className={`max-w-3xl mb-12 sm:mb-16 flex flex-col ${alignStyles[align]}`}>
            {eyebrow && (
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase mb-3 ${isDarkBg ? 'text-accent' : 'text-primary'}`}>
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${isDarkBg ? 'text-white' : 'text-foreground'}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-base sm:text-lg leading-relaxed ${isDarkBg ? 'text-white/80' : 'text-muted-foreground'} font-normal`}>
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
