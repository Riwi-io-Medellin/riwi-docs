---
sidebar_position: 6
id: deploy
title: Despliegue
---
## Descripción del proyecto

Este documento describe el proceso de despliegue de una aplicación de chatbot utilizando
Docker, junto con una integración CI/CD configurada a través de GitHub Actions. La aplicación
se despliega en un contenedor Docker y está accesible mediante el subdominio:
```service.chatbot.riwi.io/webhook``` en el puerto ```4018``` de la infraestructura de Riwi.

### Estructura de archivos 

1. El archivo ```Dockerfile``` define cómo se construye el contenedor Docker para la aplicacion del chatbot.
```conf title="dockerfile"
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3010
CMD [ "node", "app.js"
```
    - Instrucciones:
        - Copiar los archivos package.json y package-lock.json .
        - Ejecutar npm install para instalar las dependencias.
        - Copiar el resto de los archivos del proyecto en la imagen.
        - Exponer el puerto 3010.
        - Comando de ejecución: node app.js.
2. El archivo ```.dockerignore``` especifica qué archivos o directorios deben ser ignorados al copiar el
contenido del proyecto dentro de la imagen Docker:
     - node_modules
     - .git  

### Comandos para despliegue local 
1. Crear la imagen Docker:
```.bash
docker build -t chatbot:1.0
```
        - ```t chatbot:1.0:```  Etiqueta la imagen con el nombre ```chatbot``` y versión ```1.0```.
2. Ejecutar la imagen en un contenedor
```.bash
$ docker run -d -p 3010:3010 --name container-chatbot chatbot:1.0
```
    -  ```d``` : Ejecuta el contenedor en segundo plano (detached mode).
    - ```p 3010:3010``` : Mapea el puerto 3010 del contenedor al puerto ```3010``` del host.
    - ```-name container-chatbot``` : Asigna el nombre ```container-chatbot``` al contenedor.

### CI/CD con GitHub Actions
1.El archivo ```main.yml``` define el flujo principal de CI/CD en GitHub Actions para el despliegue de la
aplicación cuando se realiza un ```push``` o ```pull_request``` en la rama **main** .

```yaml title="main.yml"
name: Main Flow

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  deploy-prod:
    if: github.ref == 'refs/heads/main'
    uses: ./.github/workflows/pipeline-deploy-prod.yml
    with:
      environment_name: chatbot-prod
      secrets:
        APP_ID: ${{ secrets.APP_ID }}
        APP_PRIVATE_KEY: ${{ secrets.APP_PRIVATE_KEY }}
        PERSONAL_ACCESS_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
        HOST: ${{ secrets.HOST }}
        USERNAME: ${{ secrets.USERNAME }}
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        PROD_PORT: ${{ secrets.PROD_PORT }}
        PROD_GRAPH_API_TOKEN: ${{ secrets.PROD_GRAPH_API_TOKEN }}
        PROD_BUSINESS_PHONE_NUMBER_ID: ${{ secrets.PROD_BUSINESS_PHONE_NUMBER_ID }}
        PROD_WEBHOOK_VERIFY_TOKEN: ${{ secrets.PROD_WEBHOOK_VERIFY_TOKEN }}
        PROD_APP_ID: ${{ secrets.PROD_APP_ID }}
        PROD_APP_SECRET: ${{ secrets.PROD_APP_SECRET }}
        PROD_WEBHOOK_TEAMS: ${{ secrets.PROD_WEBHOOK_TEAMS }}

    permissions:
      contents: write
      actions: write
      packages: write
```

2. El archivo ```pipeline-deploy-prod.yml``` maneja el proceso detallado de construcción y despliegue en el
entorno de producción. La acción se activa mediante ```workflow_call``` desde el archivo principal.
``` yml title=:"pipeline-deploy-prod.yml"
name: Deploy Chatbot to Prod

on:
  workflow_call:
    secrets:
      APP_ID:
        required: true
      APP_PRIVATE_KEY:
        required: true
      PERSONAL_ACCESS_TOKEN:
        required: true
      HOST:
        required: true
      USERNAME:
        required: true
      SSH_PRIVATE_KEY:
        required: true
      PROD_PORT:
        required: true
      PROD_GRAPH_API_TOKEN:
        required: true
      PROD_BUSINESS_PHONE_NUMBER_ID:
        required: true
      PROD_WEBHOOK_VERIFY_TOKEN:
        required: true
      PROD_APP_ID:
        required: true
      PROD_APP_SECRET:
        required: true
      PROD_WEBHOOK_TEAMS:
        required: true
    inputs:
      environment_name:
        required: false
        type: string

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment_name || 'chatbot-prod' }}
    permissions:
      contents: write
      packages: write
      actions: write
    steps:
      - name: Enable debug logging
        run: echo "RUNNER_DEBUG=true" >> $GITHUB_ENV

      - uses: actions/checkout@v4

      - name: Convert to lowercase
        id: string
        run: |
          echo "OWNER_LOWER=$(echo ${{ github.repository_owner }} | tr '[:upper:]' '[:lower:]')" >> $GITHUB_OUTPUT
          echo "REPO_LOWER=$(echo ${{ github.event.repository.name }} | tr '[:upper:]' '[:lower:]')" >> $GITHUB_OUTPUT

      - name: Generate GitHub App token
        id: generate_token
        uses: tibdex/github-app-token@v2
        with:
          app_id: ${{ secrets.APP_ID }}
          private_key: ${{ secrets.APP_PRIVATE_KEY }}

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.PERSONAL_ACCESS_TOKEN }}

      - name: Build and push Docker image to GitHub Container Registry
        uses: docker/build-push-action@v3
        with:
          context: .
          push: true
          tags: ghcr.io/${{ steps.string.outputs.OWNER_LOWER }}/${{ steps.string.outputs.REPO_LOWER }}:${{ github.sha }}

      - name: Deploy to Docker Host
        env:
          HOST: ${{ secrets.HOST }}
          USERNAME: ${{ secrets.USERNAME }}
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          CONTAINER_NAME: ${{ steps.string.outputs.REPO_LOWER }}-PROD
          IMAGE_NAME: ghcr.io/${{ steps.string.outputs.OWNER_LOWER }}/${{ steps.string.outputs.REPO_LOWER }}:${{ github.sha }}
          PORT: ${{ secrets.PROD_PORT }}
          GRAPH_API_TOKEN: ${{ secrets.PROD_GRAPH_API_TOKEN }}
          BUSINESS_PHONE_NUMBER_ID: ${{ secrets.PROD_BUSINESS_PHONE_NUMBER_ID }}
          WEBHOOK_VERIFY_TOKEN: ${{ secrets.PROD_WEBHOOK_VERIFY_TOKEN }}
          APP_ID: ${{ secrets.PROD_APP_ID }}
          APP_SECRET: ${{ secrets.PROD_APP_SECRET }}
          WEBHOOK_TEAMS: ${{ secrets.PROD_WEBHOOK_TEAMS }}
        run: |
          echo "$SSH_PRIVATE_KEY" > private_key && chmod 600 private_key
          ssh -o StrictHostKeyChecking=no -i private_key ${USERNAME}@${HOST} << EOF
            set -e
            # Pull de la última imagen
            docker pull "\$IMAGE_NAME"
            # Detener y eliminar el contenedor existente si existe
            if [ \$(docker ps -a -q -f name=\$CONTAINER_NAME) ]; then
              docker stop "\$CONTAINER_NAME"
              docker rm "\$CONTAINER_NAME"
            fi
            # Ejecutar el nuevo contenedor
            docker run --name "\$CONTAINER_NAME" -d \
              -p 4018:3010 \
              -e PORT="\$PORT" \
              -e GRAPH_API_TOKEN="\$GRAPH_API_TOKEN" \
              -e BUSINESS_PHONE_NUMBER_ID="\$BUSINESS_PHONE_NUMBER_ID" \
              -e WEBHOOK_VERIFY_TOKEN="\$WEBHOOK_VERIFY_TOKEN" \
              -e APP_ID="\$APP_ID" \
              -e APP_SECRET="\$APP_SECRET" \
              -e WEBHOOK_TEAMS="\$WEBHOOK_TEAMS" \
              "\$IMAGE_NAME"
            # Verificar el estado del contenedor en ejecución
            docker ps -a --filter "name=\$CONTAINER_NAME"
          EOF
```
### Configuración de secretos
En GitHub, se deben configurar las siguientes variables secretas para el proceso de despliegue:

- **APP_ID**
- **APP_PRIVATE_KEY**
- **PERSONAL_ACCESS_TOKEN**
- **HOST**
- **USERNAME**
- **SSH_PRIVATE_KEY**
- **PROD_GRAPH_API_TOKEN**
- **PROD_BUSINESS_PHONE_NUMBER_ID**
- **PROD_WEBHOOK_VERIFY_TOKEN**
- **PROD_APP_ID**
- **PROD_APP_SECRET**
- **PROD_WEBHOOK_TEAMS**

Con esta configuración, el flujo de despliegue se ejecutará automáticamente cuando se realice un push en la rama main.