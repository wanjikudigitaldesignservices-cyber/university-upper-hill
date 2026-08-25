import React, { useState } from 'react';
import {
  Users,
  Search,
  BookOpen,
  Building,
  Mail,
  Phone,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';

export const StudentDirectoryPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const students = [
    { name: 'Brian Kiprono', reg: 'COM/0042/2023', dept: 'Computer Science', year: 'Year 2', email: 'brian.kiprono@student.upperhill.ac.ke', feeStatus: 'Cleared (100%)', gpa: '3.82' },
    { name: 'Faith Wambui', reg: 'MED/0110/2022', dept: 'Clinical Medicine', year: 'Year 3', email: 'faith.wambui@student.upperhill.ac.ke', feeStatus: 'Cleared (100%)', gpa: '3.91' },
    { name: 'Emmanuel Korir', reg: 'ENG/0204/2023', dept: 'Electrical Engineering', year: 'Year 2', email: 'emmanuel.korir@student.upperhill.ac.ke', feeStatus: 'Partial (75%)', gpa: '3.45' },
    { name: 'Mercy Achieng', reg: 'BCOM/0312/2021', dept: 'Finance & Accounting', year: 'Year 4', email: 'mercy.achieng@student.upperhill.ac.ke', feeStatus: 'Cleared (100%)', gpa: '3.67' },
    { name: 'Kevin Mutiso', reg: 'AGR/0091/2024', dept: 'Agribusiness', year: 'Year 1', email: 'kevin.mutiso@student.upperhill.ac.ke', feeStatus: 'Pending (30%)', gpa: '3.20' },
  ];

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.reg.toLowerCase().includes(search.toLowerCase()) ||
      s.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-950">Student Academic Directory</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-service student lookup with exam clearance and GPA verification
          </p>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, reg number, department..."
            className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Reg Number</th>
                <th className="py-3.5 px-4">Department & Level</th>
                <th className="py-3.5 px-4">Cumulative GPA</th>
                <th className="py-3.5 px-4">Jiunge Fee Clearance</th>
                <th className="py-3.5 px-4 text-right">Institutional Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filtered.map((st, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{st.name}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-900 bg-blue-50/50 rounded">{st.reg}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{st.dept} ({st.year})</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900 font-mono">{st.gpa}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${st.feeStatus.includes('Cleared') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {st.feeStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[11px] text-slate-500">{st.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
