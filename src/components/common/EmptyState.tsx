import React from 'react';
import { FolderOpen } from 'lucide-react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-[#202124] border border-[#E0E0E0] dark:border-[#3C4043] rounded-2xl my-4">
      <div className="p-3.5 bg-gray-100 dark:bg-[#2D2F31] text-gray-400 rounded-2xl mb-3">
        {icon || <FolderOpen className="w-8 h-8" />}
      </div>
      <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">{title}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mt-1 mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
