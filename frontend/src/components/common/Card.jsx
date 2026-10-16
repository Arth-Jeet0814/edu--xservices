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
    light: "bg-white border border-[#cfe6f5] shadow-soft text-[#082f49]",
    cream: "bg-[#f0f9ff] border border-[#cfe6f5] shadow-soft text-[#082f49]",
    dark: "bg-[#e0f2fe] text-[#082f49] border border-[#cfe6f5] shadow-soft",
    darkSubtle: "bg-[#e0f2fe] text-[#082f49] border border-[#cfe6f5]",
    navyMuted: "bg-[#e0f2fe] text-[#082f49] border border-[#cfe6f5] shadow-soft",
    goldBorder: "bg-white border-2 border-[#0ea5e9] shadow-soft text-[#082f49]",
  };

  const hoverClass = hoverEffect ? "hover:shadow-card hover:-translate-y-1 hover:border-[#0369a1]" : "";

  return (
    <div
      className={`${baseStyles} ${paddingStyles[padding]} ${variantStyles[variant]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
