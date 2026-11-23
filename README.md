# GEOPREDICT

Frontend académico para explorar escenarios ficticios de socavación en Medellín y el Área Metropolitana. La ubicación y el nivel de riesgo de cada marcador se asignaron para demostrar la interfaz.

## Desarrollo local

Usa Node.js 20.19+ en la rama 20 o Node.js 22.12+ y npm del mismo entorno.

```sh
npm install
npm run dev
```

Abre la dirección local que indica Vite. Puedes mover el mapa arrastrándolo, utilizar los controles de zoom y abrir cada ventana con un clic o con Tab y Enter.

```sh
npm run typecheck
npm run build
npm run preview
```

## Datos y cartografía

Los escenarios se encuentran en `src/data/socavaciones.mock.ts`. El mapa lee los datos con `getSocavaciones()` en `src/services/socavacionesRepository.ts`. El repositorio descarta registros con identificadores duplicados, textos vacíos, categorías desconocidas o coordenadas inválidas. El contrato de datos y la semántica visual de riesgo están en `src/types/socavacion.ts`.

Las teselas provienen del servidor público de [OpenStreetMap](https://www.openstreetmap.org/copyright) y requieren conexión a Internet. El mapa conserva su estructura y sus marcadores si falla la cartografía base. Antes de una publicación con tráfico significativo, consulta la [política de uso de teselas](https://operations.osmfoundation.org/policies/tiles/) y evalúa la capacidad del proveedor.
