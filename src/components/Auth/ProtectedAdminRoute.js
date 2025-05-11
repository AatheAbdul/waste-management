import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;