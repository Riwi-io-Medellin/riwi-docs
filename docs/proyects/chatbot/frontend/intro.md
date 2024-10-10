---
sidebar_position: 1
---

# Introducción

Este proyecto es la interfaz frontend del sistema de chatbot de **Riwi**, desarrollado en **Angular**. Sirve como un **dashboard de administración** que permite a los administradores revisar el historial de mensajes, gestionar documentos y realizar ajustes en el flujo de conversación del chatbot. Con esta herramienta, los administradores pueden optimizar y personalizar la interacción del chatbot, asegurando una comunicación eficiente y adaptada a las necesidades de los usuarios.

## Objetivos del Frontend

- **Autenticación Segura**: Asegurar que solo los administradores autorizados puedan acceder al dashboard mediante **Centinela**.

- **Gestión del Historial de Mensajes**: Proporcionar a los administradores acceso a un historial detallado de interacciones, permitiendo analizar y optimizar las respuestas del chatbot según las tendencias de consulta de los usuarios.

- **Modificación de Documentos**: Facilitar la administración y edición de documentos en el flujo de conversación, asegurando que el contenido se mantenga actualizado y relevante para el usuario final.

- **Edición del Flujo de Conversación**: Permitir ajustes en el flujo de conversación para mejorar la experiencia del usuario, adaptando las respuestas del chatbot a las necesidades cambiantes de los clientes y a las políticas de comunicación de Riwi.

- **Experiencia de Usuario Intuitiva para Administradores**: Ofrecer una interfaz fácil de usar para que los administradores puedan realizar tareas de gestión sin dificultades, optimizando la eficiencia operativa.


## Características Principales

- **Angular** como framework para el desarrollo de la interfaz.
- **Gestión de autenticación** mediante **Centinela**:
  - Implementación de inicio de sesión y protección de rutas.
  - Validación de usuarios para un acceso seguro.
- **Interfaz de usuario personalizada** que permite navegar por las opciones del chatbot de manera amigable.

## Arquitectura de la Aplicación

El frontend está organizado en módulos para facilitar el mantenimiento y escalabilidad. Se compone de los siguientes módulos clave:
- **Login**: Interfaz de autenticación con integración a **Centinela**.
- **Chatbot Interface**: Módulo para la interacción de los administradores con el chatbot.
- **Servicios**: Gestión de llamadas a la API del backend para asegurar una comunicación eficaz.



