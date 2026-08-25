import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import {
  BookOpen,
  CreditCard,
  Home,
  GraduationCap,
  FileText,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { JiungePaymentModal } from '../../components/JiungePaymentModal';

export const StudentDashboard: React.FC = () => {
  const [balance, setBalance] = useState({ total_invoiced: 0, total_paid: 0, balance: 0 });
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [payModalOpen, setPayModalOpen] = useState(false);

  const loadData = async () => {
    const bal = await api.getFeeBalance();
    const enr = await api.getEnrollments();
    const bks = await api.getMyBookings();
    setBalance(bal);
    setEnrollments(enr);
    setBookings(bks);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* 3 Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fee Balance */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Current Fee Balance</span>
            <div className="p-2 bg-brand-50 text-brand-700 rounded-xl">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-mono">
              KES {balance.balance.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Paid: <span className="font-semibold text-emerald-600">KES {balance.total_paid.toLocaleString()}</span> of KES {balance.total_invoiced.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => setPayModalOpen(true)}
            className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pay via Jiunge M-Pesa</span>
          </button>
        </div>

        {/* Registered Units */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Enrolled Units</span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              {enrollments.length} Courses
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Semester 1, 2024/2025 Academic Session
            </p>
          </div>
          <Link
            to="/student/courses"
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5"
          >
            <span>Manage Registrations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Hostel Allocation */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Hostel Allocation</span>
            <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
              <Home className="w-4 h-4" />
            </div>
          </div>
          <div>
            {bookings.length > 0 ? (
              <div>
                <div className="text-xl font-bold text-navy-950">
                  {bookings[0].block_name}
                </div>
                <p className="text-xs text-emerald-600 font-semibold mt-1">
                  Room: {bookings[0].room_number} (Allocated)
                </p>
              </div>
            ) : (
              <div>
                <div className="text-lg font-bold text-slate-700">No Room Allocated</div>
                <p className="text-xs text-slate-500 mt-1">Room selection currently open</p>
              </div>
            )}
          </div>
          <Link
            to="/student/hostel"
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5"
          >
            <span>{bookings.length > 0 ? 'View Room Details' : 'Book Room Now'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Active Courses Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-navy-950">Current Semester Schedule & Units</h3>
            <p className="text-xs text-slate-500">Approved registrations for continuous assessment</p>
          </div>
          <Link to="/student/courses" className="text-xs font-bold text-brand-700 hover:underline">
            View All Units
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="py-3 px-4">Unit Code</th>
                <th className="py-3 px-4">Unit Name</th>
                <th className="py-3 px-4">Credit Hours</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assessment Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {enrollments.map((enr) => (
                <tr key={enr.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{enr.course?.code || 'CSC 211'}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{enr.course?.name || 'Data Structures'}</td>
                  <td className="py-3 px-4">{enr.course?.credit_hours || 3} Hours</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase">
                      {enr.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">
                    {enr.grade ? (
                      <span className="px-2 py-0.5 rounded bg-brand-100 text-brand-900 font-mono">
                        {enr.grade} ({enr.marks}%)
                      </span>
                    ) : (
                      <span className="text-slate-400">In Progress</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <JiungePaymentModal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        onSuccess={() => {
          setPayModalOpen(false);
          loadData();
        }}
        defaultAmount={balance.balance > 0 ? balance.balance : 5000}
        description="Tuition Fee Clearance (Jiunge/Pesaflow)"
      />
    </div>
  );
};
