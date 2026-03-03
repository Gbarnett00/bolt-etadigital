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
import { useEffect } from 'react';
import { trackPageView } from './lib/analytics';

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const appRoute = params.get('app-route');

    if (appRoute) {
      window.history.replaceState({}, '', appRoute);
      navigate(appRoute, { replace: true });
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
