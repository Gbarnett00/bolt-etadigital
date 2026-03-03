import { TrendingUp, Download, Award, Target } from 'lucide-react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { siteConfig } from '../../config/content';
import { useAdvancedScrollAnimation } from '../../hooks/useAdvancedScrollAnimation';

export function Results() {
  const titleAnim = useAdvancedScrollAnimation({ direction: 'up', distance: 60 });

  return (
    <Section spacing="lg" className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950">
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-75" />
      </div>

      <div className="relative z-10">
        <div ref={titleAnim.ref} style={titleAnim.style} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-6">
            <Award className="h-5 w-5 text-accent-600 dark:text-accent-400" />
            <span className="text-sm font-semibold text-accent-700 dark:text-accent-300">Proven Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-50 mb-4">
            Real results, real businesses
          </h2>
          <p className="text-lg text-gray-600 dark:text-dark-400 max-w-2xl mx-auto">
            Measurable impact across operations, efficiency, and revenue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {siteConfig.caseStudies.files.map((study, index) => {
            const CardAnim = () => {
              const anim = useAdvancedScrollAnimation({
                direction: 'scale',
                scale: 0.85
              });

              return (
                <div
                  ref={anim.ref}
                  style={{
                    ...anim.style,
                    transitionDelay: `${index * 150}ms`
                  }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl blur-xl opacity-15 group-hover:opacity-25 transition-opacity duration-500" />
                  <div className="relative bg-white dark:bg-dark-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-dark-800 hover:border-accent-500/50 dark:hover:border-accent-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/30">
                        {index === 0 ? (
                          <TrendingUp className="h-8 w-8 text-white" />
                        ) : index === 1 ? (
                          <Target className="h-8 w-8 text-white" />
                        ) : (
                          <Award className="h-8 w-8 text-white" />
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-accent-600 dark:text-accent-400 uppercase tracking-wide">
                          Case Study
                        </div>
                      </div>
                    </div>

                    <h3 className="text-4xl font-black bg-gradient-to-r from-accent-600 to-accent-700 dark:from-accent-400 dark:to-accent-500 bg-clip-text text-transparent mb-4">
                      {study.metric}
                    </h3>

                    <div className="space-y-2 mb-4">
                      {study.costSaving && (
                        <p className="text-base font-semibold text-gray-800 dark:text-dark-200 flex items-center gap-2">
                          <span className="w-2 h-2 bg-accent-500 rounded-full" />
                          {study.costSaving}
                        </p>
                      )}
                      {study.revenue && (
                        <p className="text-base font-semibold text-gray-800 dark:text-dark-200 flex items-center gap-2">
                          <span className="w-2 h-2 bg-accent-600 rounded-full" />
                          {study.revenue}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-dark-400 leading-relaxed">
                      {study.description}
                    </p>
                  </div>
                </div>
              );
            };

            return <CardAnim key={index} />;
          })}
        </div>

        <div className="text-center">
          <Button variant="secondary" size="lg" className="group">
            <span className="flex flex-col items-center gap-2">
              <Download className="h-5 w-5 group-hover:animate-bounce" />
              <span>Download Full Case Studies</span>
            </span>
          </Button>
        </div>
      </div>
    </Section>
  );
}
