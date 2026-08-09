import React, { useState } from 'react';
import {
  ChevronRight,
  User,
  HeartPulse,
  CreditCard,
  FileSpreadsheet,
  Key,
  Shield,
  HelpCircle,
  CheckCircle2,
  LogOut,
  ArrowLeft,
  Users,
  ClipboardCheck,
  BookOpen,
  Calendar,
  Phone,
  Sparkles,
  Sun,
  Moon,
  RefreshCw,
  Home,
  CheckSquare,
  MessageSquare,
  BarChart3,
  UserCheck,
  Clock
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToastContext } from '../context/ToastContext';
import { useThemeContext } from '../context/ThemeContext';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const { user, role, logout } = useAuth();
  const { showToast } = useToastContext();
  const { theme, toggleTheme } = useThemeContext();

  const [activeStudentId, setActiveStudentId] = useState('1');

  if (!isOpen) return null;

  // Multi-child profiles for student/parent role
  const siblings = [
    {
      id: '1',
      name: 'Ayush Malhotra',
      classSection: 'Class VII-B',
      admissionNo: 'ADM-2024-089',
      rollNo: '14',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    },
    {
      id: '2',
      name: 'Vanshika Malhotra',
      classSection: 'Class IX-B',
      admissionNo: 'ADM-2022-042',
      rollNo: '28',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    },
  ];

  const currentChild = siblings.find((s) => s.id === activeStudentId) || siblings[0];

  const handleMenuClick = (itemLabel: string, tabId?: string) => {
    if (tabId && onNavigateTab) {
      onNavigateTab(tabId);
      onClose();
    } else {
      showToast(`${itemLabel} selected`, 'info');
    }
  };

  // Dynamic Navigation Items based on active role
  const getRoleNavigationItems = () => {
    if (role === 'admin') {
      return [
        { label: 'Overview Dashboard', icon: <Home className="w-4 h-4 text-[#0494F4]" />, tab: 'dashboard' },
        { label: 'Student Directory & Admission', icon: <Users className="w-4 h-4 text-purple-500" />, tab: 'students' },
        { label: 'Faculty & Staff Directory', icon: <UserCheck className="w-4 h-4 text-emerald-500" />, tab: 'staff' },
        { label: 'Fee Collection & Audit', icon: <CreditCard className="w-4 h-4 text-amber-500" />, tab: 'fees' },
        { label: 'Analytics & Reports', icon: <BarChart3 className="w-4 h-4 text-indigo-500" />, tab: 'analytics' },
        { label: 'School Notices & Circulars', icon: <MessageSquare className="w-4 h-4 text-cyan-500" />, tab: 'notices' },
      ];
    }
    if (role === 'management') {
      return [
        { label: 'Management Dashboard', icon: <Home className="w-4 h-4 text-[#0494F4]" />, tab: 'dashboard' },
        { label: 'Financial Analytics', icon: <BarChart3 className="w-4 h-4 text-indigo-500" />, tab: 'analytics' },
        { label: 'Fee Collection Overview', icon: <CreditCard className="w-4 h-4 text-emerald-500" />, tab: 'fees' },
        { label: 'Staff Management', icon: <Users className="w-4 h-4 text-purple-500" />, tab: 'staff' },
        { label: 'School Circulars', icon: <MessageSquare className="w-4 h-4 text-cyan-500" />, tab: 'notices' },
      ];
    }
    if (role === 'teacher') {
      return [
        { label: 'Mark Class Attendance', icon: <CheckSquare className="w-4 h-4 text-emerald-500" />, tab: 'attendance' },
        { label: 'Homework & Assignments', icon: <BookOpen className="w-4 h-4 text-sky-500" />, tab: 'homework' },
        { label: 'Marks & Results Entry', icon: <ClipboardCheck className="w-4 h-4 text-[#0494F4]" />, tab: 'results' },
        { label: 'Faculty Timetable', icon: <Clock className="w-4 h-4 text-amber-500" />, tab: 'timetable' },
        { label: 'Staff Announcements', icon: <MessageSquare className="w-4 h-4 text-purple-500" />, tab: 'notices' },
      ];
    }
    // Student / Parent Role
    return [
      { label: 'Home Dashboard', icon: <Home className="w-4 h-4 text-[#0494F4]" />, tab: 'dashboard' },
      { label: "Parent's Profile", icon: <Users className="w-4 h-4 text-purple-500" /> },
      { label: 'Subject Assessment & Report', icon: <ClipboardCheck className="w-4 h-4 text-[#0494F4]" />, tab: 'report-cards' },
      { label: 'Fee Collection & Records', icon: <CreditCard className="w-4 h-4 text-emerald-500" />, tab: 'fee-payments' },
      { label: 'Homework & Assignments', icon: <BookOpen className="w-4 h-4 text-sky-500" />, tab: 'my-homework' },
      { label: 'Attendance Records', icon: <CheckSquare className="w-4 h-4 text-emerald-600" />, tab: 'my-attendance' },
      { label: 'Notice & Event Calendar', icon: <Calendar className="w-4 h-4 text-amber-500" />, tab: 'notice-board' },
      { label: 'Health & Fitness Records', icon: <HeartPulse className="w-4 h-4 text-rose-500" /> },
      { label: 'Transfer Certificate Request', icon: <FileSpreadsheet className="w-4 h-4 text-amber-600" /> },
      { label: 'Change Account Password', icon: <Key className="w-4 h-4 text-cyan-500" /> },
    ];
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-[#1C1E20] text-gray-900 dark:text-gray-100 flex flex-col w-full h-full overflow-y-auto animate-fade-in">
      
      {/* 1. Full Screen Top Header Bar */}
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#202124]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#3C4043] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2F31] transition-colors active:scale-95"
            title="Back to App"
          >
            <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-gray-100" />
          </button>
          <div>
            <h2 className="text-base font-black text-gray-900 dark:text-gray-100 leading-tight">
              User Profile & Settings
            </h2>
            <p className="text-[11px] font-bold text-[#0494F4]">
              {user?.name || 'Gothwad Account'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-black hover:bg-rose-100 transition-colors active:scale-95 border border-rose-200 dark:border-rose-900/50"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* 2. Main Full Screen Scrollable Body */}
      <div className="max-w-md w-full mx-auto p-4 space-y-4 pb-12 flex-1">
        
        {/* Child Switcher Cards for Parents */}
        {(role === 'student' || role === 'parent') && (
          <div>
            <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Select Active Student Profile
            </p>
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {siblings.map((child) => {
                const isSelected = activeStudentId === child.id;
                return (
                  <button
                    key={child.id}
                    onClick={() => {
                      setActiveStudentId(child.id);
                      showToast(`Active profile switched to ${child.name}`, 'success');
                    }}
                    className={`relative flex items-center gap-3 p-3 rounded-2xl border transition-all shrink-0 w-52 text-left ${
                      isSelected
                        ? 'border-[#0494F4] bg-[#0494F4]/10 dark:bg-[#0494F4]/20 shadow-xs'
                        : 'border-gray-200 dark:border-[#3C4043] bg-white dark:bg-[#202124] hover:bg-gray-50 dark:hover:bg-[#2D2F31]'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={child.avatar}
                        alt={child.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-[#202124]"
                      />
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 bg-[#0494F4] text-white rounded-full p-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-gray-900 dark:text-gray-100 truncate">
                        {child.name}
                      </p>
                      <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                        {child.classSection}
                      </p>
                      <p className="text-[10px] text-[#0494F4] font-medium">
                        Roll No: {child.rollNo}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* User Badge Profile Hero Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#202124] border border-gray-200 dark:border-[#3C4043] shadow-xs flex flex-col items-center text-center gap-3">
          <div className="relative">
            <img
              src={user?.avatar_url || (role === 'student' || role === 'parent' ? currentChild.avatar : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250')}
              alt="Profile Avatar"
              className="w-20 h-20 rounded-3xl object-cover border-2 border-[#0494F4] shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 p-1 rounded-xl bg-[#0494F4] text-white">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>

          <div>
            <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 leading-snug">
              {role === 'admin' ? 'Administrator Account' : role === 'management' ? 'Management Trustee' : role === 'teacher' ? (user?.name || 'Faculty Member') : currentChild.name}
            </h3>
            <p className="text-xs font-bold text-[#0494F4] uppercase tracking-wider mt-0.5">
              {role === 'admin' ? 'SYSTEM ADMIN' : role === 'management' ? 'BOARD TRUSTEE' : role === 'teacher' ? 'FACULTY TEACHER' : `${currentChild.classSection} • ${currentChild.admissionNo}`}
            </p>
          </div>

          <div className="w-full pt-3 border-t border-gray-100 dark:border-[#3C4043] grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#2D2F31]">
              <p className="text-[10px] text-gray-400 font-bold uppercase">School ID</p>
              <p className="text-xs font-black text-gray-800 dark:text-gray-200">
                {role === 'student' || role === 'parent' ? currentChild.admissionNo : user?.id || 'GE-STAFF-102'}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#2D2F31]">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Academic Year</p>
              <p className="text-xs font-black text-gray-800 dark:text-gray-200">2026 - 2027</p>
            </div>
          </div>
        </div>

        {/* Basic Information Card */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#202124] border border-gray-200 dark:border-[#3C4043] shadow-xs space-y-3">
          <h4 className="text-xs font-black text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-[#0494F4]" />
            <span>Account Details</span>
          </h4>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#2D2F31]">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Role Designation</p>
              <p className="font-extrabold text-gray-800 dark:text-gray-200 mt-0.5 capitalize">
                {role === 'admin' ? 'Administrator' : role === 'management' ? 'Management Board' : role === 'teacher' ? 'Faculty Teacher' : 'Student / Parent'}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#2D2F31]">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Status</p>
              <p className="font-extrabold text-emerald-500 mt-0.5">VERIFIED ACTIVE</p>
            </div>
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#2D2F31]">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Institution</p>
              <p className="font-extrabold text-gray-800 dark:text-gray-200 mt-0.5">Gothwad Education</p>
            </div>
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#2D2F31]">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Registered Mobile</p>
              <p className="font-extrabold text-gray-800 dark:text-gray-200 mt-0.5">+91 97290 75883</p>
            </div>
          </div>
        </div>

        {/* Navigation Features List */}
        <div className="p-2 rounded-3xl bg-white dark:bg-[#202124] border border-gray-200 dark:border-[#3C4043] shadow-xs space-y-1">
          <p className="text-[10px] font-black uppercase text-gray-400 px-3 pt-2 pb-1 tracking-wider">
            Features & Navigation
          </p>
          {getRoleNavigationItems().map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleMenuClick(item.label, item.tab)}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#2D2F31] transition-colors group text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-gray-100 dark:bg-[#2D2F31] shrink-0">
                  {item.icon}
                </div>
                <span className="text-xs font-extrabold text-gray-800 dark:text-gray-200 truncate">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0494F4] group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>

        {/* System & Portal Settings Card */}
        <div className="p-2 rounded-3xl bg-white dark:bg-[#202124] border border-gray-200 dark:border-[#3C4043] shadow-xs space-y-1">
          <p className="text-[10px] font-black uppercase text-gray-400 px-3 pt-2 pb-1 tracking-wider">
            System Settings & Portal
          </p>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#2D2F31] transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 shrink-0">
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </div>
              <span className="text-xs font-extrabold text-gray-800 dark:text-gray-200">
                {theme === 'dark' ? 'Light Theme Mode' : 'Dark Theme Mode'}
              </span>
            </div>
            <span className="text-[10px] font-bold text-[#0494F4] uppercase bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-xl">
              Toggle
            </span>
          </button>

          {/* Switch Role / Portal */}
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#2D2F31] transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-500 shrink-0">
                <RefreshCw className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-gray-800 dark:text-gray-200">
                Switch Role / Portal
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0494F4] group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Help & Support */}
          <button
            onClick={() => {
              alert('Help Desk Support: Call +91 97290 75883 or Email support@gothwadeducation.com');
            }}
            className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#2D2F31] transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 shrink-0">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-gray-800 dark:text-gray-200">
                Help & Support Desk
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0494F4] group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Privacy Policy */}
          <button
            onClick={() => {
              alert('Privacy Policy: All student records and school data are protected with 256-bit encryption under Gothwad Tech standards.');
            }}
            className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#2D2F31] transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-500 shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-gray-800 dark:text-gray-200">
                Privacy Policy & Data Security
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0494F4] group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

        {/* Primary Guardian Contact Card */}
        <div className="p-4 rounded-3xl bg-sky-50/60 dark:bg-[#2D2F31] border border-sky-100 dark:border-[#3C4043] space-y-2">
          <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Primary Contact & Support
          </p>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black text-gray-900 dark:text-gray-100">
                Gothwad Education Desk
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                <Phone className="w-3 h-3 text-[#0494F4]" />
                <span>+91 97290 75883</span>
              </p>
            </div>
            <a
              href="tel:+919729075883"
              className="px-3.5 py-1.5 rounded-xl bg-[#0494F4] text-white text-xs font-bold shadow-xs active:scale-95"
            >
              Call Desk
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
