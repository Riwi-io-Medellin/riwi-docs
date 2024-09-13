---
sidebar_position: 1
id: docker
title: Docker
---

# Docker

**Docker** es una plataforma de software que permite crear, desplegar y ejecutar aplicaciones en contenedores. Un contenedor es una unidad estándar de software que empaqueta el código, las bibliotecas y las dependencias necesarias para que una aplicación se ejecute de manera consistente en diferentes entornos. Docker facilita la creación y gestión de entornos de desarrollo, pruebas y producción sin tener que preocuparse por las diferencias en las configuraciones de los sistemas operativos subyacentes.

## ¿Cómo Funciona Docker?
- **Imágenes Docker:** Son plantillas de solo lectura que contienen todo el código, bibliotecas y configuraciones necesarios para ejecutar una aplicación. Las imágenes se crean a partir de un archivo llamado Dockerfile.

- **Contenedores Docker:** Son instancias en ejecución de una imagen Docker. Los contenedores son ligeros y se ejecutan de manera aislada del sistema operativo host, lo que permite una mayor portabilidad.

- **Docker Hub:** Es un registro en línea que almacena y distribuye imágenes Docker. Puedes usar Docker Hub para compartir imágenes públicas o privadas.

## ¿Qué es Dockerizar?


Dockerizar una aplicación implica empaquetarla junto con todas sus dependencias, configuraciones y entorno en un contenedor Docker, asegurando que pueda ejecutarse en cualquier lugar de manera consistente. Cada contenedor se crea a partir de un **Dockerfile**, que define las instrucciones paso a paso para construir la imagen.

## Dockerizar una Aplicación .NET Core

1. **Primera etapa (build):** Usamos la imagen de SDK de .NET para compilar y publicar la aplicación.
2. **Segunda etapa:** Usamos la imagen más ligera de ASP.NET Core para ejecutar la aplicación, copiando solo los archivos necesarios desde la etapa de compilación.
3. **EXPOSE** indica que la aplicación se ejecutará en el puerto 80.
4. **ENTRYPOINT** define el comando para iniciar la aplicación .dll.

```dockerfile title="Dockerfile"
# Primera etapa: Construcción de la imagen
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copia y restaura las dependencias de .NET
COPY *.csproj .
RUN dotnet restore

# Copia el resto del código y compila la aplicación
COPY . .
RUN dotnet publish -c Release -o out

# Segunda etapa: Ejecutar la aplicación
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 80
ENTRYPOINT ["dotnet", "YourApp.dll"]
```

## Dockerizar una Aplicación Node.js

1. **Imagen base:** Usa Node.js 18.
2. **WORKDIR:** Establece el directorio de trabajo en `/app`.
3. **COPY:** Copia package.json y `package-lock.json` para instalar dependencias con `npm install`.
4. **EXPOSE:** Abre el puerto 3000.
5. **CMD:** Define el comando para ejecutar la aplicación usando `npm start`.

```dockerfile title="Dockerfile"
FROM node:18-alpine3.15

WORKDIR /app
# Copia el archivo de dependencias y realiza la instalación
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos de la aplicació
COPY . .

RUN npm run build
# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000
CMD ["npm", "start"]
```


## Dockerizar una Aplicación Spring Boot

1. **Imagen base:** Usa una imagen ligera de OpenJDK 17 en Alpine.
2. **COPY:** Copia el archivo JAR generado en el directorio `target` de tu aplicación Spring Boot.
3. **EXPOSE:** Abre el puerto 8080, que es el puerto donde Spring Boot ejecuta la aplicación por defecto.
4. **ENTRYPOINT:** Define el comando para ejecutar la aplicación con `java -jar`.

```dockerfile title="Dockerfile"
FROM openjdk:17-jdk-alpine

WORKDIR /app

# Copia el archivo JAR construido en el directorio target
COPY target/myapp.jar /app/myapp.jar

# Expone el puerto 8080 para la aplicación
EXPOSE 8080

# Define el comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app/myapp.jar"]

```

## Dockerizar Frontend

Para un **Dockerfile** que funcione para cualquier aplicación **frontend**, puedes generalizar el proceso de construcción y servir los archivos estáticos, independientemente de si es React, Angular, Vue u otro framework. Aquí tienes un ejemplo adaptable:

1. **Dockerfile para Frontend**

En la raiz de tu proyecto crea un archivo llamado `Dockerfile` y escribe el siguiente codigo

```dockerfile title="Dockerfile"
# Utilizar una imagen base de Node.js
FROM node:latest

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Utilizar una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar el código fuente compilado a la carpeta de Nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
```

- **Primera etapa:** Usa Node.js para instalar dependencias y construir la aplicación en modo producción.
- **Segunda etapa:** Usa Nginx para servir los archivos estáticos generados en la etapa de construcción.
- Se expone el puerto 80 para servir la aplicación.

2. **nginx.conf:** Configuración del Servidor Nginx

En la raiz de tu proyecto crea un archivo llamado `nginx.conf` y escribe el siguiente codigo

```conf title="nginx.conf"
http {

  include mime.types;

  set_real_ip_from        0.0.0.0/0;
  real_ip_recursive       on;
  real_ip_header          X-Forward-For;
  limit_req_zone          $binary_remote_addr zone=mylimit:10m rate=10r/s;

  server {
    listen 80;
    server_name localhost;
    root /proxy;
    limit_req zone=mylimit burst=70 nodelay;

    location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
            try_files $uri /index.html;   
        }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
  }
}

events {}
```

- Define cómo Nginx maneja las solicitudes HTTP y sirve los archivos estáticos.
- `try_files $uri /index.html` permite el enrutamiento en frontend con SPA (Single Page Application).