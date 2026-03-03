import { useState, useEffect } from 'react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ParticleEffect } from '../components/ui/ParticleEffect';
import { siteConfig } from '../config/content';
import { supabase } from '../lib/supabase';
import { Download, CheckCircle } from 'lucide-react';
import { useAdvancedScrollAnimation } from '../hooks/useAdvancedScrollAnimation';

export function LeadMagnetDownload() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [, setPageViews] = useState(0);

  const titleAnim = useAdvancedScrollAnimation({ direction: 'fade' });
  const card1Anim = useAdvancedScrollAnimation({ direction: 'scale', scale: 0.9 });
  const card2Anim = useAdvancedScrollAnimation({ direction: 'scale', scale: 0.9 });

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const { data } = await supabase
          .from('lead_submissions')
          .select('id')
          .eq('submission_type', 'lead_magnet_page_view');

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
        .from('lead_magnet_downloads')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company || null,
            lead_magnet: '14 Common Mistakes Businesses Make',
          },
        ]);

      if (submitError) throw submitError;

      fetch(
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
      ).then(res => {
        if (!res.ok) {
          res.text().then(text => console.error('Admin notification failed:', res.status, text));
        }
      }).catch(err => console.error('Admin notification error:', err));

      const downloadUrl = `${window.location.origin}/14_common_mistakes.pdf`;

      fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-lead-magnet-email`,
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
            downloadUrl: downloadUrl,
          }),
        }
      ).then(res => {
        if (!res.ok) {
          res.text().then(text => console.error('User email failed:', res.status, text));
        } else {
          console.log('User email sent successfully');
        }
      }).catch(err => console.error('User email error:', err));

      window.open('/14_common_mistakes.pdf', '_blank');

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
    <Section className="py-20 relative overflow-hidden">
      <ParticleEffect />
      <Container>
        <div className="max-w-4xl mx-auto">
          <div ref={titleAnim.ref} style={titleAnim.style} className="relative z-10 text-center mb-12 pointer-events-none">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">
              {siteConfig.leadMagnet.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {siteConfig.leadMagnet.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span>Identify ROI opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span>Calculate savings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span>Build transformation roadmap</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10 pointer-events-auto">
            <div ref={card1Anim.ref} style={{ ...card1Anim.style, transitionDelay: '0.1s' }}>
              <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50">
                What's Inside
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Identify the highest ROI automation opportunities in your business
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Calculate potential time and cost savings with our proven framework
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Prioritise implementation for maximum impact on your operations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Build a clear roadmap for operational transformation
                  </span>
                </li>
              </ul>
            </Card>
            </div>

            <div ref={card2Anim.ref} style={{ ...card2Anim.style, transitionDelay: '0.2s' }}>
              <Card className="p-8">
              {!isSuccess ? (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50">
                    Get Your Free Guide
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Company (optional)"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                    {error && (
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    )}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      {isLoading ? 'Sending...' : 'Send Me The Guide'}
                    </Button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      We'll email the guide to your inbox
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                    Success!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your download should start automatically. We've also sent a copy to your
                    email.
                  </p>
                  <Button onClick={() => window.open('/14_common_mistakes.pdf', '_blank')}>
                    <Download className="w-5 h-5 mr-2" />
                    Download Again
                  </Button>
                </div>
              )}
            </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
