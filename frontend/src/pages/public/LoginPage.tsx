import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  GraduationCap,
  Lock,
  Mail,
  Shield,
  Building2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, quickLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/student';

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in your email and password.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await login(email, role);
      if (role === 'student') navigate('/student');
      else if (role === 'faculty') navigate('/staff');
      else navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuick = (targetRole: UserRole) => {
    quickLogin(targetRole);
    if (targetRole === 'student') navigate('/student');
    else if (targetRole === 'faculty') navigate('/staff');
    else navigate('/admin');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Quick Demo selector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Test Sign-In</span>
            </div>
            <h2 className="text-2xl font-extrabold text-navy-950">One-Click Demo Access</h2>
            <p className="text-xs text-slate-600">
              Select any role below to immediately enter that portal surface with complete pre-seeded data:
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleQuick('student')}
              className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-500 shadow-sm hover:shadow-md transition text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-brand-700 transition">Brian Kiprono (Student)</h3>
                  <p className="text-[11px] text-slate-500">COM/0042/2023 • Computer Science</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => handleQuick('faculty')}
              className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-md transition text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition">Dr. Kennedy Omondi (Faculty)</h3>
                  <p className="text-[11px] text-slate-500">Lecturer • Grading & Rosters</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => handleQuick('ict-admin')}
              className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-md transition text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition">Eng. Dennis Mutua (ICT Admin)</h3>
                  <p className="text-[11px] text-slate-500">System Monitoring • Full RBAC</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>

        {/* Right: Custom Login Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
          <div className="mb-6 space-y-1">
            <h3 className="text-xl font-bold text-navy-950">Direct System Sign-In</h3>
            <p className="text-xs text-slate-500">Enter your institutional credentials to authenticate</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Surface Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none font-medium"
              >
                <option value="student">Student Surface</option>
                <option value="faculty">Faculty & Lecturer Surface</option>
                <option value="admin">Academic Registrar (Admin)</option>
                <option value="ict-admin">ICT Directorate (Super Admin)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">University Email / ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@student.upperhill.ac.ke"
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Sign In with Credentials</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>Powered by Auth Service JWT (15-min access + HttpOnly rotation)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
