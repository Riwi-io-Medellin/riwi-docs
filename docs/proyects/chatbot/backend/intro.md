---
sidebar_position: 1
---

# Introducción



# Backend del Chatbot de Riwi

Este proyecto implementa el backend del chatbot de **Riwi**, desarrollado en **JavaScript** utilizando **Node.js** y **Express**, con el objetivo de mejorar la interacción con clientes y talento potencial a través de **WhatsApp**. Utilizando la API de WhatsApp y los **webhooks de Microsoft Teams**, el sistema permite notificaciones en tiempo real, además de mantener el flujo de conversaciones gestionado de manera eficiente.

## Tecnologías Utilizadas

- **JavaScript**: Lenguaje principal utilizado en el desarrollo del backend.
- **Node.js y Express**: Framework principal para construir y organizar el backend de manera modular y escalable.
- **API de WhatsApp**: Para establecer la comunicación con los usuarios en WhatsApp y gestionar las conversaciones del chatbot.
- **Webhooks de Microsoft Teams**: Integración para generar notificaciones en tiempo real, alertando al equipo de Riwi sobre interacciones clave.
- **Ngrok**: Herramienta utilizada en el entorno local para exponer de manera segura el servidor y probar el webhook de WhatsApp y Teams.
- **SonarQube**: Aplicación utilizada para la revisión del código y garantizar prácticas de programación limpias y mantenibles.

## Funcionalidades Principales

- **Gestión de Conversaciones Automatizadas**: Permite flujos de conversación personalizados según el tipo de usuario y sus necesidades.
- **Exposición de Webhooks con Ngrok**: En el entorno de desarrollo, Ngrok facilita la prueba de los webhooks de WhatsApp y Teams al exponer el servidor local públicamente de forma segura.
- **Revisión de Código**: SonarQube asegura que el código siga estándares de calidad y limpieza, mejorando la mantenibilidad del proyecto.

