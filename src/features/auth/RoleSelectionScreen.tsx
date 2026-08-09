import React from 'react';
import {
  Headset,
  ChevronRight,
  ShieldCheck,
  Building2,
  GraduationCap,
  Users,
  Info
} from 'lucide-react';

export type PortalCategory = 'admin' | 'management' | 'teacher' | 'student_parent';

interface RoleSelectionScreenProps {
  onSelectPortal: (portal: PortalCategory) => void;
  onOpenSupport: () => void;
  onShowWelcome?: () => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({
  onSelectPortal,
  onOpenSupport,
  onShowWelcome,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto my-auto flex flex-col gap-2.5 py-4 px-1 sm:px-0 animate-fade-in">
      {/* 1. Top Branding Box Card */}
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

      {/* 2. Sub-heading Divider Text: CHOOSE YOUR ROLE TO CONTINUE */}
      <div className="text-center py-0.5">
        <p className="text-[11px] sm:text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          CHOOSE YOUR ROLE TO CONTINUE
        </p>
      </div>

      {/* 3. Primary Top Role: Parent & Student */}
      <button
        onClick={() => onSelectPortal('student_parent')}
        className="w-full h-12 px-3.5 rounded-2xl bg-white dark:bg-[#2D2F31] hover:border-[#0494F4] text-gray-900 dark:text-gray-100 font-extrabold text-xs sm:text-sm flex items-center justify-between border border-gray-200 dark:border-[#3C4043] shadow-xs transition-all active:scale-[0.98] group uppercase"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-500 shrink-0">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-left truncate tracking-tight">CONTINUE AS PARENT & STUDENT</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 group-hover:text-[#0494F4] ml-1.5" />
      </button>

      {/* 4. Sub-heading Divider Text: OTHER ROLES */}
      <div className="text-center pt-2 pb-0.5">
        <p className="text-[11px] sm:text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          OTHER ROLES
        </p>
      </div>

      {/* 5. Role Option: Teacher & Staff */}
      <button
        onClick={() => onSelectPortal('teacher')}
        className="w-full h-12 px-3.5 rounded-2xl bg-white dark:bg-[#2D2F31] hover:border-[#0494F4] text-gray-900 dark:text-gray-100 font-extrabold text-xs sm:text-sm flex items-center justify-between border border-gray-200 dark:border-[#3C4043] shadow-xs transition-all active:scale-[0.98] group uppercase"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 shrink-0">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-left truncate tracking-tight">CONTINUE AS TEACHER & STAFF</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 group-hover:text-[#0494F4] ml-1.5" />
      </button>

      {/* 6. Role Option: Management */}
      <button
        onClick={() => onSelectPortal('management')}
        className="w-full h-12 px-3.5 rounded-2xl bg-white dark:bg-[#2D2F31] hover:border-[#0494F4] text-gray-900 dark:text-gray-100 font-extrabold text-xs sm:text-sm flex items-center justify-between border border-gray-200 dark:border-[#3C4043] shadow-xs transition-all active:scale-[0.98] group uppercase"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 shrink-0">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-left truncate tracking-tight">CONTINUE AS MANAGEMENT</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 group-hover:text-[#0494F4] ml-1.5" />
      </button>

      {/* 7. Role Option: Administrator */}
      <button
        onClick={() => onSelectPortal('admin')}
        className="w-full h-12 px-3.5 rounded-2xl bg-white dark:bg-[#2D2F31] hover:border-[#0494F4] text-gray-900 dark:text-gray-100 font-extrabold text-xs sm:text-sm flex items-center justify-between border border-gray-200 dark:border-[#3C4043] shadow-xs transition-all active:scale-[0.98] group uppercase"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-[#0494F4] shrink-0">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-left truncate tracking-tight">CONTINUE AS ADMINISTRATOR</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 group-hover:text-[#0494F4] ml-1.5" />
      </button>

      {/* 8. Sub-heading Divider Text: OTHER OPTIONS */}
      <div className="text-center pt-2 pb-0.5">
        <p className="text-[11px] sm:text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          OTHER OPTIONS
        </p>
      </div>

      {/* 9. Full-Width Help & Support Button */}
      <button
        onClick={onOpenSupport}
        className="w-full h-12 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] flex items-center justify-center gap-2 text-xs font-black text-gray-700 dark:text-gray-200 hover:border-[#0494F4] transition-all shadow-xs uppercase tracking-wider active:scale-95"
      >
        <Headset className="w-4 h-4 text-[#0494F4]" />
        <span>HELP & SUPPORT</span>
      </button>

      {/* 10. Full-Width Vision & Privacy Button */}
      {onShowWelcome && (
        <button
          onClick={onShowWelcome}
          className="w-full h-12 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] flex items-center justify-center gap-2 text-xs font-black text-[#0494F4] hover:border-[#0494F4] transition-all shadow-xs uppercase tracking-wider active:scale-95"
        >
          <Info className="w-4 h-4 text-[#0494F4]" />
          <span>MISSION, VISION & PRIVACY</span>
        </button>
      )}
    </div>
  );
};
