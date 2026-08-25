import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { StudentProfile } from '../../types';
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { AdmissionLetterModal } from '../../components/AdmissionLetterModal';

export const AdmissionLetterPage: React.FC = () => {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState('UOH-ADM-2024-K9842X');

  useEffect(() => {
    const fetchStudent = async () => {
      const prof = await api.getStudentProfile('usr-std-001');
      setStudent(prof);
    };
    fetchStudent();
  }, []);

  if (!student) return null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider">
              Layer 9 Microservice
            </span>
            <span className="text-xs text-slate-500 font-semibold">• Server-Side PDF Generation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mt-1">Official Admission Letter</h2>
          <p className="text-xs text-slate-500">
            Digitally certified admission offer stamped with cryptographic registrar token.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span>Open Full Admission Document</span>
        </button>
      </div>

      {/* Letter Document Preview Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6 max-w-3xl mx-auto">
        <div className="text-center border-b border-slate-200 pb-6 space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-700 to-navy-950 text-white flex items-center justify-center mx-auto shadow-md">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-navy-950 tracking-tight">UNIVERSITY OF UPPER HILL</h3>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Office of the Academic Registrar</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <div>
            <span className="text-slate-400 block font-semibold">Candidate Name:</span>
            <span className="font-bold text-slate-900 text-sm">{student.first_name} {student.last_name}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Registration Number:</span>
            <span className="font-mono font-bold text-brand-800 text-sm">{student.registration_number}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Department:</span>
            <span className="font-semibold text-slate-800">{student.department}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Program Level:</span>
            <span className="font-semibold text-slate-800">Undergraduate (BSc)</span>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-serif">
          <p>
            This certifies that you have been admitted to the University of Upper Hill for the 2024/2025 academic session. You are required to complete online course unit registration upon settling statutory fees via Jiunge.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Digital Token: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">{token}</code></span>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => setModalOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Inspect Letter</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      <AdmissionLetterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        student={student}
        token={token}
      />
    </div>
  );
};
