---
sidebar_position: 3
id: server
title: Proxy Reverso
---

# Proxy Reverso

Un **proxy reverso** es un servidor que se sitúa entre los clientes y los servicios, y se encarga de redirigir las solicitudes de los clientes al servidor adecuado. Actúa como intermediario, gestionando el tráfico y dirigiéndolo a los servicios correspondientes basándose en la configuración establecida. Además, puede proporcionar funciones adicionales como balanceo de carga, caching y seguridad.

En nuestra infraestructura, utilizamos un proxy reverso para redirigir las solicitudes que llegan a nuestros subdominios a los puertos o servicios adecuados en el servidor backend. Esto permite que cada subdominio sea manejado correctamente y asegura que las solicitudes sean dirigidas al servicio correcto.

## Configuración del Proxy Reverso

Esta sección proporciona una guía paso a paso para configurar Nginx como proxy reverso, incluyendo la instalación, configuración básica y detalles adicionales. Asegúrate de personalizar `{subdomain}` y `{nameapp}` según sea necesario.

:::info
    **Asegúrate de que el Subdominio esté Configurado y Propagado Correctamente**: Antes de configurar el proxy reverso, asegúrate de que el subdominio esté creado y apuntando al servidor correcto mediante un registro **A** en el DNS. La configuración del proxy reverso solo funcionará si el subdominio ya está correctamente apuntado a la **dirección IP del servidor**.

    Para mas informacion sobre la configuración y nomenclatura, consulta la sección de  [Dominios](./domains.md).
:::

Para configurar el proxy reverso, sigue estos pasos generales:


1. **Conectante al servidor:** Para mas informacion sobre como conectarte al servidor, consulta la sección de  [Conexión al servidor](../getting-started/connection-server.md).

2. **Instalación del Proxy Reverso**:  

    Configura **Nginx** para manejar las solicitudes del subdominio y redirigirlas al servicio correspondiente en el backend. Aquí te mostramos cómo hacerlo:

- **Paso 1: Crea o edita el archivo de configuración de Nginx**.  Puedes encontrar los archivos de configuración en `/etc/nginx/sites-available/` y `/etc/nginx/sites-enabled/`. Crea un nuevo archivo de configuración para tu subdominio o edita el archivo predeterminado.

```bash
sudo nano /etc/nginx/sites-available/{subdomain}.{nameapp}.riwi.io
```

**Paso 2: Añade la siguiente configuración:**

```bash title="{subdomain}.{nameapp}.riwi.io"
server {
       server_name {subdomain}.{nameapp}.riwi.io; # Reemplaza por el subdominio a configurar
       location / {
               proxy_pass http://localhost:{port}; # Reemplaza {port} con el puerto del servicio
               proxy_http_version 1.1;
               proxy_set_header Upgrade $http_upgrade;
               proxy_set_header Connection 'upgrade';
               proxy_set_header Host $host;
               proxy_cache_bypass $http_upgrade;
       }
}
```
- `server_name`: Especifica el subdominio para el cual se aplicará esta configuración.
- `proxy_pass`: Redirige las solicitudes a la dirección del servicio backend en el puerto especificado.
- `proxy_set_header`: Configura los encabezados que se deben enviar al backend para mantener la información original de la solicitud.

**Paso 3: Habilita la configuración creando un enlace simbólico en sites-enabled:**

```bash
sudo ln -s /etc/nginx/sites-available/{subdomain}.{nameapp}.riwi.io /etc/nginx/sites-enabled/
```

**Paso 4: Verifica la configuración para asegurarte de que no haya errores:**

```bash
sudo nginx -t
```

**Paso 5: Recarga Nginx para aplicar los cambios:**
```bash
sudo systemctl reload nginx
```

**Paso 6: Verificación:** Después de realizar la configuración, prueba acceder al subdominio desde un navegador para verificar que las solicitudes se dirijan al servicio correcto.


## Configuración de Certificados SSL con Certbot

Para asegurar las comunicaciones entre los clientes y tus servicios, es importante configurar certificados **SSL/TLS**. **Certbot** es una herramienta gratuita y automatizada que facilita la obtención y renovación de certificados SSL de Let's Encrypt.

En esta sección, te guiaremos a través del proceso de configuración de un certificado SSL con Certbot para un dominio y subdominio en un servidor que utiliza Nginx.

### Requisitos Previos

- **Nginx instalado**: Asegúrate de que Nginx esté instalado y funcionando en tu servidor.
- **Proxy reverso configurado**: Asegúrate de que el proxy reverso del dominio o subdominio esté creado y configurado, [Configuración del Proxy Reverso](#configuración-del-proxy-reverso).

### Pasos para obtener un certificado SSL

1. **Instalar el certificado SSL**

    para obtener un certificado SSL para el subdominio ejecuta el siguiente comando, remplazando `{subdomain}.{nameapp}.riwi.io` por el dominio o subdominio a certificar.

    ```bash
    sudo certbot --nginx -d {subdomain}.{nameapp}.riwi.io
    ```

    - `--nginx:` Indica a Certbot que utilice el plugin de Nginx para configurar automáticamente el certificado.
    - `-d:` Especifica el dominio para el que deseas obtener el certificado.

2.  **Configuración Automática de SSL en Nginx**

    Certbot puede configurar automáticamente Nginx para usar el nuevo certificado SSL. Durante el proceso de obtención del certificado, Certbot detectará la configuración de Nginx y actualizará los archivos de configuración necesarios.

3. **Verificar la Configuración de SSL**

    Después de que Certbot haya instalado el certificado y configurado Nginx, verifica que el certificado esté funcionando correctamente. Puedes hacer esto accediendo a tu subdominio desde un navegador y comprobando que la conexión esté asegurada (busca el candado en la barra de direcciones).

4. **Configuración de Renovación Automática**

    Certbot configura automáticamente un cron job para renovar el certificado antes de que expire. Para verificar que la renovación automática está configurada correctamente, puedes ejecutar el siguiente comando para probar la renovación:

    ```bash
    sudo certbot renew --dry-run
    ```
    Este comando simula el proceso de renovación para asegurarse de que todo esté configurado correctamente.