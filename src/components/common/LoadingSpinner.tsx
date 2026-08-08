import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ label = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-2 text-gray-500 dark:text-gray-400">
      <Loader2 className="w-8 h-8 text-[#0494F4] animate-spin" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
};
