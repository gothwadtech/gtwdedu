import React from 'react';
import { UserRole } from '../../types';
import {
  Users,
  Briefcase,
  CreditCard,
  BarChart3,
  Megaphone,
  CheckSquare,
  BookOpen,
  Award,
  Calendar,
  Home,
  Building2
} from 'lucide-react';

export interface NavTabConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface BottomNavProps {
  role: UserRole;
  activeTab: string;
  onChangeTab: (tabId: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ role, activeTab, onChangeTab }) => {
  const getTabsForRole = (): NavTabConfig[] => {
    switch (role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
          { id: 'staff', label: 'Staff', icon: <Briefcase className="w-5 h-5" /> },
          { id: 'students', label: 'Classes', icon: <Users className="w-5 h-5" /> },
          { id: 'fees', label: 'Fees', icon: <CreditCard className="w-5 h-5" /> },
          { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
          { id: 'notices', label: 'Notices', icon: <Megaphone className="w-5 h-5" /> },
        ];
      case 'management':
        return [
          { id: 'dashboard', label: 'Trust', icon: <Building2 className="w-5 h-5" /> },
          { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
          { id: 'fees', label: 'Budget', icon: <CreditCard className="w-5 h-5" /> },
          { id: 'staff', label: 'Staff Audit', icon: <Briefcase className="w-5 h-5" /> },
          { id: 'notices', label: 'Notices', icon: <Megaphone className="w-5 h-5" /> },
        ];
      case 'teacher':
        return [
          { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
          { id: 'attendance', label: 'Attendance', icon: <CheckSquare className="w-5 h-5" /> },
          { id: 'homework', label: 'Homework', icon: <BookOpen className="w-5 h-5" /> },
          { id: 'results', label: 'Marks Entry', icon: <Award className="w-5 h-5" /> },
          { id: 'timetable', label: 'Timetable', icon: <Calendar className="w-5 h-5" /> },
          { id: 'notices', label: 'Notices', icon: <Megaphone className="w-5 h-5" /> },
        ];
      case 'staff':
        return [
          { id: 'dashboard', label: 'Counter', icon: <CreditCard className="w-5 h-5" /> },
          { id: 'students', label: 'Students', icon: <Users className="w-5 h-5" /> },
          { id: 'notices', label: 'Notices', icon: <Megaphone className="w-5 h-5" /> },
        ];
      case 'student':
      case 'parent':
      default:
        return [
          { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
          { id: 'my-attendance', label: 'Attendance', icon: <CheckSquare className="w-5 h-5" /> },
          { id: 'fee-payments', label: 'Fees', icon: <CreditCard className="w-5 h-5" /> },
          { id: 'my-homework', label: 'Homework', icon: <BookOpen className="w-5 h-5" /> },
          { id: 'report-cards', label: 'Reports', icon: <Award className="w-5 h-5" /> },
          { id: 'notice-board', label: 'Notices', icon: <Megaphone className="w-5 h-5" /> },
        ];
    }
  };

  const tabs = getTabsForRole();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#1C1E20] border-t border-gray-200 dark:border-[#3C4043] md:hidden px-1 pt-1.5 pb-1 m-0 rounded-t-2xl sm:rounded-t-3xl shadow-2xl">
      <div className="flex items-center justify-around w-full max-w-md mx-auto gap-0.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className="flex flex-col items-center justify-center flex-1 py-0.5 active:scale-95 transition-all duration-150 min-w-0"
            >
              {/* Play Store style Pill/Capsule Icon Container */}
              <div
                className={`w-10 sm:w-12 h-7.5 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0494F4]/20 dark:bg-[#0494F4]/30 text-[#0494F4] dark:text-[#38BDF8] shadow-xs'
                    : 'bg-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                {tab.icon}
              </div>

              {/* Title Case Label */}
              <span
                className={`text-[10px] leading-tight tracking-tight mt-0.5 transition-colors truncate w-full text-center ${
                  isActive
                    ? 'font-bold text-[#0494F4] dark:text-[#38BDF8]'
                    : 'font-medium text-gray-600 dark:text-gray-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
