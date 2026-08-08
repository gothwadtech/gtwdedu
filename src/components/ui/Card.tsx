import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverable = false }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#2D2F31] border border-[#E0E0E0] dark:border-[#3C4043] rounded-2xl p-4 sm:p-5 transition-all duration-150 ${
        hoverable ? 'hover:border-[#0494F4] cursor-pointer active:scale-[0.99]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
