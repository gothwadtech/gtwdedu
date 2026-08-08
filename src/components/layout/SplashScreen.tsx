import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish?: () => void;
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, duration = 2000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-[#202124] text-gray-900 dark:text-gray-100 flex flex-col justify-between items-center p-6 sm:p-10 select-none overflow-hidden transition-opacity duration-500">
      {/* Top Spacer for vertical balance */}
      <div className="w-full flex-1 min-h-[30px]" />

      {/* Center Section: Curved Square Logo + Simple Loading Round Circle */}
      <div className="flex flex-col items-center justify-center space-y-7 flex-shrink-0 my-auto">
        {/* App Icon: Square shape with curved corners & NO outer border */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <img
            src="/logo.jpg"
            alt="Gothwad Education Logo"
            className="w-full h-full object-cover rounded-2xl sm:rounded-3xl"
          />
        </div>

        {/* Simple Round Loading Circle */}
        <div className="flex items-center justify-center pt-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 border-2 border-gray-300 dark:border-gray-700 border-t-[#0494F4] dark:border-t-[#0494F4] rounded-full animate-spin" />
        </div>
      </div>

      {/* Bottom Section Spacer */}
      <div className="w-full flex-1 flex flex-col justify-end items-center pb-2 text-center min-h-[70px]" />
    </div>
  );
};
