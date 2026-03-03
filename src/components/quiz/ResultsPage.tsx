import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/Button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { RotateCcw, Download } from "lucide-react";
import type { QuizResult } from "@/lib/quizData";
import { QuizResultPDFPrintable, generatePDF, type QuizResults } from "./QuizResultPDF";

interface ResultsPageProps {
  results: QuizResult;
  onRestart: () => void;
}

export default function ResultsPage({ results, onRestart }: ResultsPageProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getScoreColor = (score: number): string => {
    if (score >= 4) return "#dc2626";
    if (score >= 3) return "#f97316";
    if (score >= 2) return "#eab308";
    return "#22c55e";
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 4) return "Critical";
    if (score >= 3) return "Severe";
    if (score >= 2) return "Moderate";
    return "Minor";
  };

  const chartData = results.categoryScores.map((cat) => ({
    name: cat.category,
    score: cat.score,
    fill: getScoreColor(cat.score),
  }));

  const handleDownloadReport = async () => {
    setIsGeneratingPDF(true);

    try {
      // Transform QuizResult to QuizResults format
      const pdfResults: QuizResults = {
        overallScore: results.overallScore,
        categories: results.categoryScores.map(cat => ({
          category: cat.category,
          score: cat.score,
        })),
        topThreeWeaknesses: results.topThreeWeaknesses.map(cat => ({
          category: cat.category,
          score: cat.score,
        })),
        recommendations: results.recommendations,
      };

      // Create container for PDF template
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      document.body.appendChild(container);

      // Render QuizResultPDFPrintable into container
      const root = createRoot(container);
      root.render(<QuizResultPDFPrintable results={pdfResults} />);

      // Wait for React to finish rendering
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate PDF using the new helper
      await generatePDF(pdfResults);

      // Clean up
      root.unmount();
      document.body.removeChild(container);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-950 dark:to-dark-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-dark-50 mb-4">Your Results</h1>
          <p className="text-lg text-gray-600 dark:text-dark-300">
            Here's how your operational efficiency stacks up
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-dark-900 dark:to-dark-950 rounded-lg shadow-xl p-8 md:p-12 text-white mb-8 border border-gray-700 dark:border-dark-800">
          <p className="text-lg font-medium text-gray-300 mb-2">Overall Efficiency Score</p>
          <div className="flex items-baseline gap-4">
            <span className="text-6xl font-bold">{results.overallScore}</span>
            <span className="text-2xl text-gray-400">/100</span>
          </div>
          <p className="mt-4 text-gray-300">
            {results.overallScore >= 70
              ? "Your operations are relatively efficient. Focus on the areas below to unlock further gains."
              : results.overallScore >= 50
                ? "You have significant operational challenges. Addressing your top 3 areas will create immediate impact."
                : "Your operations are heavily constrained by inefficiencies. Systematic improvements will unlock substantial value."}
          </p>
        </div>

        <div className="bg-white dark:bg-dark-900 rounded-lg shadow-lg p-8 md:p-10 mb-8 border border-gray-200 dark:border-dark-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-50 mb-6">Your Top 3 Areas for Improvement - And How to Do It</h2>

          <div className="space-y-6">
            {results.topThreeWeaknesses.map((weakness, index) => (
              <div key={weakness.categoryId} className="border-l-4 border-accent-500 pl-6 py-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 font-bold text-sm">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-dark-50">{weakness.category}</h3>
                  <span className="ml-auto text-lg font-bold text-gray-600 dark:text-dark-300">
                    {weakness.score}/5
                  </span>
                </div>

                <div className="mb-4 h-2 bg-gray-200 dark:bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-500"
                    style={{ width: `${(weakness.score / 5) * 100}%` }}
                  />
                </div>

                <p className="text-gray-700 dark:text-dark-300 leading-relaxed">
                  {results.recommendations[weakness.categoryId]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-dark-900 rounded-lg shadow-lg p-8 md:p-10 mb-8 border border-gray-200 dark:border-dark-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-50 mb-6">Performance by Category</h2>

          <div className="mb-8 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 200, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-dark-800" />
                <XAxis type="number" domain={[0, 5]} stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" width={190} tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                    color: "#f1f5f9",
                  }}
                  formatter={(value) => [`${value}/5`, "Score"]}
                />
                <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-dark-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-600 dark:text-dark-300">Minor (0-1)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="text-sm text-gray-600 dark:text-dark-300">Moderate (2)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-sm text-gray-600 dark:text-dark-300">Severe (3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600" />
              <span className="text-sm text-gray-600 dark:text-dark-300">Critical (4-5)</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-900 rounded-lg shadow-lg p-8 md:p-10 mb-8 border border-gray-200 dark:border-dark-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-50 mb-6">Complete Category Scores</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-800">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-dark-50">Category</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-dark-50">Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-dark-50">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.categoryScores
                  .sort((a, b) => b.score - a.score)
                  .map((cat) => (
                    <tr key={cat.categoryId} className="border-b border-gray-100 dark:border-dark-800 hover:bg-gray-50 dark:hover:bg-dark-800/50">
                      <td className="py-3 px-4 text-gray-900 dark:text-dark-50 font-medium">{cat.category}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-bold text-gray-900 dark:text-dark-50">{cat.score}</span>
                        <span className="text-gray-600 dark:text-dark-300">/5</span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            cat.score >= 4
                              ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                              : cat.score >= 3
                                ? "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400"
                                : cat.score >= 2
                                  ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                                  : "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                          }`}
                        >
                          {getScoreLabel(cat.score)}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={handleDownloadReport}
            disabled={isGeneratingPDF}
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 dark:bg-dark-800 dark:hover:bg-dark-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            {isGeneratingPDF ? 'Generating PDF...' : 'Download Report'}
          </Button>

          <Button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-6 rounded-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Retake Assessment
          </Button>
        </div>

        <div className="text-center text-gray-600 dark:text-dark-300 text-sm">
          <p>Questions? Reach out to us at george@etadigital.co.uk</p>
        </div>
      </div>
    </div>
  );
}
