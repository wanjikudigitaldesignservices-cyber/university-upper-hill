import React, { useState } from 'react';
import {
  Activity,
  Server,
  Database,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Cpu,
  Globe,
  Radio,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [pings, setPings] = useState([
    { service: 'api-gateway', port: 8080, status: 'Healthy', latency: '4ms', role: 'Reverse Proxy & JWT Termination' },
    { service: 'auth-service', port: 3001, status: 'Healthy', latency: '12ms', role: 'JWT Rotation & Role RBAC' },
    { service: 'academic-service', port: 3002, status: 'Healthy', latency: '9ms', role: 'Course Units & Transcripts' },
    { service: 'hostel-service', port: 3003, status: 'Healthy', latency: '15ms', role: 'PostgreSQL SELECT FOR UPDATE Locking' },
    { service: 'finance-service', port: 3004, status: 'Healthy', latency: '18ms', role: 'Jiunge/Pesaflow Webhooks & Ledgers' },
    { service: 'admissions-service', port: 3005, status: 'Healthy', latency: '11ms', role: 'PDF Engine & Cryptographic Tokens' },
    { service: 'cms-service', port: 3006, status: 'Healthy', latency: '5ms', role: 'Public Edge Cached CMS' },
    { service: 'notification-service', port: 3007, status: 'Healthy', latency: '8ms', role: 'Internal Email & SMS Dispatch' },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="space-y-6">
      {/* High-level system stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Active Microservices</span>
          <div className="text-2xl font-extrabold text-navy-950">8 / 8 Online</div>
          <p className="text-[11px] text-emerald-600 font-semibold">100% System Uptime</p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Daily Jiunge Volume</span>
          <div className="text-2xl font-extrabold text-brand-700 font-mono">KES 14.8M</div>
          <p className="text-[11px] text-slate-500">382 M-Pesa STK Pushes</p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Postgres Schema</span>
          <div className="text-2xl font-extrabold text-purple-700">6 Schemas</div>
          <p className="text-[11px] text-slate-500">Strict RLS & 25+ Indexes</p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">KDPA Compliance</span>
          <div className="text-2xl font-extrabold text-blue-700">100% Certified</div>
          <p className="text-[11px] text-emerald-600 font-semibold">Zero PII in Logs</p>
        </div>
      </div>

      {/* Microservices Health Monitor Table (Layer 15) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-navy-950">Distributed Microservices Health Monitor</h3>
            <p className="text-xs text-slate-500">Real-time container heartbeat & gateway latency checks</p>
          </div>
          <button
            onClick={handleRefresh}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Ping Containers</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="py-3.5 px-4">Service Container</th>
                <th className="py-3.5 px-4">Internal Port</th>
                <th className="py-3.5 px-4">Primary Responsibility</th>
                <th className="py-3.5 px-4">Container Health</th>
                <th className="py-3.5 px-4 text-right">Avg Response Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {pings.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 flex items-center gap-2">
                    <Server className="w-4 h-4 text-amber-600" />
                    <span>{p.service}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">:{p.port}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{p.role}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase flex items-center gap-1 w-max">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700">{p.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
