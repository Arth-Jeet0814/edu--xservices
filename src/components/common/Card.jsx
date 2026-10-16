import React from 'react';

export default function Card({
  children,
  className = '',
  variant = 'light', // 'light', 'dark', 'navy', 'gold', 'outline'
  hoverEffect = true,
  padding = 'default',
  ...props
}) {
  const baseStyles = "rounded-3xl transition-all duration-300 border relative overflow-hidden";

  const paddingStyles = {
    none: "",
    sm: "p-4 sm:p-5",
    default: "p-6 sm:p-8",
    lg: "p-8 sm:p-10",
  };

  const variantStyles = {
    light: "bg-card/95 backdrop-blur-sm border-border/80 shadow-soft text-foreground ring-1 ring-black/[0.02]",
    cream: "bg-card/80 backdrop-blur-xs border-border/80 shadow-soft text-foreground",
    dark: "gradient-primary text-primary-foreground border-primary/20 shadow-card",
    darkSubtle: "bg-primary/95 text-primary-foreground border-primary/20",
    navyMuted: "bg-primary text-primary-foreground border-primary/20 shadow-soft",
    goldBorder: "bg-card/95 backdrop-blur-sm border-2 border-accent/60 shadow-soft text-foreground",
  };

  const hoverClass = hoverEffect ? "hover:shadow-card hover:-translate-y-1 hover:border-primary/35" : "";

  return (
    <div
      className={`${baseStyles} ${paddingStyles[padding]} ${variantStyles[variant]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
