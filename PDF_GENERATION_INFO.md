# PDF Generation System - Complete Information

## Overview
This document contains all the information needed to understand and troubleshoot the PDF generation system for the Operational Efficiency Assessment quiz.

---

## System Architecture

### Key Files
1. **QuizResultPDF.tsx** - Main PDF template and generation logic
2. **interFonts.ts** - Embedded Inter font face definitions (base64, ~2.1MB)
3. **ResultsPage.tsx** - Results display and PDF download trigger
4. **Quiz.tsx** - Quiz state management and scoring logic
5. **quizData.ts** - Questions and recommendations data

### PDF Generation Flow
1. User completes quiz → ResultsPage displays results
2. User clicks "Download Report" button
3. `handleDownloadReport()` in ResultsPage.tsx:
   - Creates off-screen container
   - Renders `QuizResultPDFPrintable` component
   - Calls `generatePDF()` function
   - Cleans up DOM

### Data Transformation
Quiz results are transformed from `QuizResult` to `QuizResults` format:
- `overallScore`: 0-100 (inverted from raw score)
- `categories`: Array of {category, score}
- `topThreeWeaknesses`: Top 3 highest scoring categories
- `recommendations`: Keyed by category ID

---

## PDF Template Structure

### Page 1 - Overview
- **Running Header**: "Operational Efficiency Assessment" | "ETA Digital"
- **Hero Band**: Dark background with score card
  - Overall score (large number /100)
  - Score description
  - Date assessed
- **Category Table**: All 14 categories with scores and status badges
- **Legend**: Color-coded severity levels
- **Footer**: Website and contact info

### Page 2 - Recommendations
- **Running Header**: Same as Page 1
- **Dark Band**: "Your Top 3 Areas for Improvement"
- **3 Recommendation Cards**: Each with:
  - Circle number (1, 2, 3)
  - Category name
  - Score/5
  - Progress bar
  - Recommendation text
- **Next Steps CTA**: Dark card with button
- **Footer**: Website, contact, and assessment date

### Fixed Dimensions
- Page size: 794px × 1123px (A4 at 96dpi)
- PDF output: 595.28pt × 841.89pt
- html2canvas scale: 2× for quality
- Font family: 'Inter', Arial, sans-serif

---

## Font Handling System

### Problem Being Solved
html2canvas captures the page before Google Fonts fully load, causing:
- Arial fallback font used instead of Inter
- Incorrect character height metrics
- Misaligned badge text and circle numbers

### Solution: Embedded Fonts
**interFonts.ts** contains Inter font weights 400, 600, 700, 800, 900 as base64 data strings embedded in CSS @font-face rules.

### Font Injection Process

**In QuizResultPDFPrintable (for preview):**
```typescript
useEffect(() => {
  const styleId = 'inter-font-face-embedded';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = INTER_FONT_FACE;
    document.head.appendChild(style);
  }
}, []);
```

**In generatePDF (for capture):**
```typescript
// Inject embedded Inter fonts before capture
const styleId = 'inter-font-face-embedded';
if (!document.getElementById(styleId)) {
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = INTER_FONT_FACE;
  document.head.appendChild(style);
}

// Wait for fonts to be fully ready + buffer for paint
await document.fonts.ready;
await new Promise(resolve => setTimeout(resolve, 150));
```

### Critical Timing
- Fonts injected before html2canvas capture
- `document.fonts.ready` ensures font load
- 150ms buffer allows browser paint cycle to complete

---

## Text Positioning Strategy

### The Problem
CSS centering (flexbox, line-height) fails in html2canvas because:
- Font metrics (cap-height, descender) affect visual center
- html2canvas renders differently than browser
- Scale factor (2×) amplifies pixel-level misalignments

### The Solution: Absolute Positioning
All critical text uses `position: absolute` with hardcoded top offsets:

**Badge Text (Page 1, table cells):**
```typescript
const PILL_H = 20;
const PILL_W = 68;

<span style={{
  position: 'absolute',
  left: 0,
  right: 0,
  top: 4,  // HARDCODED - exact for Inter at 9px/700
  fontSize: 9,
  fontWeight: 700,
  // ...
}}>
  {badge.label}
</span>
```

**Circle Numbers (Page 2, recommendation cards):**
```typescript
const CIRCLE = 28;

<span style={{
  position: 'absolute',
  left: 0,
  right: 0,
  top: 7,  // HARDCODED - exact for Inter at 12px/800
  fontSize: 12,
  fontWeight: 800,
  // ...
}}>
  {idx + 1}
</span>
```

### Why These Values Work
- Badge top: 4px = (20px height - 9px font) / 2 + Inter cap-height adjustment
- Circle top: 7px = (28px height - 12px font) / 2 + Inter cap-height adjustment
- These values are calibrated specifically for Inter font metrics

---

## Dependencies

### NPM Packages
```json
{
  "html2canvas": "^1.4.1",
  "jspdf": "^4.2.0"
}
```

### Import Pattern
```typescript
const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
  import('html2canvas'),
  import('jspdf'),
]);
```

---

## html2canvas Configuration

```typescript
await html2canvas(el, {
  scale: 2,              // 2× for quality
  useCORS: true,         // Allow cross-origin images
  allowTaint: false,     // Strict security
  backgroundColor: '#ffffff',
  width: 794,            // Fixed width
  height: 1123,          // Fixed height
  logging: false,        // Disable console logs
});
```

---

## Scoring System

### Raw Score Calculation
- 14 questions × 1-5 points each
- Total: 14-70 points
- Higher score = worse efficiency

### Overall Score (Display)
Inverted to 0-100 scale where higher = better:
```typescript
const totalScore = sum of all answers
const maxPossibleScore = 70  // 14 × 5
const minPossibleScore = 14  // 14 × 1
const overallScore = Math.round(
  ((maxPossibleScore - totalScore) / (maxPossibleScore - minPossibleScore)) * 100
);
```

### Category Scoring
- Each category has 1 question
- Score = question answer (1-5)
- No averaging needed

### Badge Assignment
```typescript
if (score >= 4) return 'Critical' (red)
if (score >= 3) return 'Severe' (orange)
if (score >= 2) return 'Moderate' (yellow)
return 'Minor' (green)
```

---

## Color System

### Brand Colors
- Primary Green: `#10b981`
- Dark Background: `#0d1b2e`
- Light Gray: `#f8fafc`
- Border Gray: `#e2e8f0`

### Status Colors
- Critical: `#dc2626` (red)
- Severe: `#ea580c` (orange)
- Moderate: `#ca8a04` (yellow)
- Minor: `#047857` (green)

### Badge Backgrounds (with transparency)
- Critical: `rgba(220,38,38,0.10)`
- Severe: `rgba(234,88,12,0.10)`
- Moderate: `rgba(202,138,4,0.10)`
- Minor: `rgba(16,185,129,0.10)`

---

## Categories (14 Total)

1. Tool Soup
2. Spreadsheet Glue
3. Key-Person Ops
4. Onboarding Drag
5. Manual Coordination
6. Ad Hoc Reporting
7. Approval Maze
8. Blind Spot Ops
9. Undefined Ownership
10. Ghost Work
11. Version Confusion
12. Policy in Docs, Not Systems
13. Firefighting-First Culture
14. Change Shock

Each has:
- `category`: Display name
- `categoryId`: Kebab-case identifier
- `score`: 1-5 rating
- Recommendation text (in `categoryRecommendations`)

---

## Known Issues & Solutions

### Issue: Text Misalignment
**Cause:** Arial fallback before Inter loads
**Solution:** Embedded fonts in interFonts.ts

### Issue: Badge Text Too High/Low
**Cause:** Font metrics differ between browser and html2canvas
**Solution:** Hardcoded `top` values (4px for badges, 7px for circles)

### Issue: Blurry PDF Output
**Cause:** Low resolution capture
**Solution:** `scale: 2` in html2canvas config

### Issue: Font Not Loading
**Cause:** Race condition between render and capture
**Solution:**
- Inject fonts synchronously
- Wait for `document.fonts.ready`
- Add 150ms buffer for paint

---

## Testing Checklist

When modifying the PDF system, verify:

- [ ] Badge text vertically centered in pills (Page 1 table)
- [ ] Circle numbers vertically centered (Page 2 cards)
- [ ] Large score number aligned properly (Page 1 hero)
- [ ] All text renders in Inter font (not Arial)
- [ ] No blurry text or images
- [ ] Colors match brand guidelines
- [ ] All 14 categories present in table
- [ ] Top 3 recommendations show correctly
- [ ] Date formats correctly (d Month yyyy)
- [ ] PDF downloads with correct filename
- [ ] No console errors during generation

---

## File Size Notes

**interFonts.ts is ~2.1MB**
- Contains 5 font weights as base64
- Only loads once
- Tree-shaken in production builds
- Expected and necessary for reliable rendering

---

## Version History

- **v1**: Initial implementation with CSS centering
- **v2**: Attempted lineHeight fixes
- **v3**: Switched to absolute positioning with calculated offsets
- **v4**: Embedded fonts + hardcoded positioning (current)

---

## Contact & Support

Questions about the PDF system: george@etadigital.co.uk
