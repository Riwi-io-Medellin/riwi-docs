// src/pages/logout.tsx
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Logout: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    // Eliminar la cookie de autenticación
    Cookies.remove("authToken");

    toast.success("Sesión cerrada correctamente");
    // Redirigir al usuario a la página de login
    history.push("/login");

  }, [history]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Cerrando sesión...</h1>
    </div>
  );
};

export default Logout;
