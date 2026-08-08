import React from 'react';
import { getStatusBadgeColor } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'status' | 'primary' | 'secondary' | 'outline';
  status?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'status',
  status = '',
  className = '',
}) => {
  if (variant === 'status' && status) {
    const colorClass = getStatusBadgeColor(status);
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClass} ${className}`}>
        {children}
      </span>
    );
  }

  const variantStyles = {
    status: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700',
    primary: 'bg-[#0494F4]/10 text-[#0494F4] border-[#0494F4]/20',
    secondary: 'bg-gray-100 dark:bg-[#3C4043] text-gray-700 dark:text-gray-300 border-transparent',
    outline: 'border border-[#E0E0E0] dark:border-[#3C4043] text-gray-700 dark:text-gray-300',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
