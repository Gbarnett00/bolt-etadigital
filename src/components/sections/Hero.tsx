import { ArrowRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { ParticleEffect } from '../ui/ParticleEffect';
import { siteConfig } from '../../config/content';

export function Hero() {
  return (
    <Section spacing="xl" className="relative overflow-hidden">
      <ParticleEffect />

      <div className="relative z-10 text-center max-w-5xl mx-auto pointer-events-none">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-dark-50 mb-6 animate-slide-up">
          {siteConfig.hero.headline}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-dark-300 mb-12 leading-relaxed max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {siteConfig.hero.subheadline}
        </p>

        <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={() => window.open(`https://wa.me/${siteConfig.links.whatsapp}`, '_blank')}
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700 rounded-xl shadow-2xl shadow-accent-500/50 hover:shadow-accent-500/70 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden pointer-events-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            <span className="relative z-10">Speak With George Directly</span>
            <ArrowRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </Section>
  );
}
