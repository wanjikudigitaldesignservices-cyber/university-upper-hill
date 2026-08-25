import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Home,
  CreditCard,
  FileText,
  User,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const StudentLayout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/student', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/student/courses', label: 'Course Registration', icon: BookOpen },
    { to: '/student/grades', label: 'Grades & Transcripts', icon: GraduationCap },
    { to: '/student/hostel', label: 'Hostel Room Booking', icon: Home },
    { to: '/student/finance', label: 'Jiunge Fee Ledger', icon: CreditCard },
    { to: '/student/letter', label: 'Admission Letter', icon: FileText },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Student Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-brand-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-navy-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-navy-950 flex items-center justify-center font-extrabold text-2xl shadow-lg">
            {user?.name ? user.name[0] : 'S'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{user?.name || 'Brian Kiprono'}</h1>
              <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-bold uppercase tracking-wider">Active Student</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Reg No: <span className="font-mono text-brand-300 font-bold">{user?.regNumber || 'COM/0042/2023'}</span> • {user?.department || 'Computer Science'} (Year 2)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto bg-navy-900/80 p-3 rounded-2xl border border-navy-800 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold text-slate-200">Exam Clearance Status</p>
            <p className="text-[11px] text-emerald-400 font-semibold">Eligible (Fees Over 50% Settled)</p>
          </div>
        </div>
      </div>

      {/* Grid: Sidebar Tabs + Page Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-white rounded-3xl border border-slate-200 p-3 shadow-sm space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = link.exact
                ? location.pathname === link.to
                : location.pathname.startsWith(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </div>

          {/* Quick Jiunge Callout Box */}
          <div className="p-4 rounded-3xl bg-brand-50 border border-brand-200/80 text-xs text-brand-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-brand-800">
              <CreditCard className="w-4 h-4" />
              <span>Jiunge Gateway</span>
            </div>
            <p className="text-[11px] text-brand-700 leading-relaxed">
              M-Pesa STK push settles tuition and accommodation in real time with instant ledger update.
            </p>
          </div>
        </aside>

        {/* Dynamic Nested Page Content */}
        <main className="lg:col-span-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
