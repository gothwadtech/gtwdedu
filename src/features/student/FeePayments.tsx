import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useSupabase } from '../../hooks/useSupabase';
import { useToastContext } from '../../context/ToastContext';
import { formatCurrency, formatDate } from '../../lib/utils';
import { CreditCard, CheckCircle2, Download, ShieldCheck, Lock, QrCode, ArrowRight, Printer } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { FeePayment } from '../../types';

export const FeePayments: React.FC = () => {
  const { user } = useAuth();
  const { fees, students, store } = useSupabase();
  const { showToast } = useToastContext();

  const currentStudent = students.find((s) => s.id === user?.student_id) || students[0];
  const myFees = fees.filter((f) => f.student_id === currentStudent?.id || f.student_name.includes('Aarav'));

  const [payingFee, setPayingFee] = useState<FeePayment | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'Card' | 'NetBanking'>('UPI');
  const [viewingReceipt, setViewingReceipt] = useState<FeePayment | null>(null);

  const handleConfirmPay = () => {
    if (!payingFee) return;
    store.payFee(payingFee.id, selectedMethod);
    showToast(`Payment of ${formatCurrency(payingFee.amount_due)} successful via ${selectedMethod}! Receipt generated.`, 'success');
    setPayingFee(null);
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#2D2F31]">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#0494F4]" />
            Fee Statements & Online Payments
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Pay school tuition, lab, & transportation charges online securely. Download instant digital receipts.
          </p>
        </div>
      </Card>

      {/* Fee List */}
      <div className="space-y-3">
        {myFees.map((f) => {
          const isPaid = f.payment_status === 'paid';
          return (
            <Card key={f.id} className="relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-gray-900 dark:text-gray-100">{f.title}</span>
                    <Badge status={f.payment_status}>{f.payment_status}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Academic Term • Due Date: {formatDate(f.due_date)}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase">Total Amount</p>
                    <p className="text-lg font-black text-gray-900 dark:text-gray-100">{formatCurrency(f.amount_due)}</p>
                  </div>

                  {isPaid ? (
                    <Button size="sm" variant="outline" onClick={() => setViewingReceipt(f)} icon={<Download className="w-4 h-4" />}>
                      Receipt
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => setPayingFee(f)} icon={<Lock className="w-4 h-4" />}>
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>

              {isPaid && f.receipt_no && (
                <div className="mt-3 pt-2 border-t border-dashed border-[#E0E0E0] dark:border-[#3C4043] flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Receipt: {f.receipt_no}
                  </span>
                  <span>Paid on: {f.paid_at}</span>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Interactive Pay Modal */}
      <Modal isOpen={!!payingFee} onClose={() => setPayingFee(null)} title="Instant Fee Payment Gateway">
        {payingFee && (
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 dark:bg-[#202124] rounded-2xl border border-[#E0E0E0] dark:border-[#3C4043] space-y-1 text-xs">
              <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100">
                <span>{payingFee.title}</span>
                <span>{formatCurrency(payingFee.amount_due)}</span>
              </div>
              <p className="text-gray-500">Student: {payingFee.student_name} ({payingFee.class_name})</p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-2">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['UPI', 'Card', 'NetBanking'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMethod(m)}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${
                      selectedMethod === m
                        ? 'bg-[#0494F4]/10 border-[#0494F4] text-[#0494F4]'
                        : 'border-[#E0E0E0] dark:border-[#3C4043] text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {selectedMethod === 'UPI' && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 text-center space-y-2">
                <QrCode className="w-12 h-12 text-[#0494F4] mx-auto" />
                <p className="text-xs font-bold text-blue-900 dark:text-blue-200">Scan QR or enter VPA ID</p>
                <input
                  type="text"
                  placeholder="e.g. gpay@upi"
                  defaultValue="student@okicici"
                  className="w-full bg-white dark:bg-[#202124] text-xs p-2 rounded-xl border border-blue-200 dark:border-blue-800 text-center font-bold"
                />
              </div>
            )}

            <Button onClick={handleConfirmPay} fullWidth icon={<ArrowRight className="w-4 h-4" />}>
              Authorize & Pay {formatCurrency(payingFee.amount_due)}
            </Button>
          </div>
        )}
      </Modal>

      {/* Printable Digital Receipt Modal */}
      <Modal isOpen={!!viewingReceipt} onClose={() => setViewingReceipt(null)} title="Official Fee Receipt">
        {viewingReceipt && (
          <div className="p-4 bg-white dark:bg-[#202124] rounded-2xl border border-[#E0E0E0] dark:border-[#3C4043] space-y-4">
            <div className="text-center border-b border-[#E0E0E0] dark:border-[#3C4043] pb-3">
              <h3 className="font-extrabold text-base text-gray-900 dark:text-gray-100">GOTHWAD EDUCATION CAMPUS</h3>
              <p className="text-[10px] text-gray-500">Official Fee Counter • Receipt #{viewingReceipt.receipt_no}</p>
            </div>

            <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Student Name:</span> <strong className="text-gray-900 dark:text-gray-100">{viewingReceipt.student_name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Class / Grade:</span> <strong>{viewingReceipt.class_name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span> <strong>{viewingReceipt.payment_method}</strong>
              </div>
              <div className="flex justify-between">
                <span>Transaction Ref:</span> <strong className="truncate max-w-[180px]">{viewingReceipt.transaction_id}</strong>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span> <strong>{viewingReceipt.paid_at}</strong>
              </div>
            </div>

            <div className="p-3 bg-[#0494F4]/10 rounded-xl flex justify-between font-extrabold text-sm text-[#0494F4]">
              <span>Amount Received:</span>
              <span>{formatCurrency(viewingReceipt.amount_paid)}</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                size="sm"
                onClick={() => {
                  window.print();
                }}
                icon={<Printer className="w-3.5 h-3.5" />}
              >
                Print / Save PDF
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
