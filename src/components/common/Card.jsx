import React from 'react';

export default function Card({
  children,
  className = '',
  variant = 'light', // 'light', 'dark', 'navy', 'gold', 'outline'
  hoverEffect = true,
  padding = 'default',
  ...props
}) {
  const baseStyles = "rounded-2xl transition-all duration-200 border relative overflow-hidden";

  const paddingStyles = {
    none: "",
    sm: "p-4 sm:p-5",
    default: "p-6 sm:p-8",
    lg: "p-8 sm:p-10",
  };

  const variantStyles = {
    light: "bg-card border-border shadow-soft text-foreground",
    cream: "bg-muted/40 border-border shadow-soft text-foreground",
    dark: "bg-primary text-primary-foreground border-primary/20 shadow-soft",
    darkSubtle: "bg-primary/95 text-primary-foreground border-primary/20",
    navyMuted: "bg-primary text-primary-foreground border-primary/20 shadow-soft",
    goldBorder: "bg-card border-2 border-accent/60 shadow-soft text-foreground",
  };

  const hoverClass = hoverEffect ? "hover:shadow-card hover:-translate-y-1" : "";

  return (
    <div
      className={`${baseStyles} ${paddingStyles[padding]} ${variantStyles[variant]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
