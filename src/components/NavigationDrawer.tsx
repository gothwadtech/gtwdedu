import React from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Home,
  User,
  Users,
  ClipboardCheck,
  Calendar,
  BookOpen,
  DollarSign,
  CheckSquare,
  MessageSquare,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToastContext } from '../context/ToastContext';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const { user, logout } = useAuth();
  const { showToast } = useToastContext();

  if (!isOpen) return null;

  const menuItems = [
    { label: 'Home', icon: <Home className="w-5 h-5" />, tab: 'dashboard' },
    { label: 'My Page', icon: <User className="w-5 h-5" />, tab: 'my-page' },
    { label: 'Student', icon: <Users className="w-5 h-5" />, tab: 'students' },
    { label: 'Subject Assessment', icon: <ClipboardCheck className="w-5 h-5" />, tab: 'results' },
    { label: 'Events', icon: <Calendar className="w-5 h-5 text-amber-500" />, tab: 'notice-board' },
    { label: 'Library', icon: <BookOpen className="w-5 h-5 text-sky-500" />, tab: 'homework' },
    { label: 'My Salary', icon: <DollarSign className="w-5 h-5 text-emerald-500" />, tab: 'fee-payments' },
    { label: 'My Attendance', icon: <CheckSquare className="w-5 h-5 text-emerald-500" />, tab: 'my-attendance' },
    { label: 'Message', icon: <MessageSquare className="w-5 h-5 text-[#0494F4]" />, tab: 'notices' },
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    if (onNavigateTab && item.tab) {
      onNavigateTab(item.tab);
    } else {
      showToast(`${item.label} selected`, 'info');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Container matching Screenshot 3 */}
      <div className="relative z-10 w-full max-w-xs bg-white dark:bg-[#202124] text-gray-900 dark:text-gray-100 h-full flex flex-col shadow-2xl border-r border-gray-100 dark:border-[#3C4043] overflow-y-auto">
        
        {/* Top Back Arrow Button */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-[#3C4043]">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2F31] transition-colors"
            aria-label="Close navigation menu"
          >
            <ArrowLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </button>
        </div>

        {/* User Welcome Header Header matching Screenshot 3 */}
        <div className="p-6 border-b border-gray-100 dark:border-[#3C4043] flex items-center gap-4 bg-gray-50/50 dark:bg-[#2D2F31]">
          <div className="w-16 h-16 rounded-full bg-[#0494F4]/10 p-1 flex items-center justify-center shrink-0 border-2 border-[#0494F4]/30">
            <img
              src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
              alt={user?.name || 'User Avatar'}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400">Welcome</p>
            <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 leading-tight">
              {user?.name || 'Tarun Agarwal'}
            </h3>
            <p className="text-[11px] font-bold text-[#0494F4] capitalize mt-0.5">
              {user?.designation || user?.role || 'Faculty Member'}
            </p>
          </div>
        </div>

        {/* Menu Navigation Links matching Screenshot 3 */}
        <div className="p-4 space-y-1 flex-1">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleItemClick(item)}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-gray-100 dark:hover:bg-[#2D2F31] transition-colors text-left group"
            >
              <span className="text-sm font-extrabold text-gray-800 dark:text-gray-200">
                {item.label}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0494F4] group-hover:translate-x-1 transition-all" />
            </button>
          ))}

          {/* Logout Option at Bottom of List */}
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left mt-4"
          >
            <span className="text-sm font-extrabold">Logout</span>
            <LogOut className="w-4 h-4 text-rose-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
