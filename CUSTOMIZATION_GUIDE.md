# ETA Digital Website - Customization Guide

## Quick Start

Your premium AI Automation agency website is now live! Here's how to customize it.

## Easy Content Updates

All website content is centralized in one file for easy editing:

**File:** `src/config/content.ts`

### Key Things to Update

1. **Booking Links**
   - Search for `[BOOK_CALL_LINK_TODO]` and replace with your actual booking link
   - Search for `[AUDIT_BOOKING_LINK_TODO]` and replace with your audit booking link

2. **Lead Magnet Title**
   - Search for `[LEAD_MAGNET_TITLE_TODO]` and add your guide title

3. **Company Information**
   - Already set to:
     - Name: ETA Digital
     - Address: Jordangate House, Macclesfield, SK10 1EQ
   - Update if needed in the `company` section

4. **Page Content**
   - All headlines, copy, and descriptions are in `content.ts`
   - Simply edit the text values to update your site
   - No need to touch React components

## Lead Capture System

### Database
Leads are automatically stored in Supabase:
- Table: `lead_submissions`
- Captures: name, email, company, submission type, and metadata

### Email Integration (TODO)
Currently, leads are saved to the database. To send emails:

1. **Option 1: Use Supabase Edge Functions**
   - Create a function that triggers on new lead submissions
   - Use a service like Resend or SendGrid

2. **Option 2: Webhook Integration**
   - Set up a webhook that fires when a new lead is submitted
   - Connect to your email marketing platform (ConvertKit, Mailchimp, etc.)

### Viewing Leads
Access your Supabase dashboard to view all submissions:
- URL: Check your `.env` file for `VITE_SUPABASE_URL`
- Navigate to: Table Editor > lead_submissions

## New Features

### Light/Dark Theme Toggle
The site now includes a theme switcher in the header:
- Users can toggle between light and dark modes
- Preference is saved to localStorage
- Default: Dark mode
- Theme persists across page refreshes

### Standalone Download Guide Page
**URL:** `/download-guide`

This page is NOT linked in navigation - perfect for tracking LinkedIn campaigns:
- Track page visits from specific sources
- Separate conversion tracking for guide downloads
- Store referrer data in the database
- Use this URL in LinkedIn posts/ads to measure performance

**Database Tracking:**
- `submission_type: 'guide_download'` - Completed downloads
- `submission_type: 'guide_page_view'` - Page visits (manual tracking)
- `metadata.source` - Always set to 'download_guide_page'
- `metadata.referrer` - Captures where visitors came from

### Header Changes
The header now features:
- Theme toggle button (sun/moon icon)
- Navigation links only
- CTA buttons removed (now on page content where more contextually relevant)

## File Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout
│   ├── sections/        # Home page sections
│   └── ui/             # Reusable UI components
├── config/
│   └── content.ts      # ALL CONTENT HERE ⭐
├── contexts/
│   └── ThemeContext.tsx # Light/dark theme management
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── DownloadGuide.tsx  # Standalone lead magnet page
└── App.tsx            # Routing setup
```

## Styling

### Colors & Themes
The site supports both light and dark modes with cyan accents:
- File: `tailwind.config.js`
- Update the `accent` color palette to change the accent color
- Light mode: Clean white background with gray text
- Dark mode: Deep dark background with light text
- Use `dark:` prefix in Tailwind classes for dark mode specific styles

### Animations
All animations are defined in:
- `tailwind.config.js` (keyframes)
- `src/index.css` (utilities)

## Adding PDF Downloads

1. Place your PDF files in the `public` folder
2. Update the file names in `src/config/content.ts` under `caseStudies.files`
3. The download buttons will automatically link to these files

Example:
```typescript
caseStudies: {
  files: [
    {
      title: 'Due Diligence Tool Case Study',
      fileName: 'case-study-due-diligence.pdf', // Must match public/case-study-due-diligence.pdf
      ...
    }
  ]
}
```

## Environment Variables

Located in `.env`:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Public anonymous key

## Building for Production

```bash
npm run build
```

This creates optimized files in the `dist/` folder ready for deployment.

## Deployment

The site can be deployed to:
- **Vercel** (recommended for Vite)
- **Netlify**
- **Cloudflare Pages**
- Any static hosting service

## LinkedIn Campaign Tracking

### Using the Download Guide Page

Share this URL in your LinkedIn posts:
```
https://yourdomain.com/download-guide
```

**What Gets Tracked:**
1. **Page Views** - Everyone who visits (you'll need to implement view tracking if needed)
2. **Downloads** - Everyone who completes the form and downloads
3. **Referrer Data** - Where visitors came from (LinkedIn, direct link, etc.)
4. **Conversion Rate** - Calculate downloads ÷ visits

**Query Your Data:**
```sql
-- Get all guide downloads
SELECT * FROM lead_submissions
WHERE submission_type = 'guide_download'
ORDER BY created_at DESC;

-- Get conversion data
SELECT
  metadata->>'referrer' as source,
  COUNT(*) as downloads
FROM lead_submissions
WHERE submission_type = 'guide_download'
GROUP BY metadata->>'referrer';
```

### Best Practices
- Use UTM parameters in your LinkedIn links for better tracking
- Create different URLs for different campaigns (e.g., `/download-guide-linkedin`, `/download-guide-ad`)
- Monitor your Supabase dashboard regularly
- A/B test different headlines on the download page

## Support

For questions about customization:
1. Check this guide
2. Review `src/config/content.ts`
3. All component files are well-organized and commented

---

**Built with:**
- React + TypeScript
- Vite
- Tailwind CSS
- Supabase
- React Router
