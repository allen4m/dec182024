import React from 'react';
import { Navigate } from 'react-router-dom';
import { useBlogStore } from '../../store/blog';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useBlogStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}