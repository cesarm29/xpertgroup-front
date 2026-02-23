# FrontTailwind

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Docker

Se incluyen archivos para construir y ejecutar la aplicación en contenedores:

- `Dockerfile` — Multi-stage build (Node para compilar + NGINX para servir).
- `.dockerignore` — Excluye `node_modules`, `dist` y archivos no necesarios del contexto.
- `docker-compose.yml` — Atajo para construir y ejecutar el servicio.

Instrucciones básicas:

1) Construir imagen con Docker:

```bash
# desde la carpeta del proyecto (c:\xpertgroup\front)
docker build -t front:latest .
```

2) Ejecutar la imagen:

```bash
docker run --rm -p 80:80 front:latest
```

3) Usar `docker-compose` (construye y levanta en segundo plano):

```bash
docker-compose up --build -d
```

4) Ver logs del servicio (docker-compose):

```bash
docker-compose logs -f
```

Notas y consideraciones:

- El `Dockerfile` ejecuta `npm run build -- --configuration production`. La salida compilada se copia desde `dist/front-tailwind` al contenedor NGINX. Si cambias el `project` o `outputPath` en `angular.json`, actualiza el `Dockerfile` en consecuencia.
- Si necesitas soporte para rutas en la SPA (refresh / deep links), puedo añadir un `nginx.conf` con fallback a `index.html`.
- Asegúrate de tener Docker Desktop (o Docker Engine) instalado y memoria suficiente para el paso de build.
