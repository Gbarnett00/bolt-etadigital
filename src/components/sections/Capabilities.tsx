import { Check } from 'lucide-react';
import { Section } from '../ui/Section';
import { siteConfig } from '../../config/content';
import { useAdvancedScrollAnimation } from '../../hooks/useAdvancedScrollAnimation';

export function Capabilities() {
  const titleAnim = useAdvancedScrollAnimation({ direction: 'scale', scale: 0.8 });

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-50/30 via-white to-cyan-50/30 dark:from-accent-950/10 dark:via-dark-900 dark:to-cyan-950/10" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500/5 dark:bg-accent-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10">
        <div ref={titleAnim.ref} style={titleAnim.style} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-50 mb-4">
            {siteConfig.capabilities.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-dark-400 max-w-2xl mx-auto">
            {siteConfig.capabilities.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteConfig.capabilities.items.map((item, index) => {
              const ItemAnim = () => {
                const anim = useAdvancedScrollAnimation({
                  direction: 'up',
                  distance: 40
                });

                return (
                  <div
                    ref={anim.ref}
                    style={{
                      ...anim.style,
                      transitionDelay: `${index * 60}ms`
                    }}
                    className="group relative flex items-center gap-3 p-5 rounded-lg bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm border border-gray-200 dark:border-dark-800 hover:border-accent-500/50 dark:hover:border-accent-500/30 hover:shadow-lg hover:shadow-accent-500/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg shadow-accent-500/30 group-hover:scale-110 transition-transform duration-300">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-dark-200 leading-snug">
                      {item}
                    </p>
                  </div>
                );
              };

              return <ItemAnim key={index} />;
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
