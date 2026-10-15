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
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs font-semibold tracking-wide",
    md: "px-5 py-2.5 text-sm font-semibold tracking-wide",
    lg: "px-7 py-3.5 text-base font-semibold tracking-wide shadow-md",
  };

  const variantStyles = {
    gold: "bg-gold-500 hover:bg-gold-600 text-white shadow-sm hover:shadow-md focus:ring-gold-400 font-bold tracking-wide",
    navy: "bg-navy-900 hover:bg-navy-850 text-white focus:ring-navy-800 shadow-sm font-semibold border border-navy-800/60",
    outline: "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white focus:ring-navy-900 font-semibold",
    outlineLight: "border border-white/40 text-white hover:bg-white/10 hover:border-white focus:ring-white font-medium",
    outlineDark: "border border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400 font-medium",
    white: "bg-white text-navy-900 hover:bg-slate-50 border border-slate-200 shadow-sm focus:ring-navy-900 font-semibold",
    ghost: "text-slate-200 hover:text-white hover:bg-white/5",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2 shrink-0" />}
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
