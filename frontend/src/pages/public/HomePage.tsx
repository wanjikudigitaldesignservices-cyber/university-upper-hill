import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Building2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Home,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Sparkles,
  MapPin,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { quickLogin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-brand-950 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        {/* Background glow & subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>Next-Gen Microservices University ERP System</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
                Empowering Minds, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-400 to-emerald-200">
                  Transforming Africa.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Welcome to the official digital portal of the <strong>University of Upper Hill</strong>. Experience seamless course enrollments, concurrency-safe hostel bookings, and instant M-Pesa fee payments via Jiunge/Pesaflow.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => { quickLogin('student'); navigate('/student'); }}
                  className="px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-navy-950 font-bold text-sm shadow-xl hover:shadow-brand-500/25 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Enter Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/admissions"
                  className="px-6 py-3.5 rounded-xl bg-navy-800/80 hover:bg-navy-800 border border-navy-700 text-white font-semibold text-sm transition hover:border-slate-500 flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-gold-400" />
                  <span>Admissions & Intake</span>
                </Link>
              </div>

              {/* Quick stats banner */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-navy-800/80 max-w-lg">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">20,000+</p>
                  <p className="text-xs text-slate-400 font-medium">Students Enrolled</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-brand-400">15</p>
                  <p className="text-xs text-slate-400 font-medium">Academic Schools</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gold-400">98.4%</p>
                  <p className="text-xs text-slate-400 font-medium">Graduate Employability</p>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Portal Access */}
            <div className="lg:col-span-5">
              <div className="glass-dark rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 relative">
                <div className="flex items-center justify-between pb-4 border-b border-navy-700">
                  <div>
                    <h3 className="font-bold text-white text-base">Quick Portal Access</h3>
                    <p className="text-xs text-slate-400">Select your role to explore live workflows</p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                </div>

                <div className="space-y-3 mt-5">
                  {/* Student portal card */}
                  <div
                    onClick={() => { quickLogin('student'); navigate('/student'); }}
                    className="p-4 rounded-2xl bg-navy-800/60 hover:bg-brand-900/40 border border-navy-700 hover:border-brand-500/50 cursor-pointer transition group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white group-hover:text-brand-300 transition">Student ERP Portal</h4>
                          <p className="text-[11px] text-slate-400">Transcripts, Jiunge fees, hostel rooms</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-1 transition" />
                    </div>
                  </div>

                  {/* Staff Portal card */}
                  <div
                    onClick={() => { quickLogin('faculty'); navigate('/staff'); }}
                    className="p-4 rounded-2xl bg-navy-800/60 hover:bg-blue-900/40 border border-navy-700 hover:border-blue-500/50 cursor-pointer transition group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white group-hover:text-blue-300 transition">Faculty & Lecturer Portal</h4>
                          <p className="text-[11px] text-slate-400">Class rosters, marks entry & grading</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition" />
                    </div>
                  </div>

                  {/* ICT Admin card */}
                  <div
                    onClick={() => { quickLogin('ict-admin'); navigate('/admin'); }}
                    className="p-4 rounded-2xl bg-navy-800/60 hover:bg-amber-900/40 border border-navy-700 hover:border-amber-500/50 cursor-pointer transition group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-gold-400 flex items-center justify-center font-bold">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white group-hover:text-gold-300 transition">ICT & Admin Console</h4>
                          <p className="text-[11px] text-slate-400">Microservice health, CMS, payment ledger</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-gold-400 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-xl bg-navy-950 border border-navy-800 text-[11px] text-slate-400 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Real-time Jiunge / Pesaflow M-Pesa STK push gateway active.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-700">Digital University Ecosystem</h2>
          <h3 className="text-3xl font-extrabold text-navy-950">Engineered for Reliability & Scale</h3>
          <p className="text-sm text-slate-600">
            A battle-tested distributed architecture built to withstand high-concurrency exam registration deadlines and fee payment traffic surges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Card 1: Finance */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition">
              <CreditCard className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-slate-900 mb-2">Jiunge / Pesaflow Integration</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Official university payment gateway with webhook-driven idempotent settlement and instantaneous M-Pesa push prompts directly to student phones.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-700 gap-1">
              <span>Layer 7 Zero-Loss Payments</span>
            </div>
          </div>

          {/* Card 2: Hostel Concurrency */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
              <Home className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-slate-900 mb-2">Concurrency-Safe Hostel Booking</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              PostgreSQL row-level locking (<code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-xs">FOR UPDATE</code>) ensures zero double-booking races during peak room allocation windows.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-700 gap-1">
              <span>Layer 8 Concurrency Lock</span>
            </div>
          </div>

          {/* Card 3: Admissions PDF */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-slate-900 mb-2">Secure Digital Admissions</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Server-rendered official admission letters streamed to students with signed cryptographic verification tokens and KDPA 2019 compliance.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-purple-700 gap-1">
              <span>Layer 9 PDF Engine</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Schools & Departments */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-700 mb-1">Academic Divisions</h2>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">Explore Our 15 Schools & Faculties</h3>
            </div>
            <Link
              to="/schools"
              className="text-sm font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1.5"
            >
              <span>View All 15 Departments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'School of Computing & AI', desc: 'Software engineering, cybersecurity, data science, machine learning.', icon: '💻', count: '1,850 Students' },
              { name: 'School of Health Sciences', desc: 'Medicine, nursing, public health, pharmacy, biomedical research.', icon: '🩺', count: '2,400 Students' },
              { name: 'School of Business & Economics', desc: 'Finance, accounting, procurement, business analytics, actuarial.', icon: '📈', count: '3,200 Students' },
              { name: 'School of Engineering & Tech', desc: 'Electrical, civil, mechanical, mechatronics, renewable energy.', icon: '⚡', count: '1,600 Students' },
            ].map((school, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="text-3xl mb-3">{school.icon}</div>
                <h4 className="font-bold text-base text-slate-900 mb-1">{school.name}</h4>
                <p className="text-xs text-slate-600 mb-4">{school.desc}</p>
                <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">{school.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-navy-950 rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 font-bold text-xs">2024/2025 Admissions Open</span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Ready to Begin Your Academic Journey?</h3>
            <p className="text-sm text-slate-300">
              Check your admission status, download official letters, and complete Jiunge fee clearance online.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <button
              onClick={() => { quickLogin('student'); navigate('/student'); }}
              className="px-6 py-3.5 bg-brand-500 hover:bg-brand-400 text-navy-950 font-bold rounded-xl text-sm shadow-lg transition"
            >
              Access Student Portal
            </button>
            <Link
              to="/admissions"
              className="px-6 py-3.5 bg-navy-800 hover:bg-navy-700 text-white font-semibold rounded-xl text-sm border border-navy-700 transition"
            >
              Admissions Info
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
