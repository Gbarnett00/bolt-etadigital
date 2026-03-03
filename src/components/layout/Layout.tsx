import { ReactNode, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from '../ui/FloatingWhatsApp';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden w-full">
      <Header />
      <main className="flex-grow relative z-10 w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
