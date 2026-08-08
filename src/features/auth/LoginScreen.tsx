import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToastContext } from '../../context/ToastContext';
import {
  ArrowLeft,
  Headset,
  ArrowRight,
  Zap,
  User,
  HeartHandshake
} from 'lucide-react';
import { UserRole } from '../../types';
import { SupportModal } from '../../components/SupportModal';
import { RoleSelectionScreen } from './RoleSelectionScreen';

type PortalCategory = 'admin' | 'teacher' | 'student_parent' | null;

export const LoginScreen: React.FC = () => {
  const { loginWithCredentials, loginAsDemo, isLoading } = useAuth();
  const { showToast } = useToastContext();

  const [selectedPortal, setSelectedPortal] = useState<PortalCategory>(null);
  const [parentStudentRole, setParentStudentRole] = useState<'student' | 'parent'>('student');

  // Input states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const handleSelectPortal = (portal: PortalCategory) => {
    setSelectedPortal(portal);
    setIdentifier('');
    setPassword('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier.trim()) {
      showToast('PLEASE ENTER YOUR DETAILS', 'warning');
      return;
    }

    let targetRole: UserRole = 'admin';
    if (selectedPortal === 'teacher') {
      targetRole = 'teacher';
    } else if (selectedPortal === 'student_parent') {
      targetRole = parentStudentRole;
    }

    const success = await loginWithCredentials(identifier.trim(), password, targetRole);
    if (success) {
      showToast(`LOGGED IN SUCCESSFULLY`, 'success');
    }
  };

  const handleInstantDemoLogin = () => {
    let targetRole: UserRole = 'admin';
    if (selectedPortal === 'teacher') {
      targetRole = 'teacher';
    } else if (selectedPortal === 'student_parent') {
      targetRole = parentStudentRole;
    }

    loginAsDemo(targetRole);
    showToast(`LOGGED IN AS DEMO ${targetRole.toUpperCase()}`, 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 flex flex-col justify-between p-4 sm:p-6 transition-colors duration-200 select-none">
      {selectedPortal === null ? (
        /* ========================================================= */
        /* SEPARATE MODULAR ROLE SELECTION SCREEN                    */
        /* ========================================================= */
        <RoleSelectionScreen
          onSelectPortal={handleSelectPortal}
          onOpenSupport={() => setIsSupportOpen(true)}
        />
      ) : (
        /* ========================================================= */
        /* CLEAN INNER LOGIN SCREEN WITH MATCHING HEADER ROW BOX     */
        /* ========================================================= */
        <div className="w-full max-w-sm mx-auto my-auto py-4 flex flex-col justify-between min-h-[85vh] animate-fade-in">
          
          {/* Header Row: Back Circle Button + Matching Title Box (Total length = w-full) */}
          <div className="flex items-center gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setSelectedPortal(null)}
              className="w-12 h-12 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-xs shrink-0 active:scale-95"
              title="BACK"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 h-12 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] px-4 flex items-center justify-between shadow-xs">
              <h2 className="text-xs sm:text-sm font-black text-gray-900 dark:text-gray-100 uppercase tracking-wide truncate">
                {selectedPortal === 'admin' && 'ADMINISTRATOR SIGN IN'}
                {selectedPortal === 'teacher' && 'TEACHER SIGN IN'}
                {selectedPortal === 'student_parent' && 'STUDENT & PARENT SIGN IN'}
              </h2>
            </div>
          </div>

          {/* Form Content */}
          <div className="my-auto space-y-4 w-full pt-4">
            {/* Toggle for Student vs Parent inside Student/Parent Portal */}
            {selectedPortal === 'student_parent' && (
              <div className="bg-white dark:bg-[#2D2F31] p-1.5 rounded-2xl border border-gray-200 dark:border-[#3C4043] flex gap-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setParentStudentRole('student')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    parentStudentRole === 'student'
                      ? 'bg-[#0494F4] text-white shadow-xs'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  STUDENT
                </button>

                <button
                  type="button"
                  onClick={() => setParentStudentRole('parent')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    parentStudentRole === 'parent'
                      ? 'bg-[#0494F4] text-white shadow-xs'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  PARENT
                </button>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  {selectedPortal === 'admin' && 'ADMIN EMAIL'}
                  {selectedPortal === 'teacher' && 'TEACHER ID / EMAIL / MOBILE'}
                  {selectedPortal === 'student_parent' &&
                    (parentStudentRole === 'student'
                      ? 'STUDENT ID / EMAIL / MOBILE'
                      : 'PARENT MOBILE / EMAIL')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    selectedPortal === 'admin'
                      ? 'admin@gothwad.edu'
                      : selectedPortal === 'teacher'
                      ? 'EMP-02 or teacher@gothwad.edu'
                      : parentStudentRole === 'student'
                      ? 'GE-2026-10042'
                      : '+91 98290 67890'
                  }
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full h-12 px-4 bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] rounded-2xl text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#0494F4] focus:ring-1 focus:ring-[#0494F4] focus:outline-none transition-all shadow-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  PASSWORD
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] rounded-2xl text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#0494F4] focus:outline-none focus:ring-1 focus:ring-[#0494F4] transition-all shadow-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-2xl bg-[#0494F4] hover:bg-[#0378C6] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 mt-2"
              >
                <span>SIGN IN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Instant Demo Entry Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleInstantDemoLogin}
                className="w-full h-12 px-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-emerald-500/20 transition-all active:scale-95"
              >
                <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                <span>
                  CONTINUE WITH INSTANT DEMO ({
                    selectedPortal === 'admin'
                      ? 'ADMIN'
                      : selectedPortal === 'teacher'
                      ? 'TEACHER'
                      : parentStudentRole === 'student'
                      ? 'STUDENT'
                      : 'PARENT'
                  })
                </span>
              </button>
            </div>
          </div>

          {/* Bottom Help & Support Option */}
          <div className="pt-4">
            <button
              onClick={() => setIsSupportOpen(true)}
              className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] flex items-center justify-center gap-2 text-xs font-black text-gray-700 dark:text-gray-200 hover:border-[#0494F4] transition-all shadow-xs uppercase tracking-wider"
            >
              <Headset className="w-4 h-4 text-[#0494F4]" />
              <span>HELP & SUPPORT</span>
            </button>
          </div>
        </div>
      )}

      {/* Support & Contact Modal */}
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </div>
  );
};
