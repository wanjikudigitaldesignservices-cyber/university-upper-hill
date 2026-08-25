import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, Globe, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-400 border-t border-navy-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-0.5 shadow-lg overflow-hidden border border-brand-400/40 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="University of Upper Hill Crest" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                UNIVERSITY OF UPPER HILL
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300 max-w-md">
              A premier chartered Kenyan public university dedicated to scientific discovery, technological innovation, leadership excellence, and transformative human capacity development.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Upper Hill Medical & Tech Corridor, P.O. Box 90120-00100, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>+254 (0) 20 271 9000 / +254 (0) 711 088 000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>info@upperhill.ac.ke • admissions@upperhill.ac.ke</span>
              </div>
            </div>
          </div>

          {/* Col 2: Academics */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Schools & Faculties</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/schools" className="hover:text-brand-400 transition">School of Computing & AI</Link></li>
              <li><Link to="/schools" className="hover:text-brand-400 transition">School of Health Sciences</Link></li>
              <li><Link to="/schools" className="hover:text-brand-400 transition">School of Business & Economics</Link></li>
              <li><Link to="/schools" className="hover:text-brand-400 transition">School of Engineering</Link></li>
              <li><Link to="/schools" className="hover:text-brand-400 transition">School of Agricultural Sciences</Link></li>
              <li><Link to="/schools" className="hover:text-brand-400 transition">School of Law & Governance</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Portals */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Online Portals</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/student" className="hover:text-brand-400 transition flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>Student ERP Portal</Link></li>
              <li><Link to="/student/finance" className="hover:text-brand-400 transition flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>Jiunge/Pesaflow Fee Ledger</Link></li>
              <li><Link to="/student/hostel" className="hover:text-brand-400 transition flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>Hostel Room Allocation</Link></li>
              <li><Link to="/staff" className="hover:text-brand-400 transition flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>Staff & Faculty Portal</Link></li>
              <li><Link to="/admin" className="hover:text-brand-400 transition flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>ICT Directorate Console</Link></li>
            </ul>
          </div>

          {/* Col 4: Compliance & Security */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Governance & Standards</h4>
            <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-brand-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>KDPA 2019 Certified</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Data Protection & Privacy Act compliant. Zero PII logging and end-to-end encryption across all microservices.
              </p>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-navy-800">
                Payment Gateway: Jiunge / Pesaflow (M-Pesa STK)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-navy-900 text-xs flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© {new Date().getFullYear()} University of Upper Hill. All Rights Reserved. Fully Certified Public Institution.</p>
          <div className="flex items-center gap-6">
            <Link to="/news" className="hover:text-slate-300 transition">Press & Announcements</Link>
            <Link to="/admissions" className="hover:text-slate-300 transition">Privacy Statement</Link>
            <span className="text-slate-400">Architecture: Independent REST Microservices</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
