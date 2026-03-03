import { useState } from 'react';
import { Download, CheckCircle } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ParticleEffect } from '../components/ui/ParticleEffect';
import { supabase } from '../lib/supabase';
import { useAdvancedScrollAnimation } from '../hooks/useAdvancedScrollAnimation';

const CASE_STUDY_NAME = 'Groundtech UK';
const CASE_STUDY_FILE = '/groundtech_case_study.pdf';

export function CaseStudy() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const titleAnim = useAdvancedScrollAnimation({ direction: 'fade' });
  const card1Anim = useAdvancedScrollAnimation({ direction: 'scale', scale: 0.9 });
  const card2Anim = useAdvancedScrollAnimation({ direction: 'scale', scale: 0.9 });

  const handleDownload = () => {
    window.open(CASE_STUDY_FILE, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase
        .from('case_study_downloads')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company || null,
            case_study: CASE_STUDY_NAME,
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
            name: formData.name,
            email: formData.email,
            company: formData.company,
            submissionType: 'case_study',
            caseStudyName: CASE_STUDY_NAME,
          }),
        }
      ).then(res => {
        if (!res.ok) {
          res.text().then(text => console.error('Admin notification failed:', res.status, text));
        }
      }).catch(err => console.error('Admin notification error:', err));

      const downloadUrl = `${window.location.origin}${encodeURI(CASE_STUDY_FILE)}`;

      fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-case-study-email`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            caseStudyName: CASE_STUDY_NAME,
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

      handleDownload();
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
              {CASE_STUDY_NAME} Case Study
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              From 17-minute orders and missed calls to a 4-minute, fully-automated workflow
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span>17 min → 4 min per order</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span>£90K → £173K monthly revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span>4x capacity increase</span>
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
                    The operational chaos that was costing 17 minutes per order
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    How we built a custom CRM to automate the entire workflow
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    The impact: 4x capacity without hiring, £83K revenue increase
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Technical implementation details and lessons learned
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
                    Get the Case Study
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
                      disabled={isSubmitting}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send Me The Case Study'}
                    </Button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      We'll email the case study to your inbox
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
                  <Button onClick={handleDownload}>
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
