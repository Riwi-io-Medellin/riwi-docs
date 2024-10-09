---
sidebar_position: 3
id: meta
title: Configuración de Meta for Developers
---

# Configuración de Meta for Developers

Esta sección explica cómo configurar el backend para utilizar la API de Meta for Developers para autenticar y enviar mensajes de WhatsApp.

## Creación de una cuenta de Meta for Developers

Para utilizar la API de Meta for Developers, necesitarás una cuenta de Meta for Developers. Si no tienes una, puedes crear una [aquí](https://developers.facebook.com/docs/graph-api/overview/).

Una vez que tengas una cuenta, necesitarás obtener los tokens necesarios para autenticar y enviar mensajes de WhatsApp. Para ello, debes seguir los siguientes pasos:

1. Accede a la cuenta de Meta for Developers.
2. Crea una nueva aplicación.
3. Selecciona la opción "Web" y elige "WhatsApp".


## Configuración del Backend

Para configurar el backend para utilizar la API de Meta for Developers, debes hacer lo siguiente:
   - Configuración:
     
        ![zero step](https://firebasestorage.googleapis.com/v0/b/riwiprueba-54df5.appspot.com/o/paso0.png?alt=media&token=4aa93fcd-6aef-47a4-b96e-50cbd962aa20)
     
       1. Genera un token de acceso que debes pegar en el fichero .env en la variable**GRAPH_API_TOKEN=** (El toquen reinicia cada 24 horas o cada 2 horas).
      ![next step](https://firebasestorage.googleapis.com/v0/b/riwiprueba-54df5.appspot.com/o/paso1.1.png?alt=media&token=314522b7-a49c-43e8-8954-851927013362)
       2. El identificador del número de teléfono debe copiarse y pegarse en el archivo .env en la carpeta **BUSINESS_PHONE_NUMBER_ID=** variable.
      ![next step](https://firebasestorage.googleapis.com/v0/b/riwiprueba-54df5.appspot.com/o/paso2.png?alt=media&token=64f67d9f-a17f-4e24-96d6-5883ab43b3c4)
       3. Configurar los webhooks, la comunicación entre el proyecto y la api de whatsapp. 
       ![next step](https://firebasestorage.googleapis.com/v0/b/riwiprueba-54df5.appspot.com/o/paso4.png?alt=media&token=6a85aa1c-0b30-46ff-a283-6a95373e9319)
       4. En este caso el proyecto se desplegará en un entorno local, se ejecuta el siguiente comando en el terminal
          command `ngrok http 3000`
      ![next step](https://firebasestorage.googleapis.com/v0/b/riwiprueba-54df5.appspot.com/o/paso5ngrok.png?alt=media&token=5c372262-85a0-4e8b-82b5-9bf7d71cf92c)
       5. En el campo «URL de devolución de llamada», introduce la URL que Ngrok ha generado para ti, seguida de la ruta a tu webhook.
          En el campo «Token de verificación», introduce el valor de la variable en el archivo .env WEBHOOK_VERIFY_TOKEN.
       

### Obtener app_id y app_secret

1. Acceder a la configuración de la aplicación:

    - Una vez que tu aplicación esté creada, serás redirigido a la página de configuración de la aplicación.
2. Obtener el app_id:

    - En la parte superior de la página de configuración de la aplicación, verás tu App ID. Copia tu App ID y pégalo en el archivo .env APP_ID.
3. Generar el app_secret:
   - Ve a la sección de Configuración > Básico.
   - Aquí verás el App Secret. Haz clic en Mostrar para ver tu App Secret.
   - Copia tu App Secret y pégalo en el archivo .env APP_SECRET.

:::warning
- El chatbot está configurado para generar automáticamente un token de verificación. Solo es necesario actualizarlo manualmente si ocurre un error, si la aplicación se cierra, o si se cambia el dominio.
:::