import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { siteConfig } from '../../config/content';
import { createClient } from '@supabase/supabase-js';
import { Download, CheckCircle } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeadMagnetModal({ isOpen, onClose }: LeadMagnetModalProps) {
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

      const notificationResponse = await fetch(
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

      if (!notificationResponse.ok) {
        console.error('Admin notification failed, but continuing');
      }

      const downloadUrl = `${window.location.origin}/ai_lead_magnet.pdf`;
      const userEmailResponse = await fetch(
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
      );

      if (!userEmailResponse.ok) {
        console.error('User email failed, but continuing');
      }

      const link = document.createElement('a');
      link.href = '/ai_lead_magnet.pdf';
      link.download = '14 Common Mistakes Businesses Make.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', company: '' });
        onClose();
      }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error submitting lead:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', company: '' });
    setError('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Download Free Guide" size="md">
      {isSuccess ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-dark-100 mb-2">
            Success!
          </h3>
          <p className="text-dark-400">
            Your download should start automatically. We've also sent a copy to your email.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-dark-100 mb-2">
              {siteConfig.leadMagnet.title}
            </h3>
            <p className="text-dark-400">
              {siteConfig.leadMagnet.description}
            </p>
          </div>

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
              {isLoading ? 'Sending...' : 'Send Me The Guide'}
            </Button>
            <p className="text-xs text-dark-400 text-center">
              We'll email the guide to your inbox
            </p>
          </form>
        </>
      )}
    </Modal>
  );
}
