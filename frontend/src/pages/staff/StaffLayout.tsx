import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Building,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const StaffLayout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/staff', label: 'Faculty Overview', icon: LayoutDashboard, exact: true },
    { to: '/staff/grades', label: 'Continuous Grading Roster', icon: GraduationCap },
    { to: '/staff/students', label: 'Student Academic Directory', icon: Users },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Faculty Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-navy-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-700 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg">
            {user?.name ? user.name[0] : 'F'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{user?.name || 'Dr. Kennedy Omondi'}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                Senior Lecturer
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Faculty of Computing & Informatics • Staff ID: <span className="font-mono text-blue-300">UOH-FAC-019</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-blue-900/50 p-3.5 rounded-2xl border border-blue-800 text-xs">
          <Building className="w-4 h-4 text-blue-400 shrink-0" />
          <div>
            <p className="font-bold text-slate-200">Department Grading Portal</p>
            <p className="text-[11px] text-blue-300">Semester 1 Examination Window Open</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 space-y-3">
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
                      ? 'bg-blue-700 text-white shadow-md shadow-blue-600/20'
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
        </aside>

        <main className="lg:col-span-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
