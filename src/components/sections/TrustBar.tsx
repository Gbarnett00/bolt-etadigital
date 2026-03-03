import { Check } from 'lucide-react';
import { Section } from '../ui/Section';
import { siteConfig } from '../../config/content';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export function TrustBar() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Section spacing="sm" className="border-y border-gray-200 dark:border-dark-800 bg-gray-100 dark:bg-dark-900/50">
      <div
        ref={ref}
        className={`text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="text-sm font-medium text-accent-500 mb-6 tracking-wide uppercase">
          {siteConfig.trustBar.title}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {siteConfig.trustBar.bullets.map((bullet, index) => (
            <div
              key={index}
              className="flex items-center gap-2"
              style={{
                transitionDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.5s, transform 0.5s'
              }}
            >
              <Check className="h-4 w-4 text-accent-500 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-dark-300">{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
