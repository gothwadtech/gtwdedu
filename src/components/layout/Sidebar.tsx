import React from 'react';
import { UserRole } from '../../types';
import { NavTabConfig } from './BottomNav';
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
  ShieldAlert,
  Building2
} from 'lucide-react';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  onChangeTab: (tabId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, onChangeTab }) => {
  const getTabsForRole = (): NavTabConfig[] => {
    switch (role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Home Overview', icon: <Home className="w-5 h-5" /> },
          { id: 'staff', label: 'Staff & Teachers', icon: <Briefcase className="w-5 h-5" /> },
          { id: 'students', label: 'Classes & Students', icon: <Users className="w-5 h-5" /> },
          { id: 'fees', label: 'Fee Collection', icon: <CreditCard className="w-5 h-5" /> },
          { id: 'analytics', label: 'School Analytics', icon: <BarChart3 className="w-5 h-5" /> },
          { id: 'notices', label: 'Official Circulars', icon: <Megaphone className="w-5 h-5" /> },
        ];
      case 'management':
        return [
          { id: 'dashboard', label: 'Executive Board', icon: <Building2 className="w-5 h-5" /> },
          { id: 'analytics', label: 'Trust Analytics', icon: <BarChart3 className="w-5 h-5" /> },
          { id: 'fees', label: 'Capital Budget', icon: <CreditCard className="w-5 h-5" /> },
          { id: 'staff', label: 'Faculty & Staff Audit', icon: <Briefcase className="w-5 h-5" /> },
          { id: 'notices', label: 'Trustee Circulars', icon: <Megaphone className="w-5 h-5" /> },
        ];
      case 'teacher':
        return [
          { id: 'dashboard', label: 'Home Overview', icon: <Home className="w-5 h-5" /> },
          { id: 'attendance', label: 'Daily Attendance', icon: <CheckSquare className="w-5 h-5" /> },
          { id: 'homework', label: 'Homework & Tasks', icon: <BookOpen className="w-5 h-5" /> },
          { id: 'results', label: 'Result & Marks Entry', icon: <Award className="w-5 h-5" /> },
          { id: 'timetable', label: 'Class Timetable', icon: <Calendar className="w-5 h-5" /> },
          { id: 'notices', label: 'Notice Stream', icon: <Megaphone className="w-5 h-5" /> },
        ];
      case 'staff':
        return [
          { id: 'dashboard', label: 'Counter Desk', icon: <CreditCard className="w-5 h-5" /> },
          { id: 'students', label: 'Student Records', icon: <Users className="w-5 h-5" /> },
          { id: 'notices', label: 'Notice Board', icon: <Megaphone className="w-5 h-5" /> },
        ];
      case 'student':
      case 'parent':
      default:
        return [
          { id: 'dashboard', label: 'Home Dashboard', icon: <Home className="w-5 h-5" /> },
          { id: 'my-attendance', label: 'My Attendance', icon: <CheckSquare className="w-5 h-5" /> },
          { id: 'fee-payments', label: 'Fee Payments', icon: <CreditCard className="w-5 h-5" /> },
          { id: 'my-homework', label: 'Homework Assignments', icon: <BookOpen className="w-5 h-5" /> },
          { id: 'report-cards', label: 'Report Cards', icon: <Award className="w-5 h-5" /> },
          { id: 'notice-board', label: 'Notice Board', icon: <Megaphone className="w-5 h-5" /> },
        ];
    }
  };

  const tabs = getTabsForRole();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#202124] border-r border-[#E0E0E0] dark:border-[#3C4043] p-4 shrink-0 min-h-[calc(100vh-65px)]">
      <div className="mb-4 px-3 py-2 bg-gray-50 dark:bg-[#2D2F31] rounded-xl border border-[#E0E0E0] dark:border-[#3C4043]">
        <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          Active Workspace
        </p>
        <p className="text-sm font-extrabold text-[#0494F4] capitalize mt-0.5">{role} Portal</p>
      </div>

      <div className="space-y-1 flex-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-semibold text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-[#0494F4] text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2D2F31]'
              }`}
            >
              <span className="shrink-0">{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-[#E0E0E0] dark:border-[#3C4043] text-xs text-gray-400 dark:text-gray-500 space-y-1">
        <div className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Offline Ready • Local Sync</span>
        </div>
        <p>© 2026 Gothwad Education</p>
      </div>
    </aside>
  );
};
