import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'gold',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const baseStyles = "group inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs font-semibold tracking-wide",
    md: "px-6 py-2.5 text-sm font-bold tracking-wide shadow-soft hover:-translate-y-0.5",
    lg: "px-7 py-3.5 text-base font-bold tracking-wide shadow-card hover:-translate-y-0.5",
  };

  const variantStyles = {
    primary: "bg-[#0369a1] text-white hover:bg-[#0ea5e9] shadow-soft hover:shadow-card focus:ring-[#0369a1] font-bold btn-shimmer",
    gold: "bg-[#0369a1] text-white hover:bg-[#0ea5e9] shadow-soft hover:shadow-card focus:ring-[#0369a1] font-bold btn-shimmer",
    accent: "bg-[#0369a1] text-white hover:bg-[#0ea5e9] shadow-soft hover:shadow-card focus:ring-[#0369a1] font-bold btn-shimmer",
    navy: "bg-[#0369a1] text-white hover:bg-[#0ea5e9] shadow-soft hover:shadow-card focus:ring-[#0369a1] font-bold btn-shimmer",
    secondary: "bg-[#e0f2fe] text-[#075985] hover:bg-[#bae6fd] border border-[#cfe6f5] focus:ring-[#0369a1] font-bold shadow-xs",
    outline: "border border-[#cfe6f5] text-[#0369a1] hover:bg-[#e0f2fe] hover:border-[#0369a1] focus:ring-[#0369a1] font-semibold",
    outlineLight: "border border-white/60 text-white hover:bg-white/10 hover:border-white focus:ring-white font-medium",
    outlineDark: "border border-[#cfe6f5] text-[#082f49] hover:bg-[#e0f2fe] focus:ring-[#0369a1] font-semibold",
    white: "bg-white text-[#0369a1] hover:bg-[#e0f2fe] border border-[#cfe6f5] shadow-soft focus:ring-[#0369a1] font-bold hover:shadow-card",
    ghost: "text-[#4b6b82] hover:text-[#0369a1] hover:bg-[#e0f2fe]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 mr-2 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
      )}
      <span className="relative z-10">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 ml-2 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
