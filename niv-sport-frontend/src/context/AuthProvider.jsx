// src/context/AuthProvider.jsx
import { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminToken') || null;
    }
    return null;
  });

  const login = (token) => {
    localStorage.setItem('adminToken', token);
    setAdminToken(token);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null);
  };

  const isAuthenticated = !!adminToken;

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
