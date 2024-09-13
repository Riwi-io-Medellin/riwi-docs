---
sidebar_position: 1
id: domains
title: Dominios
---

# Dominios

En la infraestructura de **Riwi**, los dominios y subdominios juegan un papel crucial en la organización y el acceso a los diferentes servicios y aplicaciones que ofrecemos. Utilizamos una estructura de subdominios para distinguir claramente entre los distintos entornos y funciones de nuestros servicios. Esto nos permite gestionar eficazmente la infraestructura, separar los entornos de producción y desarrollo, y proporcionar una experiencia de usuario más clara y organizada.

El dominio principal utilizado es `riwi.io`, y a partir de este, creamos varios subdominios para cumplir con diferentes propósitos.

## Nomenclatura de Subdominios

A continuación se detalla la nomenclatura de subdominios utilizada en nuestra infraestructura. Esta estructura nos permite organizar y gestionar eficientemente los diferentes servicios y entornos.

> **Nota:** En todos los subdominios, `app-name` debe ser reemplazado por el nombre específico de la aplicación o dominio correspondiente.

| **Categoría**           | **Subdominio**                  | **Descripción**                                            |
|-------------------------|--------------------------------|------------------------------------------------------------|
| **Backend**             | `service.name-app.riwi.io`       | Dominio para los servicios de backend en producción.      |
|                         | `dev.service.name-app.riwi.io`   | Dominio para los servicios de backend en desarrollo.      |
| **Frontends**           | `name-app.riwi.io`               | Dominio para las aplicaciones frontend en producción.     |
|                         | `dev.name-app.riwi.io`           | Dominio para las aplicaciones frontend en desarrollo.     |
| **Documentación**       | `docs.name-app.riwi.io`          | Dominio para la documentación técnica y guías.            |
| **Monitoring o Dashboard** | `monitoring.riwi.io`          | Dominio para las herramientas de monitoreo y dashboards.   |
| **Pruebas (Staging)**   | `staging.name-app.riwi.io`       | Dominio para el entorno de pruebas y staging.             |
| **Soporte**             | `support.name-app.riwi.io`       | Dominio para los servicios de soporte y atención al cliente.|
| **Blog**                | `blog.name-app.riwi.io`          | Dominio para el blog corporativo.           |
| **Interno**             | `internal.name-app.riwi.io`      | Dominio para recursos internos y herramientas de equipo.   |
| **Seguridad**           | `security.name-app.riwi.io`      | Dominio para herramientas y servicios de seguridad.        |

Esta estructura ayuda a mantener una clara separación de responsabilidades y facilita la administración y acceso a los diferentes servicios y entornos.

> Nota: Los dominios de desarrollo (`dev.*`) se utilizan para pruebas y no deben ser considerados en el entorno de producción.

## Configuración de Subdominios

Para cada subdominio mencionado anteriormente, es necesario configurarlo correctamente en el DNS y en el servidor para asegurar su funcionamiento adecuado:

1. **Creación de Subdominio**: Se debe crear cada subdominio a partir del dominio principal (`riwi.io`). Esto se realiza a través de la configuración de registros DNS en el panel de administración del proveedor de DNS. Para cada subdominio, se debe crear un registro A que apunte a la dirección IP del servidor correspondiente.

2. **Redireccionamiento del Servidor**: Una vez creado el subdominio y configurado el registro DNS, el servidor debe estar configurado para manejar el tráfico dirigido a ese subdominio. Generalmente, esto se hace mediante un proxy reverso, con **Nginx**.

3. **Proxy Reverso**: El servidor, utilizando un proxy reverso, redireccionará las solicitudes del subdominio al puerto o servicio adecuado en el backend. Por ejemplo, si el subdominio `service.app-name.riwi.io` apunta a un servidor que ejecuta un servicio de backend en el puerto 8080, el proxy reverso se encargará de redirigir el tráfico recibido en `service.app-name.riwi.io` al puerto 8080. 
Para detalles sobre la configuración del proxy reverso, consulta la sección [Configuración del Proxy Reverso](./proxy_reverse.md).

Esta configuración asegura que cada subdominio sea correctamente dirigido al servidor y servicio adecuado, facilitando la gestión y accesibilidad de los diferentes componentes de nuestra infraestructura.
