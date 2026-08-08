import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && <div className="absolute left-3.5 text-gray-400 shrink-0 pointer-events-none">{leftIcon}</div>}
        <input
          id={inputId}
          className={`w-full bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0494F4] focus:ring-1 focus:ring-[#0494F4] transition-all ${
            leftIcon ? 'pl-10' : ''
          } ${rightIcon ? 'pr-10' : ''} ${error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''} ${className}`}
          {...props}
        />
        {rightIcon && <div className="absolute right-3.5 text-gray-400 shrink-0">{rightIcon}</div>}
      </div>
      {error ? (
        <p className="mt-1 text-xs text-rose-500">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      ) : null}
    </div>
  );
};
