import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldAlert,
  Activity,
  FileText,
  CreditCard,
  Building,
  Settings,
  ChevronRight,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/admin', label: 'ICT & Microservices Console', icon: Activity, exact: true },
    { to: '/admin/cms', label: 'CMS & News Manager', icon: FileText },
    { to: '/admin/finance', label: 'Jiunge Financial Oversight', icon: CreditCard },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-950 to-navy-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-amber-900/40">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg">
            <ShieldAlert className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{user?.name || 'Eng. Dennis Mutua'}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-gold-400 text-[10px] font-bold uppercase tracking-wider">
                ICT Directorate
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Super Admin Console • University of Upper Hill Distributed Architecture
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-amber-950/60 p-3.5 rounded-2xl border border-amber-800/60 text-xs">
          <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold text-slate-200">Gateway Routing Status</p>
            <p className="text-[11px] text-emerald-400 font-semibold">All 7 Microservices Online & Healthy</p>
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
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
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
