import React, { useState } from 'react';
import { useToastContext } from '../../context/ToastContext';
import { CheckCircle2, XCircle, Search, Bell } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';

export const MyAttendance: React.FC = () => {
  const { showToast } = useToastContext();

  const [activeTab, setActiveTab] = useState<'attendance' | 'leave'>('attendance');
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveData, setLeaveData] = useState({
    fromDate: new Date().toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0],
    reason: '',
  });

  const totalDays = 288;
  const presentDays = 122;
  const absentDays = 14;

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveData.reason) {
      showToast('Please state the reason for leave', 'warning');
      return;
    }
    showToast(`Leave application submitted for ${leaveData.fromDate} to ${leaveData.toDate}. Pending approval.`, 'success');
    setShowLeaveModal(false);
    setLeaveData({
      fromDate: new Date().toISOString().split('T')[0],
      toDate: new Date().toISOString().split('T')[0],
      reason: '',
    });
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-6 animate-fade-in">
      {/* Top Header Card matching Screenshot 2 */}
      <Card className="p-4 bg-white dark:bg-[#202124] border border-gray-100 dark:border-[#3C4043] rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0494F4] text-white flex items-center justify-center font-black text-xs">
              GE
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900 dark:text-gray-100 leading-tight">SHRI EDUCARE</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Attendance Register</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2D2F31]">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2D2F31] relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#0494F4]" />
            </button>
            <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation: School Attendance vs Leave History */}
        <div className="flex items-center border-b border-gray-100 dark:border-[#3C4043]">
          <button
            onClick={() => setActiveTab('attendance')}
            className={`pb-2 px-4 text-xs font-black transition-all border-b-2 ${
              activeTab === 'attendance'
                ? 'border-[#0494F4] text-[#0494F4]'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            School Attendance
          </button>
          <button
            onClick={() => setActiveTab('leave')}
            className={`pb-2 px-4 text-xs font-black transition-all border-b-2 ${
              activeTab === 'leave'
                ? 'border-[#0494F4] text-[#0494F4]'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Leave History
          </button>
        </div>
      </Card>

      {activeTab === 'attendance' ? (
        <>
          {/* Today's Status */}
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-black text-gray-900 dark:text-gray-100">Today's Attendance</span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-500">
              PRESENT <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Analytics Gauge Card matching Screenshot 2 */}
          <Card className="p-6 bg-white dark:bg-[#202124] border border-gray-100 dark:border-[#3C4043] rounded-3xl shadow-sm text-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-gray-900 dark:text-gray-100">Analytics</span>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#2D2F31] p-0.5 rounded-full text-[10px] font-bold">
                <button
                  onClick={() => setViewMode('yearly')}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    viewMode === 'yearly' ? 'bg-[#0494F4] text-white shadow-sm' : 'text-gray-500'
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => setViewMode('monthly')}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    viewMode === 'monthly' ? 'bg-[#0494F4] text-white shadow-sm' : 'text-gray-500'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Circular Gauge 80% */}
            <div className="relative w-40 h-40 mx-auto my-2 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-100 dark:text-gray-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500"
                  strokeDasharray="80, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-gray-900 dark:text-gray-100">80%</span>
                <span className="text-[10px] font-bold text-gray-400">Average Attendance</span>
              </div>
            </div>

            {/* Floating Metric 3-Card Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-[#3C4043] mt-4">
              <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 text-center">
                <div className="w-6 h-6 rounded-full border-2 border-sky-400 mx-auto mb-1" />
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400">Total Days</p>
                <p className="text-base font-black text-gray-900 dark:text-gray-100 mt-0.5">{totalDays}</p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-center">
                <div className="w-6 h-6 rounded-full border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400">Present</p>
                <p className="text-base font-black text-gray-900 dark:text-gray-100 mt-0.5">{presentDays}</p>
              </div>

              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-center">
                <div className="w-6 h-6 rounded-full border-2 border-rose-500 text-rose-500 flex items-center justify-center mx-auto mb-1">
                  <XCircle className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400">Absent</p>
                <p className="text-base font-black text-gray-900 dark:text-gray-100 mt-0.5">{absentDays}</p>
              </div>
            </div>
          </Card>

          {/* Bar Chart Section */}
          <Card className="p-5 bg-white dark:bg-[#202124] border border-gray-100 dark:border-[#3C4043] rounded-3xl shadow-sm">
            <h3 className="text-xs font-black text-gray-900 dark:text-gray-100 mb-4">Attendance Percentage</h3>
            <div className="h-40 flex items-end justify-between gap-3 pt-6 px-2">
              {[
                { month: 'Apr', pct: 85 },
                { month: 'May', pct: 90 },
                { month: 'Jun', pct: 75 },
                { month: 'Jul', pct: 88 },
                { month: 'Aug', pct: 95 },
              ].map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div
                    style={{ height: `${m.pct}%` }}
                    className="w-full max-w-[28px] bg-[#0494F4] rounded-t-lg transition-all hover:opacity-80"
                  />
                  <span className="text-[10px] font-bold text-gray-400">{m.month}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      ) : (
        /* Leave History Tab */
        <Card className="p-5 bg-white dark:bg-[#202124] border border-gray-100 dark:border-[#3C4043] rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">Leave Applications</h3>
            <Button onClick={() => setShowLeaveModal(true)} size="sm">
              Apply New Leave
            </Button>
          </div>

          <div className="space-y-2.5">
            {[
              { dates: '12 Aug 2026 - 14 Aug 2026', reason: 'Fever and viral infection', status: 'Approved' },
              { dates: '02 Jul 2026 - 02 Jul 2026', reason: 'Family medical emergency', status: 'Approved' },
            ].map((l, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#2D2F31] border border-gray-100 dark:border-[#3C4043] flex items-center justify-between">
                <div>
                  <p className="text-xs font-extrabold text-gray-900 dark:text-gray-100">{l.dates}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{l.reason}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-500">
                  {l.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Leave Modal */}
      <Modal isOpen={showLeaveModal} onClose={() => setShowLeaveModal(false)} title="Submit Online Leave Request">
        <form onSubmit={handleApplyLeave} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="From Date"
              type="date"
              required
              value={leaveData.fromDate}
              onChange={(e) => setLeaveData({ ...leaveData, fromDate: e.target.value })}
            />
            <Input
              label="To Date"
              type="date"
              required
              value={leaveData.toDate}
              onChange={(e) => setLeaveData({ ...leaveData, toDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
              Reason for Absence
            </label>
            <textarea
              required
              rows={3}
              placeholder="Provide reason (medical, family event, etc)..."
              value={leaveData.reason}
              onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
              className="w-full bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl p-3 text-sm focus:border-[#0494F4] focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E0E0E0] dark:border-[#3C4043]">
            <Button type="button" variant="outline" onClick={() => setShowLeaveModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Leave Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
