import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { DownloadGuide } from './pages/DownloadGuide';
import { LeadMagnetDownload } from './pages/LeadMagnetDownload';
import { WhatsAppRedirect } from './pages/WhatsAppRedirect';
import { CaseStudy } from './pages/CaseStudy';
import { AutomationChallenge } from './pages/AutomationChallenge';
import Quiz from './pages/Quiz';
import { UTMBuilder } from './pages/UTMBuilder';
import { useEffect } from 'react';
import { trackPageView } from './lib/analytics';

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Skip the intermediate /?app-route=... URL — it's a redirect artifact, not a real page.
    // The location useEffect will fire again with the clean URL after navigate() resolves.
    if (location.search.includes('app-route=')) return;
    trackPageView(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const appRoute = params.get('app-route');

    if (appRoute) {
      // Remove app-route but keep all UTM params so GA4 can read them
      params.delete('app-route');
      const remainingParams = params.toString();
      const targetUrl = appRoute + (remainingParams ? '?' + remainingParams : '');
      console.log('[UTM Debug] app-route detected');
      console.log('[UTM Debug] navigating to:', targetUrl);
      console.log('[UTM Debug] utm_source:', params.get('utm_source'));
      console.log('[UTM Debug] utm_medium:', params.get('utm_medium'));
      console.log('[UTM Debug] utm_campaign:', params.get('utm_campaign'));
      window.history.replaceState({}, '', targetUrl);
      navigate(targetUrl, { replace: true });
    }
  }, [navigate]);

  return (
    <div className="overflow-x-hidden w-full">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/download-guide" element={<DownloadGuide />} />
          <Route path="/free-guide" element={<LeadMagnetDownload />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/free-automations" element={<AutomationChallenge />} />
          <Route path="/automation-challenge" element={<AutomationChallenge />} />
          <Route path="/chat" element={<WhatsAppRedirect />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/utm-builder" element={<UTMBuilder />} />
        </Routes>
      </Layout>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
