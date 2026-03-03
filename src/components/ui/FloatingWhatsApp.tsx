import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/content';

export function FloatingWhatsApp() {
  const handleClick = () => {
    window.open(`https://wa.me/${siteConfig.links.whatsapp}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
        <MessageCircle className="w-6 h-6 text-white" strokeWidth={2} />
      </div>

      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 dark:bg-dark-800 text-white text-sm font-medium rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Chat with George on WhatsApp
        <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-dark-800" />
      </div>
    </button>
  );
}
