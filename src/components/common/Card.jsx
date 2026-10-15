import React from 'react';

export default function Card({
  children,
  className = '',
  variant = 'light', // 'light', 'dark', 'navy', 'gold', 'outline'
  hoverEffect = true,
  padding = 'default',
  ...props
}) {
  const baseStyles = "rounded-[14px] transition-all duration-200 border relative overflow-hidden";

  const paddingStyles = {
    none: "",
    sm: "p-4 sm:p-5",
    default: "p-6 sm:p-8",
    lg: "p-8 sm:p-10",
  };

  const variantStyles = {
    light: "bg-white border-slate-200/90 shadow-subtle text-slate-800",
    cream: "bg-slate-50 border-slate-200 shadow-subtle text-slate-800",
    dark: "bg-navy-900 border-navy-800 shadow-card text-white",
    darkSubtle: "bg-navy-950/80 border-navy-800/80 text-slate-200 backdrop-blur-sm",
    navyMuted: "bg-navy-900 border-navy-800 shadow-card text-white",
    goldBorder: "bg-white border-2 border-gold-500/60 shadow-card text-slate-800",
  };

  const hoverClass = hoverEffect ? "card-hover-lift hover:shadow-card-hover" : "";

  return (
    <div
      className={`${baseStyles} ${paddingStyles[padding]} ${variantStyles[variant]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
