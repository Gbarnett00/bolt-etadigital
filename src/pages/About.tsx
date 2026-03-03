import { useState, useEffect } from 'react';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { ParticleEffect } from '../components/ui/ParticleEffect';
import { ImageEditor, ImageSettings } from '../components/ui/ImageEditor';
import { siteConfig } from '../config/content';
import { Target, Lightbulb, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { useAdvancedScrollAnimation } from '../hooks/useAdvancedScrollAnimation';
import { supabase } from '../lib/supabase';

const principleIcons = {
  'Clarity First': Target,
  'Systems Over Tools': Lightbulb,
  'ROI Obsession': TrendingUp,
  'Built for Adoption': Users,
};

export function About() {
  const [imageSettings, setImageSettings] = useState<ImageSettings>({ zoom: 1, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    // Fetch image settings from Supabase
    const fetchImageSettings = async () => {
      const { data, error } = await supabase
        .from('image_settings')
        .select('zoom, offset_x, offset_y')
        .eq('key', 'profile_image')
        .maybeSingle();

      if (data && !error) {
        setImageSettings({
          zoom: Number(data.zoom),
          offsetX: Number(data.offset_x),
          offsetY: Number(data.offset_y)
        });
      }
    };

    fetchImageSettings();
  }, []);

  const handleSaveImageSettings = async (settings: ImageSettings) => {
    setImageSettings(settings);

    // Only allow saving in dev mode
    if (import.meta.env.DEV) {
      const { error } = await supabase
        .from('image_settings')
        .upsert({
          key: 'profile_image',
          zoom: settings.zoom,
          offset_x: settings.offsetX,
          offset_y: settings.offsetY,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'key'
        });

      if (!error) {
        console.log('Image settings saved to database:', settings);
      } else {
        console.error('Error saving image settings:', error);
      }
    }
  };

  return (
    <div className="overflow-x-hidden w-full">
      <Section spacing="xl" className="relative overflow-hidden">
        <ParticleEffect />

        <div className="relative z-10 max-w-4xl mx-auto pointer-events-none">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-dark-50 mb-6 animate-slide-up">
              {siteConfig.about.story.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-dark-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Building operational systems that bring back control and clarity
            </p>
          </div>
        </div>
      </Section>

      <Section spacing="lg">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-100 mb-3">
                The Problem
              </h3>
              <p className="text-sm text-gray-600 dark:text-dark-400">
                Too many great businesses are held back by operational chaos
              </p>
            </Card>

            <Card hover className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-100 mb-3">
                What We Saw
              </h3>
              <p className="text-sm text-gray-600 dark:text-dark-400">
                Talented teams drowning in admin, leaders flying blind, and massive potential locked behind inefficient processes
              </p>
            </Card>

            <Card hover className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-100 mb-3">
                Our Solution
              </h3>
              <p className="text-sm text-gray-600 dark:text-dark-400">
                We build the operational systems that bring clarity, control, and freedom to your business
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section spacing="lg" className="bg-gradient-to-b from-white to-gray-50 dark:from-dark-900 dark:to-dark-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="mb-6 w-40 h-40 mx-auto rounded-full shadow-xl overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
              <img
                src="/george-profile.jpg"
                alt="George - Founder of ETA Digital"
                className="w-full h-full object-cover"
                style={{
                  transform: `scale(${imageSettings.zoom}) translate(${imageSettings.offsetX / imageSettings.zoom}px, ${imageSettings.offsetY / imageSettings.zoom}px)`,
                  transformOrigin: 'center center',
                }}
              />
              <ImageEditor
                imageSrc="/george-profile.jpg"
                onSave={handleSaveImageSettings}
                initialSettings={imageSettings}
              />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-dark-50 mb-4">
              Meet George
            </h3>
            <p className="text-xl text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
              Founder of ETA Digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card hover>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-dark-100 mb-3">
                The Problem
              </h4>
              <p className="text-sm text-gray-600 dark:text-dark-400 leading-relaxed">
                I was constantly dealing with repetitive tasks, slow processes, and decisions made with incomplete data. These issues were draining my time and costing me money.
              </p>
            </Card>

            <Card hover>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-dark-100 mb-3">
                The Journey
              </h4>
              <p className="text-sm text-gray-600 dark:text-dark-400 leading-relaxed">
                I dove into AI, studying for hours, attending seminars, testing models, and investing in certified training to understand what was possible.
              </p>
            </Card>
          </div>

          <Card glass className="mb-8">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-dark-100 mb-4">
                The Transformation
              </h4>
              <p className="text-gray-600 dark:text-dark-400 leading-relaxed max-w-2xl mx-auto">
                After automating my own business, the results were remarkable. I gained back hours in my day, dramatically reduced costs, and my team became happier and more productive. Most importantly, my business could finally scale without me being the bottleneck.
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-accent-500/10 to-accent-600/10 border border-accent-500/20">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-dark-100 mb-4">
                The Mission
              </h4>
              <p className="text-gray-700 dark:text-dark-300 leading-relaxed max-w-2xl mx-auto">
                I've lived through the challenges of running an inefficient business, and I've experienced the freedom that comes from proper automation. Now, my mission is simple: help SMEs implement the same automations that transformed my business, so they can save time, reduce costs, and unlock their full potential.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      <Section spacing="lg" className="bg-gradient-to-b from-white to-gray-50 dark:from-dark-900 dark:to-dark-950">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-dark-50 mb-4">
            {siteConfig.about.principles.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {siteConfig.about.principles.items.map((principle, index) => {
            const Icon = principleIcons[principle.title as keyof typeof principleIcons];
            const PrincipleCard = () => {
              const anim = useAdvancedScrollAnimation({ direction: 'scale', scale: 0.9 });
              return (
                <div
                  ref={anim.ref}
                  style={{
                    ...anim.style,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <Card hover>
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-600/20 border border-accent-500/30">
                        <Icon className="h-6 w-6 text-accent-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-100 mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-dark-400 leading-relaxed">
                      {principle.description}
                    </p>
                  </Card>
                </div>
              );
            };
            return <PrincipleCard key={index} />;
          })}
        </div>
      </Section>

      <Section spacing="lg">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-dark-50 mb-4">
            {siteConfig.about.approach.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {siteConfig.about.approach.items.map((item, index) => {
            const ApproachCard = () => {
              const anim = useAdvancedScrollAnimation({ direction: 'scale', scale: 0.9 });
              return (
                <div
                  ref={anim.ref}
                  style={{
                    ...anim.style,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <Card glass>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-100 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-dark-400 leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </div>
              );
            };
            return <ApproachCard key={index} />;
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => window.open(`https://wa.me/${siteConfig.links.whatsapp}`, '_blank')}
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700 rounded-xl shadow-2xl shadow-accent-500/50 hover:shadow-accent-500/70 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            <span className="relative z-10">Speak With George Directly</span>
            <ArrowRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </Section>
    </div>
  );
}
