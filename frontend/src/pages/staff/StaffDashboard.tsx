import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Allocated Courses</span>
          <div className="text-3xl font-extrabold text-navy-950">3 Units</div>
          <p className="text-xs text-slate-500">CSC 211, CSC 214, CSC 222</p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Enrolled Scholars</span>
          <div className="text-3xl font-extrabold text-blue-700">184 Students</div>
          <p className="text-xs text-slate-500">Computer Science & IT Cohorts</p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Grading Status</span>
          <div className="text-3xl font-extrabold text-amber-600">82% Graded</div>
          <p className="text-xs text-slate-500">Continuous Assessments Uploaded</p>
        </div>
      </div>

      {/* Assigned Lecture Units */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-navy-950">Teaching Timetable & Class Rosters</h3>
            <p className="text-xs text-slate-500">Assigned lecture halls and student cohorts</p>
          </div>
          <Link
            to="/staff/grades"
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Open Grade Entry</span>
          </Link>
        </div>

        <div className="space-y-3">
          {[
            { code: 'CSC 211', title: 'Data Structures & Algorithms', time: 'Monday 08:00 - 11:00 AM', hall: 'Science Complex LT-03', count: 68 },
            { code: 'CSC 214', title: 'Computer Networks & Security', time: 'Wednesday 14:00 - 17:00 PM', hall: 'Tech Lab 4', count: 56 },
            { code: 'CSC 222', title: 'Web Applications Development', time: 'Thursday 11:00 - 14:00 PM', hall: 'Innovation Hub LH-1', count: 60 },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                    {item.code}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {item.time}</span>
                  <span>•</span>
                  <span>{item.hall}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                  {item.count} Registered
                </span>
                <Link
                  to="/staff/grades"
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <span>Grades</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
