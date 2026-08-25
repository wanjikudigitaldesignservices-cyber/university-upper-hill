import React from 'react';
import { StudentProfile } from '../types';
import {
  GraduationCap,
  Download,
  Printer,
  X,
  ShieldCheck,
  Calendar,
  CheckCircle,
} from 'lucide-react';

interface AdmissionLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  token?: string;
}

export const AdmissionLetterModal: React.FC<AdmissionLetterModalProps> = ({
  isOpen,
  onClose,
  student,
  token = 'UOH-ADM-2024-K9842X',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-8">
        {/* Modal Top Bar */}
        <div className="bg-navy-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-400" />
            <span className="font-bold text-sm">Official University Admission Letter Document</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 hover:bg-navy-800 rounded-lg text-slate-300 hover:text-white transition flex items-center gap-1 text-xs"
              title="Print"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Formal Letter Body */}
        <div className="p-8 sm:p-12 bg-white text-slate-900 font-serif leading-relaxed text-sm space-y-6">
          {/* Letterhead */}
          <div className="text-center border-b-2 border-brand-800 pb-6 space-y-1">
            <div className="flex justify-center mb-3">
              <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md border border-slate-200 flex items-center justify-center">
                <img src="/logo.png" alt="University of Upper Hill Crest Seal" className="w-full h-full object-contain" />
              </div>
            </div>
            <h1 className="text-2xl font-bold font-sans tracking-wide text-navy-950">
              UNIVERSITY OF UPPER HILL
            </h1>
            <p className="text-xs font-sans text-slate-600">
              OFFICE OF THE ACADEMIC REGISTRAR • ADMISSIONS & STUDENT ENROLLMENT
            </p>
            <p className="text-[11px] font-sans text-slate-500">
              Upper Hill Medical & Tech Corridor, P.O. Box 90120-00100, Nairobi, Kenya
            </p>
            <p className="text-[11px] font-sans text-slate-500">
              Tel: +254 (0) 20 271 9000 | Email: admissions@upperhill.ac.ke | Web: www.upperhill.ac.ke
            </p>
          </div>

          {/* Metadata Bar */}
          <div className="flex flex-col sm:flex-row justify-between text-xs font-sans text-slate-700 pt-2 pb-2 border-b border-slate-100">
            <div>
              <span className="font-bold text-slate-900">REF: </span>
              <span className="font-mono">UOH/ADM/KUCCPS/2024/7710</span>
            </div>
            <div>
              <span className="font-bold text-slate-900">DATE: </span>
              <span>{new Date().toLocaleDateString('en-KE', { dateStyle: 'long' })}</span>
            </div>
          </div>

          {/* Recipient info */}
          <div className="space-y-1 text-xs font-sans">
            <p className="font-bold text-slate-900 text-sm">
              TO: {student.first_name.toUpperCase()} {student.last_name.toUpperCase()}
            </p>
            <p><span className="font-semibold text-slate-700">REGISTRATION NUMBER: </span><span className="font-mono font-bold text-brand-800">{student.registration_number}</span></p>
            <p><span className="font-semibold text-slate-700">DEPARTMENT: </span>{student.department}</p>
            <p><span className="font-semibold text-slate-700">PROGRAM: </span>Bachelor of Science in {student.department}</p>
          </div>

          {/* Letter Heading */}
          <div className="text-center pt-2">
            <h2 className="text-base font-bold font-sans tracking-wide text-navy-950 uppercase underline decoration-brand-600 decoration-2">
              OFFER OF ADMISSION FOR 2024/2025 ACADEMIC YEAR
            </h2>
          </div>

          {/* Main paragraphs */}
          <div className="space-y-4 text-slate-800 text-xs sm:text-sm font-sans leading-relaxed">
            <p>
              I am pleased to inform you that you have been officially admitted to the <strong>University of Upper Hill</strong> to pursue an undergraduate degree program in the <strong>School of Computing and Informatics</strong> commencing September 2024.
            </p>
            <p>
              This offer is subject to satisfactory verification of your original Kenya Certificate of Secondary Education (KCSE) results slip or equivalent qualifications at the time of official reporting.
            </p>
            <p>
              <strong>1. Reporting & Orientation:</strong> You are expected to report to the Main Campus in Upper Hill, Nairobi on Monday, 9th September 2024 at 08:00 AM for registration, medical examination, and matriculation orientation.
            </p>
            <p>
              <strong>2. Fee Payment & Jiunge Portal:</strong> All semester tuition and statutory fees must be paid through our designated electronic payment gateway (<strong>Jiunge / Pesaflow</strong>) via M-Pesa or authorized bank draft prior to course unit registration.
            </p>
            <p>
              <strong>3. Hostel Accommodation:</strong> On-campus residency in Blocks A, B, C, or D is available on a first-come, first-served basis through the online hostel portal upon settlement of accommodation fees.
            </p>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 flex justify-between items-end border-t border-slate-200">
            <div className="space-y-2 font-sans">
              <div className="w-32 border-b border-slate-800"></div>
              <p className="font-bold text-xs text-navy-950">Prof. Mary Wanjiku, PhD</p>
              <p className="text-[11px] text-slate-500">Registrar (Academic Affairs)</p>
              <p className="text-[10px] text-slate-400">University of Upper Hill</p>
            </div>

            {/* Official Digital Stamp */}
            <div className="p-3 rounded-2xl border-2 border-dashed border-brand-700 bg-brand-50/50 text-center font-sans text-[10px] space-y-1">
              <div className="flex items-center justify-center gap-1 text-brand-800 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>DIGITALLY VERIFIED</span>
              </div>
              <p className="text-slate-600 font-mono">Token: {token}</p>
              <p className="text-[9px] text-slate-500">Admissions Microservice • Layer 9</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Download / Print PDF
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow transition"
          >
            Close Letter
          </button>
        </div>
      </div>
    </div>
  );
};
