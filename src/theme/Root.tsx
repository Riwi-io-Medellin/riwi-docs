import React from 'react';
import useAuth from '../hooks/use-auth';

export default function Root({ children }) {
  const loading = useAuth();  // Obtiene el estado de carga desde el hook

  if (loading) {
    // Puedes mostrar un spinner o pantalla de carga aquí
    return <div>Cargando...</div>;
  }

  // Solo renderiza los hijos si no está cargando (autenticación ya verificada)
  return <>{children}</>;
}
