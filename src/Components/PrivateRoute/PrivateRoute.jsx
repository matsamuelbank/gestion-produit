import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//composant qui gère les routes privée, routes accecible que si on est connecté
export function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.USERINFO.userInfo.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/" />;
}
 