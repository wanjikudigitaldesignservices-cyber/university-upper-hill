import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Enrollment } from '../../types';
import {
  GraduationCap,
  Save,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Users,
} from 'lucide-react';

export const GradeEntryPage: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [gradesInput, setGradesInput] = useState<{ [id: string]: { marks: number; grade: string } }>({});
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    const load = async () => {
      const enrs = await api.getEnrollments();
      setEnrollments(enrs);

      // Pre-fill input map
      const initial: any = {};
      enrs.forEach((e) => {
        initial[e.id] = { marks: e.marks || 70, grade: e.grade || 'B' };
      });
      setGradesInput(initial);
    };
    load();
  }, []);

  const calculateGrade = (marks: number): string => {
    if (marks >= 80) return 'A';
    if (marks >= 75) return 'A-';
    if (marks >= 70) return 'B+';
    if (marks >= 65) return 'B';
    if (marks >= 60) return 'B-';
    if (marks >= 55) return 'C+';
    if (marks >= 50) return 'C';
    if (marks >= 40) return 'D';
    return 'F';
  };

  const handleMarksChange = (id: string, marks: number) => {
    const grade = calculateGrade(marks);
    setGradesInput((prev) => ({
      ...prev,
      [id]: { marks, grade },
    }));
  };

  const handleSaveAll = async () => {
    for (const enr of enrollments) {
      const input = gradesInput[enr.id];
      if (input) {
        await api.submitGrade(enr.id, input.grade, input.marks);
      }
    }
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
              Academic Microservice
            </span>
            <span className="text-xs text-slate-500 font-semibold">• Faculty Write / Student Read-Only (Layer 2)</span>
          </div>
          <h2 className="text-xl font-bold text-navy-950 mt-1">Continuous Assessment & Grade Entry Roster</h2>
          <p className="text-xs text-slate-500">
            Submit final marks for verification before transcript synchronization.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Commit All Grades</span>
        </button>
      </div>

      {savedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Grades saved and published to academic microservice successfully!</span>
        </div>
      )}

      {/* Roster Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-navy-950">Active Class Roster</h3>
          <span className="text-xs text-slate-400 font-medium">Department: Computing & Informatics</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="py-3.5 px-4">Student Reg Number</th>
                <th className="py-3.5 px-4">Course Unit</th>
                <th className="py-3.5 px-4">Academic Year</th>
                <th className="py-3.5 px-4">Continuous Assessment (Marks %)</th>
                <th className="py-3.5 px-4">Calculated Grade</th>
                <th className="py-3.5 px-4 text-right">Commit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {enrollments.map((enr) => {
                const currentInput = gradesInput[enr.id] || { marks: 70, grade: 'B' };

                return (
                  <tr key={enr.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      COM/0042/2023
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      <span className="font-bold font-mono text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded mr-2">
                        {enr.course?.code || 'CSC 211'}
                      </span>
                      {enr.course?.name || 'Data Structures'}
                    </td>
                    <td className="py-3.5 px-4">{enr.academic_year}</td>
                    <td className="py-3.5 px-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={currentInput.marks}
                        onChange={(e) => handleMarksChange(enr.id, Number(e.target.value))}
                        className="w-20 px-2.5 py-1 text-xs font-bold font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-900 font-bold font-mono text-xs">
                        {currentInput.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={async () => {
                          await api.submitGrade(enr.id, currentInput.grade, currentInput.marks);
                          setSavedMessage(true);
                          setTimeout(() => setSavedMessage(false), 2000);
                        }}
                        className="px-3 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-lg text-xs font-bold transition"
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
