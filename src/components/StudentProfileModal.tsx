import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  User,
  FileText,
  HeartPulse,
  CreditCard,
  FileSpreadsheet,
  Key,
  Shield,
  HelpCircle,
  Phone,
  CheckCircle2,
  LogOut,
  ArrowLeft,
  Users
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToastContext } from '../context/ToastContext';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const { user, logout } = useAuth();
  const { showToast } = useToastContext();

  const [activeStudentId, setActiveStudentId] = useState('1');

  if (!isOpen) return null;

  // Multi-child profiles as seen in screenshot
  const siblings = [
    {
      id: '1',
      name: 'Ayush Malhotra',
      classSection: 'VII-B',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    },
    {
      id: '2',
      name: 'Vanshika Malhotra',
      classSection: 'IX-B',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    },
  ];

  const handleMenuClick = (itemLabel: string, tabId?: string) => {
    if (tabId && onNavigateTab) {
      onNavigateTab(tabId);
      onClose();
    } else {
      showToast(`${itemLabel} opened`, 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#202124] text-gray-900 dark:text-gray-100 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-[#3C4043] flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="p-4 border-b border-gray-100 dark:border-[#3C4043] flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2F31] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
          <h2 className="text-base font-black text-gray-900 dark:text-gray-100">Profile</h2>
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="p-2 rounded-full text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 space-y-5 flex-1">
          {/* Child Switcher Cards */}
          <div className="flex items-center gap-3 p-1 overflow-x-auto pb-2">
            {siblings.map((child) => {
              const isSelected = activeStudentId === child.id;
              return (
                <button
                  key={child.id}
                  onClick={() => {
                    setActiveStudentId(child.id);
                    showToast(`Switched active profile to ${child.name}`, 'success');
                  }}
                  className={`relative flex flex-col items-center p-2.5 rounded-2xl transition-all border shrink-0 w-28 ${
                    isSelected
                      ? 'border-[#0494F4] bg-[#0494F4]/5 dark:bg-[#0494F4]/10'
                      : 'border-gray-200 dark:border-[#3C4043] bg-gray-50 dark:bg-[#2D2F31]'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={child.avatar}
                      alt={child.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-[#202124] shadow-sm"
                    />
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 bg-[#0494F4] text-white rounded-full p-0.5 shadow-sm">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-black text-gray-900 dark:text-gray-100 mt-2 truncate w-full text-center">
                    {child.name}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">
                    {child.classSection}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Menu Items List */}
          <div className="space-y-1 bg-white dark:bg-[#202124] rounded-2xl">
            {[
              { label: "Parent's Profile", icon: <Users className="w-4 h-4 text-purple-500" /> },
              { label: 'Basic Information', icon: <User className="w-4 h-4 text-[#0494F4]" /> },
              { label: 'Health Records', icon: <HeartPulse className="w-4 h-4 text-rose-500" /> },
              { label: 'Fee Details', icon: <CreditCard className="w-4 h-4 text-emerald-500" />, tab: 'fee-payments' },
              { label: 'Transfer Certificate Request', icon: <FileSpreadsheet className="w-4 h-4 text-amber-500" /> },
              { label: 'Change Password', icon: <Key className="w-4 h-4 text-cyan-500" /> },
              { label: 'Privacy Policy', icon: <Shield className="w-4 h-4 text-indigo-500" /> },
              { label: 'Support', icon: <HelpCircle className="w-4 h-4 text-sky-500" /> },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleMenuClick(item.label, item.tab)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#2D2F31] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#2D2F31]">
                    {item.icon}
                  </div>
                  <span className="text-xs font-extrabold text-gray-800 dark:text-gray-200">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0494F4] group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>

          {/* Contact Section */}
          <div className="pt-2">
            <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Contact
            </h4>
            <div className="p-3.5 rounded-2xl bg-sky-50/50 dark:bg-[#2D2F31] border border-sky-100 dark:border-[#3C4043] flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-gray-900 dark:text-gray-100">
                  Lokesh Malhotra
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                  Father • +91 97290 75883
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#0494F4]/10 text-[#0494F4] text-[10px] font-black">
                Primary Contact
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
