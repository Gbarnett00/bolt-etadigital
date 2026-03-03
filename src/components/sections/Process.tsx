import { Search, Lightbulb, Wrench, TrendingUp } from 'lucide-react';
import { Section } from '../ui/Section';
import { siteConfig } from '../../config/content';
import { useAdvancedScrollAnimation } from '../../hooks/useAdvancedScrollAnimation';

const icons = [Search, Lightbulb, Wrench, TrendingUp];

export function Process() {
  const titleAnim = useAdvancedScrollAnimation({ direction: 'fade' });

  return (
    <Section spacing="lg" className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-gray-100 dark:from-dark-950 dark:to-dark-900/50">
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent-400 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div ref={titleAnim.ref} style={titleAnim.style} className="text-center mb-20 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-50 mb-4">
          {siteConfig.process.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-dark-400 max-w-3xl mx-auto leading-relaxed">
          {siteConfig.process.subtitle}
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {siteConfig.process.stages.map((stage, index) => {
            const StageAnim = () => {
              const anim = useAdvancedScrollAnimation({
                direction: 'scale',
                scale: 0.9
              });
              const Icon = icons[index];

              return (
                <div
                  ref={anim.ref}
                  style={{
                    ...anim.style,
                    transitionDelay: `${index * 150}ms`
                  }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-500 to-accent-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                  <div className="relative bg-white dark:bg-dark-900 rounded-3xl p-8 border-2 border-gray-200 dark:border-dark-800 group-hover:border-accent-500/50 dark:group-hover:border-accent-500/30 transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                          <div className="relative w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-center">
                          <span className="text-sm font-bold text-accent-600 dark:text-accent-400 bg-accent-500/10 px-3 py-1 rounded-full">
                            Step {index + 1}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 pt-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-50 mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                          {stage.title}
                        </h3>
                        <p className="text-base text-gray-600 dark:text-dark-400 leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            };

            return <StageAnim key={index} />;
          })}
        </div>
      </div>
    </Section>
  );
}
