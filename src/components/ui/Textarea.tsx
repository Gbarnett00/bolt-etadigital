import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full relative z-10">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
            {label}
            {props.required && <span className="text-accent-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-white dark:bg-dark-900 border border-gray-300 dark:border-dark-700
            text-gray-900 dark:text-dark-100 placeholder-gray-400 dark:placeholder-dark-500
            focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            resize-y min-h-[120px]
            ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-600 dark:text-dark-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
