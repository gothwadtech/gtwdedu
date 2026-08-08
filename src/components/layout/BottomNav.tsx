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
          { id: 'students', label: 'Students', icon: <Users className="w-5 h-5" /> },
          { id: 'staff', label: 'Staff', icon: <Briefcase className="w-5 h-5" /> },
          { id: 'fees', label: 'Fee Mgmt', icon: <CreditCard className="w-5 h-5" /> },
          { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
          { id: 'notices', label: 'Notices', icon: <Megaphone className="w-5 h-5" /> },
        ];
      case 'teacher':
        return [
          { id: 'attendance', label: 'Attendance', icon: <CheckSquare className="w-5 h-5" /> },
          { id: 'homework', label: 'Homework', icon: <BookOpen className="w-5 h-5" /> },
          { id: 'results', label: 'Marks Entry', icon: <Award className="w-5 h-5" /> },
          { id: 'timetable', label: 'Timetable', icon: <Calendar className="w-5 h-5" /> },
          { id: 'notices', label: 'Notices', icon: <Megaphone className="w-5 h-5" /> },
        ];
      case 'student':
      case 'parent':
      default:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
          { id: 'my-attendance', label: 'Attendance', icon: <CheckSquare className="w-5 h-5" /> },
          { id: 'fee-payments', label: 'Fees', icon: <CreditCard className="w-5 h-5" /> },
          { id: 'my-homework', label: 'Homework', icon: <BookOpen className="w-5 h-5" /> },
          { id: 'report-cards', label: 'Reports', icon: <Award className="w-5 h-5" /> },
        ];
    }
  };

  const tabs = getTabsForRole();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#202124]/95 backdrop-blur-md border-t border-[#E0E0E0] dark:border-[#3C4043] md:hidden px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-150 active:scale-90 flex-1 ${
                isActive
                  ? 'text-[#0494F4] font-bold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <div
                className={`p-1 rounded-full transition-colors ${
                  isActive ? 'bg-[#0494F4]/10' : ''
                }`}
              >
                {tab.icon}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
