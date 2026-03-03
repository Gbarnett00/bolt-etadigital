import { useState } from 'react';
import { Section } from '../ui/Section';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { siteConfig } from '../../config/content';
import { createClient } from '@supabase/supabase-js';
import { Download, CheckCircle } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function LeadMagnet() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

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
            submission_type: 'lead_magnet',
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
              submissionType: 'lead_magnet',
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
      setFormData({ name: '', email: '', company: '' });

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error submitting lead:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section spacing="lg" className="bg-gradient-to-br from-accent-500/5 to-transparent">
      <div className="max-w-4xl mx-auto">
        <Card glass>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-dark-50 mb-4">
                {siteConfig.leadMagnet.title}
              </h2>
              <p className="text-dark-300 leading-relaxed mb-6">
                {siteConfig.leadMagnet.description}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-dark-400">
                  <CheckCircle className="h-5 w-5 text-accent-400 flex-shrink-0 mt-0.5" />
                  Identify automation opportunities
                </li>
                <li className="flex items-start gap-2 text-sm text-dark-400">
                  <CheckCircle className="h-5 w-5 text-accent-400 flex-shrink-0 mt-0.5" />
                  Calculate ROI potential
                </li>
                <li className="flex items-start gap-2 text-sm text-dark-400">
                  <CheckCircle className="h-5 w-5 text-accent-400 flex-shrink-0 mt-0.5" />
                  Prioritise implementation
                </li>
              </ul>
            </div>

            <div>
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-100 mb-2">
                    Success!
                  </h3>
                  <p className="text-dark-400">
                    Check your email for the download link.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Name"
                    type="text"
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  <Input
                    label="Company (optional)"
                    type="text"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                    <Download className="mr-2 h-5 w-5" />
                    Download Free Guide
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
