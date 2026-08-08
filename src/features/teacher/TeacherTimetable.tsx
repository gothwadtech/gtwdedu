import React, { useState } from 'react';
import { INITIAL_TIMETABLE } from '../../lib/mockData';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Card } from '../../components/ui/Card';

export const TeacherTimetable: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

  const daySlots = INITIAL_TIMETABLE.filter((t) => t.day === selectedDay);

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#2D2F31]">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#0494F4]" />
            Faculty Daily Class Schedule
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Assigned lecture periods, classroom numbers, and subject streams.
          </p>
        </div>
      </Card>

      {/* Day Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border ${
              selectedDay === d
                ? 'bg-[#0494F4] text-white border-[#0494F4] shadow-sm'
                : 'bg-white dark:bg-[#2D2F31] border-[#E0E0E0] dark:border-[#3C4043] text-gray-600 dark:text-gray-300 hover:border-[#0494F4]'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Slots List */}
      <div className="space-y-2.5">
        {daySlots.length === 0 ? (
          <Card className="text-center py-8 text-xs text-gray-400">
            No active periods scheduled for {selectedDay}. Enjoy your planning block!
          </Card>
        ) : (
          daySlots.map((slot) => (
            <Card key={slot.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0494F4]/10 text-[#0494F4] font-black text-sm flex items-center justify-center shrink-0">
                  P-{slot.period}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">{slot.subject}</h3>
                  <p className="text-xs font-semibold text-[#0494F4]">{slot.class_name}</p>
                </div>
              </div>

              <div className="text-right text-xs space-y-1">
                <div className="flex items-center justify-end gap-1 font-bold text-gray-700 dark:text-gray-200">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>
                    {slot.time_start} - {slot.time_end}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1 text-gray-500 dark:text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{slot.room_number}</span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
