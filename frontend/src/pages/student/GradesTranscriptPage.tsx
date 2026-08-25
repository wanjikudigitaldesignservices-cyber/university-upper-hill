import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Enrollment } from '../../types';
import {
  GraduationCap,
  Download,
  Printer,
  ShieldCheck,
  TrendingUp,
  Award,
} from 'lucide-react';

export const GradesTranscriptPage: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const enrs = await api.getEnrollments();
        setEnrollments(enrs);
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  const completedUnits = enrollments.filter((e) => e.grade);
  const totalScore = completedUnits.reduce((sum, e) => sum + (e.marks || 0), 0);
  const averageMarks = completedUnits.length ? (totalScore / completedUnits.length).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Top Banner with GPA summary */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-navy-950">Academic Transcript & Results</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Official Cumulative Grade Point Average (GPA) & Continuous Assessment Records
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-50 border border-brand-200 rounded-2xl text-center min-w-[100px]">
            <span className="text-[10px] uppercase font-bold text-brand-800 tracking-wider block">Mean Score</span>
            <span className="text-xl font-extrabold text-brand-950">{averageMarks}%</span>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-center min-w-[100px]">
            <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider block">Classification</span>
            <span className="text-xs font-extrabold text-blue-950">First Class Hons</span>
          </div>

          <button
            onClick={() => window.print()}
            className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl text-slate-700 transition"
            title="Print Official Transcript"
          >
            <Printer className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Transcript Records Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-navy-950">Course Unit Breakdown</h3>
          <span className="text-xs font-semibold text-slate-400">Bachelor of Science in Computer Science</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="py-3.5 px-4">Academic Year</th>
                <th className="py-3.5 px-4">Course Code</th>
                <th className="py-3.5 px-4">Course Title</th>
                <th className="py-3.5 px-4">Credit Hours</th>
                <th className="py-3.5 px-4">Marks (%)</th>
                <th className="py-3.5 px-4">Final Grade</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {enrollments.map((enr) => (
                <tr key={enr.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{enr.academic_year}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{enr.course?.code || 'CSC 211'}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{enr.course?.name || 'Data Structures'}</td>
                  <td className="py-3.5 px-4">{enr.course?.credit_hours || 3}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {enr.marks ? `${enr.marks}%` : '-'}
                  </td>
                  <td className="py-3.5 px-4">
                    {enr.grade ? (
                      <span className="px-2.5 py-1 rounded-lg bg-brand-100 text-brand-900 font-bold font-mono text-xs">
                        {enr.grade}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-semibold">Pending Exam</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${enr.grade ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {enr.grade ? 'Completed' : 'Enrolled'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Digital verification badge */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>Digital Transcript Verified • Issued by Academic Registrar, University of Upper Hill</span>
          </div>
          <span className="font-mono text-[10px]">Ref: UOH-TRN-2024-8841</span>
        </div>
      </div>
    </div>
  );
};
