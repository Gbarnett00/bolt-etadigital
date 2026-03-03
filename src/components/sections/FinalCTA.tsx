import { ArrowRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { siteConfig } from '../../config/content';

export function FinalCTA() {
  return (
    <Section spacing="xl" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-accent-500/10 via-transparent to-transparent opacity-30 blur-3xl" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-50 mb-6">
          Ready to transform your operations?
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-dark-300 mb-10 leading-relaxed max-w-2xl mx-auto">
          Let's identify the highest ROI automation opportunities in your business and build a system that actually works.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.open(`https://wa.me/${siteConfig.links.whatsapp}`, '_blank')}
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700 rounded-xl shadow-2xl shadow-accent-500/50 hover:shadow-accent-500/70 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            <span className="relative z-10">Speak With George Directly</span>
            <ArrowRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = siteConfig.links.auditBooking}
          >
            Get Free Automations
          </Button>
        </div>
      </div>
    </Section>
  );
}
