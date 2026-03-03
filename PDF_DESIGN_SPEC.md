# PDF Design Specification for Operational Efficiency Assessment

## Overview
This document contains all the information needed to create an HTML-based PDF design that will be converted to PDF using html2canvas and jsPDF.

## Critical Technical Requirements

### Canvas Dimensions
- **Page Width**: 794px (A4 width at 96 DPI)
- **Page Height**: 1123px (A4 height at 96 DPI)
- **Format**: 2 pages (Page 1: Hero + Categories, Page 2: Remaining Categories + Top 3 Recommendations + CTA)

### Font Family
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
```
- Use `font-family: 'Inter', Arial, sans-serif;` throughout

### Container Structure
```css
position: absolute;
left: -9999px;
width: 794px;
min-height: 1123px;
background: white;
font-family: Inter, Arial, sans-serif;
box-sizing: border-box;
display: flex;
flex-direction: column;
```

## Color Palette

### Primary Colors
- **Brand Green**: `#10b981`
- **Dark Navy**: `#0d1b2e`
- **Pure White**: `#ffffff`
- **Off White**: `#f8fafc`

### Text Colors
- **Primary Text**: `#0d1b2e`
- **Secondary Text**: `#1e293b`
- **Muted Text**: `#64748b`
- **Light Text**: `#cbd5e1`
- **Very Light**: `#94a3b8`

### Status Colors
- **Critical**: `#dc2626` (background: `rgba(220, 38, 38, 0.10)`, border: `rgba(220,38,38,0.25)`)
- **Severe**: `#ea580c` (background: `rgba(234, 88, 12, 0.10)`, border: `rgba(234,88,12,0.25)`)
- **Moderate**: `#ca8a04` (background: `rgba(202, 138, 4, 0.10)`, border: `rgba(202,138,4,0.25)`)
- **Minor**: `#047857` (background: `rgba(16, 185, 129, 0.10)`, border: `rgba(16,185,129,0.3)`)

### Border Colors
- **Main Border**: `#e2e8f0`

## Page 1 Structure

### 1. Running Header
```css
padding: 16px 40px;
display: flex;
align-items: center;
justify-content: space-between;
border-bottom: 1px solid #e2e8f0;
```

**Left Text**: "OPERATIONAL EFFICIENCY ASSESSMENT"
```css
font-size: 9px;
font-weight: 600;
letter-spacing: 0.14em;
text-transform: uppercase;
color: #64748b;
line-height: 1;
```

**Right Text**: "ETA Digital"
```css
font-size: 20px;
font-weight: 700;
color: #0f172a;
letter-spacing: -0.01em;
line-height: 1;
```

### 2. Hero Band (Dark Navy Background)
```css
background: #0d1b2e;
padding: 40px 40px 36px;
position: relative;
overflow: hidden;
```

**Eyebrow Text**: "Your Personalised Results Report"
```css
font-size: 9px;
font-weight: 700;
letter-spacing: 0.18em;
text-transform: uppercase;
color: #64748b;
margin-bottom: 10px;
```

**Main Heading**: "Operational Efficiency Assessment"
- "Operational" in white, "Efficiency" in green `#10b981`
```css
font-size: 33px;
font-weight: 900;
color: #ffffff;
letter-spacing: -0.03em;
line-height: 1.1;
margin: 0 0 6px 0;
```

**Date Subheading**: "Based on your quiz responses — assessed [DATE]"
```css
font-size: 12px;
color: #64748b;
margin: 0 0 28px 0;
```

**Score Card Container**:
```css
display: inline-flex;
align-items: center;
gap: 20px;
background: rgba(255,255,255,0.05);
border: 1px solid rgba(16, 185, 129, 0.35);
border-radius: 12px;
padding: 18px 26px;
```

**Score Display** (CRITICAL - This alignment must be perfect):
```html
<div style="display: flex; align-items: baseline; line-height: 1;">
  <span style="font-size: 51px; font-weight: 900; color: #10b981; letter-spacing: -0.04em;">[SCORE]</span>
  <span style="font-size: 16px; font-weight: 700; color: #64748b; margin-left: 2px;">/100</span>
</div>
```

**Score Label**: "OVERALL EFFICIENCY SCORE"
```css
font-size: 9px;
font-weight: 700;
letter-spacing: 0.16em;
text-transform: uppercase;
color: #10b981;
```

**Score Description**:
```css
font-size: 12px;
color: #cbd5e1;
max-width: 340px;
line-height: 1.45;
```

### 3. Body Section (Categories Table)
```css
padding: 32px 40px 28px;
flex: 1;
```

**Section Eyebrow**: "FULL BREAKDOWN"
```css
font-size: 9px;
font-weight: 700;
letter-spacing: 0.18em;
text-transform: uppercase;
color: #10b981;
margin-bottom: 4px;
```

**Section Heading**: "Complete Category Scores"
```css
font-size: 18px;
font-weight: 800;
color: #0d1b2e;
letter-spacing: -0.02em;
margin: 0 0 16px 0;
padding-bottom: 10px;
border-bottom: 2px solid #e2e8f0;
```

**Table Structure**:
```css
width: 100%;
border-collapse: collapse;
border-radius: 10px;
overflow: hidden;
border: 1px solid #e2e8f0;
```

**Table Header**:
```css
background: #0d1b2e;
```

**Table Header Cells**:
```css
padding: 11px 18px;
text-align: left; /* center for Status column */
font-size: 9px;
font-weight: 700;
letter-spacing: 0.14em;
text-transform: uppercase;
color: #94a3b8;
```

**Table Body Rows** (CRITICAL - Status badges must be centered):
```html
<tr style="border-top: 1px solid #e2e8f0; background: [ALTERNATE #ffffff and #f8fafc];">
  <td style="padding: 10px 18px; font-size: 12px; color: #0d1b2e; font-weight: 600;">[CATEGORY NAME]</td>
  <td style="padding: 10px 18px; font-size: 12px; color: #0d1b2e; font-weight: 600;">[SCORE] / 5</td>
  <td style="padding: 10px 18px;">
    <div style="display: flex; justify-content: center;">
      <span style="display: inline-block; padding: 4px 12px; border-radius: 99px; font-size: 9px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; [BADGE STYLE]">[STATUS LABEL]</span>
    </div>
  </td>
</tr>
```

**Show first 8 categories on Page 1**

**Legend Box** (below table):
```css
display: flex;
gap: 20px;
flex-wrap: wrap;
margin-top: 12px;
padding: 10px 16px;
background: #f8fafc;
border: 1px solid #e2e8f0;
border-radius: 8px;
```

**Legend Items**:
```html
<div style="display: flex; align-items: center; gap: 7px; font-size: 11px; color: #64748b;">
  <div style="width: 9px; height: 9px; border-radius: 50%; background: [COLOR];"></div>
  <span>[LABEL]</span>
</div>
```
- Minor (0–1): `#10b981`
- Moderate (2): `#ca8a04`
- Severe (3): `#ea580c`
- Critical (4–5): `#dc2626`

### 4. Footer
```css
padding: 12px 40px;
display: flex;
align-items: center;
justify-content: space-between;
border-top: 1px solid #e2e8f0;
```

**Left**: "ETADIGITAL.CO.UK"
```css
font-size: 10px;
font-weight: 700;
color: #10b981;
letter-spacing: 0.08em;
text-transform: uppercase;
```

**Right**: "ETA Digital · george@etadigital.co.uk"
```css
font-size: 10px;
color: #64748b;
```
Email in green: `color: #10b981; font-weight: 600;`

## Page 2 Structure

### 1. Running Header
Same as Page 1

### 2. Body Section

#### Remaining Categories (if more than 8 total)
**Section Eyebrow**: "CONTINUED FROM PREVIOUS PAGE"
```css
font-size: 9px;
font-weight: 700;
letter-spacing: 0.18em;
text-transform: uppercase;
color: #10b981;
margin-bottom: 4px;
```

**Section Heading**: "Complete Category Scores (Continued)"
```css
font-size: 18px;
font-weight: 800;
color: #0d1b2e;
letter-spacing: -0.02em;
margin: 0 0 16px 0;
padding-bottom: 10px;
border-bottom: 2px solid #e2e8f0;
```

Use same table structure as Page 1, with `margin-bottom: 32px;`

**Show remaining categories (9+) here**

#### Dark Band Heading
```css
background: #0d1b2e;
margin: 0 0 24px 0;
padding: 22px 40px;
border-radius: 10px;
```

**Heading Text**: "YOUR TOP 3 AREAS FOR IMPROVEMENT — AND HOW TO DO IT"
```css
font-size: 15px;
font-weight: 800;
color: #ffffff;
text-transform: uppercase;
letter-spacing: 0.04em;
text-align: center;
```

#### Top 3 Recommendations Container
```css
display: flex;
flex-direction: column;
gap: 14px;
```

**Each Recommendation Card** (CRITICAL - Circles must align with text):
```html
<div style="border: 1.5px solid #e2e8f0; border-left: 4px solid #10b981; border-radius: 10px; padding: 16px 20px; background: #ffffff;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
    <div style="min-width: 28px; width: 28px; height: 28px; border-radius: 50%; background: rgba(16, 185, 129, 0.10); border: 1.5px solid rgba(16, 185, 129, 0.35); color: #10b981; font-size: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; line-height: 1;">[NUMBER]</div>
    <div style="font-size: 15px; font-weight: 800; color: #10b981; flex: 1; line-height: 1.3;">[CATEGORY NAME]</div>
    <div style="font-size: 12px; font-weight: 600; color: #64748b; white-space: nowrap;">[SCORE] / 5</div>
  </div>
  <div style="height: 3px; background: #e2e8f0; border-radius: 99px; margin-bottom: 10px; overflow: hidden;">
    <div style="height: 100%; background: #10b981; border-radius: 99px; width: [PERCENTAGE]%;"></div>
  </div>
  <p style="font-size: 12px; color: #1e293b; line-height: 1.6; margin: 0;">[RECOMMENDATION TEXT]</p>
</div>
```

#### Next Steps Box
```css
background: #0d1b2e;
border-radius: 10px;
padding: 24px 28px;
margin-top: 24px;
position: relative;
overflow: hidden;
```

**Heading**: "NEXT STEPS"
```css
font-size: 14px;
font-weight: 800;
color: #ffffff;
text-transform: uppercase;
letter-spacing: 0.06em;
margin: 0 0 10px 0;
```

**Paragraphs**:
```css
font-size: 12px;
color: #cbd5e1;
line-height: 1.65;
margin: 0 0 8px 0; /* or 18px for last paragraph */
```

**CTA Button** (CRITICAL - Text must be white and centered):
```html
<div style="display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: #10b981; color: #ffffff; font-size: 13px; font-weight: 700; padding: 13px 28px; border-radius: 8px; letter-spacing: 0.01em; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);">
  Speak With George Directly
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ffffff">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
  </svg>
</div>
```

### 3. Footer
Same as Page 1, but add at the end:
```html
&nbsp;·&nbsp; Assessment completed on [DATE]
```

## Data Endpoints and Variables

### Variables to Replace

1. **`${dateStr}`** - Date in format: "28 February 2026" (use `new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })`)

2. **`${results.overallScore}`** - Overall score number (0-100)

3. **`${page1Categories}`** - First 8 categories (sorted by score descending):
   ```javascript
   {
     category: "Category Name",
     score: 4, // 0-5
     categoryId: "category-id"
   }
   ```

4. **`${page2Categories}`** - Remaining categories (9+)

5. **`${results.topThreeWeaknesses}`** - Top 3 weakest areas:
   ```javascript
   [
     {
       category: "Tool Soup",
       score: 5,
       categoryId: "tool-soup"
     },
     // ... 2 more
   ]
   ```

6. **`${results.recommendations[weakness.categoryId]}`** - Recommendation text for each weakness

### Status Label Logic
```javascript
function getScoreLabel(score) {
  if (score >= 4) return "Critical";
  if (score >= 3) return "Severe";
  if (score >= 2) return "Moderate";
  return "Minor";
}
```

### Overall Score Description Logic
```javascript
if (overallScore >= 70) {
  return "Your operations are relatively efficient. Focus on the areas below to unlock further gains.";
} else if (overallScore >= 50) {
  return "You have significant operational challenges. Addressing your top 3 areas will create immediate impact.";
} else {
  return "Your operations are heavily constrained by inefficiencies. Systematic improvements will unlock substantial value.";
}
```

## Example Data Structure

```javascript
const results = {
  overallScore: 67,
  categoryScores: [
    { category: "Tool Soup", score: 5, categoryId: "tool-soup" },
    { category: "Spreadsheet Glue", score: 5, categoryId: "spreadsheet-glue" },
    { category: "Key-Person Ops", score: 5, categoryId: "key-person-ops" },
    { category: "Policy in Docs, Not Systems", score: 5, categoryId: "policy-in-docs" },
    { category: "Firefighting-First Culture", score: 5, categoryId: "firefighting-culture" },
    { category: "Change Shock", score: 5, categoryId: "change-shock" },
    { category: "Approval Maze", score: 4, categoryId: "approval-maze" },
    { category: "Ad Hoc Reporting", score: 3, categoryId: "ad-hoc-reporting" },
    { category: "Undefined Ownership", score: 2, categoryId: "undefined-ownership" },
    { category: "Manual Data Entry", score: 1, categoryId: "manual-data-entry" }
  ],
  topThreeWeaknesses: [
    { category: "Tool Soup", score: 5, categoryId: "tool-soup" },
    { category: "Spreadsheet Glue", score: 5, categoryId: "spreadsheet-glue" },
    { category: "Key-Person Ops", score: 5, categoryId: "key-person-ops" }
  ],
  recommendations: {
    "tool-soup": "Your team is losing significant time switching between tools or consolidating tools. Start by mapping all tools used across a single workflow, then identify opportunities to consolidate or integrate. Even reducing from 5 to 3 tools in one process can save hours per week.",
    "spreadsheet-glue": "Spreadsheets are slowing you down. Even if they're not breaking yet, they're creating hidden costs (updates, version control, training, inventory, CRM). Even a simple database with a proper interface can save hours weekly and reduce errors dramatically.",
    "key-person-ops": "Your business is too dependent on a few key people. If they're unavailable, critical operations stall. Start documenting one key process this week, then build it into a system that anyone can run. This isn't just about continuity—it's about freeing your best people to focus on growth, not repetitive execution."
  }
};
```

## Implementation Notes for Developer

1. **Create HTML Structure**: Build two separate HTML strings for page 1 and page 2
2. **Insert into DOM**:
   ```javascript
   const page1Content = document.createElement('div');
   // ... set styles ...
   page1Content.innerHTML = `[YOUR HTML]`;
   document.body.appendChild(page1Content);
   ```
3. **Render to Canvas**:
   ```javascript
   const canvas1 = await html2canvas(page1Content, {
     scale: 2,
     useCORS: true,
     logging: false,
     backgroundColor: '#ffffff'
   });
   ```
4. **Convert to PDF**:
   ```javascript
   const pdf = new jsPDF('p', 'mm', 'a4');
   const imgWidth = 210;
   const imgHeight1 = (canvas1.height * imgWidth) / canvas1.width;
   const imgData1 = canvas1.toDataURL('image/png');
   pdf.addImage(imgData1, 'PNG', 0, 0, imgWidth, imgHeight1);
   pdf.addPage();
   // ... add page 2 ...
   pdf.save('report.pdf');
   ```
5. **Clean up**:
   ```javascript
   document.body.removeChild(page1Content);
   document.body.removeChild(page2Content);
   ```

## Critical Alignment Checkpoints

1. ✓ Header text vertically centered (use `padding: 16px 40px` and `line-height: 1`)
2. ✓ Score `/100` aligned to baseline (use `display: flex; align-items: baseline`)
3. ✓ Status badges horizontally centered (wrap in `div` with `display: flex; justify-content: center`)
4. ✓ Numbered circles centered vertically and aligned with text (use `line-height: 1` on circle, `line-height: 1.3` on text)
5. ✓ CTA button text white and centered (use `color: #ffffff` and `justify-content: center`)

## Testing Checklist

- [ ] All fonts load correctly (Inter)
- [ ] Page dimensions are exactly 794px × 1123px
- [ ] Colors match specification exactly
- [ ] All text is sharp and readable
- [ ] Status badges are centered in their column
- [ ] Score alignment shows number and /100 on same baseline
- [ ] Numbered circles align with their text
- [ ] CTA button has white text
- [ ] Table alternating row colors work correctly
- [ ] All spacing matches specification
- [ ] Categories split correctly (8 on page 1, rest on page 2)
- [ ] PDF exports at good quality (scale: 2)
