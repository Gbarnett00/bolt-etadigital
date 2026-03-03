import { useState, useEffect } from 'react';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { siteConfig } from '../config/content';
import { createClient } from '@supabase/supabase-js';
import { Download, CheckCircle, FileText } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function DownloadGuide() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [pageViews, setPageViews] = useState(0);

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const { data } = await supabase
          .from('lead_submissions')
          .select('id')
          .eq('submission_type', 'guide_page_view');

        setPageViews(data?.length || 0);
      } catch (err) {
        console.error('Error tracking page view:', err);
      }
    };

    trackPageView();
  }, []);

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
            submission_type: 'guide_download',
            metadata: {
              source: 'download_guide_page',
              referrer: document.referrer || 'direct',
            },
          },
        ]);

      if (submitError) throw submitError;

      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error submitting lead:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section spacing="xl" className="relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-radial from-accent-500/10 via-transparent to-transparent opacity-30 blur-3xl" />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent-500/20 to-accent-600/20 border border-accent-500/30 mb-6">
            <FileText className="h-8 w-8 text-accent-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-dark-50 mb-4">
            {siteConfig.leadMagnet.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
            {siteConfig.leadMagnet.description}
          </p>
        </div>

        <Card glass className="max-w-2xl mx-auto">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
                <CheckCircle className="h-10 w-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-100 mb-4">
                Success!
              </h2>
              <p className="text-lg text-gray-600 dark:text-dark-400 mb-6">
                Your download will begin shortly. We've also sent a copy to your email.
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-500">
                Check your inbox (and spam folder) for the guide.
              </p>
            </div>
          ) : (
            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-100 mb-4">
                  Get Your Free Guide
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700 dark:text-dark-300">
                    <CheckCircle className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                    <span>Identify the highest ROI automation opportunities in your business</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 dark:text-dark-300">
                    <CheckCircle className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                    <span>Calculate potential time and cost savings</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 dark:text-dark-300">
                    <CheckCircle className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                    <span>Prioritise implementation for maximum impact</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 dark:text-dark-300">
                    <CheckCircle className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                    <span>Build a roadmap for operational transformation</span>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Smith"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <Input
                  label="Work Email"
                  type="email"
                  placeholder="john@company.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <Input
                  label="Company Name (optional)"
                  type="text"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />

                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
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

                <p className="text-xs text-center text-gray-500 dark:text-dark-500">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          )}
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-dark-500">
            Want to discuss your specific automation needs?{' '}
            <button
              onClick={() => window.open(siteConfig.links.bookCall, '_blank')}
              className="text-accent-500 hover:text-accent-400 underline"
            >
              Book a call with us
            </button>
          </p>
        </div>
      </div>
    </Section>
  );
}
