import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { TopHeader } from './components/layout/TopHeader';
import { BottomNav } from './components/layout/BottomNav';
import { Sidebar } from './components/layout/Sidebar';
import { MobileContainer } from './components/layout/MobileContainer';
import { LoginScreen } from './features/auth/LoginScreen';
import { StudentProfileModal } from './components/StudentProfileModal';
import { NavigationDrawer } from './components/NavigationDrawer';

// Admin Views
import { StudentMgmt } from './features/admin/StudentMgmt';
import { StaffMgmt } from './features/admin/StaffMgmt';
import { FeeCollect } from './features/admin/FeeCollect';
import { Analytics } from './features/admin/Analytics';
import { Notices } from './features/admin/Notices';

// Teacher Views
import { AttendanceMarking } from './features/teacher/AttendanceMarking';
import { HomeworkMgmt } from './features/teacher/HomeworkMgmt';
import { ResultEntry } from './features/teacher/ResultEntry';
import { TeacherTimetable } from './features/teacher/TeacherTimetable';

// Student / Parent Views
import { StudentDashboard } from './features/student/StudentDashboard';
import { MyAttendance } from './features/student/MyAttendance';
import { FeePayments } from './features/student/FeePayments';
import { MyHomework } from './features/student/MyHomework';
import { ReportCards } from './features/student/ReportCards';
import { NoticeBoard } from './features/student/NoticeBoard';

const MainAppContent: React.FC = () => {
  const { role, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('students');

  // Drawers and Modal state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Auto set activeTab when role changes if tab is not valid for role
  React.useEffect(() => {
    if (role === 'admin') {
      if (!['students', 'staff', 'fees', 'analytics', 'notices'].includes(activeTab)) {
        setActiveTab('students');
      }
    } else if (role === 'teacher') {
      if (!['attendance', 'homework', 'results', 'timetable', 'notices'].includes(activeTab)) {
        setActiveTab('attendance');
      }
    } else {
      if (!['dashboard', 'my-attendance', 'fee-payments', 'my-homework', 'report-cards', 'notice-board'].includes(activeTab)) {
        setActiveTab('dashboard');
      }
    }
  }, [role]);

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  const handleNavigateTab = (tabId: string) => {
    if (role === 'admin' && !['students', 'staff', 'fees', 'analytics', 'notices'].includes(tabId)) {
      setActiveTab('students');
    } else if (role === 'teacher' && !['attendance', 'homework', 'results', 'timetable', 'notices'].includes(tabId)) {
      setActiveTab('attendance');
    } else if ((role === 'student' || role === 'parent') && !['dashboard', 'my-attendance', 'fee-payments', 'my-homework', 'report-cards', 'notice-board'].includes(tabId)) {
      setActiveTab('dashboard');
    } else {
      setActiveTab(tabId);
    }
  };

  const renderActiveView = () => {
    if (role === 'admin') {
      switch (activeTab) {
        case 'students':
          return <StudentMgmt />;
        case 'staff':
          return <StaffMgmt />;
        case 'fees':
          return <FeeCollect />;
        case 'analytics':
          return <Analytics />;
        case 'notices':
          return <Notices />;
        default:
          return <StudentMgmt />;
      }
    }

    if (role === 'teacher') {
      switch (activeTab) {
        case 'attendance':
          return <AttendanceMarking />;
        case 'homework':
          return <HomeworkMgmt />;
        case 'results':
          return <ResultEntry />;
        case 'timetable':
          return <TeacherTimetable />;
        case 'notices':
          return <Notices />;
        default:
          return <AttendanceMarking />;
      }
    }

    // Student / Parent Role
    switch (activeTab) {
      case 'dashboard':
        return <StudentDashboard onNavigateTab={(tab) => handleNavigateTab(tab)} />;
      case 'my-attendance':
        return <MyAttendance />;
      case 'fee-payments':
        return <FeePayments />;
      case 'my-homework':
        return <MyHomework />;
      case 'report-cards':
        return <ReportCards />;
      case 'notice-board':
        return <NoticeBoard />;
      default:
        return <StudentDashboard onNavigateTab={(tab) => handleNavigateTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200">
      <TopHeader
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />
      
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar role={role} activeTab={activeTab} onChangeTab={(tabId) => handleNavigateTab(tabId)} />
        <main className="flex-1 min-w-0">
          <MobileContainer>{renderActiveView()}</MobileContainer>
        </main>
      </div>

      <BottomNav role={role} activeTab={activeTab} onChangeTab={(tabId) => handleNavigateTab(tabId)} />

      {/* Screenshot 3 Side Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigateTab={(tabId) => handleNavigateTab(tabId)}
      />

      {/* Screenshot 1 Profile & Sibling Switcher Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onNavigateTab={(tabId) => handleNavigateTab(tabId)}
      />
    </div>
  );
};

import { ErrorBoundary } from './components/ErrorBoundary';
import { SplashScreen } from './components/layout/SplashScreen';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <SplashScreen />
            <MainAppContent />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
