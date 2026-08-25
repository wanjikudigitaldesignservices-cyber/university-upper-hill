import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  FileText,
  CreditCard,
  Building,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

export const AdmissionsPublicPage: React.FC = () => {
  const { quickLogin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
          2024/2025 Academic Intake
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
          Admissions, Reporting & Online Registration
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Official enrollment guide for KUCCPS government-placed students, self-sponsored applicants, and international scholars.
        </p>
      </div>

      {/* Step-by-Step Onboarding Process */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">4-Step Enrollment Roadmap</h2>
          <p className="text-xs text-slate-500">Everything you need to complete before semester orientation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Check Offer & Download Letter',
              desc: 'Log in using your KCSE index number or email to generate your officially signed University Admission Letter.',
              icon: FileText,
              color: 'text-brand-600 bg-brand-50',
            },
            {
              step: '02',
              title: 'Fee Payment via Jiunge',
              desc: 'Initiate tuition and statutory fee clearance through our integrated Jiunge/Pesaflow M-Pesa STK push gateway.',
              icon: CreditCard,
              color: 'text-blue-600 bg-blue-50',
            },
            {
              step: '03',
              title: 'Hostel Room Selection',
              desc: 'Reserve a room in Blocks A, B, C, or D using our concurrency-safe real-time hostel booking system.',
              icon: Building,
              color: 'text-purple-600 bg-purple-50',
            },
            {
              step: '04',
              title: 'Course Registration',
              desc: 'Select your semester unit codes and generate your official digital exam clearance timetable.',
              icon: GraduationCap,
              color: 'text-amber-600 bg-amber-50',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm relative space-y-4">
                <span className="text-3xl font-black text-slate-200 block">{item.step}</span>
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-navy-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Already Placed via KUCCPS?</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Access your student portal directly to claim your registration number and begin fee clearance.
          </p>
        </div>
        <button
          onClick={() => { quickLogin('student'); navigate('/student/letter'); }}
          className="px-6 py-3.5 bg-brand-500 hover:bg-brand-400 text-navy-950 font-bold rounded-xl text-sm shadow-lg transition flex items-center gap-2 shrink-0"
        >
          <span>Claim Admission Letter</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Fee Structure Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Standard Semester Fee Breakdown (2024/2025)</h3>
          <p className="text-xs text-slate-500">Approved by University Council and Ministry of Education</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-3 px-4 font-bold">Fee Description</th>
                <th className="py-3 px-4 font-bold">Government Sponsored (GoK/Band 1-5)</th>
                <th className="py-3 px-4 font-bold">Self-Sponsored (SSP)</th>
                <th className="py-3 px-4 font-bold">Frequency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Tuition Fees</td>
                <td className="py-3 px-4">KES 16,000 - 32,000</td>
                <td className="py-3 px-4">KES 65,000 - 90,000</td>
                <td className="py-3 px-4">Per Semester</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Registration & Activity Fee</td>
                <td className="py-3 px-4">KES 2,000</td>
                <td className="py-3 px-4">KES 2,000</td>
                <td className="py-3 px-4">Per Academic Year</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Computer & Laboratory Levy</td>
                <td className="py-3 px-4">KES 3,000</td>
                <td className="py-3 px-4">KES 3,000</td>
                <td className="py-3 px-4">Per Semester</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Medical Insurance & Examination</td>
                <td className="py-3 px-4">KES 2,500</td>
                <td className="py-3 px-4">KES 2,500</td>
                <td className="py-3 px-4">Per Academic Year</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Hostel Accommodation (Optional)</td>
                <td className="py-3 px-4">KES 6,500 - 10,000</td>
                <td className="py-3 px-4">KES 6,500 - 10,000</td>
                <td className="py-3 px-4">Per Semester</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
