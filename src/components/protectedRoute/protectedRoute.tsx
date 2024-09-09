import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Если пользователь не авторизован, перенаправить на страницу логина
   return <Navigate to="/login"  />;
  }

  // Если пользователь авторизован, отобразить содержимое маршрута
  return children;
};
