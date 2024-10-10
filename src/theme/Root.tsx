import React from 'react';
import useAuth from '../hooks/use-auth';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';

export default function Root({ children }) {
  const loading = useAuth();

  if (loading) {

    return <div>Cargando...</div>;
  }

  return <>
      <ToastContainer />

  {children}
  </>;
}
