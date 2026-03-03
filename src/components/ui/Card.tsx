import { ReactNode } from 'react';
import { MouseTracker } from './MouseTracker';
import { InteractiveCard } from './InteractiveCard';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  interactive?: boolean;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', hover = false, glass = false, interactive = false, style }: CardProps) {
  if (interactive) {
    return (
      <InteractiveCard intensity={5} style={style}>
        <div
          className={`
            card rounded-xl p-6 relative overflow-hidden
            ${glass ? 'glass' : 'bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800'}
            hover:border-accent-500/30 hover:shadow-md hover:shadow-accent-500/10
            ${className}
          `}
        >
          <div className="relative z-20">{children}</div>
        </div>
      </InteractiveCard>
    );
  }

  if (hover) {
    return (
      <MouseTracker intensity="medium" className="block" style={style}>
        <div
          className={`
            card rounded-xl p-6 relative overflow-hidden h-full
            ${glass ? 'glass' : 'bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800'}
            transition-all duration-300 hover:border-accent-500/30 hover:shadow-md hover:shadow-accent-500/5 hover:-translate-y-1
            ${className}
          `}
        >
          <div className="relative z-20">{children}</div>
        </div>
      </MouseTracker>
    );
  }

  return (
    <div
      className={`
        card rounded-xl p-6 relative overflow-hidden
        ${glass ? 'glass' : 'bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800'}
        ${className}
      `}
      style={style}
    >
      <div className="relative z-20">{children}</div>
    </div>
  );
}
