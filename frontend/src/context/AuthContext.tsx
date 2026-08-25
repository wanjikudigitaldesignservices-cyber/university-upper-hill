import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { api } from '../services/api';
import {
  INITIAL_STUDENT_USER,
  INITIAL_FACULTY_USER,
  INITIAL_ADMIN_USER,
  INITIAL_ICT_USER,
} from '../services/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: string) => Promise<void>;
  quickLogin: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => api.getCurrentUser());

  const login = async (email: string, role?: string) => {
    const res = await api.login(email, role);
    setUser(res.user);
  };

  const quickLogin = (role: UserRole) => {
    let selected: User = INITIAL_STUDENT_USER;
    if (role === 'faculty') selected = INITIAL_FACULTY_USER;
    if (role === 'admin') selected = INITIAL_ADMIN_USER;
    if (role === 'ict-admin') selected = INITIAL_ICT_USER;

    localStorage.setItem('uuh_current_user', JSON.stringify(selected));
    setUser(selected);
  };

  const logout = () => {
    localStorage.removeItem('uuh_current_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        quickLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
