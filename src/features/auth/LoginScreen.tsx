import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToastContext } from '../../context/ToastContext';
import {
  ArrowLeft,
  Headset,
  ArrowRight,
  Info
} from 'lucide-react';
import { UserRole } from '../../types';
import { SupportModal } from '../../components/SupportModal';
import { RoleSelectionScreen, PortalCategory } from './RoleSelectionScreen';
import { WelcomeScreen } from './WelcomeScreen';

export const LoginScreen: React.FC = () => {
  const { loginWithCredentials, loginAsDemo, isLoading } = useAuth();
  const { showToast } = useToastContext();

  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState<PortalCategory>(null);

  // Input states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const handleSelectPortal = (portal: PortalCategory) => {
    setSelectedPortal(portal);
    setIdentifier('');
    setPassword('');
  };

  const getTargetRole = (portal: PortalCategory): UserRole => {
    switch (portal) {
      case 'management':
        return 'management';
      case 'teacher':
        return 'teacher';
      case 'student_parent':
        return 'student';
      case 'admin':
      default:
        return 'admin';
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier.trim()) {
      showToast('PLEASE ENTER YOUR DETAILS', 'warning');
      return;
    }

    const targetRole = getTargetRole(selectedPortal);
    const success = await loginWithCredentials(identifier.trim(), password, targetRole);
    if (success) {
      showToast(`LOGGED IN SUCCESSFULLY`, 'success');
    }
  };

  const handleInstantDemoLogin = () => {
    const targetRole = getTargetRole(selectedPortal);
    loginAsDemo(targetRole);
    showToast(`LOGGED IN AS DEMO`, 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 flex flex-col justify-center p-4 sm:p-6 transition-colors duration-200 select-none">
      {!hasSeenWelcome ? (
        /* ========================================================= */
        /* 3-STEP WELCOME & VISION / PRIVACY / FEATURES SCREEN       */
        /* ========================================================= */
        <WelcomeScreen
          onCompleteWelcome={() => setHasSeenWelcome(true)}
          onOpenSupport={() => setIsSupportOpen(true)}
        />
      ) : selectedPortal === null ? (
        /* ========================================================= */
        /* SEPARATE MODULAR ROLE SELECTION SCREEN                    */
        /* ========================================================= */
        <RoleSelectionScreen
          onSelectPortal={handleSelectPortal}
          onOpenSupport={() => setIsSupportOpen(true)}
          onShowWelcome={() => setHasSeenWelcome(false)}
        />
      ) : (
        /* ========================================================= */
        /* CLEAN INNER LOGIN SCREEN WITH UNIFORM GAP SPACING         */
        /* ========================================================= */
        <div className="w-full max-w-sm mx-auto my-auto flex flex-col gap-2.5 py-4 animate-fade-in">
          
          {/* Top Branding Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] shadow-xs text-center flex flex-col items-center justify-center gap-2.5">
            <img
              src="/logo.jpg"
              alt="Gothwad Education Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-2xl shadow-xs"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100 uppercase tracking-wide leading-tight">
                GOTHWAD EDUCATION
              </h1>
              <p className="text-[10px] sm:text-[11px] font-black text-[#0494F4] uppercase tracking-widest mt-0.5">
                DEVELOPED & MANAGED BY GOTHWAD TECH
              </p>
            </div>
          </div>

          {/* Sub-heading Divider Text right below Top Branding Card */}
          <div className="text-center py-0.5">
            <p className="text-[11px] sm:text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              ENTER YOUR CREDENTIALS HERE
            </p>
          </div>

          {/* Header Row: Back Circle Button + Matching Title Box + Info Icon Button at the end */}
          <div className="flex items-center gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setSelectedPortal(null)}
              className="w-12 h-12 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-xs shrink-0 active:scale-95"
              title="BACK"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 h-12 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] px-3.5 flex items-center justify-between shadow-xs">
              <h2 className="text-xs sm:text-sm font-black text-gray-900 dark:text-gray-100 uppercase tracking-wide truncate">
                {selectedPortal === 'admin' && 'ADMINISTRATOR SIGN IN'}
                {selectedPortal === 'management' && 'MANAGEMENT SIGN IN'}
                {selectedPortal === 'teacher' && 'TEACHER & STAFF SIGN IN'}
                {selectedPortal === 'student_parent' && 'STUDENT & PARENT SIGN IN'}
              </h2>

              {/* Instant Demo Info Button inside Header Box */}
              <button
                type="button"
                onClick={handleInstantDemoLogin}
                className="p-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-[#0494F4] hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors shrink-0 ml-1.5 active:scale-95 flex items-center justify-center"
                title="Instant Demo Access"
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Form Fields & Submit */}
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-2.5 w-full">
            <div>
              <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                {selectedPortal === 'admin' && 'ADMINISTRATOR EMAIL'}
                {selectedPortal === 'management' && 'TRUSTEE / MANAGEMENT EMAIL'}
                {selectedPortal === 'teacher' && 'TEACHER / STAFF ID OR EMAIL'}
                {selectedPortal === 'student_parent' && 'STUDENT / PARENT ID OR MOBILE'}
              </label>
              <input
                type="text"
                required
                placeholder={
                  selectedPortal === 'admin'
                    ? 'admin@gothwad.edu'
                    : selectedPortal === 'management'
                    ? 'management@gothwad.edu'
                    : selectedPortal === 'teacher'
                    ? 'EMP-02 or teacher@gothwad.edu'
                    : 'GE-2026-10042 or +91 98290 67890'
                }
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full h-12 px-4 bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] rounded-2xl text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#0494F4] focus:ring-1 focus:ring-[#0494F4] focus:outline-none transition-all shadow-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
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
              className="w-full h-12 rounded-2xl bg-[#0494F4] hover:bg-[#0378C6] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <span>SIGN IN TO PORTAL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Subtitle Line above Help & Support */}
          <div className="text-center pt-2 pb-0.5">
            <p className="text-[11px] sm:text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              OTHER OPTIONS
            </p>
          </div>

          {/* Bottom Help & Support Option */}
          <button
            onClick={() => setIsSupportOpen(true)}
            className="w-full h-12 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] flex items-center justify-center gap-2 text-xs font-black text-gray-700 dark:text-gray-200 hover:border-[#0494F4] transition-all shadow-xs uppercase tracking-wider active:scale-95"
          >
            <Headset className="w-4 h-4 text-[#0494F4]" />
            <span>HELP & SUPPORT</span>
          </button>
        </div>
      )}

      {/* Support & Contact Modal */}
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </div>
  );
};
