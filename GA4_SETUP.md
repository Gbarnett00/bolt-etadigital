# Google Analytics 4 Setup Guide

## Step 1: Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. Under **Property**, click **Data Streams**
4. Select your web data stream (or create one if you don't have it)
5. Copy your **Measurement ID** (format: G-XXXXXXXXXX)

## Step 2: Add Measurement ID to Environment Variables

Open `.env` file and replace the placeholder:

```env
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

## Step 3: Deploy

That's it! The tracking is already configured to:

- Track all page views automatically
- Track UTM parameters from LinkedIn and other sources
- Track custom events (available via `trackEvent()` function)

## Tracking LinkedIn Visits

When sharing links on LinkedIn, add UTM parameters:

```
https://etadigital.co.uk/?utm_source=linkedin&utm_medium=social&utm_campaign=profile
```

You'll see these visits in GA4 under:
- **Reports** → **Acquisition** → **Traffic acquisition**
- Filter by "linkedin" to see all LinkedIn traffic

## Available Tracking Functions

The following functions are available in `src/lib/analytics.ts`:

- `trackEvent(eventName, eventParams)` - Track custom events
- `trackPageView(pagePath, pageTitle)` - Manual page view tracking
- `trackConversion(conversionLabel, value)` - Track conversions
- `trackOutboundLink(url, label)` - Track external link clicks

## Example Usage

```typescript
import { trackEvent } from './lib/analytics';

// Track a button click
trackEvent('cta_click', {
  button_name: 'Get Started',
  location: 'hero_section'
});

// Track form submission
trackEvent('form_submit', {
  form_name: 'contact_form',
  form_location: 'contact_page'
});
```

## Verify Installation

1. Open your website
2. Open browser DevTools (F12)
3. Go to Network tab
4. Filter by "google-analytics" or "gtag"
5. You should see requests being sent to GA4

Alternatively, install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/) Chrome extension.
