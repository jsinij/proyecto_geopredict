# AGENTS.md — GEOPREDICT | Frontend MVP

> **Propósito:** instrucciones operativas para Codex y otros agentes que trabajen en el frontend de GEOPREDICT. Este archivo describe **qué construir cuando se solicite implementar el frontend**; su creación no autoriza a desarrollar ahora la aplicación ni a modificar otros módulos del proyecto.
>
> **Prioridad:** ante contradicciones, respetar primero el pedido actual del usuario y las restricciones explícitas de este documento. Antes de modificar archivos, comprobar el estado real del repositorio.

## 1. Contexto y límites del proyecto

GEOPREDICT es un prototipo académico orientado a visualizar y, en fases futuras, apoyar el monitoreo de anomalías subterráneas relacionadas con posibles socavaciones en infraestructura vial. Su contexto técnico contempla la adquisición de señales mediante georradar (GPR), la generación de datos sintéticos, el procesamiento, la detección de anomalías y la visualización geográfica.

Los documentos técnicos de referencia describen un caso de estudio de aproximadamente **650 m de la Avenida Regional, entre el puente Horacio Toro y la Plaza Minorista, en Medellín**, así como la posible simulación de señales GPR utilizando modelos físicos. **Ese corredor es el contexto del proyecto general, no una restricción para el mapa inicial del frontend:** la primera interfaz debe abrir mostrando **Medellín y su Área Metropolitana**.

### Alcance obligatorio de este MVP

Construir **solo el frontend**, desde cero si el repositorio realmente no contiene uno, para:

1. Mostrar un mapa interactivo de Medellín y el Área Metropolitana.
2. Navegar mediante zoom y desplazamiento.
3. Representar **ubicaciones ficticias** mediante marcadores con categorías de riesgo.
4. Abrir un `Popup` al seleccionar cada marcador.
5. Mostrar exclusivamente ubicación, nivel de riesgo y descripción en el `Popup`.
6. Presentar una leyenda legible para los tres niveles de riesgo.
7. Mantener una interfaz responsive, accesible y visualmente profesional.

La aplicación debe funcionar sin backend, sin base de datos, sin autenticación y sin claves de API. Los datos se almacenan localmente y se consumen a través de una capa de acceso sencilla.

### Separación respecto a los otros componentes

Los documentos de GPR distinguen señales observadas (A-scans y B-scans), propiedades del subsuelo, estimaciones y *ground truth* de simulación. **Una anomalía electromagnética no demuestra por sí misma una socavación, y un GPR no mide directamente un nivel de riesgo**. Por tanto:

- Los campos `nivelRiesgo` del MVP son **etiquetas ficticias elegidas para probar la interfaz**, no salidas verificadas de georradar, resultados de un algoritmo ni alertas reales.
- No implementar ni importar el generador Python, gprMax, FDTD, las métricas científicas del dataset, el almacenamiento de señales o los procedimientos de *ground truth*.
- No presentar ubicaciones como hallazgos de una inspección vial. Incorporar un aviso permanente y visible: **«Datos simulados para demostración. No representan reportes reales de riesgo.»**
- Cuando exista una integración real, deberá diseñarse explícitamente un contrato de datos y su procedencia; **no suponer** que los archivos nativos del GPR ni las etiquetas de *ground truth* ya tienen formato de API para la web.

## 2. Tecnologías y restricciones

### Obligatorio

| Componente | Tecnología | Uso |
|---|---|---|
| Interfaz | React | Componentes funcionales y hooks |
| Desarrollo y build | Vite | Proyecto de frontend |
| Tipado | TypeScript | Datos y propiedades de componentes |
| Cartografía | Leaflet + React Leaflet | Mapa, marcadores, leyenda y popups |
| Mapa base | OpenStreetMap | Teselas raster para la demo, con atribución visible |
| Estilos | CSS + CSS Modules | Diseño responsive, tokens y estilos aislados |

- Usar versiones **estables y compatibles** entre React, React DOM, React Leaflet, Leaflet, TypeScript y Vite. Antes de instalar, comprobar las dependencias `peerDependencies` en las versiones elegidas; **no usar `--force` ni `--legacy-peer-deps`** para ocultar conflictos.
- Instalar tipos de Leaflet (`@types/leaflet`) cuando sean necesarios. Preferir imports tipados desde la entrada principal de `react-leaflet`.
- **No usar** Google Maps, Google Cloud, servicios de facturación, API keys, SDK de mapas comerciales ni librerías de mapas alternativas.
- Evitar Redux, bibliotecas de componentes voluminosas, frameworks CSS, enrutadores, gestión de estado global y dependencias que no aporten a estos requisitos. Usar React, TypeScript y CSS nativos antes de instalar más paquetes.
- Preferir `npm`, salvo que el repositorio ya tenga otro gestor consolidado y un archivo lock válido; no mezclar gestores ni regenerar el lockfile sin motivo.

## 3. Primera acción del agente al acceder al repositorio

**El repositorio no se adjuntó a la solicitud que originó este documento.** Por ello, el agente deberá inspeccionarlo en su entorno real antes de ejecutar comandos o crear carpetas:

1. Identificar raíz, archivos existentes, `git status`, `package.json`, lockfiles, herramientas disponibles y configuración de Node/npm.
2. Determinar si el frontend existe, está parcialmente creado o debe iniciarse desde cero. No sobreescribir ni eliminar trabajo previo.
3. Si hay un repositorio con backend, simuladores o datos GPR, identificar su ubicación y **no modificarlos**. Crear el frontend en una carpeta clara (por ejemplo `frontend/`) si eso evita mezclar responsabilidades; si el repositorio ya está dedicado exclusivamente al frontend, usar la raíz.
4. Buscar instrucciones adicionales del repositorio (`README`, `AGENTS.md` de subdirectorios, normas de contribución) y respetarlas cuando no contradigan el alcance de este MVP.
5. Comprobar que `node` y `npm` provengan del mismo entorno (especialmente si se trabaja en WSL), para evitar mezclar binarios de Windows y Linux.
6. Explicar brevemente el plan y los archivos que se cambiarán antes de una tarea de implementación extensa.

El agente **no** debe afirmar que revisó el repositorio hasta haber podido acceder realmente a él.

## 4. Arquitectura mínima recomendada

Mantener una estructura de características sencilla. La siguiente estructura es una **propuesta adaptable**, no una orden de crear archivos vacíos:

```text
frontend/                         # O raíz, si el repositorio solo contiene frontend
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   ├── RiskLegend.tsx
│   │   └── RiskLegend.module.css
│   ├── features/
│   │   └── map/
│   │       ├── SocavacionesMap.tsx
│   │       ├── SocavacionMarker.tsx
│   │       └── SocavacionesMap.module.css
│   ├── data/
│   │   └── socavaciones.mock.ts
│   ├── services/
│   │   └── socavacionesRepository.ts
│   ├── types/
│   │   └── socavacion.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json                # Puede formar parte de varios tsconfig generados por Vite
└── README.md
```

### Responsabilidades

- `App.tsx`: compone encabezado, aviso de datos simulados, mapa y leyenda; no contiene arreglos de puntos ni reglas de estilos del mapa.
- `Header`: presenta el nombre **GEOPREDICT** con jerarquía visual simple.
- `SocavacionesMap`: contiene `MapContainer`, `TileLayer`, manejo de carga/errores y representación de marcadores; **no define datos de ejemplo**.
- `SocavacionMarker`: recibe una `Socavacion` tipada, representa el color correspondiente y muestra su `Popup` con los tres campos requeridos. Si es más simple, `Popup` puede permanecer dentro de este componente; no separar en archivos por inercia.
- `RiskLegend`: contiene la lista de los tres niveles y sus colores; no incluye funciones de filtrado.
- `socavaciones.mock.ts`: único origen de los registros ficticios en esta etapa.
- `socavacionesRepository.ts`: expone un método que obtiene los datos locales; permite sustituir **más adelante** la implementación por otra fuente sin cambiar los componentes. No crear una API simulada ni hacer peticiones HTTP.
- `socavacion.ts`: define el contrato de datos y el mapeo tipado de niveles.
- `globals.css`: define tipografía base, reset mínimo y variables de diseño; estilos específicos en `.module.css`.

No crear carpetas para rutas, autenticación, dashboard, reportes, integraciones ni simulación GPR.

## 5. Contrato de datos simulado

Usar este modelo como contrato **obligatorio** del MVP:

```ts
export type NivelRiesgo = 'leve' | 'peligroso' | 'alto';

export interface Socavacion {
  id: string;
  ubicacion: string;
  latitud: number;
  longitud: number;
  nivelRiesgo: NivelRiesgo;
  descripcion: string;
}
```

### Reglas de los registros

- Crear una cantidad pequeña y suficiente para comprobar los tres niveles y los popups; no generar cientos de puntos por decoración.
- Incluir ejemplos distribuidos en Medellín y, opcionalmente, municipios cercanos del Valle de Aburrá. Deben estar marcados explícitamente como escenarios simulados; **no sugerir una inspección real ni la existencia de una socavación en el lugar**.
- Usar coordenadas en grados decimales, en el orden **`[latitud, longitud]`** que espera Leaflet; no invertirlas.
- Cada registro debe tener `id` no vacío y único, ubicación y descripción legibles, categoría válida, coordenadas numéricas finitas y rangos geográficos válidos.
- Al leer los datos locales, no añadir campos supuestamente medidos, tales como profundidad, probabilidad, humedad o confianza, que el frontend no necesita ni puede justificar.
- Utilizar un servicio mínimo, por ejemplo `getSocavaciones(): Promise<readonly Socavacion[]>`; su implementación puede devolver los datos importados localmente. No añadir URLs ficticias, `fetch`, Axios ni mock servers.
- Si los datos están vacíos, mantener visible el mapa y mostrar un mensaje discreto, por ejemplo «No hay ubicaciones de demostración para mostrar».
- Ante un registro inválido, evitar que la interfaz falle; aislar la validación simple donde se consumen los datos y documentar el motivo. No instalar una biblioteca de esquemas para esta colección estática.

### Semántica visual de los niveles

| Valor interno | Etiqueta visible | Color obligatorio | Significado en la demo |
|---|---|---|---|
| `leve` | Leve | Verde | Socavación leve **simulada** |
| `peligroso` | Peligroso | Naranja | Socavación peligrosa **simulada** |
| `alto` | Alto | Rojo | Socavación altamente riesgosa **simulada** |

Mantener estas tres categorías exactamente. La documentación de otros módulos contempla etiquetas de alerta con terminología distinta; **para este frontend prevalece la tabla anterior**. No atribuirles una definición geotécnica validada.

## 6. Mapa y comportamiento funcional

### Configuración

- Usar `MapContainer` como mapa principal, con centro inicial aproximado en Medellín (`[6.2442, -75.5812]`) y un zoom de vista metropolitana adecuado; **ajustar visualmente para que la región inicial sea útil** en escritorio y móvil.
- Permitir zoom y desplazamiento mediante controles estándar de Leaflet; no bloquear la navegación en un rectángulo arbitrario.
- Importar `leaflet/dist/leaflet.css` una sola vez desde el punto de entrada de la aplicación.
- Asignar una **altura explícita** al contenedor del mapa para evitar mapas invisibles; distribuir el espacio para que el mapa sea el elemento dominante sin cubrir el aviso de demostración ni la atribución.
- Usar `TileLayer` con la capa estándar de OSM para la demo, por ejemplo `https://tile.openstreetmap.org/{z}/{x}/{y}.png`, y conservar visible la atribución `© OpenStreetMap contributors` enlazada a `https://www.openstreetmap.org/copyright`.
- Mantener configuración de URL y atribución del mapa base en un único lugar para facilitar cambiar de proveedor posteriormente **sin implementar ese cambio en este MVP**.

### Restricciones de uso de OpenStreetMap

- Respetar la política oficial: https://operations.osmfoundation.org/policies/tiles/.
- **No** descargar teselas masivamente, precargar regiones, implementar uso offline ni interferir con la caché normal del navegador.
- No ocultar atribuciones, no eliminar encabezados de referencia cuando correspondan y no automatizar solicitudes intensivas.
- Las teselas públicas de OSM no requieren una API key para esta demo, pero **no son un servicio con capacidad ilimitada ni garantizan disponibilidad**. Antes de una publicación con tráfico significativo se debe reevaluar el proveedor y la política de uso.
- Si falla la carga de teselas, conservar la estructura de la página e informar de forma no alarmista que el mapa base podría no estar disponible. No prometer disponibilidad permanente.

### Marcadores y popups

- Implementar tres estilos de marcadores distinguibles: **verde**, **naranja**, **rojo**. Preferir `L.divIcon`/CSS o SVG local simple para evitar errores de rutas de los iconos por defecto de Leaflet al empaquetar con Vite.
- Centralizar la relación `nivelRiesgo → color/etiqueta/clase CSS` en una constante tipada, reutilizada en marcadores y leyenda. No repetir condiciones distintas en cada componente.
- Usar suficiente tamaño de objetivo para que los marcadores puedan seleccionarse también en pantallas táctiles.
- Permitir abrir el popup con clic o selección por teclado cuando el marcador admita foco. Añadir texto o título accesible; **el color nunca debe ser el único medio para comunicar el riesgo**.
- En cada `Popup`, mostrar únicamente:
  - **Ubicación**: `ubicacion`.
  - **Nivel de riesgo**: etiqueta de `nivelRiesgo`.
  - **Descripción**: `descripcion`.
- Mantener el aviso general de datos simulados visible fuera del popup. No mostrar fotos, capas adicionales, métricas, coordenadas técnicas, fichas extendidas ni botones no pedidos.
- Renderizar los textos mediante JSX normal; no usar `dangerouslySetInnerHTML` para descripciones.

### Manejo de errores

- El mapa debe poder renderizarse aunque no haya ubicaciones de demostración.
- Manejar de forma sencilla errores en la carga de registros y la ausencia de datos. Evitar pantallas en blanco y estados de carga permanentes.
- No introducir servicios externos, telemetría, almacenamiento persistente ni complejas estrategias de reintento.

## 7. Diseño UI/UX

Inspiración **conceptual**: https://siata.gov.co/siata_nuevo/. Tomar como referencia la prioridad dada al mapa y a la interpretación clara de información territorial. **No copiar el código, la marca, el logotipo, los textos ni la identidad gráfica de SIATA**.

### Requisitos visuales

- Estética moderna, profesional y limpia: encabezado discreto, mapa dominante, leyenda compacta, aviso de datos simulados claramente legible.
- Paleta decorativa basada en **naranja, amarillo y tonos neutros**; no confundirla con los colores semánticos de riesgo.
- Referencia orientativa para tokens CSS (ajustable tras comprobar contraste): `--brand-orange: #D97706`, `--brand-yellow: #FBBF24`, `--surface: #F8FAFC`, `--ink: #17212B`, `--risk-low: #237A45`, `--risk-danger: #C45D00`, `--risk-high: #B42318`.
- Usar espaciado consistente, bordes y sombras moderadas, tipografía del sistema y una jerarquía visual clara.
- Evitar paneles laterales estadísticos, gráficos, contadores y elementos que resten protagonismo al mapa.
- Conservar texto legible sobre fondos claros/oscuros; objetivo **WCAG AA** para texto normal (contraste 4.5:1) y señales de foco perceptibles.
- Asociar cada riesgo a **color + palabra** en la leyenda y en el popup; opcionalmente añadir borde, patrón o forma distintiva para reforzar la diferenciación.

### Responsive

- En escritorio, mapa ocupando la mayor parte del área disponible, con leyenda a un lado o superpuesta sin tapar controles/atribuciones.
- En tableta y móvil, encabezado compacto, mapa con altura útil y leyenda legible que no obstruya marcadores ni controles.
- Evitar desbordamiento horizontal y controles fuera de pantalla; considerar áreas táctiles de tamaño adecuado.
- La atribución de OSM debe seguir visible y utilizable en todos los tamaños de pantalla.

## 8. Convenciones de código

- React funcional; hooks donde resuelvan una necesidad concreta. Sin componentes de clase.
- TypeScript con configuración estricta; no usar `any`, `@ts-ignore` ni conversiones inseguras para silenciar errores sin justificación.
- Componentes con responsabilidades delimitadas. Evitar abstracciones genéricas, hooks personalizados o contextos de React que no sean necesarios.
- Nombres de componentes en `PascalCase`; funciones/variables en `camelCase`; archivos `.tsx` para JSX; tipos compartidos en `.ts`.
- Conservar en español los nombres de propiedades del contrato `Socavacion`; usar etiquetas UI y mensajes en español claro. No mezclar arbitrariamente traducciones en la interfaz.
- No insertar datos simulados directamente en `App.tsx` ni en los componentes de mapa.
- Preferir `const`, interfaces y tipos explícitos en las fronteras; no mutar colecciones de datos compartidas.
- Usar CSS Modules para estilos de componentes y variables CSS globales para colores/espaciado.
- No usar iconos descargados de fuentes dudosas, CSS remoto innecesario ni contenido ajeno protegido.
- Añadir comentarios únicamente donde expliquen una decisión no evidente, no para describir línea por línea lo que hace el código.

## 9. Implementación incremental cuando se solicite

Trabajar por etapas pequeñas verificables; no agregar funcionalidades fuera del MVP.

1. **Inspección y preparación.** Revisar repositorio, versiones de Node/npm, gestor de paquetes y estructura; crear el esqueleto Vite + React + TypeScript solo si hace falta.
2. **Tipos y datos.** Crear `Socavacion`, las categorías, mapeo de colores, colección local ficticia y repositorio de lectura.
3. **Mapa base.** Integrar Leaflet, importar CSS, asignar altura, centrar la vista metropolitana y verificar teselas y atribución.
4. **Marcadores y popups.** Renderizar los registros con colores correctos y los tres campos obligatorios.
5. **Diseño y accesibilidad.** Añadir encabezado, aviso visible, leyenda, CSS responsive y foco/etiquetas accesibles.
6. **Validación y documentación.** Ejecutar verificaciones de tipos/build y comprobaciones funcionales; documentar instalación, arranque, origen ficticio de datos y restricciones del proveedor OSM en `README.md`.

Después de cada etapa, indicar qué se cambió y qué se verificó. **No avanzar hacia backend, detección ni analítica** solo porque el siguiente módulo resulte técnicamente posible.

## 10. Verificaciones y criterios de aceptación

### Comprobaciones automatizadas mínimas

- Ejecutar los scripts **existentes** de `package.json` que correspondan, típicamente `npm run build` y `npm run lint` si se configuró lint. No afirmar que un script existe sin inspeccionarlo.
- Confirmar que TypeScript compile sin errores.
- Si ya existe infraestructura de pruebas, reutilizarla para comprobar mapeo de categorías y estructura de datos; **no incorporar un framework de pruebas exclusivamente para una validación trivial sin necesidad clara**.
- Comprobar que ningún archivo de frontend dependa de endpoints, claves o servicios de pago.

### Verificaciones funcionales/manuales

- [ ] La aplicación inicia y compila en el entorno real del repositorio.
- [ ] El mapa muestra Medellín y su Área Metropolitana como vista inicial.
- [ ] Se puede desplazar y hacer zoom.
- [ ] Las teselas cargan y la atribución a OSM sigue visible.
- [ ] Los marcadores provienen de un archivo de datos separado.
- [ ] Se representan correctamente los tres niveles: leve/verde, peligroso/naranja, alto/rojo.
- [ ] Cada marcador abre un popup con **ubicación, nivel de riesgo y descripción**.
- [ ] Hay una leyenda con nombres y colores consistentes.
- [ ] Hay un aviso permanente y evidente de que los registros son **simulados**.
- [ ] El mapa permanece usable con cero registros o frente a un error controlable de lectura.
- [ ] La presentación es legible en escritorio, tableta y móvil, sin desbordamiento horizontal.
- [ ] Navegación y controles básicos pueden utilizarse con teclado; el riesgo no se expresa solo mediante color.
- [ ] No se necesitan backend, API keys, autenticación ni datos reales.
- [ ] No se añadieron filtros, estadísticas, búsqueda, paneles ni otros elementos fuera del alcance.

Si no es posible verificar algo por limitaciones del entorno, indicarlo explícitamente en el reporte final; no declararlo como probado.

## 11. Fuera de alcance: prohibiciones explícitas

**No implementar en este MVP:**

- Backend, API REST/GraphQL, base de datos o servicios en la nube.
- Inicio de sesión, cuentas, roles, permisos o panel administrativo.
- Procesamiento de georradar, simulaciones físicas, gprMax, modelos de IA, detección automática o predicción.
- Cálculo científico o determinación real de riesgo de socavación.
- Integración con sensores, radares, archivos GPR, servicios de alertas o reportes en tiempo real.
- Mapas de calor, polígonos de riesgo, rutas, búsquedas, filtros avanzados o agrupación de marcadores.
- Dashboards, tablas analíticas, gráficos, métricas, históricos o descargas de reportes.
- Fotos, formularios de edición o almacenamiento de cambios.
- Google Maps, servicios cartográficos de pago o API keys.
- Dependencias, configuración o infraestructura que no sean necesarias para lo solicitado.

No convertir el prototipo en una herramienta operativa de decisiones de seguridad; conservar siempre su carácter demostrativo.

## 12. Reglas de actuación y entrega de Codex

1. Hacer cambios mínimos, legibles y reversibles, respetando lo ya existente.
2. Antes de introducir una librería, comprobar si puede resolverse con el stack obligatorio; justificar cada dependencia adicional.
3. Nunca inventar APIs, credenciales, datasets, especificaciones del IDS GeoRadar Stream UP ni resultados medidos.
4. No modificar ficheros de generación de datos GPR, métricas científicas o documentos de investigación para adaptar el frontend.
5. No eliminar ni regenerar archivos del usuario sin necesidad y sin explicar el impacto.
6. Mantener la capa de lectura de datos independiente de la presentación; no anticipar arquitectura compleja para integraciones aún inexistentes.
7. Al finalizar una implementación, informar: archivos creados/modificados, comandos ejecutados, resultados de validación y limitaciones pendientes.
8. Si una indicación futura solicita expresamente un cambio de alcance, aclarar qué requisito de este MVP se modifica antes de implementarlo.

## 13. Referencias técnicas de consulta

- React Leaflet — instalación y compatibilidad: https://react-leaflet.js.org/docs/start-installation/
- React Leaflet — preparación del mapa: https://react-leaflet.js.org/docs/start-setup/
- Leaflet — documentación: https://leafletjs.com/
- OpenStreetMap — política del servidor público de teselas: https://operations.osmfoundation.org/policies/tiles/
- OpenStreetMap — atribución y copyright: https://www.openstreetmap.org/copyright
- SIATA — inspiración funcional y visual, **sin reutilizar identidad o código**: https://siata.gov.co/siata_nuevo/

**Recordatorio final:** el entregable a desarrollar en futuras sesiones es un **frontend de mapa con marcadores de ejemplo y popups**, no una plataforma de monitoreo real. La prioridad es cumplir el MVP con claridad, accesibilidad y una arquitectura pequeña que pueda evolucionar.
