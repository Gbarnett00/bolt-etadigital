import { Database, Eye, CheckCircle, Zap, Layers, Cpu } from 'lucide-react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { siteConfig } from '../../config/content';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const iconMap = {
  Database,
  Eye,
  CheckCircle,
  Zap,
  Layers,
  Cpu,
};

export function Outcomes() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Section spacing="lg">
      <div
        ref={ref}
        className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-50 mb-4">
          {siteConfig.outcomes.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-dark-400 max-w-2xl mx-auto">
          {siteConfig.outcomes.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteConfig.outcomes.items.map((outcome, index) => {
          const Icon = iconMap[outcome.icon as keyof typeof iconMap];
          return (
            <Card
              key={index}
              interactive
              className="transition-all duration-600"
              style={{
                transitionDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              } as React.CSSProperties}
            >
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-600/20 border border-accent-500/30">
                  <Icon className="h-7 w-7 text-accent-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-100 mb-3">
                {outcome.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-dark-400 leading-relaxed">
                {outcome.description}
              </p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
