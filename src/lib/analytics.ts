declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
    GA4_MEASUREMENT_ID?: string;
  }
}

export const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

export const initGA4 = () => {
  if (!GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('GA4 Measurement ID not configured');
    return;
  }

  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Capture the full URL right now, before React can change it.
  // GA4 loads async so by the time it runs, the URL may already have
  // been rewritten (e.g. /?app-route=/case-study → /case-study).
  // Passing page_location explicitly locks in the original UTM params.
  const initialUrl = window.location.href;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // send_page_view: false — trackPageView handles ALL page_view events.
  // This prevents a duplicate page_view (one from config, one from trackPageView)
  // and avoids the intermediate /?app-route=... URL polluting GA4 reports.
  // page_location is still passed so GA4 has the correct session URL context.
  window.gtag('config', GA4_MEASUREMENT_ID, {
    send_page_view: false,
    page_location: initialUrl,
  });
};

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window.gtag !== 'undefined') {
    // page_location must be the full URL so GA4 can read UTM params for session attribution.
    // window.location.href is evaluated NOW (synchronously), before GA4 processes the event async.
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: pageTitle || document.title,
    });
  }
};

export const trackConversion = (conversionLabel: string, value?: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      send_to: conversionLabel,
      value: value,
    });
  }
};

export const trackOutboundLink = (url: string, label?: string) => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: label || url,
    value: url,
  });
};
