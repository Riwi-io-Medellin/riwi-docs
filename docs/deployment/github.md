---
sidebar_position: 2
id: github
title: GitHub
---

# Despliegue - GitHub

Esta primera etapa del despliegue implica subir tu proyecto a GitHub, donde más adelante configuraremos un GitHub Action para registrar la aplicación en GHCR automáticamente.

:::info
Antes de continuar con los pasos de despliegue, asegúrate de  **[crear el repositorio del proyecto en el GitHub de la organización](https://github.com/Riwi-io-Medellin)**. Esto permitirá configurar el **GitHub Action** y registrar la aplicación en GHCR correctamente. Si no tienes acceso para crear repositorios en la organización, solicita permisos al administrador de la cuenta de GitHub.
:::

##  Subir un Repositorio a GitHub

Pasos para subir el repositorio:

1. **Inicializa Git** en tu proyecto local:

```.bash
git init
```

2. Conecta el repositorio local con GitHub:

```.bash
git remote add origin https://github.com/tu_usuario/tu_repositorio.git
```

3. Añade los archivos:

```.bash
git add .
git commit -m "Initial commit"
```

4. Sube los cambios:

```.bash
git push -u origin main
```

## GHCR (GitHub Container Registry)

**GitHub Container Registry (GHCR)** es un servicio que permite almacenar y gestionar imágenes de contenedores Docker directamente en GitHub. Es ideal para mantener imágenes de contenedores accesibles para despliegues y automatizaciones.

:::warning
Para registrar una aplicación en **GHCR**, la aplicación **debe estar dockerizada** previamente. Esto significa que debe existir un archivo `Dockerfile` que defina cómo construir la imagen de Docker para la aplicación. Solo una vez dockerizada, podrás construir y subir la imagen al registro de contenedores (GHCR) usando GitHub Actions o manualmente con Docker.
:::

### Registro de la aplicación en GHCR

Existen **dos formas** principales de registrar tu aplicación en **GitHub Container Registry** (GHCR):

1. **Método o Registro Manual (solo recomendado para pruebas):**

    - Ideal para subir imágenes de contenedores directamente sin automatización.
    - No es adecuado para producción o despliegues continuos.

2. **Método o Registro Automatizado con GitHub Actions (recomendado):**
    
    - Utiliza un workflow para automatizar el proceso de CI/CD.
    - Garantiza que las imágenes se construyan y suban a GHCR automáticamente cuando haya cambios en el repositorio.
    - Facilita la integración y despliegue continuo de aplicaciones.

Se recomienda usar GitHub Actions para mantener un flujo de despliegue eficiente.


### Registro Manual

Autentica con Docker, construye la imagen y súbela a GHCR usando los comandos manuales.

Ejecuta estos comandos para subir la imagen al registro:

- **Autenticarse en GHCR:** Abre la terminal y ejecuta el siguiente comando para autenticar Docker con GitHub:

```bash
docker login ghcr.io -u tu_usuario --password-stdin
```
**Nota:** Usa tu token personal de GitHub como contraseña.

- **Construir la imagen:** En la raíz de tu proyecto, asegúrate de tener un archivo `Dockerfile`. Luego ejecuta:
```bash
docker build -t ghcr.io/tu_organizacion/tu_repositorio:latest .
```

- **Subir la imagen a GHCR:** Una vez creada la imagen, súbela a GitHub Container Registry:

```bash
docker push ghcr.io/tu_organizacion/tu_repositorio:latest
```

### Workflow de GitHub Actions:

Puedes automatizar el proceso utilizando GitHub Actions, que ejecutará los pasos anteriores automáticamente.

Configura un **workflow** para que el proceso de construcción y publicación de la imagen sea automático cuando se haga un push a la rama principal.

1. **Crear el Workflow:** En la raíz de tu proyecto, crea una carpeta llamada `.github` y dentro de esta, crea otra carpeta llamada `workflows`. Dentro de `workflows`, crea un archivo `main.yml`:

```bash
.github/workflows/main.yml
```
2. **Configurar el Workflow:** 

Este workflow automatiza el despliegue de la aplicación utilizando Docker y Docker Swarm. Es ideal para **CI/CD**, donde cualquier cambio en la rama main genera una nueva imagen Docker, la sube a GHCR y despliega automáticamente la actualización en el clúster de Docker Swarm.

Copia y pega este contenido dentro de `main.yml`:


```yaml
name: Deploy CI/CD

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions: 
      contents: read
      packages: write
      actions: write

    steps:
    - name: Enable debug logging
      run: echo "RUNNER_DEBUG=true" >> $GITHUB_ENV

    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Convert to lowercase
      id: string
      run: |
        echo "OWNER_LOWER=$(echo ${{ github.repository_owner }} | tr '[:upper:]' '[:lower:]')" >> $GITHUB_OUTPUT
        echo "REPO_LOWER=$(echo ${{ github.event.repository.name }} | tr '[:upper:]' '[:lower:]')" >> $GITHUB_OUTPUT

    - name: Generate GitHub App token
      id: generate_token
      uses: tibdex/github-app-token@v1
      with:
        app_id: ${{ secrets.APP_ID }}
        private_key: ${{ secrets.APP_PRIVATE_KEY }}

    - name: Log in to GitHub Container Registry
      uses: docker/login-action@v1
      with:
        registry: ghcr.io
        username: ${{ github.repository_owner }}
        password: ${{ secrets.PERSONAL_ACCESS_TOKEN }}

    - name: Build and push Docker image
      uses: docker/build-push-action@v2
      with:
        context: .
        push: true
        tags: |
          ghcr.io/${{ steps.string.outputs.OWNER_LOWER }}/${{ steps.string.outputs.REPO_LOWER }}:latest
          ghcr.io/${{ steps.string.outputs.OWNER_LOWER }}/${{ steps.string.outputs.REPO_LOWER }}:${{ github.sha }}
        build-args: --no-cache

    - name: Deploy to VPS using SSH
      uses: appleboy/ssh-action@v0.1.6
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          # Cambiar al directorio de la aplicación en el servidor
          cd /var/www/${{ steps.string.outputs.REPO_LOWER }}

          # Detener el contenedor que utiliza la imagen `latest`
          docker-compose down
          
          # Eliminar la imagen `latest` existente para forzar la descarga de la nueva
          docker rmi ghcr.io/${{ steps.string.outputs.OWNER_LOWER }}/${{ steps.string.outputs.REPO_LOWER }}:latest || true
          
          # Descargar la nueva imagen utilizando el SHA del commit
          docker pull ghcr.io/${{ steps.string.outputs.OWNER_LOWER }}/${{ steps.string.outputs.REPO_LOWER }}:${{ github.sha }}
          
          # Recrear los contenedores con la nueva imagen
          docker-compose up -d --force-recreate
          
          # Limpiar imágenes antiguas no utilizadas
          docker image prune -a -f
```

### Explicación del Workflow
Este workflow está diseñado para realizar un flujo **CI/CD (Integración Continua y Despliegue Continuo)** para backend, utilizando Docker y GitHub Actions. Aquí está el desglose de los pasos:

1. **Activar Debugging:** Habilita el registro de depuración.
2. **Checkout del Código:** Clona el repositorio.
3. **Convertir a Minúsculas:** Convierte los nombres del propietario y del repositorio a minúsculas.
4. **Generar Token de la App de GitHub:** Genera un token de autenticación para interactuar con GitHub.
5. **Iniciar Sesión en GHCR:** Autentica en GitHub Container Registry.
6. **Construir y Subir Imagen Docker**: Crea una imagen Docker del proyecto y la sube a GHCR con el SHA del commit.
7. **Desplegar en Docker Swarm**: Conecta al servidor y realiza el despliegue de la nueva imagen en Docker Swarm.

### Detalles del Workflow

1. **Crear y Modificar Variables**:

    - `OWNER_LOWER` y `REPO_LOWER`: convierte los nombres a minúsculas, útiles para construir la URL de la imagen en GHCR.

2. **Generación del Token de la App de GitHub:** Usado para interactuar de manera segura con GitHub para autenticar acciones automatizadas.

3. **Autenticación en GHCR:** Usa el token de acceso personal para realizar login en el registro de contenedores de GitHub.

4. **Construcción y Subida de la Imagen:**

  - Utiliza `docker/build-push-action@v2` para construir la imagen con el contexto actual del proyecto.

  - La imagen se sube a GHCR con la etiqueta que corresponde al SHA del commit actual.

5. **Despliegue en Docker Swarm:**

  - Establece una conexión SSH con el servidor utilizando claves privadas.
  - Actualiza la imagen del servicio en Docker Swarm, forzando la descarga de la nueva imagen y verificando el estado del servicio.

Este workflow es ideal para despliegues automatizados, asegurando que cada cambio en la rama `main`  desencadene un nuevo ciclo de CI/CD.

