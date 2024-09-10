---
sidebar_position: 2
id: connection
title: Conexion al servidor
---

# Conexion al servidor

:::info
Para poder realizar una conexión al servidor, previamente debe contar con un **usuario** y **contraseña** proporcionados por el administrador de la infraestructura. Asegúrate de tener estas credenciales antes de intentar conectarte.
:::


## Conexion SSH por consola
1. Abre la **PowerShell** de Windows o **Command Prompt**.
2. Ejecuta el siguiente comando, reemplazando `your_username` por tu usuario, ademas de agregar la ip del servidor `5.161.245.18`:

```.bash
ssh your_username@5.161.245.18
```
3. Si es la primera vez que te conectas, te pedirá confirmar la autenticidad del servidor. Escribe `yes` y presiona **Enter**.
4. Ingresa tu contraseña cuando te la solicite.

## Conexion por putty
**PuTTY**  es una herramienta de software libre que permite realizar conexiones a servidores remotos usando el protocolo SSH desde sistemas operativos Windows. Es ideal para acceder a servidores y manejar comandos de manera segura a través de una red.
1. Descarga e instala **[Putty](https://www.putty.org/)**.
2. Abre PuTTY e introduce la IP del servidor en el campo **"Host Name"**.
3. Selecciona **"SSH"** como tipo de conexión y el puerto (por defecto, 22).
4. Haz clic en **Open**.
5. **Introduce tu usuario** y **contraseña** proporcionados por el administrador de la infraestructura.
6. Una vez autenticado, tendrás acceso al servidor.

<div style={{ textAlign: 'center' }}>
    <img src="/img/putty.png" alt="Descripción"  width="400"/>
</div>
