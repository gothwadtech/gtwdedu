import React from 'react';
import { APP_INFO } from '../config/constants';
import { Phone, Mail, MapPin, Clock, X, Headset, MessageSquare } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#202124] text-gray-900 dark:text-gray-100 w-full max-w-md rounded-3xl border border-gray-200 dark:border-[#3C4043] shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-[#0494F4] to-[#0378C6] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
              <Headset className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-snug">Help & Support Desk</h3>
              <p className="text-xs text-white/80">{APP_INFO.name} Support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact Info List */}
        <div className="p-6 space-y-4">
          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#2D2F31] border border-gray-100 dark:border-[#3C4043] flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#0494F4]/10 text-[#0494F4] shrink-0 mt-0.5">
              <Phone className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Helpline Phone</p>
              <p className="text-sm font-extrabold text-gray-900 dark:text-gray-100">{APP_INFO.phone}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#2D2F31] border border-gray-100 dark:border-[#3C4043] flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#0494F4]/10 text-[#0494F4] shrink-0 mt-0.5">
              <Mail className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Official Email</p>
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100 break-all">{APP_INFO.supportEmail}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#2D2F31] border border-gray-100 dark:border-[#3C4043] flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#0494F4]/10 text-[#0494F4] shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Campus Address</p>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">{APP_INFO.address}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#2D2F31] border border-gray-100 dark:border-[#3C4043] flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#0494F4]/10 text-[#0494F4] shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Desk Hours</p>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Monday - Saturday: 8:00 AM - 5:00 PM IST</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <a
              href={`tel:${APP_INFO.phone}`}
              className="py-3 px-4 rounded-xl bg-[#0494F4] hover:bg-[#0378C6] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 text-center"
            >
              <Phone className="w-4 h-4" />
              Call Support
            </a>
            <a
              href={`mailto:${APP_INFO.supportEmail}`}
              className="py-3 px-4 rounded-xl bg-gray-100 dark:bg-[#2D2F31] hover:bg-gray-200 dark:hover:bg-[#3C4043] text-gray-800 dark:text-gray-200 font-bold text-xs flex items-center justify-center gap-2 transition-all text-center"
            >
              <MessageSquare className="w-4 h-4" />
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
