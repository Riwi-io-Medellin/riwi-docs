---
sidebar_position: 1
---

# Introducción

La **infraestructura de Riwi** está diseñada para facilitar el despliegue y la gestión de aplicaciones de software a escala. Aprovechando la potencia y flexibilidad de **[Hetzner](https://www.hetzner.com)** como proveedor de servicios, nuestro sistema garantiza altos niveles de seguridad, escalabilidad y eficiencia operativa. Esta documentación tiene como objetivo proporcionar una **guía completa** para los desarrolladores y administradores que deseen configurar, desplegar y mantener aplicaciones en esta infraestructura. Desde la configuración inicial hasta el monitoreo y la orquestación, encontrarás todo lo necesario para optimizar el flujo de trabajo.

<div style={{ textAlign: 'center' }}>
  <a href="https://www.hetzner.com" target="_blank">
    <img src="/img/hetzner.png" alt="Descripción"  width="200"/>
  </a>
</div>

## Estructura de la Infraestructura y Gestión de Servidores

Riwi cuenta con dos **servidores VPS:** uno dedicado a **producción** y otro configurado como espejo para realizar **fallbacks** en caso de errores o fallos críticos.

### VPS Principal
Está estructurada en las siguientes capas:
  -  **Capa de Persistencia:** Almacena todos los datos críticos, incluyendo bases de datos y archivos esenciales.
  - **Capa de Servicios:** Maneja la lógica de las aplicaciones, conectando la capa de persistencia con las interfaces de usuario.

Esta estructura asegura alta disponibilidad y recuperación rápida ante fallos en producción.