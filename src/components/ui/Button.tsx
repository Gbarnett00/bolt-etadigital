import { ButtonHTMLAttributes, ReactNode, useRef, useState } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden z-10';

  const variantStyles = {
    primary: 'bg-accent-500 text-dark-950 hover:bg-accent-400 hover:shadow-lg hover:shadow-accent-500/20 active:scale-95',
    secondary: 'bg-transparent border-2 border-accent-500 text-gray-900 dark:text-dark-100 hover:bg-accent-600 hover:border-accent-600 hover:text-white dark:hover:text-white transition-colors',
    tertiary: 'bg-gray-100 dark:bg-dark-800 text-gray-900 dark:text-dark-100 hover:bg-gray-200 dark:hover:bg-dark-700 border border-gray-300 dark:border-dark-700',
    ghost: 'text-gray-700 dark:text-dark-300 hover:text-accent-500 dark:hover:text-accent-400 hover:bg-gray-100 dark:hover:bg-white/5',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {variant === 'primary' && (
        <span
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
          style={{
            background: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1) 40%, transparent 70%)`,
          }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </>
        ) : children}
      </span>
    </button>
  );
}
