import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/login.css";
import AuthService from "../services/auth.service";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await AuthService.loginMicrosoft();
      if (user.email.split("@")[1] !== "riwi.io") {
        setError("Solo se permiten correos de la empresa");
        return;
      }

      Cookies.set("authToken", await user.getIdToken(), {
        expires: 1 / 24, // 1 hora (1/24 de un día)
        secure: true, // Solo se envía por HTTPS
        sameSite: "Strict", // Protege contra ataques CSRF
      });
      
      window.location.href = "/";
    } catch (error) {}
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Documentacion Riwi</h2>

        <button type="button" onClick={handleLogin}>Iniciar sesion con microsoft</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
