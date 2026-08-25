import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user is a student trying to access staff or admin, redirect to student portal
    if (user.role === 'student') {
      return <Navigate to="/student" replace />;
    }
    // If user is faculty trying to access admin, redirect to staff portal
    if (user.role === 'faculty') {
      return <Navigate to="/staff" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
