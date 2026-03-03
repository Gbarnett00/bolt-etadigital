/**
 * QuizResultPDF.tsx — v14 (React-PDF)
 * ETA Digital — Operational Efficiency Assessment
 *
 * Fixes from v11:
 *   1. Letter spacing corrected (was rendering as "O P E R A T I O N A L")
 *   2. Score card — "4" and "/100" now side by side, baseline aligned
 *   3. "Speak With George Directly" button restored
 *   4. Empty 4th page removed — footer merged into Page 2
 *   5. Table row padding tightened to fit all 14 rows on one page
 *   6. White space gap removed — Next Steps no longer pushed by marginTop:auto
 *   7. Page 2 restructured as single self-contained page with footer included
 *
 * DEPENDENCIES: npm install @react-pdf/renderer
 */

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Link,
} from '@react-pdf/renderer';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CategoryResult {
  category: string;
  score: number;
}

export interface QuizResults {
  overallScore: number;
  categories: CategoryResult[];
  topThreeWeaknesses: CategoryResult[];
  recommendations: Record<string, string>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const toKey = (name: string) =>
  name.toLowerCase().replace(/\s+/g, '-');

export const formatDate = (d: Date = new Date()) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const getScoreDescription = (score: number) => {
  if (score <= 20) return 'Critical operational challenges are preventing effective scaling. These issues need urgent attention.';
  if (score <= 40) return 'Significant inefficiencies are limiting your business. Targeted automation can deliver major gains.';
  if (score <= 60) return 'Moderate inefficiencies are slowing you down. Focused improvements will have a meaningful impact.';
  if (score <= 80) return 'Your operations are reasonably efficient, but there are clear opportunities for further optimisation.';
  return 'Your operations are highly efficient. Fine-tuning a few areas will help you maintain your edge.';
};

export const getBadge = (score: number) => {
  if (score >= 4) return { label: 'Critical', bg: '#fef2f2', color: '#dc2626', borderColor: '#dc2626' };
  if (score >= 3) return { label: 'Severe',   bg: '#fff7ed', color: '#ea580c', borderColor: '#ea580c' };
  if (score >= 2) return { label: 'Moderate', bg: '#fefce8', color: '#ca8a04', borderColor: '#ca8a04' };
  return              { label: 'Minor',    bg: '#f0fdf4', color: '#047857', borderColor: '#047857' };
};

const getScoreCardBorder = (score: number): string => {
  if (score < 50) return '#dc2626';  // Red — under 50
  if (score < 70) return '#ea580c';  // Orange — 50-69
  if (score < 80) return '#ca8a04';  // Yellow — 70-79
  if (score < 90) return '#10b981';  // Green — 80-89
  return '#34d399';                  // Bright green — 90+
};

// Score number uses the same colour as the border
const getScoreColour = getScoreCardBorder;

const s = StyleSheet.create({

  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    fontSize: 11,
    flexDirection: 'column',
  },

  // ── Running header ──
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 13,
    borderBottom: '1pt solid #e2e8f0',
  },
  headerLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    // letterSpacing intentionally omitted — react-pdf renders it as wide spacing
    textTransform: 'uppercase',
    color: '#64748b',
  },
  headerLogo: {
    fontSize: 17,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },

  // ── Hero band ──
  hero: {
    backgroundColor: '#0d1b2e',
    paddingHorizontal: 40,
    paddingTop: 24,
    paddingBottom: 22,
  },
  heroOverline: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    color: '#64748b',
    marginBottom: 5,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  heroTitleAccent: {
    color: '#10b981',
  },
  heroSubtitle: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 16,
  },

  // ── Score card ──
  scoreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f2540',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignSelf: 'flex-start',
    gap: 18,
  },
  scoreBlock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  scoreNumber: {
    fontSize: 48,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1,
  },
  scoreSlash: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#64748b',
    paddingBottom: 4,
  },
  scoreInfo: {
    flexDirection: 'column',
    gap: 3,
    maxWidth: 300,
  },
  scoreLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    color: '#10b981',
  },
  scoreDesc: {
    fontSize: 10,
    color: '#cbd5e1',
    lineHeight: 1.4,
  },

  // ── Section heading ──
  sectionWrap: {
    paddingHorizontal: 40,
    paddingTop: 14,
    paddingBottom: 0,
  },
  sectionOverline: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    color: '#10b981',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#0d1b2e',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottom: '2pt solid #e2e8f0',
  },

  // ── Table ──
  tableWrap: {
    paddingHorizontal: 40,
  },
  table: {
    border: '1pt solid #e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: '#0d1b2e',
  },
  thCell: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    color: '#94a3b8',
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  tableRow: {
    flexDirection: 'row',
    borderTop: '1pt solid #e2e8f0',
  },
  tdCell: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#0d1b2e',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  // ── Badge ──
  badge: {
    borderRadius: 99,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignSelf: 'center',
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  // ── Legend ──
  legend: {
    flexDirection: 'row',
    gap: 16,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 7,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 9,
    color: '#64748b',
  },

  // ── Footer ──
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 9,
    borderTop: '1pt solid #e2e8f0',
    marginTop: 'auto',
  },
  footerGreen: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#10b981',
    textTransform: 'uppercase',
  },
  footerGrey: {
    fontSize: 9,
    color: '#64748b',
  },
  footerAccent: {
    color: '#10b981',
    fontFamily: 'Helvetica-Bold',
  },

  // ── Page 2: dark band ──
  darkBand: {
    backgroundColor: '#0d1b2e',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 18,
  },
  darkBandTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  // ── Recommendation cards ──
  card: {
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  cardCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCircleText: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#10b981',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#10b981',
    flex: 1,
  },
  cardScore: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#64748b',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: 4,
    backgroundColor: '#10b981',
    borderRadius: 2,
  },
  cardBody: {
    fontSize: 11,
    color: '#1e293b',
    lineHeight: 1.6,
  },

  // ── Next Steps ──
  nextSteps: {
    backgroundColor: '#0d1b2e',
    borderRadius: 10,
    paddingHorizontal: 26,
    paddingVertical: 22,
    marginTop: 4,
  },
  nextStepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  nextStepsLeft: {
    flex: 1,
  },
  nextStepsTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  nextStepsBody: {
    fontSize: 11,
    color: '#cbd5e1',
    lineHeight: 1.55,
    marginBottom: 6,
  },
  nextStepsSecondary: {
    fontSize: 11,
    color: '#94a3b8',
    lineHeight: 1.55,
  },

  // ── Button ──
  button: {
    backgroundColor: '#16a34a',
    borderRadius: 99,
    paddingVertical: 11,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 180,
  },
  buttonText: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});

// ─── Page 1 — Hero + Top 3 Recommendations ───────────────────────────────────

const PDFPage1: React.FC<{ results: QuizResults; dateStr: string }> = ({ results, dateStr }) => (
  <Page size="A4" style={s.page}>

    {/* Running header */}
    <View style={s.header}>
      <Text style={s.headerLabel}>Operational Efficiency Assessment</Text>
      <Text style={s.headerLogo}>ETA Digital</Text>
    </View>

    {/* Hero band */}
    <View style={s.hero}>
      <Text style={s.heroOverline}>Your Personalised Results Report</Text>
      <Text style={s.heroTitle}>
        Operational <Text style={s.heroTitleAccent}>Efficiency</Text> Assessment
      </Text>
      <Text style={s.heroSubtitle}>Based on your quiz responses — assessed {dateStr}</Text>

      {/* Score card */}
      <View style={[s.scoreCard, { borderColor: getScoreCardBorder(results.overallScore) }]}>
        <View style={s.scoreBlock}>
          <Text style={[s.scoreNumber, { color: getScoreColour(results.overallScore) }]}>{results.overallScore}</Text>
          <Text style={s.scoreSlash}>/100</Text>
        </View>
        <View style={s.scoreInfo}>
          <Text style={s.scoreLabel}>Overall Efficiency Score</Text>
          <Text style={s.scoreDesc}>{getScoreDescription(results.overallScore)}</Text>
        </View>
      </View>
    </View>

    {/* Body */}
    <View style={{ paddingHorizontal: 40, paddingTop: 22, paddingBottom: 0, flex: 1, flexDirection: 'column' }}>

      {/* Dark band */}
      <View style={s.darkBand}>
        <Text style={s.darkBandTitle}>Your Top 3 Areas for Improvement — And How to Do It</Text>
      </View>

      {/* Recommendation cards */}
      {results.topThreeWeaknesses.slice(0, 3).map((w, idx) => (
        <View key={w.category} style={s.card}>
          <View style={s.cardHeader}>
            <View style={s.cardCircle}>
              <Text style={s.cardCircleText}>{idx + 1}</Text>
            </View>
            <Text style={s.cardTitle}>{w.category}</Text>
            <Text style={s.cardScore}>{w.score} / 5</Text>
          </View>
          <View style={s.progressTrack}>
            <View style={[s.progressFill, { width: `${(w.score / 5) * 100}%` }]} />
          </View>
          <Text style={s.cardBody}>
            {results.recommendations[toKey(w.category)] ?? ''}
          </Text>
        </View>
      ))}

    </View>

    {/* Footer */}
    <View style={s.footer}>
      <Text style={s.footerGreen}>etadigital.co.uk</Text>
      <Text style={s.footerGrey}>
        ETA Digital  ·  <Text style={s.footerAccent}>george@etadigital.co.uk</Text>
      </Text>
    </View>

  </Page>
);

// ─── Page 2 — Full Category Breakdown ────────────────────────────────────────

const PDFPage2: React.FC<{ results: QuizResults; dateStr: string }> = ({ results, dateStr }) => {
  const sorted = [...results.categories].sort((a, b) => b.score - a.score);

  return (
    <Page size="A4" style={s.page}>

      {/* Running header */}
      <View style={s.header}>
        <Text style={s.headerLabel}>Operational Efficiency Assessment</Text>
        <Text style={s.headerLogo}>ETA Digital</Text>
      </View>

      {/* Section heading */}
      <View style={s.sectionWrap}>
        <Text style={s.sectionOverline}>Full Breakdown</Text>
        <Text style={s.sectionTitle}>Complete Category Scores</Text>
      </View>

      {/* Table */}
      <View style={s.tableWrap}>
        <View style={s.table}>

          {/* Head */}
          <View style={s.tableHead}>
            <Text style={[s.thCell, { width: '55%' }]}>Category</Text>
            <Text style={[s.thCell, { width: '20%' }]}>Score</Text>
            <Text style={[s.thCell, { width: '25%', textAlign: 'center' }]}>Status</Text>
          </View>

          {/* Rows */}
          {sorted.map((cat, idx) => {
            const badge = getBadge(cat.score);
            return (
              <View
                key={cat.category}
                style={[s.tableRow, { backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }]}
              >
                <Text style={[s.tdCell, { width: '55%' }]}>{cat.category}</Text>
                <Text style={[s.tdCell, { width: '20%' }]}>{cat.score} / 5</Text>
                <View style={[s.tdCell, { width: '25%', alignItems: 'center' }]}>
                  <View style={[s.badge, { backgroundColor: badge.bg, borderColor: badge.borderColor }]}>
                    <Text style={[s.badgeText, { color: badge.color }]}>{badge.label}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Legend */}
      <View style={s.legend}>
        {[
          { color: '#10b981', label: 'Minor (0-1)' },
          { color: '#ca8a04', label: 'Moderate (2)' },
          { color: '#ea580c', label: 'Severe (3)' },
          { color: '#dc2626', label: 'Critical (4-5)' },
        ].map(({ color, label }) => (
          <View key={label} style={s.legendItem}>
            <View style={[s.legendDot, { backgroundColor: color }]} />
            <Text style={s.legendText}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Next Steps with button */}
      <View style={[s.nextSteps, { marginLeft: 40, marginRight: 40, marginTop: 14 }]}>
        <View style={s.nextStepsRow}>
          <View style={s.nextStepsLeft}>
            <Text style={s.nextStepsTitle}>Next Steps</Text>
            <Text style={s.nextStepsBody}>
              Focus on your top 3 areas for maximum impact. Even addressing one category can unlock significant operational gains across your entire business.
            </Text>
            <Text style={s.nextStepsSecondary}>
              Want help implementing these improvements? Book a free consultation at{' '}
              <Text style={s.footerAccent}>etadigital.co.uk</Text>
            </Text>
          </View>
          <Link src="https://wa.me/447480739171" style={{ textDecoration: 'none' }}>
            <View style={s.button}>
              <Text style={s.buttonText}>Speak With George{'\n'}Directly</Text>
            </View>
          </Link>
        </View>
      </View>

      {/* Footer */}
      <View style={s.footer}>
        <Text style={s.footerGreen}>etadigital.co.uk</Text>
        <Text style={s.footerGrey}>
          ETA Digital  ·  <Text style={s.footerAccent}>george@etadigital.co.uk</Text>  ·  Assessment completed on {dateStr}
        </Text>
      </View>

    </Page>
  );
};

// ─── Document ─────────────────────────────────────────────────────────────────

export interface QuizResultPDFProps {
  results: QuizResults;
  dateStr?: string;
}

const QuizResultPDFDocument: React.FC<QuizResultPDFProps> = ({ results, dateStr }) => {
  const date = dateStr ?? formatDate();
  return (
    <Document>
      <PDFPage1 results={results} dateStr={date} />
      <PDFPage2 results={results} dateStr={date} />
    </Document>
  );
};

// ─── Generate PDF ─────────────────────────────────────────────────────────────

export async function generatePDF(results: QuizResults, dateStr?: string): Promise<void> {
  const date = dateStr ?? formatDate();
  const blob = await pdf(
    <QuizResultPDFDocument results={results} dateStr={date} />
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `operational-efficiency-report-${date.replace(/\s/g, '-')}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export const QuizResultPDF: React.FC<QuizResultPDFProps> = (props) => (
  <QuizResultPDFDocument {...props} />
);

export const QuizResultPDFPrintable: React.FC<QuizResultPDFProps> = (props) => (
  <QuizResultPDFDocument {...props} />
);

export default QuizResultPDF;