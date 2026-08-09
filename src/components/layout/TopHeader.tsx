import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Bell } from 'lucide-react';
import { NotificationsFullScreenModal } from '../NotificationsFullScreenModal';

interface TopHeaderProps {
  title?: string;
  subtitle?: string;
  onOpenProfileModal?: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  subtitle,
  onOpenProfileModal,
}) => {
  const { user, role } = useAuth();
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // Dynamic role designation label
  const roleLabel =
    role === 'admin'
      ? 'Administrator'
      : role === 'management'
      ? 'Management Board'
      : role === 'teacher'
      ? 'Faculty Teacher'
      : role === 'staff'
      ? 'Support Staff'
      : 'Student / Parent';

  // Default avatar picture
  const userAvatar = user?.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#202124]/95 backdrop-blur-md border-b border-[#E0E0E0] dark:border-[#3C4043] px-4 py-2.5 rounded-b-2xl sm:rounded-b-3xl shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: App Logo + School Name & Subtitle */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={onOpenProfileModal}
              className="p-0 rounded-md shrink-0 transition-transform active:scale-95 hover:scale-105"
              title="Open Profile & Settings"
            >
              <img
                src="/logo.jpg"
                alt="Gothwad Education Logo"
                className="w-8 h-8 sm:w-8.5 sm:h-8.5 object-cover rounded-md shadow-xs shrink-0"
              />
            </button>

            <div className="flex flex-col min-w-0">
              <h1 className="font-extrabold text-xs sm:text-sm text-gray-900 dark:text-gray-100 tracking-tight leading-tight truncate">
                Gothwad Education Center
              </h1>
              <p className="text-[11px] font-bold text-[#0494F4] truncate mt-0.5 tracking-normal">
                {user?.name || subtitle || roleLabel}
              </p>
            </div>
          </div>

          {/* Right: Bell Icon + User Profile Avatar */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Notification Bell */}
            <button
              onClick={() => setShowNotificationModal(true)}
              className="relative p-2 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2D2F31] transition-colors active:scale-95"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#0494F4] animate-pulse" />
            </button>

            {/* User Profile Avatar Image Button */}
            {onOpenProfileModal && (
              <button
                onClick={onOpenProfileModal}
                className="p-0 rounded-md shrink-0 transition-transform active:scale-95 hover:scale-105"
                title="User Profile & Settings"
              >
                <img
                  src={userAvatar}
                  alt={user?.name || 'User Profile'}
                  className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-md object-cover border-2 border-[#0494F4] p-0 shadow-2xs shrink-0"
                />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Full Screen Notifications View */}
      <NotificationsFullScreenModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
      />
    </>
  );
};
