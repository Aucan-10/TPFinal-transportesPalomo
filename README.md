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

## Problemas conocidos

- _Completar: qué no funciona o qué quedó pendiente, si hay algo._

## Informe teórico

_Respondé cada punto con tus palabras y refiriéndote a este proyecto. Entre 3 y 6 líneas por punto._

1. **Códigos de estado:** mostrá un caso de tu API que devuelva 404 y uno que devuelva 422. ¿Por qué cada uno es el código correcto y no otro?

   _Respuesta:_

2. **HTTPS:** si tu app se publicara en HTTP en lugar de HTTPS, ¿qué podría ver alguien en la misma red? Explicá también por qué el Service Worker exige HTTPS.

   _Respuesta:_

3. **CORS:** ¿por qué el `fetch` desde un Server Component no tiene problemas de CORS? ¿En qué caso de tu app podría aparecer?

   _Respuesta:_

4. **PWA y TWA:** ¿tu app necesita estar en Google Play? Justificá tu respuesta.

   _Respuesta:_

5. **Decisiones:** ¿qué fue lo que más te costó y cómo lo resolviste?

   _Respuesta:_
