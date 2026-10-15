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
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs font-semibold tracking-wide",
    md: "px-6 py-2.5 text-sm font-bold tracking-wide shadow-soft hover:-translate-y-0.5",
    lg: "px-7 py-3.5 text-base font-bold tracking-wide shadow-card hover:-translate-y-0.5",
  };

  const variantStyles = {
    gold: "gradient-accent text-accent-foreground shadow-soft hover:shadow-card focus:ring-accent font-bold",
    accent: "gradient-accent text-accent-foreground shadow-soft hover:shadow-card focus:ring-accent font-bold",
    primary: "bg-primary text-primary-foreground hover:opacity-95 shadow-soft hover:shadow-card focus:ring-primary font-bold",
    navy: "bg-primary text-primary-foreground hover:opacity-95 shadow-soft hover:shadow-card focus:ring-primary font-bold",
    outline: "border border-border text-primary hover:bg-secondary focus:ring-primary font-semibold",
    outlineLight: "border border-white/40 text-white hover:bg-white/10 hover:border-white focus:ring-white font-medium",
    outlineDark: "border border-border text-foreground hover:bg-secondary focus:ring-primary font-semibold",
    white: "bg-background text-primary hover:bg-secondary border border-border shadow-soft focus:ring-primary font-bold",
    ghost: "text-muted-foreground hover:text-primary hover:bg-secondary",
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
