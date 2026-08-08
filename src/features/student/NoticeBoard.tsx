import React, { useState } from 'react';
import { useSupabase } from '../../hooks/useSupabase';
import { formatDate } from '../../lib/utils';
import { Megaphone, Pin, Calendar, User } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const NoticeBoard: React.FC = () => {
  const { notices } = useSupabase();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredNotices = notices.filter(
    (n) => categoryFilter === 'all' || n.category === categoryFilter
  );

  return (
    <div className="space-y-4">
      {/* Banner */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#2D2F31]">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-[#0494F4]" />
            Official School Circulars & Bulletins
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Official announcements, examination date-sheets, holiday lists, and event notifications.
          </p>
        </div>
      </Card>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {['all', 'academic', 'event', 'exam', 'urgent', 'general'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
              categoryFilter === cat
                ? 'bg-[#0494F4] text-white border-[#0494F4]'
                : 'bg-white dark:bg-[#2D2F31] border-[#E0E0E0] dark:border-[#3C4043] text-gray-600 dark:text-gray-300 hover:border-[#0494F4]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notices Stream */}
      <div className="space-y-3">
        {filteredNotices.map((not) => (
          <Card key={not.id} className="relative">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                {not.is_pinned && <Pin className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />}
                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">{not.title}</h3>
              </div>
              <Badge status={not.category === 'urgent' ? 'absent' : 'present'}>{not.category}</Badge>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3">{not.content}</p>

            <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 pt-2 border-t border-[#E0E0E0] dark:border-[#3C4043]">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Issued By: {not.posted_by}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {formatDate(not.posted_at)}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
