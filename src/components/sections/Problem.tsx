import { AlertCircle } from 'lucide-react';
import { Section } from '../ui/Section';
import { useAdvancedScrollAnimation } from '../../hooks/useAdvancedScrollAnimation';
import { siteConfig } from '../../config/content';

export function Problem() {
  const titleAnim = useAdvancedScrollAnimation({ direction: 'down', distance: 30 });

  return (
    <Section spacing="lg" className="bg-gradient-to-b from-white to-gray-50 dark:from-dark-900 dark:to-dark-950">
      <div ref={titleAnim.ref} style={titleAnim.style} className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-50 mb-4">
          {siteConfig.problem.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-dark-400 max-w-2xl mx-auto">
          {siteConfig.problem.subtitle}
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {siteConfig.problem.problems.map((problem, index) => {
          const CardAnim = () => {
            const anim = useAdvancedScrollAnimation({
              direction: index % 2 === 0 ? 'left' : 'right',
              distance: 60
            });

            return (
              <div
                ref={anim.ref}
                style={{
                  ...anim.style,
                  transitionDelay: `${index * 150}ms`
                }}
                className="group flex items-start gap-6 p-8 rounded-2xl bg-white dark:bg-dark-900 border-2 border-gray-200 dark:border-dark-800 hover:border-accent-500/50 dark:hover:border-accent-500/50 hover:shadow-2xl hover:shadow-accent-500/10 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-accent-500/10 to-accent-600/10 border-2 border-accent-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <AlertCircle className="h-8 w-8 text-accent-500 transition-colors duration-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-50 mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
                    {problem.title}
                  </h3>
                  <p className="text-base text-gray-600 dark:text-dark-400 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            );
          };

          return <CardAnim key={index} />;
        })}
      </div>
    </Section>
  );
}
