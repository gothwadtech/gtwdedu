import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:py-6 mb-20 md:mb-6">
      {children}
    </div>
  );
};
