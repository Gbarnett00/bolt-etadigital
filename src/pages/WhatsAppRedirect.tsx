import { useEffect } from 'react';
import { siteConfig } from '../config/content';

export function WhatsAppRedirect() {
  useEffect(() => {
    const whatsappUrl = `https://wa.me/${siteConfig.links.whatsapp}`;
    window.location.replace(whatsappUrl);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Redirecting to WhatsApp...</p>
      </div>
    </div>
  );
}
