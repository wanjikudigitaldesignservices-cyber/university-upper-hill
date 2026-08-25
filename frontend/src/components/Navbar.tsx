import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Shield,
  BookOpen,
  Building,
  CreditCard,
  Home,
  FileText,
  ChevronDown,
  Layers,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, quickLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isPortal = location.pathname.startsWith('/student') ||
                   location.pathname.startsWith('/staff') ||
                   location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur-md text-white border-b border-navy-800 shadow-md">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-brand-800 via-brand-700 to-navy-900 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2">
          <span className="bg-brand-500 text-navy-950 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">Admissions</span>
          <span>KUCCPS 2024/2025 Intake Online Admission Letters & Jiunge Fee Portal Live</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] mx-auto md:mx-0">
          <span className="text-slate-300">Quick Demo Switch:</span>
          <button
            onClick={() => { quickLogin('student'); navigate('/student'); }}
            className="hover:text-brand-300 underline font-semibold transition"
          >
            Student
          </button>
          <span className="text-slate-500">|</span>
          <button
            onClick={() => { quickLogin('faculty'); navigate('/staff'); }}
            className="hover:text-brand-300 underline font-semibold transition"
          >
            Faculty
          </button>
          <span className="text-slate-500">|</span>
          <button
            onClick={() => { quickLogin('ict-admin'); navigate('/admin'); }}
            className="hover:text-brand-300 underline font-semibold transition text-gold-400"
          >
            ICT Admin
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-white p-0.5 shadow-lg group-hover:scale-105 transition overflow-hidden border border-brand-400/40 flex items-center justify-center">
              <img src="/logo.png" alt="University of Upper Hill Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-tight text-white group-hover:text-brand-300 transition">
                UNIVERSITY OF UPPER HILL
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brand-400 font-semibold block">
                Nairobi, Kenya • Microservices SIS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition hover:text-brand-400 ${location.pathname === '/' ? 'text-brand-400 font-semibold' : 'text-slate-200'}`}
            >
              Home
            </Link>
            <Link
              to="/schools"
              className={`transition hover:text-brand-400 ${location.pathname === '/schools' ? 'text-brand-400 font-semibold' : 'text-slate-200'}`}
            >
              Schools & Departments
            </Link>
            <Link
              to="/admissions"
              className={`transition hover:text-brand-400 ${location.pathname === '/admissions' ? 'text-brand-400 font-semibold' : 'text-slate-200'}`}
            >
              Admissions
            </Link>
            <Link
              to="/news"
              className={`transition hover:text-brand-400 ${location.pathname === '/news' ? 'text-brand-400 font-semibold' : 'text-slate-200'}`}
            >
              News & Notices
            </Link>
          </nav>

          {/* User Section & Portals */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {/* Active Portal link */}
                {user.role === 'student' && (
                  <Link
                    to="/student"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-700 hover:bg-brand-600 text-white rounded-lg text-xs font-semibold shadow transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Student Portal
                  </Link>
                )}
                {(user.role === 'faculty' || user.role === 'admin' || user.role === 'ict-admin') && (
                  <Link
                    to="/staff"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold shadow transition"
                  >
                    <Building className="w-3.5 h-3.5" />
                    Staff Portal
                  </Link>
                )}
                {(user.role === 'admin' || user.role === 'ict-admin') && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold shadow transition"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin Oversight
                  </Link>
                )}

                {/* User badge */}
                <div className="flex items-center gap-2 pl-2 border-l border-navy-700">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-100 leading-none">{user.name || user.email.split('@')[0]}</p>
                    <span className="text-[10px] text-brand-400 uppercase tracking-wider font-semibold">{user.role}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-1.5 hover:bg-navy-800 text-slate-300 hover:text-red-400 rounded-lg transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-navy-800 rounded-lg transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white rounded-lg shadow-md hover:shadow-brand-500/20 transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Access Portals
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-950 border-b border-navy-800 px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-brand-400 font-medium"
          >
            Home
          </Link>
          <Link
            to="/schools"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-brand-400 font-medium"
          >
            Schools & Departments
          </Link>
          <Link
            to="/admissions"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-brand-400 font-medium"
          >
            Admissions
          </Link>
          <Link
            to="/news"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-brand-400 font-medium"
          >
            News & Notices
          </Link>

          <div className="pt-4 border-t border-navy-800 space-y-2">
            {isAuthenticated && user ? (
              <>
                <div className="py-2 text-xs text-brand-300 font-semibold">
                  Logged in as {user.name} ({user.role})
                </div>
                <Link
                  to="/student"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 bg-brand-700 rounded-lg text-center font-bold text-sm"
                >
                  Student Portal
                </Link>
                <Link
                  to="/staff"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 bg-blue-700 rounded-lg text-center font-bold text-sm"
                >
                  Staff Portal
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-center text-red-400 hover:bg-navy-900 rounded-lg text-sm font-semibold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-4 bg-brand-600 text-white rounded-lg text-center font-bold text-sm"
              >
                Sign In / Open Portal
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
