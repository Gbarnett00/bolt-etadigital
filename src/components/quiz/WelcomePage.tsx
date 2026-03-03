import { ArrowRight, CheckCircle } from "lucide-react";
import { ParticleEffect } from "../ui/ParticleEffect";

interface WelcomePageProps {
  onStart: () => void;
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-950 dark:to-dark-900 relative overflow-hidden">
      <ParticleEffect />

      <div className="relative z-10 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-dark-50 mb-4">
              Operational Efficiency Assessment
            </h1>
            <p className="text-xl text-gray-600 dark:text-dark-300 mb-8">
              Discover where your business is losing time and money to operational inefficiencies
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={onStart}
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700 rounded-xl shadow-2xl shadow-accent-500/50 hover:shadow-accent-500/70 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              <span className="relative z-10">Start Assessment</span>
              <ArrowRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          <div className="glass rounded-lg p-6 mb-8 text-center">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-3xl font-bold text-accent-500">14</p>
                <p className="text-sm text-gray-600 dark:text-dark-300">Questions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent-500">5</p>
                <p className="text-sm text-gray-600 dark:text-dark-300">Minutes</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent-500">∞</p>
                <p className="text-sm text-gray-600 dark:text-dark-300">Value</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-900 rounded-lg shadow-xl p-8 md:p-12 border border-gray-200 dark:border-dark-800">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-50 mb-6">What You'll Discover</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-50">Your Overall Efficiency Score</h3>
                    <p className="text-gray-600 dark:text-dark-300 text-sm">A clear benchmark of your operational maturity</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-50">Performance Across 14 Key Areas</h3>
                    <p className="text-gray-600 dark:text-dark-300 text-sm">Detailed breakdown of your strengths and weaknesses</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-50">Your Top 3 Problem Areas</h3>
                    <p className="text-gray-600 dark:text-dark-300 text-sm">Personalized insights on where to focus first</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-50">Actionable Recommendations</h3>
                    <p className="text-gray-600 dark:text-dark-300 text-sm">Specific guidance for your biggest inefficiencies</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-dark-300 border-t border-gray-200 dark:border-dark-800 pt-6">
              Results are instant and private.
            </p>
          </div>

          <p className="text-center text-gray-500 dark:text-dark-400 text-sm mt-8">
            Based on the 14 most common operational mistakes that slow down growing businesses
          </p>
        </div>
      </div>
    </div>
  );
}
