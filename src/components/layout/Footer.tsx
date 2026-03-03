import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/content';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-dark-800 bg-white dark:bg-dark-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-dark-100 mb-4">
              {siteConfig.company.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-dark-400 leading-relaxed">
              {siteConfig.company.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-dark-300 mb-4">Company Address</h4>
            <address className="text-sm text-gray-600 dark:text-dark-400 not-italic">
              {siteConfig.company.address.line1}<br />
              {siteConfig.company.address.line2}<br />
              {siteConfig.company.address.postcode}
            </address>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-dark-300 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-dark-400 hover:text-accent-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 dark:text-dark-400 hover:text-accent-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 dark:text-dark-400 hover:text-accent-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-dark-500">
            © {currentYear} {siteConfig.company.name}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href={siteConfig.links.privacyPolicy}
              className="text-sm text-gray-500 dark:text-dark-500 hover:text-accent-500 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href={siteConfig.links.terms}
              className="text-sm text-gray-500 dark:text-dark-500 hover:text-accent-500 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
