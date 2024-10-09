---
sidebar_position: 2
id: install
title: Cómo Empezar
---
## Instalación

### Requisitos Previos
- [Node.js](https://nodejs.org/) (v14 o superior)
- [npm](https://www.npmjs.com/) (v6 o superior)
- [Ngrok](https://ngrok.com/) (para exponer el servidor local)
- [Docker](https://www.docker.com/) (para desplegar el backend)
- [Meta for Developers](https://developers.facebook.com/docs/) (documentacion de la API de WhatsApp)

#### Importante 
:::note
- El proyecto está diseñado para ejecutarse en un entorno de desarrollo local. Las instrucciones para el despliegue en producción se detallan en una sección posterior.
- Consulta la documentación de la API de WhatsApp para obtener los tokens necesarios y completar la autenticación.
- Asegúrate de contar con una cuenta de Microsoft Teams para configurar el webhook correspondiente.
- Es necesario disponer de una cuenta de WhatsApp Business para habilitar y configurar el webhook de WhatsApp.
- Revisa la documentación de Ngrok para realizar la configuración del servidor local correctamente.
:::
### Pasos para la Instalación
1. Clona el repositorio:
```.bash
git clone https://github.com/Riwi-io-Medellin/chatbot
```
2. cd al directorio del proyecto:
```.bash
cd chatbot
```
3. Instala las dependencias necesarias:
```.bash 
npm install
```
- 3.1 Instala Dotenv para cargar variables de entorno:
```.bash 
npm i dotenv
```
4. Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```bash title=".env"
PORT=3000
GRAPH_API_TOKEN=token_de_la_api_de_Graph_meta_for_developers
BUSINESS_PHONE_NUMBER_ID=id_del_numero_de_teléfono_de_la_cuenta_de_WhatsApp_Business.
WEBHOOK_VERIFY_TOKEN=tu_clave_de_verificacion
APP_ID=Id_de_la _cuenta_de_meta_for_developers.
APP_SECRET=Id_Secreto_de _la_cuenta_de_meta_for_developers.
WEBHOOK_TEAMS= El_webhook_de_Microsoft_Teams,_para_enviar_notificaciones.
```
 
5. Iniciar el servidor local:
```.bash
npm run dev
```
6. Despliega el servidor local:
```.bash
ngrok http 3000
```
Siguiente apartado para continuar con la configuracion
