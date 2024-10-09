---
sidebar_position: 4
id: estructure
title: Estructura general del proyecto
---
Este proyecto implementa un chatbot para WhatsApp utilizando Node.js y Express, aprovechando la API de WhatsApp Business para interactuar con los usuarios. La estructura del proyecto se organiza en carpetas clave, lo que permite una separación de responsabilidades y facilita la escalabilidad y el mantenimiento.

### Estructura de carpetas y archivos
<div style={{ textAlign: 'center' }}>

    <img src="/img/ArquitecturaCarpetas.png" alt="Descripción"  width="650"/>
  
</div>
- **app.js**: Archivo principal del proyecto que se encarga de inicializar el servidor Express y cargar las rutas de la API de WhatsApp.
- **controllers/** : Contiene los controladores de la aplicación, que son responsables de recibir las solicitudes de WhatsApp, procesar los mensajes y delegar las tareas a los servicios correspondientes para determinar la respuesta adecuada. Cada controlador se enfoca en un aspecto específico de la lógica de negocio del chatbot.
        - **message-controllers/** : Son los encargados de contener los mensajes del flujo del chatbot y sus mensajes de salida del chatbot, que pueden ser respuestas a las consultas del usuario o notificaciones de eventos específicos.
        - **webhook-controllers/** : Contiene la logica principal del chatbot, la cual se encarga de recibir los mensajes de entrada y dependiendo de la opcion se ejecuta los ````message-controllers```` correspondientes.

- **services/** : Aquí se encuentran los servicios, que encapsulan la lógica de negocio más compleja y la hacen reutilizable. Los servicios realizan tareas específicas, como procesar el flujo de conversación, gestionar respuestas a botones interactivos o realizar consultas a la base de datos.
        - **team-service/** : Este servicio se encarga de generar las notificaciones en tiempo real en un canal de teams previamente configurado, cuando un usuario necesita un contacto con el asesor.
        - **whatsapp-services/**: Este servicio se encarga de enviar los mensajes a whatsapp. 
- **routes/**: Define las rutas de la API y mapea cada endpoint a un controlador específico. Esto permite que la aplicación dirija cada solicitud al controlador adecuado según el tipo de mensaje o evento recibido desde WhatsApp.

- **utils/** : Almacena funciones auxiliares y utilitarias, como formateo de mensajes o manejo de errores, que pueden ser utilizadas en varias partes del proyecto para evitar la repetición de código y mejorar la modularidad.

- **config/** :Contiene configuraciones generales del proyecto. Centralizar estas configuraciones permite modificar fácilmente aspectos de la infraestructura sin afectar el código base.
        - **tokenManager.js** : Contiene la logica para generar automaticamente el token de verificación cada (60 días) para evitar el bloqueo de la API de WhatsApp.
        