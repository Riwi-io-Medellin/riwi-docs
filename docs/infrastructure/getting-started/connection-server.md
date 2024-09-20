---
sidebar_position: 2
id: connection
title: Conexión al servidor
---

# Conexión al servidor

La **conexión al servidor** es el proceso que permite a los usuarios acceder a un servidor remoto para gestionar y controlar aplicaciones, bases de datos, o infraestructura. A través de la conexión SSH, es posible interactuar con el servidor de manera segura utilizando la **terminal** o herramientas específicas como **PuTTY** o **Terminus**.

:::info
Para poder realizar una conexión al servidor, previamente debes contar con un **usuario** y **contraseña** proporcionados por el administrador de la infraestructura. Asegúrate de tener estas credenciales antes de intentar conectarte. Si no tienes tus credenciales aun puedes solicitarlas **[aqui](https://helpdesk.riwi.info/)**
:::


## Conexión SSH por consola
1. Abre la **PowerShell** de Windows o **Command Prompt**.
2. Ejecuta el siguiente comando, reemplazando `your_username` y `your_server_ip` por tu usuario y la direccion ip del servidor:

```.bash
ssh your_username@your_server_ip
```
3. Si es la primera vez que te conectas, te pedirá confirmar la autenticidad del servidor. Escribe `yes` y presiona **Enter**.
4. Ingresa tu contraseña cuando te la solicite.

## Conexión por putty
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

## Conexión con Terminus

**Terminus** es una terminal moderna, multiplataforma y altamente personalizable que permite realizar conexiones SSH de manera eficiente y con una interfaz atractiva.

Pasos para conectarte usando **Terminus**:

1. Descarga e instala **[termius](https://termius.com/download/windows)**.
2. Abre **Terminus** y selecciona la opción **New Connection**.
3. Introduce el **nombre de usuario**, **IP del servidor**, y selecciona **SSH** como el protocolo.
4. Haz clic en **Connect**.
5. Ingresa tu **contraseña** cuando te la solicite, y tendrás acceso al servidor.