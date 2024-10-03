import React from 'react';
import useAuth from '../hooks/use-auth';

export default function Root({ children }) {
  const loading = useAuth();

  if (loading) {

    return <div>Cargando...</div>;
  }

  return <>{children}</>;
}
