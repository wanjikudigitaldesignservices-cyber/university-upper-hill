import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  GraduationCap,
  Building,
  Search,
  Users,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const SchoolsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const schools = [
    {
      name: 'School of Computing & Informatics',
      dean: 'Prof. Dennis Mwangi, PhD',
      departments: [
        { name: 'Department of Computer Science', programs: ['BSc. Computer Science', 'MSc. Artificial Intelligence', 'PhD Computer Science'] },
        { name: 'Department of Information Technology', programs: ['BSc. Business Information Technology', 'BSc. Cyber Security & Forensics'] },
        { name: 'Department of Software Engineering', programs: ['BSc. Software Engineering', 'Diploma in Web & Mobile Apps'] },
      ],
      students: '1,850+',
      icon: '💻',
    },
    {
      name: 'School of Health Sciences & Medicine',
      dean: 'Dr. Sarah Chebet, MBChB, MMed',
      departments: [
        { name: 'Department of Clinical Medicine', programs: ['Bachelor of Medicine & Surgery (MBChB)', 'BSc. Clinical Medicine'] },
        { name: 'Department of Nursing Sciences', programs: ['BSc. Nursing (Direct & Upgrading)', 'MSc. Critical Care Nursing'] },
        { name: 'Department of Public Health & Epidemiology', programs: ['BSc. Public Health', 'Master of Public Health (MPH)'] },
      ],
      students: '2,400+',
      icon: '🩺',
    },
    {
      name: 'School of Business & Economics',
      dean: 'Prof. James Ochieng, PhD, CPA(K)',
      departments: [
        { name: 'Department of Accounting & Finance', programs: ['Bachelor of Commerce (BCom)', 'BSc. Actuarial Science', 'Master of Finance'] },
        { name: 'Department of Management & Entrepreneurship', programs: ['Bachelor of Business Administration (BBA)', 'MBA (Executive)'] },
        { name: 'Department of Economics & Econometrics', programs: ['BSc. Economics & Statistics', 'MSc. Applied Economics'] },
      ],
      students: '3,200+',
      icon: '📊',
    },
    {
      name: 'School of Engineering & Architecture',
      dean: 'Eng. Prof. Peter Kamau, PE, FIEK',
      departments: [
        { name: 'Department of Electrical & Electronic Engineering', programs: ['BSc. Electrical & Electronic Engineering', 'BSc. Telecommunications'] },
        { name: 'Department of Civil & Structural Engineering', programs: ['BSc. Civil Engineering', 'MSc. Structural Engineering'] },
        { name: 'Department of Mechanical & Mechatronics', programs: ['BSc. Mechatronics Engineering', 'BSc. Renewable Energy Tech'] },
      ],
      students: '1,600+',
      icon: '⚡',
    },
    {
      name: 'School of Agriculture & Natural Resources',
      dean: 'Dr. Grace Wekesa, PhD',
      departments: [
        { name: 'Department of Agribusiness Management', programs: ['BSc. Agribusiness Management & Trade', 'BSc. Agricultural Economics'] },
        { name: 'Department of Food Science & Technology', programs: ['BSc. Food Science & Nutrition', 'BSc. Post-Harvest Tech'] },
        { name: 'Department of Environmental Studies & Forestry', programs: ['BSc. Environmental Resource Management', 'BSc. Agroforestry'] },
      ],
      students: '1,200+',
      icon: '🌱',
    },
  ];

  const filteredSchools = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.departments.some((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
          Academic Excellence • 15 Departments
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950">Schools, Faculties & Academic Departments</h1>
        <p className="text-sm sm:text-base text-slate-600">
          Discover our accredited undergraduate, postgraduate, and professional diploma programs tailored to modern industry demands.
        </p>

        {/* Search Input */}
        <div className="pt-4 max-w-md mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search school, department, or degree program..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Schools List */}
      <div className="space-y-8">
        {filteredSchools.map((school, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition">
            {/* School Header */}
            <div className="bg-slate-50/80 px-6 sm:px-8 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{school.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-navy-950">{school.name}</h2>
                  <p className="text-xs text-slate-500">Dean: {school.dean}</p>
                </div>
              </div>
              <span className="text-xs font-semibold bg-brand-100 text-brand-800 px-3 py-1 rounded-full self-start sm:self-auto">
                {school.students} Active Scholars
              </span>
            </div>

            {/* Departments */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {school.departments.map((dept, dIdx) => (
                <div key={dIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-brand-700 font-bold text-sm">
                    <Building className="w-4 h-4 shrink-0" />
                    <h4>{dept.name}</h4>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Offered Programs:</p>
                    <ul className="space-y-1">
                      {dept.programs.map((prog, pIdx) => (
                        <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <span className="text-brand-500 font-bold">•</span>
                          <span>{prog}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
