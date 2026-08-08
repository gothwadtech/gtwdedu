import React from 'react';
import { useSupabase } from '../../hooks/useSupabase';
import { formatCurrency } from '../../lib/utils';
import { Card } from '../../components/ui/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { BarChart3, TrendingUp, Users, CheckSquare, Award } from 'lucide-react';

export const Analytics: React.FC = () => {
  const { students, staff, attendance, reportCards, fees } = useSupabase();

  // Attendance Metrics Data
  const attendanceSummaryData = [
    { name: 'Grade 9', present: 94, absent: 6 },
    { name: 'Grade 10', present: 96, absent: 4 },
    { name: 'Grade 11', present: 92, absent: 8 },
    { name: 'Grade 12', present: 95, absent: 5 },
  ];

  // Grade Distribution Data
  const gradeDistributionData = [
    { grade: 'A1 (90-100%)', count: 42, color: '#0494F4' },
    { grade: 'A2 (80-89%)', count: 35, color: '#10B981' },
    { grade: 'B1 (70-79%)', count: 20, color: '#F59E0B' },
    { grade: 'B2 (60-69%)', count: 12, color: '#6366F1' },
    { grade: 'C (Below 60%)', count: 5, color: '#EF4444' },
  ];

  // Fee Collection Trend
  const feeTrendData = [
    { month: 'Apr', collected: 2800000 },
    { month: 'May', collected: 1400000 },
    { month: 'Jun', collected: 900000 },
    { month: 'Jul', collected: 2100000 },
    { month: 'Aug', collected: 3200000 },
  ];

  return (
    <div className="space-y-4">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#0494F4]/10 text-[#0494F4]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Total Enrolled</p>
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">{students.length} Students</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Avg Attendance</p>
            <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">95.4%</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Class GPA Avg</p>
            <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400">8.9 / 10</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Faculty Count</p>
            <h4 className="text-lg font-bold text-purple-600 dark:text-purple-400">{staff.length} Teachers</h4>
          </div>
        </Card>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance Bar Chart */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#0494F4]" />
              Grade-wise Attendance Rate (%)
            </h3>
            <span className="text-[10px] text-gray-400 font-semibold uppercase">August 2026</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceSummaryData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#2D2F31', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Bar dataKey="present" fill="#0494F4" radius={[6, 6, 0, 0]} name="Present %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Academic Performance Distribution */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              Mid-Term Academic Grade Spectrum
            </h3>
            <span className="text-[10px] text-gray-400 font-semibold uppercase">All Classes</span>
          </div>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="grade"
                >
                  {gradeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#2D2F31', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            {gradeDistributionData.map((g) => (
              <div key={g.grade} className="flex items-center gap-1.5 text-[11px] font-medium text-gray-600 dark:text-gray-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                <span>{g.grade} ({g.count})</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Fee Collection Trend */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            Monthly School Fee Collection Trend (2026)
          </h3>
          <span className="text-xs font-bold text-[#0494F4]">INR (₹)</span>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={feeTrendData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" stroke="#888888" fontSize={11} />
              <YAxis stroke="#888888" fontSize={11} tickFormatter={(v) => `₹${v / 100000}L`} />
              <Tooltip
                formatter={(val: any) => formatCurrency(Number(val))}
                contentStyle={{ backgroundColor: '#2D2F31', borderRadius: '12px', border: 'none', color: '#fff' }}
              />
              <Line type="monotone" dataKey="collected" stroke="#0494F4" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
