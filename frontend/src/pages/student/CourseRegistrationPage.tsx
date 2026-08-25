import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Course, Enrollment } from '../../types';
import {
  BookOpen,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export const CourseRegistrationPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const loadCourses = async () => {
    try {
      const allCourses = await api.getCourses();
      const myEnrollments = await api.getEnrollments();
      setCourses(allCourses);
      setEnrollments(myEnrollments);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleEnroll = async (courseId: string) => {
    try {
      await api.enrollCourse(courseId);
      setMessage({ text: 'Course unit registered successfully!', type: 'success' });
      loadCourses();
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to register unit.', type: 'error' });
    }
  };

  const handleDrop = async (enrId: string) => {
    if (confirm('Are you sure you want to drop this unit?')) {
      try {
        await api.dropCourse(enrId);
        setMessage({ text: 'Course unit dropped.', type: 'success' });
        loadCourses();
      } catch (err: any) {
        setMessage({ text: 'Failed to drop unit.', type: 'error' });
      }
    }
  };

  const enrolledCourseIds = new Set(enrollments.map((e) => e.course_id));
  const totalCreditHours = enrollments.reduce((sum, e) => sum + (e.course?.credit_hours || 3), 0);

  return (
    <div className="space-y-6">
      {/* Header & Credit Counter */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-950">Academic Unit Registration</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            2024/2025 Academic Year • Semester 1 Enrollment Window Active
          </p>
        </div>
        <div className="flex items-center gap-3 bg-brand-50 border border-brand-200 px-4 py-2.5 rounded-2xl">
          <BookOpen className="w-5 h-5 text-brand-700 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-bold text-brand-800 tracking-wider block">Total Registered Credits</span>
            <span className="text-base font-extrabold text-brand-950">{totalCreditHours} / 24 Hours Max</span>
          </div>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
          {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Available Department Units */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="font-bold text-base text-navy-950">Available Departmental Courses</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => {
            const isEnrolled = enrolledCourseIds.has(course.id);
            const enrollment = enrollments.find((e) => e.course_id === course.id);

            return (
              <div
                key={course.id}
                className={`p-5 rounded-2xl border transition flex flex-col justify-between space-y-4 ${
                  isEnrolled ? 'bg-brand-50/40 border-brand-300' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-slate-100 font-mono text-xs font-bold text-slate-800 rounded-lg">
                      {course.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {course.credit_hours} Credits
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">{course.name}</h4>
                  <p className="text-xs text-slate-500">{course.department} • {course.semester}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  {isEnrolled ? (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-brand-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Registered
                      </span>
                      <button
                        onClick={() => enrollment && handleDrop(enrollment.id)}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Drop
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course.id)}
                      className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Register Unit
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
