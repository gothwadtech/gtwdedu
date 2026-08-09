import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Headset,
  BookOpen,
  Award,
  Database
} from 'lucide-react';

interface WelcomeScreenProps {
  onCompleteWelcome: () => void;
  onOpenSupport: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onCompleteWelcome,
  onOpenSupport,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as 2 | 3);
    } else {
      onCompleteWelcome();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto my-auto flex flex-col gap-3 py-4 px-1 sm:px-0 animate-fade-in select-none">
      {/* Top Header Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] shadow-xs text-center flex flex-col items-center justify-center gap-2">
        <div>
          <img
            src="/logo.jpg"
            alt="Gothwad Education Logo"
            className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-2xl shadow-xs"
          />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100 uppercase tracking-wide leading-tight">
            GOTHWAD EDUCATION
          </h1>
          <p className="text-[10px] sm:text-[11px] font-black text-[#0494F4] uppercase tracking-widest mt-0.5">
            DEVELOPED & MANAGED BY GOTHWAD TECH
          </p>
        </div>
      </div>

      {/* Step Indicator Tabs */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          {currentStep === 1 && 'OUR MISSION & VISION'}
          {currentStep === 2 && 'POWERFUL APP FEATURES'}
          {currentStep === 3 && 'DATA PRIVACY & OWNERSHIP'}
        </span>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              onClick={() => setCurrentStep(step as 1 | 2 | 3)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentStep === step
                  ? 'w-6 bg-[#0494F4]'
                  : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* SLIDE 1: VISION, MISSION & PROMISE */}
      {currentStep === 1 && (
        <div className="flex flex-col gap-3 animate-fade-in">
          {/* Card 1: Digital India & Atmanirbhar Bharat Mission */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] shadow-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#0494F4]">
              <div className="p-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 shrink-0">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wide text-gray-900 dark:text-gray-100">
                DIGITAL EDUCATION FOR INDIA
              </h2>
            </div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 leading-relaxed">
              Empowering schools across India with world-class digital infrastructure. Our core goal is driving educational digitisation to support <span className="text-gray-900 dark:text-white font-black">Atmanirbhar Bharat</span> (Self-Reliant India).
            </p>
          </div>

          {/* Card 2: Uncompromising Promise */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] shadow-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-emerald-500">
              <div className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 shrink-0">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wide text-gray-900 dark:text-gray-100">
                OUR UNCOMPROMISING PROMISE
              </h2>
            </div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 leading-relaxed">
              We pledge to deliver <span className="text-emerald-600 dark:text-emerald-400 font-black">the finest, most intuitive school management platform</span> ever created — designed to elevate every student, teacher, administrator, and parent.
            </p>
          </div>
        </div>
      )}

      {/* SLIDE 2: APP CORE FEATURES HIGHLIGHT */}
      {currentStep === 2 && (
        <div className="flex flex-col gap-2.5 animate-fade-in">
          {/* Feature 1 */}
          <div className="p-3 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] shadow-xs flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-[#0494F4] shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 uppercase tracking-tight truncate">
                REAL-TIME ATTENDANCE & LEAVES
              </h3>
              <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 truncate">
                Instant biometric/manual marking with instant parent SMS alerts.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-3 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] shadow-xs flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 shrink-0">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 uppercase tracking-tight truncate">
                DIGITAL FEE COLLECTION & RECEIPTS
              </h3>
              <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 truncate">
                Automated due tracking, UPI/card payments & instant PDF receipts.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-3 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] shadow-xs flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-500 shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 uppercase tracking-tight truncate">
                ACADEMICS, TIMETABLE & RESULTS
              </h3>
              <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 truncate">
                Digital homework submissions, class schedules & instant report cards.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-3 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] shadow-xs flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 uppercase tracking-tight truncate">
                ROLE-BASED HIGH-SECURITY PORTALS
              </h3>
              <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 truncate">
                Dedicated dashboards for Admins, Faculty Teachers, Parents & Students.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE 3: DATA PRIVACY & STRICT OWNERSHIP POLICY */}
      {currentStep === 3 && (
        <div className="flex flex-col gap-2.5 animate-fade-in">
          {/* Card 1: STRICT DATA OWNERSHIP GUARANTEE */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 shadow-xs flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Database className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wide">
                100% INSTITUTION DATA OWNERSHIP
              </h2>
            </div>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 leading-relaxed">
              <span className="font-black text-emerald-700 dark:text-emerald-300">Your data belongs exclusively to your school.</span> Gothwad Tech does NOT own, monetize, sell, or harvest student or institutional records. All records remain the sole property of your school/education provider.
            </p>
          </div>

          {/* Card 2: PRIVACY & ENCRYPTION */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] shadow-xs flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[#0494F4]">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wide text-gray-900 dark:text-gray-100">
                BANK-GRADE SECURITY & PRIVACY
              </h2>
            </div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 leading-relaxed">
              All communications are protected by SSL/TLS encryption. Strict role isolation ensures parents and students only access authorized academic data.
            </p>
          </div>
        </div>
      )}

      {/* Primary Action Row: Next Step & Prev */}
      <div className="flex items-center gap-2">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="w-12 h-12 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-xs shrink-0 active:scale-95"
            title="PREVIOUS"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="flex-1 h-12 rounded-2xl bg-[#0494F4] hover:bg-[#0378C6] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <span>{currentStep === 3 ? 'PROCEED TO ROLE SELECTION' : 'NEXT STEP'}</span>
          {currentStep === 3 ? <ArrowRight className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Secondary Card Buttons */}
      <div className="flex flex-col gap-2">
        {currentStep < 3 && (
          <button
            type="button"
            onClick={onCompleteWelcome}
            className="w-full h-12 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] flex items-center justify-center gap-2 text-xs font-black text-[#0494F4] hover:border-[#0494F4] transition-all shadow-xs uppercase tracking-wider active:scale-95"
          >
            <ArrowRight className="w-4 h-4 text-[#0494F4]" />
            <span>SKIP TO LOGIN</span>
          </button>
        )}

        <button
          type="button"
          onClick={onOpenSupport}
          className="w-full h-12 rounded-2xl bg-white dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] flex items-center justify-center gap-2 text-xs font-black text-gray-700 dark:text-gray-200 hover:border-[#0494F4] transition-all shadow-xs uppercase tracking-wider active:scale-95"
        >
          <Headset className="w-4 h-4 text-[#0494F4]" />
          <span>HELP & SUPPORT</span>
        </button>
      </div>
    </div>
  );
};
