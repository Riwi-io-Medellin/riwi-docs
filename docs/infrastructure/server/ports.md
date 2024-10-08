---
sidebar_position: 2
id: ports
title: Puertos
---

# Puertos

Un puerto es un punto de acceso lógico que permite la **comunicación entre diferentes aplicaciones o servicios dentro de una red**. Cada puerto está asociado a un número que permite identificar de manera única un servicio específico en un servidor, facilitando la comunicación efectiva entre dispositivos y aplicaciones. Los puertos se utilizan para diferenciar las conexiones entre varios servicios, como servidores web, bases de datos y otros servicios de red.


:::warning  
🔑 Recuerda siempre **cerrar los puertos** que no estés utilizando para reducir la superficie de ataque y mejorar la seguridad de tu servidor. 
:::

## Puertos en el servidor de riwi

En Riwi, los puertos juegan un papel fundamental en la gestión de nuestras aplicaciones y servicios. Nuestra infraestructura está compuesta por diferentes aplicaciones que interactúan entre sí, y cada una de ellas requiere un puerto específico para asegurar una comunicación adecuada y sin interferencias.

Para garantizar un flujo de trabajo eficiente, Riwi utiliza una estrategia de asignación de puertos bien definida. Algunos de los puertos comunes que empleamos incluyen:

- 🔒**Puertos para aplicaciones internas:** Usamos puertos específicos para cada una de nuestras aplicaciones internas, lo cual nos permite segmentar cada servicio y evitar conflictos entre ellos. Por ejemplo, aplicaciones backend podrían estar corriendo en el puerto 3000, mientras que los servicios de bases de datos se gestionan en puertos distintos como el 5432 para PostgreSQL.

- 🌐**Puertos para el acceso público:** Algunos servicios de Riwi necesitan ser accesibles desde el exterior, por lo cual asignamos puertos públicos que permiten a nuestros usuarios interactuar con la infraestructura de manera segura. Estos puertos están protegidos mediante reglas de firewall y políticas de seguridad para asegurar la integridad de nuestra infraestructura.

Además, utilizamos configuraciones de **proxy reverso** para que el acceso a nuestros servicios a través de los puertos sea más seguro y eficiente. Estas configuraciones permiten enrutar el tráfico desde un puerto específico a diferentes aplicaciones según las necesidades de nuestra infraestructura.

### Tabla de asignacion de puertos

| Rango de Puertos   | Uso                                      |
|--------------------|-----------------------------------------|
| 3000-3999          | Servicios y aplicaciones en desarrollo  |
| 4000-4999          | Producción, APIs públicas, servicios externos y servicios de autenticación y seguridad |
| 6000-6999          | Servicios de prueba (testing)           |
| 7000-7999          | Microservicios                          |
| 8000-8999          | Proxies y servidores de archivos        |
| 9000-9999          | Monitoreo y herramientas de análisis       |
| 11000-11999        | Servicios de mensajería y notificaciones|
| 13000-13999        | Servicios de balanceo de carga          |
| 14000-14999        | Servicios de backup y recuperación      |

:::info
💡 **Consejo práctico:** Implementa reglas de **firewall** estrictas para proteger los puertos de acceso público y ayudate de las herramientas de monitoreo instaladas en el servidor como el es caso de Prometheus para detectar cualquier actividad sospechosa en los puertos abiertos.
:::

## Servicios en el servidor

A continuación, se detallan los servicios que actualmente están desplegados en nuestro servidor, junto con los puertos que utilizan:

| Puerto | Plataforma o Servicio       | Ambiente | Dominio                           |
|--------|-----------------------------|----------|-----------------------------------|
| 22     | SSH                         | n/a      | n/a                               |
| 80     | Nginx - Proxy Reverse       | n/a      | n/a                               |
| 443    | Nginx - Proxy Reverse SSL   | n/a      | n/a                               |
| 3000   | Grafana                     | n/a      | n/a                               |
| 3500   | Coworking Backend           | `PROD`     | [service.coworking.riwi.io](https://service.coworking.riwi.io)         |
| 3501   | Coworking Backend           | `DEV`      | [dev.service.coworking.riwi.io](https://dev.service.coworking.riwi.io)  |
| 4001   | Riwi Docs                   | `PROD`     | [docs.riwi.io](https://docs.riwi.io)                      |
| 4010   | Centinela Backend           | `PROD`     | [service.centinela.riwi.io](https://service.centinela.riwi.io)         |
| 4011   | Mongo Centinela             | `PROD`     | n/a                               |
| 4018   | Chatbot Backend             | `PROD`     | [service.chatbot.riwi.io](https://service.chatbot.riwi.io)           |
| 4020   | Certificador Backend        | `PROD`     | [certificador.riwi.io](https://certificador.riwi.io)              |
| 4021   | Mongo Certificador          | `PROD`     | n/a                               |
| 5430   | Postgres Coworking          | `PROD`     | n/a                               |
| 5433   | Postgres Coworking          | `DEV`      | n/a                               |
| 8000   | Portainer                   | n/a      | n/a                               |
| 8091   | File Server Coworking       | `PROD`     | n/a                               |
| 8092   | File Server Coworking       | `DEV`      | n/a                               |
| 9000   | Portainer                   | n/a      | n/a                               |
| 9090   | Prometheus                  | n/a      | n/a                               |
| 9100   | Node-Exporter               | n/a      | n/a                               |
| 9443   | Portainer                   | n/a      | n/a                               |

Estos puertos están especificados en las configuraciones de Docker en cada proyecto y se utilizan para implementar el **proxy reverso**. En nuestro entorno, Docker permite gestionar de manera eficiente cada uno de estos servicios, asignando los puertos correspondientes a los contenedores para que puedan ser accesibles de forma segura. Además, el uso del **proxy reverso** facilita el direccionamiento del tráfico entrante hacia los servicios correctos, asegurando que las peticiones lleguen al destino adecuado dentro de la infraestructura.