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
    light: "bg-muted/40 text-foreground border-t border-border",
    white: "bg-background text-foreground border-t border-border",
    dark: "bg-primary text-primary-foreground border-t border-primary/20",
    'navy-dark': "bg-navy-950 text-white border-t border-navy-900",
    'gradient-navy': "bg-primary text-primary-foreground",
    'gradient-hero': "gradient-hero text-foreground",
    'gradient-sky': "gradient-sky text-foreground border-t border-border",
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
      className={`py-16 sm:py-24 relative overflow-hidden ${bgStyles[background] || bgStyles.light} ${animate ? `reveal-init ${isVisible ? 'reveal-visible' : ''}` : ''} ${className}`}
      {...props}
    >
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
