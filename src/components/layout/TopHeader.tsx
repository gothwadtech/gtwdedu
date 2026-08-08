import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { APP_INFO, DEMO_ACCOUNTS } from '../../config/constants';
import { Sun, Moon, Bell, LogOut, ChevronDown, Check, UserCheck, Menu, User } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { UserRole } from '../../types';

interface TopHeaderProps {
  title?: string;
  subtitle?: string;
  onOpenDrawer?: () => void;
  onOpenProfileModal?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  subtitle,
  onOpenDrawer,
  onOpenProfileModal
}) => {
  const { user, role, switchRole, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#202124]/95 backdrop-blur-md border-b border-[#E0E0E0] dark:border-[#3C4043] px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Menu Drawer Toggle + Brand Logo & Title */}
          <div className="flex items-center gap-2.5">
            {onOpenDrawer && (
              <button
                onClick={onOpenDrawer}
                className="p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2D2F31] transition-colors"
                title="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div className="w-9 h-9 rounded-2xl overflow-hidden border border-[#E0E0E0] dark:border-[#3C4043] shadow-sm shrink-0 bg-white dark:bg-[#2D2F31] p-0.5">
              <img src="/logo.jpg" alt="Gothwad Logo" className="w-full h-full object-cover rounded-xl" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-sm sm:text-base text-gray-900 dark:text-gray-100 tracking-tight leading-none">
                  {title || APP_INFO.name}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-black rounded-full bg-[#0494F4]/10 text-[#0494F4] border border-[#0494F4]/20 uppercase">
                  {role}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold truncate max-w-[150px] sm:max-w-xs mt-0.5">
                {subtitle || user?.name || APP_INFO.tagline}
              </p>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Role Switcher Button */}
            <button
              onClick={() => setShowRoleModal(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gray-100 dark:bg-[#2D2F31] border border-[#E0E0E0] dark:border-[#3C4043] hover:border-[#0494F4] text-xs font-bold text-gray-700 dark:text-gray-200 transition-all active:scale-95"
              title="Switch Persona"
            >
              <UserCheck className="w-4 h-4 text-[#0494F4]" />
              <span className="hidden md:inline capitalize">{role}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setShowNotificationModal(true)}
              className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2D2F31] transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#0494F4] animate-pulse" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2D2F31] transition-colors"
              title={theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
            </button>

            {/* User Profile Avatar / Trigger Profile Modal */}
            <div className="flex items-center gap-1 pl-1 border-l border-gray-200 dark:border-gray-800">
              <button
                onClick={onOpenProfileModal}
                className="p-0.5 rounded-full hover:ring-2 hover:ring-[#0494F4] transition-all"
                title="View Profile & Multi-Child Switcher"
              >
                <img
                  src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                  alt={user?.name || 'User Avatar'}
                  className="w-8 h-8 rounded-full object-cover border border-[#E0E0E0] dark:border-[#3C4043]"
                />
              </button>
              <button
                onClick={logout}
                className="hidden sm:flex p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Role Switcher Modal */}
      <Modal isOpen={showRoleModal} onClose={() => setShowRoleModal(false)} title="Switch Role Demo Persona">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Experience Gothwad Education from different user perspectives. Selecting a persona updates the dashboard interface and permissions immediately:
        </p>
        <div className="space-y-2.5">
          {DEMO_ACCOUNTS.map((acc) => {
            const isSelected = role === acc.role;
            return (
              <button
                key={acc.role}
                onClick={() => {
                  switchRole(acc.role as UserRole);
                  setShowRoleModal(false);
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'border-[#0494F4] bg-[#0494F4]/5 dark:bg-[#0494F4]/10'
                    : 'border-[#E0E0E0] dark:border-[#3C4043] hover:border-[#0494F4] bg-white dark:bg-[#202124]'
                }`}
              >
                <img
                  src={acc.avatar_url}
                  alt={acc.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#E0E0E0] dark:border-[#3C4043]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900 dark:text-gray-100">{acc.name}</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[#0494F4]">
                      {acc.role}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{acc.designation || (acc as any).class_name}</p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{acc.description}</p>
                </div>
                {isSelected && <Check className="w-5 h-5 text-[#0494F4] shrink-0 mt-1" />}
              </button>
            );
          })}
        </div>
      </Modal>

      {/* Notifications Modal */}
      <Modal isOpen={showNotificationModal} onClose={() => setShowNotificationModal(false)} title="School Notifications">
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-blue-900 dark:text-blue-200">Exam Reminder</span>
              <span className="text-[10px] text-blue-500">10 mins ago</span>
            </div>
            <p className="text-xs text-blue-800 dark:text-blue-300">Mid-Term date-sheet for September 2026 is published.</p>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-emerald-900 dark:text-emerald-200">Fee Payment Confirmed</span>
              <span className="text-[10px] text-emerald-500">2 hours ago</span>
            </div>
            <p className="text-xs text-emerald-800 dark:text-emerald-300">Receipt REC-2026-00412 for Term 1 tuition fees generated.</p>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-amber-900 dark:text-amber-200">New Homework Assigned</span>
              <span className="text-[10px] text-amber-500">Yesterday</span>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-300">Mathematics Exercise 4.2 assigned by Mrs. Sunita Sharma.</p>
          </div>
        </div>
      </Modal>
    </>
  );
};
