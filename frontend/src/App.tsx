import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { SchoolsPage } from './pages/public/SchoolsPage';
import { AdmissionsPublicPage } from './pages/public/AdmissionsPublicPage';
import { NewsPage } from './pages/public/NewsPage';
import { LoginPage } from './pages/public/LoginPage';

// Student Portal Pages
import { StudentLayout } from './pages/student/StudentLayout';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { CourseRegistrationPage } from './pages/student/CourseRegistrationPage';
import { GradesTranscriptPage } from './pages/student/GradesTranscriptPage';
import { HostelBookingPage } from './pages/student/HostelBookingPage';
import { FinanceFeeLedgerPage } from './pages/student/FinanceFeeLedgerPage';
import { AdmissionLetterPage } from './pages/student/AdmissionLetterPage';

// Staff Portal Pages
import { StaffLayout } from './pages/staff/StaffLayout';
import { StaffDashboard } from './pages/staff/StaffDashboard';
import { GradeEntryPage } from './pages/staff/GradeEntryPage';
import { StudentDirectoryPage } from './pages/staff/StudentDirectoryPage';

// Admin Portal Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CmsManagementPage } from './pages/admin/CmsManagementPage';
import { FinancialOversightPage } from './pages/admin/FinancialOversightPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
          <Navbar />
          <div className="flex-1">
            <Routes>
              {/* Public Routes (No Auth Required) */}
              <Route path="/" element={<HomePage />} />
              <Route path="/schools" element={<SchoolsPage />} />
              <Route path="/admissions" element={<AdmissionsPublicPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Student Portal (Gated to student role) */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<StudentDashboard />} />
                <Route path="courses" element={<CourseRegistrationPage />} />
                <Route path="grades" element={<GradesTranscriptPage />} />
                <Route path="hostel" element={<HostelBookingPage />} />
                <Route path="finance" element={<FinanceFeeLedgerPage />} />
                <Route path="letter" element={<AdmissionLetterPage />} />
              </Route>

              {/* Staff Portal (Gated to faculty, admin, ict-admin) */}
              <Route
                path="/staff"
                element={
                  <ProtectedRoute allowedRoles={['faculty', 'admin', 'ict-admin']}>
                    <StaffLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<StaffDashboard />} />
                <Route path="grades" element={<GradeEntryPage />} />
                <Route path="students" element={<StudentDirectoryPage />} />
              </Route>

              {/* Admin Portal (Gated to admin, ict-admin) */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'ict-admin']}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="cms" element={<CmsManagementPage />} />
                <Route path="finance" element={<FinancialOversightPage />} />
              </Route>

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
