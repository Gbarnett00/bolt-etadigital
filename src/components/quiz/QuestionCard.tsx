import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface QuestionCardProps {
  question: {
    id: number;
    category: string;
    question: string;
    description: string;
    answers: {
      value: number;
      label: string;
      description: string;
    }[];
  };
  answer?: number;
  onAnswer: (score: number) => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

export default function QuestionCard({
  question,
  answer,
  onAnswer,
  onPrevious,
  canGoPrevious,
  isLastQuestion,
}: QuestionCardProps) {
  const [selectedScore, setSelectedScore] = useState<number | null>(answer || null);
  const [isAnswering, setIsAnswering] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedScore(answer || null);
    setIsAnswering(false);
  }, [question.id, answer]);

  const handleAnswer = (score: number) => {
    setSelectedScore(score);
    setIsAnswering(true);
    setTimeout(() => {
      onAnswer(score);
    }, 300);
  };

  return (
    <div className="bg-white dark:bg-dark-900 rounded-lg shadow-lg p-6 md:p-10 transition-all duration-300 border border-gray-200 dark:border-dark-800">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-dark-50 mb-3 leading-tight">
          {question.question}
        </h2>
        <p className="text-gray-600 dark:text-dark-300 text-base italic">
          {question.description}
        </p>
      </div>

      <div className="mb-10 space-y-3">
        {[...question.answers].reverse().map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            disabled={isAnswering}
            className={`w-full p-5 rounded-lg border-2 transition-all duration-300 text-left ${
              selectedScore === option.value
                ? "border-accent-500 bg-accent-50 dark:bg-accent-900/20 shadow-lg shadow-accent-500/20"
                : "border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:border-accent-400 dark:hover:border-accent-600 hover:shadow-md hover:-translate-y-0.5"
            } ${isAnswering ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex-1">
              <div className={`font-semibold text-base mb-1 ${
                selectedScore === option.value
                  ? "text-accent-700 dark:text-accent-400"
                  : "text-gray-900 dark:text-dark-50"
              }`}>
                {option.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-dark-300">
                {option.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-dark-800">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious || isAnswering}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            canGoPrevious && !isAnswering
              ? "text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-800 cursor-pointer"
              : "text-gray-400 dark:text-dark-500 cursor-not-allowed"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="text-xs text-gray-500 dark:text-dark-400">
          {selectedScore ? "✓ Answer selected" : "Select an option to continue"}
        </div>

        <button
          onClick={() => selectedScore && handleAnswer(selectedScore)}
          disabled={!selectedScore || isAnswering}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
            selectedScore && !isAnswering
              ? "bg-accent-500 text-white hover:bg-accent-600 cursor-pointer shadow-md hover:shadow-lg"
              : "bg-gray-200 dark:bg-dark-700 text-gray-400 dark:text-dark-500 cursor-not-allowed"
          }`}
        >
          {isLastQuestion ? "See Results" : "Next"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
