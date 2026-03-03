import { useState } from 'react';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { ParticleEffect } from '../components/ui/ParticleEffect';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { siteConfig } from '../config/content';
import { createClient } from '@supabase/supabase-js';
import { MapPin, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { useAdvancedScrollAnimation } from '../hooks/useAdvancedScrollAnimation';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    budget: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const budgetOptions = [
    { value: '', label: 'Select a budget range' },
    ...siteConfig.contact.form.budgetOptions.map((option) => ({
      value: option,
      label: option,
    })),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('lead_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company || null,
            submission_type: 'contact_form',
            metadata: {
              message: formData.message,
              budget: formData.budget || null,
            },
          },
        ]);

      if (submitError) throw submitError;

      try {
        const emailResponse = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-notification-email`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              company: formData.company,
              message: formData.message,
              budget: formData.budget,
              submissionType: 'contact_form',
            }),
          }
        );

        if (!emailResponse.ok) {
          console.error('Failed to send notification email');
        }
      } catch (emailError) {
        console.error('Error sending notification email:', emailError);
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        budget: '',
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error submitting contact form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formAnim = useAdvancedScrollAnimation({ direction: 'left', distance: 40 });
  const sidebarAnim = useAdvancedScrollAnimation({ direction: 'right', distance: 40 });

  return (
    <div className="overflow-x-hidden w-full">
      <Section spacing="xl" className="relative overflow-hidden">
        <ParticleEffect />

        <div className="relative z-10 text-center max-w-3xl mx-auto mb-12 pointer-events-none">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-dark-50 mb-6 animate-slide-up">
            {siteConfig.contact.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-dark-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {siteConfig.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          <div className="lg:col-span-2" ref={formAnim.ref} style={formAnim.style}>
            <Card>
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-dark-100 mb-2">
                    Message sent!
                  </h3>
                  <p className="text-gray-600 dark:text-dark-400">
                    {siteConfig.contact.form.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label={siteConfig.contact.form.fields.name}
                      type="text"
                      placeholder="Your full name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <Input
                      label={siteConfig.contact.form.fields.email}
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <Input
                    label={siteConfig.contact.form.fields.company}
                    type="text"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />

                  <Textarea
                    label={siteConfig.contact.form.fields.message}
                    placeholder="Tell us about your operational challenges..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  <Select
                    label={siteConfig.contact.form.fields.budget}
                    options={budgetOptions}
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />

                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                  >
                    {siteConfig.contact.form.submitText}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          <div className="space-y-6" ref={sidebarAnim.ref} style={sidebarAnim.style}>
            <Card glass>
              <div className="flex items-start gap-3 mb-4">
                <Calendar className="h-6 w-6 text-accent-400 flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-100 mb-2">
                    Speak With George Directly
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-dark-400 mb-4">
                    Skip the form and get in touch directly
                  </p>
                  <button
                    onClick={() => window.open(`https://wa.me/${siteConfig.links.whatsapp}`, '_blank')}
                    className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700 rounded-xl shadow-xl shadow-accent-500/50 hover:shadow-accent-500/70 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                    <span className="relative z-10">Speak With George Directly</span>
                    <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </Card>

            <Card glass>
              <div className="flex items-start gap-3 mb-4">
                <Calendar className="h-6 w-6 text-accent-400 flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-100 mb-2">
                    Get Seven Cost-Saving Automations for Free
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-dark-400 mb-4">
                    We'll find seven cost-saving automations that you can set up within the next 30 days for free.
                  </p>
                  <Button
                    variant="tertiary"
                    size="sm"
                    className="w-full"
                    onClick={() => window.location.href = siteConfig.links.auditBooking}
                  >
                    Get Free Automations
                  </Button>
                </div>
              </div>
            </Card>

            <Card glass>
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-accent-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-100 mb-2">
                    Our location
                  </h3>
                  <address className="text-sm text-gray-600 dark:text-dark-400 not-italic">
                    {siteConfig.company.address.line1}<br />
                    {siteConfig.company.address.line2}<br />
                    {siteConfig.company.address.postcode}
                  </address>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
