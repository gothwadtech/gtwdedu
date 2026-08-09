import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  Calendar,
  CreditCard,
  BookOpen,
  Megaphone,
  Clock,
  Sparkles,
  Trash2,
} from 'lucide-react';

interface NotificationItem {
  id: string;
  type: 'exam' | 'fee' | 'homework' | 'notice' | 'system';
  title: string;
  message: string;
  time: string;
  isUnread: boolean;
}

interface NotificationsFullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsFullScreenModal: React.FC<NotificationsFullScreenModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'exam',
      title: 'Mid-Term Exam Datesheet Released',
      message: 'Mid-Term date-sheet for September 2026 is published. Please download and review subject-wise timing from the Notice Board.',
      time: '10 mins ago',
      isUnread: true,
    },
    {
      id: '2',
      type: 'fee',
      title: 'Fee Payment Receipt Confirmed',
      message: 'Receipt REC-2026-00412 for Term 1 tuition fees generated successfully. ₹12,500 credited.',
      time: '2 hours ago',
      isUnread: true,
    },
    {
      id: '3',
      type: 'homework',
      title: 'New Mathematics Homework',
      message: 'Exercise 4.2 assigned by Mrs. Sunita Sharma. Due Date: 12th August 2026.',
      time: 'Yesterday at 4:30 PM',
      isUnread: false,
    },
    {
      id: '4',
      type: 'notice',
      title: 'Independence Day Celebration Notice',
      message: 'All students are requested to report in full white uniform on 15th August at 8:00 AM.',
      time: '2 days ago',
      isUnread: false,
    },
    {
      id: '5',
      type: 'system',
      title: 'App System Maintenance Update',
      message: 'Gothwad Education Portal software updated to v2.4 with improved offline synchronization.',
      time: '3 days ago',
      isUnread: false,
    },
  ]);

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isUnread: false })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === 'unread') return item.isUnread;
    return true;
  });

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'exam':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'fee':
        return <CreditCard className="w-4 h-4 text-emerald-500" />;
      case 'homework':
        return <BookOpen className="w-4 h-4 text-amber-500" />;
      case 'notice':
        return <Megaphone className="w-4 h-4 text-purple-500" />;
      case 'system':
      default:
        return <Sparkles className="w-4 h-4 text-[#0494F4]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-[#1C1E20] text-gray-900 dark:text-gray-100 flex flex-col w-full h-full overflow-y-auto animate-fade-in">
      
      {/* 1. Full Screen Top Header */}
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
            <h2 className="text-base font-black text-gray-900 dark:text-gray-100 leading-tight flex items-center gap-2">
              <span>Notifications</span>
              {notifications.some((n) => n.isUnread) && (
                <span className="px-2 py-0.5 rounded-full bg-[#0494F4] text-white text-[10px] font-bold">
                  {notifications.filter((n) => n.isUnread).length} NEW
                </span>
              )}
            </h2>
            <p className="text-[11px] font-bold text-[#0494F4]">
              Gothwad Education Updates & Alerts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={markAllAsRead}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2D2F31] text-xs font-extrabold flex items-center gap-1 active:scale-95"
            title="Mark All Read"
          >
            <CheckCheck className="w-4 h-4 text-[#0494F4]" />
            <span className="hidden sm:inline">Read All</span>
          </button>
        </div>
      </div>

      {/* 2. Scrollable Body */}
      <div className="max-w-md w-full mx-auto p-4 space-y-4 pb-12 flex-1">
        
        {/* Filter Pills & Actions Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 bg-gray-200/60 dark:bg-[#2D2F31] p-1 rounded-2xl">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-[#202124] text-gray-900 dark:text-gray-100 shadow-xs'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setActiveFilter('unread')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeFilter === 'unread'
                  ? 'bg-white dark:bg-[#202124] text-[#0494F4] shadow-xs'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'
              }`}
            >
              Unread ({notifications.filter((n) => n.isUnread).length})
            </button>
          </div>

          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="text-[11px] font-extrabold text-rose-500 hover:text-rose-600 flex items-center gap-1 px-2 py-1 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* List of Notifications */}
        {filteredNotifications.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-[#202124] border border-gray-200 dark:border-[#3C4043] text-center space-y-2 my-auto">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-[#0494F4] flex items-center justify-center mx-auto">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-gray-800 dark:text-gray-200">
              No Notifications Found
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              You are all caught up! Important circulars and updates will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setNotifications((prev) =>
                    prev.map((n) => (n.id === item.id ? { ...n, isUnread: false } : n))
                  );
                }}
                className={`p-4 rounded-3xl border transition-all cursor-pointer relative ${
                  item.isUnread
                    ? 'bg-white dark:bg-[#202124] border-[#0494F4]/50 shadow-xs'
                    : 'bg-white/60 dark:bg-[#202124]/60 border-gray-200 dark:border-[#3C4043] opacity-90'
                }`}
              >
                {/* Unread Pill Indicator */}
                {item.isUnread && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#0494F4]" />
                )}

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-gray-100 dark:bg-[#2D2F31] shrink-0 mt-0.5">
                    {getNotificationIcon(item.type)}
                  </div>

                  <div className="space-y-1 pr-4 min-w-0 flex-1">
                    <h4 className="text-xs font-black text-gray-900 dark:text-gray-100 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 dark:text-gray-500 pt-1">
                      <Clock className="w-3 h-3 text-[#0494F4]" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
