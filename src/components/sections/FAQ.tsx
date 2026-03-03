import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Section } from '../ui/Section';
import { siteConfig } from '../../config/content';
import { useAdvancedScrollAnimation } from '../../hooks/useAdvancedScrollAnimation';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const anim = useAdvancedScrollAnimation({
    direction: index % 2 === 0 ? 'left' : 'right',
    distance: 40
  });

  return (
    <div
      ref={anim.ref}
      style={{
        ...anim.style,
        transitionDelay: `${index * 80}ms`
      }}
      className="group"
    >
      <div className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-accent-500 dark:border-accent-500/50 bg-gradient-to-br from-accent-50 to-cyan-50 dark:from-accent-950/20 dark:to-cyan-950/10 shadow-lg shadow-accent-500/10'
          : 'border-gray-200 dark:border-dark-800 bg-white dark:bg-dark-900/50 hover:border-accent-300 dark:hover:border-accent-900/50'
      }`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-5 flex items-start gap-4 text-left group/button"
        >
          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg shadow-accent-500/30 scale-110'
              : 'bg-accent-500/10 border border-accent-500/20 group-hover/button:bg-accent-500/20'
          }`}>
            <HelpCircle className={`h-5 w-5 transition-colors duration-300 ${
              isOpen ? 'text-white' : 'text-accent-600 dark:text-accent-400'
            }`} />
          </div>
          <div className="flex-1">
            <span className={`text-lg font-bold block transition-colors duration-300 ${
              isOpen ? 'text-accent-900 dark:text-accent-200' : 'text-gray-900 dark:text-dark-100'
            }`}>
              {question}
            </span>
          </div>
          <ChevronDown
            className={`h-6 w-6 flex-shrink-0 transition-all duration-500 ${
              isOpen ? 'rotate-180 text-accent-600 dark:text-accent-400' : 'text-gray-400 group-hover/button:text-accent-500'
            }`}
          />
        </button>
        {isOpen && (
          <div className="px-6 pb-6 pl-20 animate-slide-down">
            <p className="text-gray-700 dark:text-dark-300 leading-relaxed">
              {answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function FAQ() {
  const titleAnim = useAdvancedScrollAnimation({ direction: 'scale', scale: 0.9 });

  return (
    <Section spacing="lg" className="relative overflow-hidden bg-white dark:bg-dark-900">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-slate-50/30 to-zinc-50/50 dark:from-dark-900/50 dark:via-dark-950/30 dark:to-dark-900/50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400/5 dark:bg-accent-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/5 dark:bg-cyan-400/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div ref={titleAnim.ref} style={titleAnim.style} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-50 mb-4">
            {siteConfig.faq.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-dark-400 max-w-2xl mx-auto">
            Everything you need to know about our solutions
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {siteConfig.faq.items.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
