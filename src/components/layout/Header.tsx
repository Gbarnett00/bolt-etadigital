import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { siteConfig } from '../../config/content';
import { useTheme } from '../../contexts/ThemeContext';
import { SpotlightText } from '../ui/SpotlightText';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Case Studies', path: '/case-study' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 overflow-x-hidden ${
      isScrolled
        ? 'border-b border-gray-200 dark:border-dark-800 glass backdrop-blur-xl'
        : 'border-b border-transparent'
    }`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-1">
            <Link to="/" className="flex items-center space-x-2">
              <SpotlightText
                text={siteConfig.company.name}
                className="text-2xl font-bold text-gray-900 dark:text-dark-100 tracking-tight"
                spotlightColor="rgb(16, 185, 129)"
                spotlightRadius={60}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActivePath(item.path)
                    ? 'text-accent-500'
                    : 'text-gray-600 dark:text-dark-300 hover:text-gray-900 dark:hover:text-dark-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-accent-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-900 dark:text-dark-100" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900 dark:text-dark-100" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-slide-down">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    isActivePath(item.path)
                      ? 'text-accent-500'
                      : 'text-gray-600 dark:text-dark-300 hover:text-gray-900 dark:hover:text-dark-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
