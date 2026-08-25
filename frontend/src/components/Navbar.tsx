import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Shield,
  BookOpen,
  Building,
  Sparkles,
  ChevronDown,
  Globe,
  Award,
  Search,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, quickLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-oxford-950 text-white border-b border-oxford-800/80 shadow-xl">
      {/* Top Institutional Prestige Ribbon (Oxford / Harvard Style) */}
      <div className="bg-gradient-to-r from-oxford-950 via-oxford-900 to-crimson-900 text-xs py-1.5 px-4 sm:px-8 border-b border-white/10 flex items-center justify-between">
        <div className="hidden lg:flex items-center gap-3 text-slate-300">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gold-400 uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            Chartered Public University
          </span>
          <span className="text-white/20">•</span>
          <span className="text-[11px] text-slate-300 font-medium">Nairobi, Kenya</span>
          <span className="text-white/20">•</span>
          <span className="text-[11px] text-emerald-400 font-semibold">KUCCPS 2024/25 Admissions Portal Live</span>
        </div>

        {/* Quick Demo Switcher */}
        <div className="flex items-center gap-2 text-[11px] mx-auto lg:mx-0">
          <span className="text-slate-400 font-medium hidden sm:inline">Role Preview:</span>
          <div className="inline-flex rounded-lg bg-black/40 p-0.5 border border-white/10">
            <button
              onClick={() => { quickLogin('student'); navigate('/student'); }}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition"
            >
              Student
            </button>
            <button
              onClick={() => { quickLogin('faculty'); navigate('/staff'); }}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition"
            >
              Faculty
            </button>
            <button
              onClick={() => { quickLogin('ict-admin'); navigate('/admin'); }}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-bold text-gold-400 hover:text-gold-300 hover:bg-white/10 transition"
            >
              ICT Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official University Seal & Typography */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-13 h-13 rounded-2xl bg-white p-1 shadow-2xl border-2 border-gold-500/40 group-hover:border-gold-400 group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="University of Upper Hill Crest" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight block leading-tight text-white group-hover:text-gold-300 transition">
                UNIVERSITY OF UPPER HILL
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-sans font-semibold block">
                Excellence in Research & Leadership
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-semibold">
            <Link
              to="/"
              className={`transition hover:text-gold-300 py-1 ${
                location.pathname === '/' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-slate-200'
              }`}
            >
              Overview
            </Link>
            <Link
              to="/schools"
              className={`transition hover:text-gold-300 py-1 ${
                location.pathname === '/schools' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-slate-200'
              }`}
            >
              Schools & Faculties
            </Link>
            <Link
              to="/admissions"
              className={`transition hover:text-gold-300 py-1 ${
                location.pathname === '/admissions' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-slate-200'
              }`}
            >
              Admissions & Aid
            </Link>
            <Link
              to="/news"
              className={`transition hover:text-gold-300 py-1 ${
                location.pathname === '/news' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-slate-200'
              }`}
            >
              Gazette & News
            </Link>
          </nav>

          {/* Right Action & Portal Gating */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {user.role === 'student' && (
                  <Link
                    to="/student"
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Student Portal
                  </Link>
                )}
                {(user.role === 'faculty' || user.role === 'admin' || user.role === 'ict-admin') && (
                  <Link
                    to="/staff"
                    className="flex items-center gap-2 px-4 py-2 bg-oxford-700 hover:bg-oxford-600 text-white rounded-xl text-xs font-bold shadow-md transition"
                  >
                    <Building className="w-3.5 h-3.5" />
                    Staff Portal
                  </Link>
                )}
                {(user.role === 'admin' || user.role === 'ict-admin') && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-2 bg-crimson-800 hover:bg-crimson-700 text-white rounded-xl text-xs font-bold shadow-md transition"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin Oversight
                  </Link>
                )}

                <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-100 leading-none">{user.name || user.email.split('@')[0]}</p>
                    <span className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold">{user.role}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-2 hover:bg-white/10 text-slate-400 hover:text-crimson-400 rounded-xl transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-xs font-bold bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-oxford-950 rounded-xl shadow-lg shadow-gold-500/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Access Portals</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-oxford-950 border-t border-white/10 px-6 py-6 space-y-4">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 font-semibold py-1">
            Overview
          </Link>
          <Link to="/schools" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 font-semibold py-1">
            Schools & Faculties
          </Link>
          <Link to="/admissions" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 font-semibold py-1">
            Admissions & Aid
          </Link>
          <Link to="/news" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 font-semibold py-1">
            Gazette & News
          </Link>
          <div className="pt-4 border-t border-white/10">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-center font-bold text-xs bg-gold-500 text-oxford-950 rounded-xl"
            >
              Enter University Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
