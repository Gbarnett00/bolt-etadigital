# ETA Digital — Project Memory

## Overview
Marketing site for ETA Digital (etadigital.co.uk). React SPA with client-side routing, hosted on Netlify.

## Repository
- **Active repo**: https://github.com/Gbarnett00/bolt-etadigital
- **Old repo (archived/deleted)**: https://github.com/Gbarnett00/etadigital — migrated 2026-03-03 when Bolt created bolt-etadigital
- **Local path**: /Users/georgebarnett/Desktop/Claude Files/etadigital
- **Local remotes**: `origin` → bolt-etadigital, `bolt-origin` → bolt-etadigital (same)

## Branch Strategy
- `main` — production; only merge here when George explicitly says to
- `claude-code` — ALL my changes go here ONLY; never push to main or bolt without being explicitly asked
- `bolt` — Bolt AI syncs here

## CRITICAL — Branch Rule
Only ever push to `claude-code`. Never cherry-pick or push to `main` or `bolt` automatically, even if it seems logical. George will explicitly say when to merge/push to other branches.

## IMPORTANT — Before Making Any Changes
Always pull the latest code from GitHub first. Bolt may have pushed commits to `bolt` or `main` between sessions.
```
git fetch --all
git checkout claude-code
git pull origin claude-code
```
If Bolt has pushed to `main`, merge it into `claude-code` before starting work.

## Hosting
- Currently deployed via Bolt publishing to Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Domain: etadigital.co.uk

## Code Quality
- TypeScript: CLEAN (0 errors as of 2026-03-03) — run `npm run typecheck` to verify
- Build: CLEAN — run `npm run build` to verify
- Known non-issues: fire-and-forget email fetch calls in CaseStudy/LeadMagnetDownload/AutomationChallenge are intentional (DB insert is the critical op)

## Tech Stack
- React + TypeScript + Vite
- React Router (BrowserRouter, client-side routing)
- Tailwind CSS
- Supabase (DB + Edge Functions for emails)
- Google Analytics 4

## Environment Variables (never commit real values)
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_GA4_MEASUREMENT_ID

## Key Architecture
- `/public/_redirects` — Netlify routing rules. Three static HTML pages served for OG previews, SPA fallback for everything else
- `src/App.tsx` — reads `?app-route=` query param and navigates client-side (used by static HTML redirect pages)
- Three landing pages with OG meta tags: /case-study, /free-guide, /free-automations

## Static HTML Landing Pages (OG + Redirect)
Files: public/case-study.html, public/free-guide.html, public/free-automations.html
Logic (FIXED 2026-03-03):
- Bot detection regex matches ONLY crawler-specific UAs (linkedinbot, facebookexternalhit, etc.)
- `if (!isBot)` → redirect real users to `/?app-route=/[route]` → React app
- Crawlers stay on static page to read OG tags
- DO NOT add back: linkedin, facebook, twitter, whatsapp, telegram to regex (matches in-app browsers)
- DO NOT use `if (isBot)` — that is the broken/inverted logic

## Supabase Tables
- lead_submissions
- lead_magnet_downloads
- automation_challenge_signups
- image_settings

## Pages / Routes
- / → Home
- /about → About
- /contact → Contact
- /free-guide → LeadMagnetDownload
- /case-study → CaseStudy
- /free-automations → AutomationChallenge
- /quiz → Quiz
- /chat → WhatsAppRedirect
- /download-guide → DownloadGuide
- /utm-builder → UTMBuilder (internal tool, noindexed)

## CRITICAL — Adding New Pages That Will Be Shared on LinkedIn
Every page shared on social media MUST have all three of these or LinkedIn mobile will redirect to home:
1. `public/[route].html` — copy pattern from case-study.html: OG tags + bot detection + UTM-preserving redirect
2. `public/_redirects` — add `/[route]  /[route].html  200` ABOVE the `/*` SPA fallback line
3. `src/pages/UTMBuilder.tsx` PAGES array — add entry so the link generator can target it
