---
sidebar_position: 5
id: sonarQube
title: SonarQube
---
# ¿Qué es SonarQube?
Es una plataforma de código abierto que te ayuda a mantener un código limpio, seguro y de alta calidad. Funciona analizando tu código de forma continua y detectando:
- **Bugs**: Errores potenciales que podrían causar problemas en tu aplicación.
- **Vulnerabilidades**: Debilidades en tu código que podrían ser explotadas por atacantes.
- **Código duplicado**: Secciones de código que se repiten innecesariamente, lo que dificulta el mantenimiento.
- **Problemas de diseño**: Diseño del código que puede hacer que sea difícil de entender y mantener.
- **Cobertura de pruebas**: Qué tan bien están cubiertas tus pruebas unitarias.

## ¿Cómo funciona SonarQube?
SonarQube analiza tu código y genera un informe detallado con métricas y visualizaciones que te permiten identificar fácilmente las áreas que necesitan mejorar. También te proporciona recomendaciones específicas para solucionar los problemas detectados.

### Documentación SonarQube
- [Documentación](https://docs.sonarqube.org/latest//) 
- [Sitio web oficial](https://docs.sonarqube.org/latest//) 

## ¿Cómo integrar SonarQube en mi proyecto?

### Requisitos previos
1. **Docker**: Asegúrate de tener Docker instalado y en funcionamiento en tu máquina.
2. **Cuenta en SonarQube**: Si planeas usar la versión en la nube o necesitas autenticación, registra una cuenta en [SonarQube](https://www.sonarqube.org/).
3. **SonarQube SDK**: Descarga e instala el SDK de SonarQube para tu entorno.

### Configuración de SonarQube
1. Para instalar SonarQube en un contenedor Docker, ejecuta el siguiente comando en tu terminal:

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube
```
2. Para verificar el estado del contenedor Docker, ejecuta el siguiente comando en tu terminal:

```bash
docker logs -f sonarqube
```
3. Abre tu navegador web y ingresa a http://localhost:9000

4. Para detener el contenedor Docker, ejecuta el siguiente comando en tu terminal:

```bash
docker stop sonarqube
```

 5. Para eliminar el contenedor Docker, ejecuta el siguiente comando en tu terminal:

```bash
docker rm sonarqube
```

### Configuración de SonarQube en el entorno local
1. Inicia sesión con las credenciales predeterminadas:
    - Usuario: admin
    - Contraseña: admin
- Te solicitará cambiar la contraseña en el primer inicio de sesión.
2. Generar un Token de Autenticación
    - En el menú de tu cuenta de usuario, selecciona Mis tokens.
    - Haz clic en Generar token nuevo, asígnale un nombre y genera el token.
    - Guarda el token en un lugar seguro; lo necesitarás para integrar SonarQube con tu proyecto.

### Configuración del SDK de SonarQube 

1. Descarga el SDK de SonarQube desde el sitio web de SonarQube.
```bash
npm install sonarqube-scanner --save-dev
```
2. Crea un archivo de configuración de SonarQube en tu proyecto. Por ejemplo, llamado `sonar-project.properties`.
```properties
# Información de la aplicación
sonar.projectKey=NombreDeTuProyecto
sonar.projectName=Nombre Amigable del Proyecto
sonar.projectVersion=1.0

# Ruta del código fuente
sonar.sources=./src

# Credenciales y URL de SonarQube
sonar.host.url=http://localhost:9000
sonar.login=TU_TOKEN_GENERADO
```
**Nota:** El token de autenticación se genera en la sección de "Autenticación" de la página de inicio de SonarQube.

3. Ejecución del Análisis de Código con SonarQube
    ```
    "scripts": {
    "sonar": "sonarqube-scanner"}
    ```
- Luego, ejecuta el siguiente comando en tu terminal:
  ```bash
  npm run sonar
  ```
  
4. En el navegador web, accede a la sección de "Análisis" de la página de inicio de SonarQube. y busca el nombre de tu proyecto. Para mirar el análisis de tu código.

5. Listo leer la documentacion de **SonarQube** para entender el análisis. 