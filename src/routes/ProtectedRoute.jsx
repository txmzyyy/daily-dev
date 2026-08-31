import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({
  allowedRoles = [],
}) {
  const location = useLocation();

  const {
    user,
    token,
    isAuthenticated,
  } = useSelector(
    (state) => state.auth
  );

  // NOT LOGGED IN
  

  if (!isAuthenticated || !token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }
  // ACCOUNT DEACTIVATED

if (user.is_active === false) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ROLE CHECK

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    
    if (user.role === 'admin') {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }

    if (user.role === 'writer') {
      return (
        <Navigate
          to="/writer/dashboard"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/feed"
        replace
      />
    );
  }

  return <Outlet />;
}