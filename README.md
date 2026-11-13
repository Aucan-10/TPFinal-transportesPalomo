# Transportes Palomo

Aplicación web para gestionar la flota de una empresa de transporte: camiones refrigerados y camiones de mudanzas.
Trabajo Integrador de Programación Web Dinámica (6° 1°, EPET Nº 30, 2026).

- **API:** Laravel 13 (SQLite), carpeta `api/`
- **Frontend:** Next.js 16 (App Router, JavaScript), carpeta `web/`
- **PWA:** instalable, con Service Worker y modo offline

## Requisitos

- PHP 8.3 o superior, con las extensiones `xml`, `mbstring`, `curl`, `zip`, `sqlite3` y `bcmath`
- Composer
- Node.js 20 o superior y npm

## Cómo correrlo

### 1. API (Laravel)

```bash
cd api
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
```

En el archivo `.env`, dejá `DB_CONNECTION=sqlite` (y borrá o comentá las otras variables `DB_*`).

Después, migrá la base y cargá los datos de ejemplo:

```bash
php artisan migrate --seed
```

Y levantá la API en el puerto 8000:

```bash
php artisan serve
```

La API queda disponible en `http://127.0.0.1:8000/api/camiones`.

### 2. Frontend (Next.js)

En otra terminal:

```bash
cd web
npm install
npm run dev
```

La app queda disponible en `http://localhost:3000`. Para que el listado funcione, la API tiene que estar corriendo en el puerto 8000.

### 3. Instalar la PWA

Abrí `http://localhost:3000` en Chrome. Aparece el ícono de instalación en la barra de direcciones (o en el menú del navegador, "Instalar Transportes Palomo").

Para probar el modo offline: con la app cargada, apagá la API (Ctrl+C en `php artisan serve`), marcá **Offline** en las DevTools (pestaña Network) y recargá la página. La app tiene que seguir mostrando la última lista cargada.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/camiones` | Lista todos los camiones |
| GET | `/api/camiones/{id}` | Muestra un camión |
| POST | `/api/camiones` | Crea un camión |
| PUT | `/api/camiones/{id}` | Actualiza un camión |
| DELETE | `/api/camiones/{id}` | Borra un camión |

Campos de un camión: `patente` (texto, único), `modelo` (texto), `tipo_servicio` (`refrigerado` o `mudanza`), `capacidad_kg` (número), `refrigerado` (booleano), `fecha_ultimo_service` (fecha, opcional).

## Tabla de pruebas (Thunder Client)

| Petición | Código esperado | Código obtenido |
|---|---|---|
| `GET /api/camiones` | 200 | 200 |
| `GET /api/camiones/999` | 404 | 404 |
| `POST /api/camiones` (datos válidos) | 201 | 201 |
| `POST /api/camiones` (datos inválidos: patente vacía, tipo inválido) | 422 | 422 |
| `PUT /api/camiones/1` (`{"capacidad_kg": 8500}`) | 200 | 200 |
| `DELETE /api/camiones/6` | 200 | 200 |

> Nota: estas pruebas se hicieron con `curl`. Repetilas en Thunder Client antes de entregar, y reemplazá esta tabla si los códigos cambian.

## ===== Informe teórico =====

_Respondé cada punto con tus palabras y refiriéndote a este proyecto. Entre 3 y 6 líneas por punto._

1. **Códigos de estado:** mostrá un caso de tu API que devuelva 404 y uno que devuelva 422. ¿Por qué cada uno es el código correcto y no otro?
404 (Not Found): Mi API devuelve este código cuando se hace un GET /api/camion/999 y ese ID no existe en la base de datos (usando findOrFail). Es el correcto porque el servidor entiende la petición, pero el recurso solicitado no está. No es un 400, ya que la sintaxis de la URL es válida.
422 (Unprocessable Entity): Se devuelve al hacer un POST o PUT cuando los datos no pasan la validación de $request->validate() (por ejemplo, enviar un campo numérico negativo o un texto vacío). Es el código correcto porque la sintaxis de la petición (JSON) es válida, pero los datos semánticamente no cumplen las reglas. No es un 500, ya que no es un error del servidor.

2. **HTTPS:** si tu app se publicara en HTTP en lugar de HTTPS, ¿qué podría ver alguien en la misma red? Explicá también por qué el Service Worker exige HTTPS.
Si la app se publicara en HTTP, cualquier persona en la misma red (por ejemplo, en una Wi-Fi pública) podría interceptar el tráfico (ataque Man-in-the-Middle), leyendo datos enviados o modificando las respuestas de la API. El Service Worker exige HTTPS porque actúa como un proxy a nivel de navegador que intercepta todas las peticiones de red; sin cifrado, un atacante podría inyectar código malicioso en el Service Worker y comprometer la navegación del usuario de forma persistente y silenciosa.

3. **CORS:** ¿por qué el `fetch` desde un Server Component no tiene problemas de CORS? ¿En qué caso de tu app podría aparecer?
El fetch desde un Server Component de Next.js no tiene problemas de CORS porque se ejecuta en el servidor (Node.js), y las políticas de CORS son una restricción de seguridad impuesta únicamente por los navegadores web, no por los servidores. En mi aplicación, un problema de CORS podría aparecer si un Client Component (con 'use client') intenta hacer un fetch directamente a la API de Laravel y ambos están corriendo en puertos o dominios distintos (ej. localhost:3000 llamando a localhost:8000), ya que ahí el navegador sí bloquea la petición.

4. **PWA y TWA:** ¿tu app necesita estar en Google Play? Justificá tu respuesta.
No, mi app no necesita estar obligatoriamente en Google Play. Una PWA se puede instalar directamente desde el navegador (Chrome, Edge, Safari, etc.) gracias al archivo manifest.json y al Service Worker registrado, sin intermediarios. Solo sería necesario empaquetarla como TWA (Trusted Web Activity) y subirla a la tienda si se buscara mayor visibilidad, confianza del usuario o acceso a APIs nativas específicas, pero no es un requisito técnico para su funcionamiento.

5. **Decisiones:** ¿qué fue lo que más te costó y cómo lo resolviste?
  Lo que más se me dificulto fue lograr que la aplicación funcione Offline. Muchos errores de compatibilidad de codigo surgieron en el momento del test.
  Para solucionarlo, investigue sobre los errores y corregi el codigo, descargue la app y la probé.
