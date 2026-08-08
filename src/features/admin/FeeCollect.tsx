import React, { useState } from 'react';
import { useSupabase } from '../../hooks/useSupabase';
import { useToastContext } from '../../context/ToastContext';
import { formatCurrency, formatDate } from '../../lib/utils';
import { CreditCard, Plus, Search, CheckCircle2, Clock, AlertTriangle, FileText, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { CLASSES_LIST } from '../../config/constants';

export const FeeCollect: React.FC = () => {
  const { fees, students, store } = useSupabase();
  const { showToast } = useToastContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'partially_paid'>('all');
  const [showIssueModal, setShowIssueModal] = useState(false);

  const [formData, setFormData] = useState({
    student_id: students[0]?.id || 'st-1',
    title: 'Term 2 Tuition & Activity Charges',
    amount_due: 25000,
    due_date: '2026-09-30',
  });

  const totalCollected = fees
    .filter((f) => f.payment_status === 'paid')
    .reduce((acc, f) => acc + f.amount_paid, 0);

  const totalPending = fees
    .filter((f) => f.payment_status !== 'paid')
    .reduce((acc, f) => acc + (f.amount_due - f.amount_paid), 0);

  const filteredFees = fees.filter((f) => {
    const matchesSearch =
      f.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.class_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.receipt_no && f.receipt_no.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || f.payment_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleIssueDemand = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find((s) => s.id === formData.student_id) || students[0];
    if (!st) return;

    store.addFeeRecord({
      student_id: st.id,
      student_name: `${st.first_name} ${st.last_name}`,
      class_name: st.class_name,
      fee_structure_id: `fs-${Date.now()}`,
      title: formData.title,
      amount_due: Number(formData.amount_due),
      amount_paid: 0,
      discount: 0,
      payment_status: 'pending',
      due_date: formData.due_date,
    });

    showToast(`Fee demand issued to ${st.first_name} ${st.last_name}`, 'success');
    setShowIssueModal(false);
  };

  const handlePrintReceipt = (receiptNo: string, studentName: string) => {
    showToast(`Downloading official PDF receipt ${receiptNo} for ${studentName}...`, 'info');
  };

  return (
    <div className="space-y-4">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="bg-[#0494F4]/5 border-[#0494F4]/20 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[#0494F4] text-white">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Fees Collected</p>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">{formatCurrency(totalCollected)}</h3>
          </div>
        </Card>

        <Card className="bg-amber-500/5 border-amber-500/20 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-500 text-white">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Pending Dues</p>
            <h3 className="text-xl font-extrabold text-amber-600 dark:text-amber-400">{formatCurrency(totalPending)}</h3>
          </div>
        </Card>

        <Card className="bg-emerald-500/5 border-emerald-500/20 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500 text-white">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Active Receipts</p>
            <h3 className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {fees.filter((f) => f.payment_status === 'paid').length} Processed
            </h3>
          </div>
        </Card>
      </div>

      {/* Actions and Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#2D2F31] p-3 rounded-2xl border border-[#E0E0E0] dark:border-[#3C4043]">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search student or receipt no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="w-full sm:w-64"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl px-3 py-2 text-xs font-semibold"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="partially_paid">Partially Paid</option>
          </select>
        </div>
        <Button onClick={() => setShowIssueModal(true)} icon={<Plus className="w-4 h-4" />}>
          Issue Fee Demand
        </Button>
      </div>

      {/* Fee Table */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-[#202124] text-gray-700 dark:text-gray-300 uppercase text-[10px] font-bold border-b border-[#E0E0E0] dark:border-[#3C4043]">
              <tr>
                <th className="px-4 py-3">Student & Class</th>
                <th className="px-4 py-3">Fee Title</th>
                <th className="px-4 py-3">Amount Due</th>
                <th className="px-4 py-3">Paid / Status</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3 text-right">Receipt / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E0E0] dark:divide-[#3C4043]">
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50 dark:hover:bg-[#202124]/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-gray-900 dark:text-gray-100">
                    <div>{fee.student_name}</div>
                    <div className="text-[10px] text-[#0494F4] font-semibold">{fee.class_name}</div>
                  </td>
                  <td className="px-4 py-3">{fee.title}</td>
                  <td className="px-4 py-3 font-extrabold text-gray-900 dark:text-gray-100">
                    {formatCurrency(fee.amount_due)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge status={fee.payment_status}>{fee.payment_status.replace('_', ' ')}</Badge>
                  </td>
                  <td className="px-4 py-3">{formatDate(fee.due_date)}</td>
                  <td className="px-4 py-3 text-right">
                    {fee.payment_status === 'paid' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePrintReceipt(fee.receipt_no || 'REC-001', fee.student_name)}
                        icon={<Download className="w-3.5 h-3.5" />}
                      >
                        Receipt
                      </Button>
                    ) : (
                      <span className="text-[11px] font-medium text-amber-500">Awaiting Pay</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Issue Modal */}
      <Modal isOpen={showIssueModal} onClose={() => setShowIssueModal(false)} title="Issue New Fee Demand">
        <form onSubmit={handleIssueDemand} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
              Select Student
            </label>
            <select
              value={formData.student_id}
              onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
              className="w-full bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl px-3 py-2 text-sm"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.first_name} {s.last_name} ({s.class_name} - Roll #{s.roll_number})
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Fee Demand Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Amount (INR ₹)"
              type="number"
              required
              value={formData.amount_due}
              onChange={(e) => setFormData({ ...formData, amount_due: Number(e.target.value) })}
            />
            <Input
              label="Due Date"
              type="date"
              required
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E0E0E0] dark:border-[#3C4043]">
            <Button type="button" variant="outline" onClick={() => setShowIssueModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Issue Demand Notice</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
