import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Globe,
  Lock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-oxford-950 text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Institutional Crest & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-md flex items-center justify-center">
                <img src="/logo.png" alt="University Logo" className="w-9 h-9 object-contain" />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white block">
                  UNIVERSITY OF UPPER HILL
                </span>
                <span className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold block">
                  Excellence in Research & Leadership
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              A premier collegiate institution offering accredited Diploma, Certificate, Artisan, Short, and Professional courses with industry attachments and global certifications.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> KDPA 2019 Certified
              </span>
              <span>•</span>
              <span className="text-gold-400 font-semibold">TVETA & KNEC Accredited</span>
            </div>
          </div>

          {/* Academic Schools */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Academic Schools
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/schools" className="hover:text-gold-400 transition">Business & Management</Link></li>
              <li><Link to="/schools" className="hover:text-gold-400 transition">ICT & Computer Science</Link></li>
              <li><Link to="/schools" className="hover:text-gold-400 transition">Engineering & Technology</Link></li>
              <li><Link to="/schools" className="hover:text-gold-400 transition">Hospitality & Tourism</Link></li>
              <li><Link to="/schools" className="hover:text-gold-400 transition">Media & Communication</Link></li>
              <li><Link to="/schools" className="hover:text-gold-400 transition">Health & Social Sciences</Link></li>
              <li><Link to="/schools" className="hover:text-gold-400 transition">Creative Arts & Design</Link></li>
            </ul>
          </div>

          {/* Qualification Levels & Portals */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Program Levels
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/schools" className="hover:text-gold-400 transition">Diploma Programs (2-3 Yrs)</Link></li>
              <li><Link to="/schools" className="hover:text-gold-400 transition">Certificate Courses (1-2 Yrs)</Link></li>
              <li><Link to="/schools" className="hover:text-gold-400 transition">Artisan Trade Skills (1 Yr)</Link></li>
              <li><Link to="/schools" className="hover:text-gold-400 transition">Professional & CPA (KASNEB)</Link></li>
              <li><Link to="/schools" className="hover:text-gold-400 transition">Short Executive Masterclasses</Link></li>
              <li><Link to="/admissions" className="hover:text-gold-400 transition">Online KUCCPS Admissions</Link></li>
            </ul>
          </div>

          {/* Institutional Contact */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Campus Registry
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Upper Hill Medical-Financial Precinct, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+254 (0) 20 272 5000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>admissions@upperhill.ac.ke</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} University of Upper Hill. All Rights Reserved. TVET & University Accreditation.</p>
          <div className="flex items-center gap-6">
            <Link to="/admissions" className="hover:text-slate-300">Admissions Charter</Link>
            <Link to="/login" className="hover:text-slate-300">Staff & Student Portals</Link>
            <span>Jiunge/Pesaflow Integrated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
