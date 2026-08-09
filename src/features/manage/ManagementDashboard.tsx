import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  Award,
  DollarSign,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { useToastContext } from '../../context/ToastContext';

export const ManagementDashboard: React.FC = () => {
  const { showToast } = useToastContext();
  const [selectedPolicyModal, setSelectedPolicyModal] = useState<string | null>(null);

  const boardDirectives = [
    {
      id: 'dir-1',
      title: 'Smart Classroom & AI Lab Expansion Project',
      budget: '₹45,000,000',
      status: 'Approved',
      date: '02 Aug 2026',
      department: 'Infrastructure & Tech',
      priority: 'High',
    },
    {
      id: 'dir-2',
      title: 'Faculty Excellence Grant & Research Incentive',
      budget: '₹12,500,000',
      status: 'Under Review',
      date: '28 Jul 2026',
      department: 'Academic Affairs',
      priority: 'Medium',
    },
    {
      id: 'dir-3',
      title: 'Campus Rooftop Solar & Green Energy Installation',
      budget: '₹8,000,000',
      status: 'Approved',
      date: '15 Jul 2026',
      department: 'Estate Management',
      priority: 'High',
    },
    {
      id: 'dir-4',
      title: 'Annual Sports Complex Renovation & Swimming Pool',
      budget: '₹22,000,000',
      status: 'Pending Quotation',
      date: '10 Jul 2026',
      department: 'Sports & Wellness',
      priority: 'Low',
    },
  ];

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      
      {/* 1. Management Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0494F4] via-[#0378C6] to-indigo-900 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-xs">
              <Building2 className="w-3.5 h-3.5" />
              <span>Gothwad Educational Trust</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight leading-tight">
              Executive Board & Management Portal
            </h1>
            <p className="text-xs text-sky-100 font-medium">
              Institutional Governance, Strategic Budgeting & Board Directives
            </p>
          </div>

          <button
            onClick={() => showToast('FINANCIAL AUDIT REPORT DOWNLOADED', 'success')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white text-[#0494F4] hover:bg-sky-50 font-black text-xs uppercase tracking-wider shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Audit Report 2026</span>
          </button>
        </div>
      </div>

      {/* 2. Key Executive Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-3.5 flex flex-col justify-between space-y-2 border-l-4 border-l-[#0494F4]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
              Capital Reserve
            </span>
            <div className="p-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-[#0494F4]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-base sm:text-lg font-black text-gray-900 dark:text-gray-100 leading-none">
              ₹4.25 Cr
            </p>
            <p className="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+12.4% YoY Trust Surplus</span>
            </p>
          </div>
        </Card>

        <Card className="p-3.5 flex flex-col justify-between space-y-2 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
              Total Enrolled
            </span>
            <div className="p-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-500">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-base sm:text-lg font-black text-gray-900 dark:text-gray-100 leading-none">
              1,480 Students
            </p>
            <p className="text-[10px] font-bold text-purple-500 mt-1">
              100% Capacity Allocated
            </p>
          </div>
        </Card>

        <Card className="p-3.5 flex flex-col justify-between space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
              Fee Realization
            </span>
            <div className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-base sm:text-lg font-black text-gray-900 dark:text-gray-100 leading-none">
              94.2%
            </p>
            <p className="text-[10px] font-bold text-emerald-500 mt-1">
              ₹1.85 Cr Term 1 Revenue
            </p>
          </div>
        </Card>

        <Card className="p-3.5 flex flex-col justify-between space-y-2 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
              Board Rating
            </span>
            <div className="p-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-base sm:text-lg font-black text-gray-900 dark:text-gray-100 leading-none">
              A+ Rating
            </p>
            <p className="text-[10px] font-bold text-amber-500 mt-1">
              National Education Accreditation
            </p>
          </div>
        </Card>
      </div>

      {/* 3. Capital Budget Breakdown Bar */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#0494F4]" />
              <span>Trust Expenditure & Allocation</span>
            </h3>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
              Academic Year 2026-2027 Strategic Allocation
            </p>
          </div>
          <span className="text-xs font-black text-[#0494F4]">₹6.5 Cr Total Budget</span>
        </div>

        <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-[#2D2F31] overflow-hidden flex">
          <div className="h-full bg-[#0494F4]" style={{ width: '40%' }} title="Academic Infrastructure (40%)" />
          <div className="h-full bg-emerald-500" style={{ width: '30%' }} title="Faculty & Staff Payroll (30%)" />
          <div className="h-full bg-purple-500" style={{ width: '18%' }} title="Lab & Digital Tech (18%)" />
          <div className="h-full bg-amber-500" style={{ width: '12%' }} title="Reserve & Contingency (12%)" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 dark:text-gray-300">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0494F4]" />
            <span>Infrastructure (40%)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 dark:text-gray-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Staff Payroll (30%)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 dark:text-gray-300">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span>Digital Tech (18%)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 dark:text-gray-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Reserve Fund (12%)</span>
          </div>
        </div>
      </Card>

      {/* 4. Board Resolutions & Directives */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-[#0494F4]" />
            <span>Trustee Resolutions & Directives</span>
          </h3>
          <button
            onClick={() => showToast('CREATING NEW BOARD RESOLUTION', 'info')}
            className="text-[10px] font-black uppercase tracking-wider text-[#0494F4] hover:underline"
          >
            + New Directive
          </button>
        </div>

        <div className="space-y-2.5">
          {boardDirectives.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPolicyModal(item.title)}
              className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#2D2F31] border border-gray-200 dark:border-[#3C4043] hover:border-[#0494F4] transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-[#0494F4]">
                    {item.department}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400">
                    {item.date}
                  </span>
                </div>
                <h4 className="text-xs font-extrabold text-gray-900 dark:text-gray-100 truncate group-hover:text-[#0494F4] transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 text-[11px] font-black text-gray-600 dark:text-gray-300">
                  <span>Budget: {item.budget}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                    item.status === 'Approved'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                      : item.status === 'Under Review'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {item.status === 'Approved' ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  <span>{item.status}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0494F4] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Directive Detail Modal */}
      <Modal
        isOpen={!!selectedPolicyModal}
        onClose={() => setSelectedPolicyModal(null)}
        title="DIRECTIVE DETAILS"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#0494F4] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-gray-900 dark:text-gray-100 uppercase">
                {selectedPolicyModal}
              </h4>
              <p className="text-[11px] font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                Approved by the Executive Board of Trustees for implementation under Gothwad Education Center campus expansion guidelines.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-[#3C4043]">
              <span className="font-bold text-gray-400">Trust Oversight:</span>
              <span className="font-extrabold text-gray-900 dark:text-gray-100">Shri Suresh Gothwad</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-[#3C4043]">
              <span className="font-bold text-gray-400">Execution Lead:</span>
              <span className="font-extrabold text-gray-900 dark:text-gray-100">Dr. Rajesh Gothwad (Principal)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="font-bold text-gray-400">Compliance Code:</span>
              <span className="font-extrabold text-[#0494F4]">GET-2026-BD-88</span>
            </div>
          </div>

          <button
            onClick={() => {
              showToast('DIRECTIVE CONFIRMED BY MANAGEMENT', 'success');
              setSelectedPolicyModal(null);
            }}
            className="w-full h-11 rounded-2xl bg-[#0494F4] text-white font-black text-xs uppercase tracking-wider hover:bg-[#0378C6] transition-all"
          >
            CONFIRM TRUST APPROVAL
          </button>
        </div>
      </Modal>
    </div>
  );
};
