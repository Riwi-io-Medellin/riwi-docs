import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Para manejar cookies
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  email: string;
  exp: number;
}

export default function useAuth() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(window.location.pathname === '/login'){
        setLoading(false);
        return;
    }

    const token = Cookies.get('authToken');  // Extraer el token de las cookies
    if (!token) {
      // Si no hay token, redirigir a login
      window.location.href = '/login';
      return;
    }

    try {
      // Decodificar el JWT para obtener la información
      const decodedToken = jwtDecode<DecodedToken>(token);
      console.log(decodedToken)

    //   // Verificar si el token ha expirado
      const currentTime = Date.now() / 1000;  // Obtener el tiempo actual en segundos
      if (decodedToken.exp < currentTime) {
        Cookies.remove('authToken');  // Eliminar token expirado
        window.location.href = '/login';  // Redirigir a login si el token ha expirado
        return;
      }

    //   // Verificar si el correo tiene el dominio permitido
      const emailDomain = decodedToken.email.split('@')[1];
      if (emailDomain !== 'riwi.io') {
        Cookies.remove('authToken');  // Eliminar token si el dominio no coincide
         window.location.href = '/login';
        return;
      }

      // Si todo es válido, dejar de cargar
      setLoading(false);

    } catch (error) {
      // En caso de error (por ejemplo, token mal formado), redirigir a login
      Cookies.remove('authToken');
      window.location.href = '/login';

    }
  }, []);

  return loading;  // Devuelve el estado de carga
}
