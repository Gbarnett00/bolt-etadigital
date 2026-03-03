import { Lightbulb } from "lucide-react";

interface ContextualInfoProps {
  title: string;
  description: string;
  insight: string;
}

export default function ContextualInfo({
  title,
  description,
  insight,
}: ContextualInfoProps) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-lg border-2 border-amber-200 dark:border-amber-800 p-6 md:p-8 my-6 transition-all duration-300">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-1" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-50 mb-2">{title}</h3>
          <p className="text-gray-700 dark:text-dark-300 text-sm mb-3">{description}</p>
          <p className="text-amber-900 dark:text-amber-200 text-sm font-medium italic border-l-4 border-amber-400 dark:border-amber-600 pl-3">
            {insight}
          </p>
        </div>
      </div>
    </div>
  );
}
