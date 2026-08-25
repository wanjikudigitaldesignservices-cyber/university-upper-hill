import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  GraduationCap,
  Lock,
  User as UserIcon,
  Shield,
  Building2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  CreditCard,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, quickLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please provide your Student No / Employee No and Password.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await login(username, role);
      if (role === 'student') navigate('/student');
      else if (role === 'faculty') navigate('/staff');
      else navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid institutional credentials.');
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
    <div className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Campus Branding & Tagline Hero (Modeled after UoK Portal) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 via-slate-900 to-brand-950 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Subtle decorative circles */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-6 relative z-10">
            <div className="w-20 h-20 bg-white rounded-2xl p-1 shadow-xl flex items-center justify-center">
              <img src="/logo.png" alt="University Logo" className="w-full h-full object-contain" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-bold tracking-widest uppercase border border-brand-500/30">
                Official Student Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 text-white">
                INNOVATION AND EXCELLENCE
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Integrated Information System for course registration, fee settlement via Jiunge/Pesaflow, hostel allocation, and continuous assessment grading.
              </p>
            </div>
          </div>

          {/* Quick Demo Credentials Bar */}
          <div className="space-y-3 pt-8 relative z-10">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gold-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Test Sign-Ins:</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuick('student')}
                className="py-2 px-2.5 rounded-xl bg-brand-700/80 hover:bg-brand-600 text-white text-[11px] font-bold transition shadow text-center"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleQuick('faculty')}
                className="py-2 px-2.5 rounded-xl bg-blue-700/80 hover:bg-blue-600 text-white text-[11px] font-bold transition shadow text-center"
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => handleQuick('ict-admin')}
                className="py-2 px-2.5 rounded-xl bg-amber-700/80 hover:bg-amber-600 text-white text-[11px] font-bold transition shadow text-center"
              >
                Admin
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>KDPA 2019 Certified</span>
              <span>Jiunge / Pesaflow Integrated</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-2xl font-extrabold text-navy-950 tracking-tight">Hi, welcome back</h3>
            <p className="text-xs text-slate-500 font-medium">Please fill in your details to log into your portal</p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Portal Role Selection
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="student">Student Portal (Undergraduate & Postgrad)</option>
                <option value="faculty">Staff & Faculty Portal (Lecturers)</option>
                <option value="admin">Academic Registrar & Administration</option>
                <option value="ict-admin">ICT Directorate (Super Admin)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Username (Student No / Employee No)
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. COM/0042/2023 or EMP-104"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                />
                <span className="font-semibold text-[11px]">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Password reset link will be sent to your institutional student email.')}
                className="font-bold text-brand-700 hover:text-brand-800 text-[11px]"
              >
                Forgot Password?
              </button>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-brand-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <KeyRound className="w-4 h-4" />
                <span>Sign In to Portal</span>
              </button>
            </div>
          </form>

          <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-100 space-y-1">
            <p>
              Don't have an account?{' '}
              <Link to="/admissions" className="font-bold text-brand-700 hover:underline">
                Sign Up / Claim Admission
              </Link>
            </p>
            <p className="text-[10px] text-slate-400">
              © {new Date().getFullYear()} University of Upper Hill • Microservices SIS Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
