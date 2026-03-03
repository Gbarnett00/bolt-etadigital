import { useState, useMemo } from "react";
import { quizQuestions, categoryRecommendations, type QuizResult, type CategoryScore } from "@/lib/quizData";
import QuestionCard from "@/components/quiz/QuestionCard";
import ResultsPage from "@/components/quiz/ResultsPage";
import WelcomePage from "@/components/quiz/WelcomePage";
import ContextualInfo from "@/components/quiz/ContextualInfo";

type QuizState = "welcome" | "quiz" | "results";

export default function Quiz() {
  const [state, setState] = useState<QuizState>("welcome");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((Object.keys(answers).length) / quizQuestions.length) * 100;

  const results = useMemo<QuizResult | null>(() => {
    if (Object.keys(answers).length !== quizQuestions.length) return null;

    const categoryScoresMap = new Map<string, { category: string; scores: number[] }>();

    quizQuestions.forEach((q) => {
      if (!categoryScoresMap.has(q.categoryId)) {
        categoryScoresMap.set(q.categoryId, { category: q.category, scores: [] });
      }
      categoryScoresMap.get(q.categoryId)!.scores.push(answers[q.id] || 0);
    });

    const categoryScores: CategoryScore[] = Array.from(categoryScoresMap.entries()).map(
      ([categoryId, { category, scores }]) => {
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        return {
          categoryId,
          category,
          score: Math.round(avgScore * 10) / 10,
          maxScore: 5,
        };
      }
    );

    const sortedByScore = [...categoryScores].sort((a, b) => b.score - a.score);
    const topThreeWeaknesses = sortedByScore.slice(0, 3);

    // Calculate overall efficiency: lower scores = better efficiency
    // Invert the score: if they score 70/70 (worst), efficiency is 0%
    // If they score 14/70 (best possible with all 1s), efficiency is 100%
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    const maxPossibleScore = 70; // 14 questions × 5 points
    const minPossibleScore = 14; // 14 questions × 1 point
    const overallScore = Math.round(((maxPossibleScore - totalScore) / (maxPossibleScore - minPossibleScore)) * 100);

    return {
      overallScore,
      maxScore: 70,
      categoryScores,
      topThreeWeaknesses,
      recommendations: categoryRecommendations,
    };
  }, [answers]);

  const handleAnswer = (score: number) => {
    // The display is already reversed in QuestionCard, so we use the score as-is
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: score,
    }));

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setState("results");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleStartQuiz = () => {
    setState("quiz");
    setCurrentQuestionIndex(0);
  };

  const handleRestartQuiz = () => {
    setState("welcome");
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-950 dark:to-dark-900 overflow-x-hidden w-full">
      {state === "welcome" && <WelcomePage onStart={handleStartQuiz} />}

      {state === "quiz" && (
        <div className="py-8 px-4 w-full">
          <div className="max-w-2xl mx-auto w-full">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-50">Operational Efficiency Quiz</h1>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-600 dark:text-dark-300 block">
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-xs font-medium text-accent-600">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-dark-800 rounded-full h-2">
                <div
                  className="bg-accent-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {currentQuestionIndex === 5 && (
              <ContextualInfo
                title="Why We Ask About These Areas"
                description="The first few questions help us understand your operational foundation."
                insight="Most growing businesses struggle with these foundational issues first. Fixing them creates a ripple effect across your entire operation."
              />
            )}

            {currentQuestionIndex === 6 && (
              <ContextualInfo
                title="You're Halfway There"
                description="The remaining questions focus on scaling challenges and team dynamics."
                insight="At this stage, we are identifying where your growth is being constrained by people, processes, and systems."
              />
            )}

            <QuestionCard
              question={currentQuestion}
              answer={answers[currentQuestion.id]}
              onAnswer={handleAnswer}
              onPrevious={handlePrevious}
              canGoPrevious={currentQuestionIndex > 0}
              isLastQuestion={currentQuestionIndex === quizQuestions.length - 1}
            />
          </div>
        </div>
      )}

      {state === "results" && results && (
        <ResultsPage results={results} onRestart={handleRestartQuiz} />
      )}
    </div>
  );
}
