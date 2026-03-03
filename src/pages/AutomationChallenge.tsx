import { useState } from 'react';
import { CheckCircle, Zap } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ParticleEffect } from '../components/ui/ParticleEffect';
import { supabase } from '../lib/supabase';
import { useAdvancedScrollAnimation } from '../hooks/useAdvancedScrollAnimation';

export function AutomationChallenge() {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const titleAnim = useAdvancedScrollAnimation({ direction: 'fade' });
  const card1Anim = useAdvancedScrollAnimation({ direction: 'scale', scale: 0.9 });
  const card2Anim = useAdvancedScrollAnimation({ direction: 'scale', scale: 0.9 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase
        .from('automation_challenge_signups')
        .insert([
          {
            email: formData.email,
            company: formData.company,
          },
        ]);

      if (dbError) throw dbError;

      fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-notification-email`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            company: formData.company,
            submissionType: 'automation_challenge',
          }),
        }
      ).then(res => {
        if (!res.ok) {
          res.text().then(text => console.error('Admin notification failed:', res.status, text));
        }
      }).catch(err => console.error('Admin notification error:', err));

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className="py-20 relative overflow-hidden">
      <ParticleEffect />
      <Container>
        <div className="max-w-4xl mx-auto">
          <div ref={titleAnim.ref} style={titleAnim.style} className="relative z-10 text-center mb-12 pointer-events-none">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">
              7 Free Cost Saving Automations
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              We'll find seven cost-saving automations that you can set-up within the next 30 days, for FREE
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span>7 identified opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span>Quick wins within 30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span>100% free</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10 pointer-events-auto">
            <div ref={card1Anim.ref} style={{ ...card1Anim.style, transitionDelay: '0.1s' }}>
              <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50">
                What You'll Get
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    A detailed analysis of 7 automation opportunities specific to your business
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Quick wins you can implement within 30 days to see immediate results
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    A prioritised list showing which automations will give you the highest ROI
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    A roadmap to maximise your operational efficiency
                  </span>
                </li>
              </ul>
            </Card>
            </div>

            <div ref={card2Anim.ref} style={{ ...card2Anim.style, transitionDelay: '0.2s' }}>
              <Card className="p-8">
              {!isSubmitted ? (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50">
                    Get My Free Automations
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      required
                    />
                    {error && (
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    )}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      {isSubmitting ? 'Submitting...' : 'Get My 7 Automations'}
                    </Button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      We'll reach out, learn more about your business, and give you your personalised automation opportunities
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                    Thank You.
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    We'll reach out, learn more about your business, and give you your personalised automation opportunities.
                  </p>
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
