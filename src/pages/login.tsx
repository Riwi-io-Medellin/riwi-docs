import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/login.css";
import AuthService from "../services/auth.service";
import Cookies from "js-cookie";
import {  toast } from 'react-toastify';


const Login: React.FC = () => {

  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await AuthService.loginMicrosoft();
      if (user.email.split("@")[1] !== "riwi.io") {
        setError("Tu correo electrónico no es válido para acceder a esta aplicación");
        return;
      }

      Cookies.set("authToken", await user.getIdToken(), {
        expires: 1 / 24, // 1 hora (1/24 de un día)
        secure: true, // Solo se envía por HTTPS
        sameSite: "Strict", // Protege contra ataques CSRF
      });
      toast.success("Inicio de sesión exitoso!");

      history.push("/");
    } catch (error) {
      setErrorMessage("Ocurrió un error al iniciar sesión");
    }
  };

  const setErrorMessage = (message: string) => { 
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  }

  return (
    <main className="login-container">
      <section className="card">
        <header className="card-header">
          <h1 className="logo">
            <img src="/img/logo_riwi.webp" alt="Riwi logo" width={230} />
          </h1>
          <h2 className="card-title">Documentación Tecnica Riwi</h2>
        </header>
        <p className="card-description">
          Acceso exclusivo para cuentas corporativas de Microsoft
        </p>
        <button className="microsoft-button" onClick={handleLogin}>
          <svg
            className="microsoft-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23 23"
          >
            <path fill="#f3f3f3" d="M0 0h23v23H0z" />
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
          Iniciar sesión con Microsoft
        </button>
        {error && <p className="error-message">{error}</p>}
        <footer className="card-footer">
          <p>Si tienes problemas para acceder, <br /> contacta a <a target="_blank" href="https://helpdesk.riwi.info/">soporte técnico</a></p>
        </footer>
      </section>
    </main>
  );
};

export default Login;
