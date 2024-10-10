---
sidebar_position: 1
id: glossary
title: Glosario
---
# Glosario de Términos

Aquí encontrarás una recopilación de términos clave utilizados en nuestra infraestructura y proyectos. Estos conceptos son fundamentales para comprender cómo gestionamos nuestros servicios y aplicaciones en Riwi.

:::tip  
Mantén este glosario a mano para familiarizarte rápidamente con los términos técnicos y facilitar la colaboración dentro del equipo.  
:::

### SSH (Secure Shell)  
Protocolo criptográfico que permite la **comunicación segura** entre dos dispositivos a través de una red no segura. Es utilizado principalmente para **acceso remoto** a servidores.


### VPS (Virtual Private Server)  
Un **servidor virtualizado** que funciona como un servidor físico dedicado, pero compartiendo recursos con otros VPS en el mismo hardware. Ideal para proyectos que necesitan flexibilidad y control sin el costo de un servidor físico.

:::tip  
Los VPS son útiles para proyectos que necesitan escalabilidad sin la inversión inicial de servidores físicos completos.  
:::

### PuTTY  
Cliente SSH gratuito que permite realizar **conexiones remotas** a servidores desde Windows, utilizando protocolos como SSH, Telnet o SFTP. Es una herramienta esencial para administradores de sistemas que gestionan servidores remotos.

### Fallback  
Mecanismo de **recuperación** que entra en acción cuando un servidor principal falla, asegurando la **continuidad de los servicios**. Es una práctica clave en infraestructuras críticas para minimizar el tiempo de inactividad.

### Capa de Persistencia  
Parte de la arquitectura de un servidor encargada de **almacenar y gestionar datos** críticos, como bases de datos. Asegura que la información permanezca disponible y segura a lo largo del tiempo.

### Capa de Servicios  
Capa encargada de gestionar la **lógica de las aplicaciones** y las conexiones entre la capa de persistencia y las interfaces de usuario, facilitando la interacción entre el frontend y los datos almacenados.

### Docker  
Plataforma de **contenedores** que permite empaquetar y ejecutar aplicaciones en entornos aislados. Facilita la portabilidad y escalabilidad de aplicaciones en diversos entornos sin problemas de compatibilidad.

### Docker Swarm  
Orquestador de contenedores integrado en Docker, que permite gestionar **clústeres** de contenedores para desplegar aplicaciones de forma distribuida. Ofrece una solución de alta disponibilidad para aplicaciones críticas.

### Grafana  
Herramienta de **código abierto** para el monitoreo y visualización de métricas. Es muy utilizada para crear **dashboards** y alertas basadas en datos en tiempo real, ayudando en la toma de decisiones informadas.

:::info  
Usa Grafana para detectar rápidamente anomalías en el comportamiento de los servicios y mejorar la observabilidad.  
:::

### CI/CD (Integración Continua/Despliegue Continuo)  
Práctica de desarrollo que permite la integración automática de cambios en el código y su **despliegue continuo** en producción. Facilita la entrega rápida de nuevas funcionalidades y la detección temprana de errores.

### Orquestación  
Proceso automatizado de **gestión, coordinación y configuración** de múltiples contenedores o aplicaciones dentro de un clúster. Es crucial para manejar entornos de alta complejidad y garantizar la escalabilidad.
