// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // 🚫 Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 🚫 Role mismatch
  if (role && user.role !== role) {
    return user.role === 'admin' ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/personaldetails" />
    );
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;
