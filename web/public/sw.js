// Service Worker de Transportes Palomo.
// Estrategia: network-first con respaldo en caché. Así la app abre sin conexión
// mostrando la última versión guardada de cada pantalla.

const CACHE = "palomo-v1";
const PRECACHE = ["/", "/manifest.json", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Solo manejamos GET del mismo origen. Las llamadas a la API (otro puerto) pasan directo.
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copia = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copia));
        }
        return response;
      })
      .catch(async () => {
        const enCache = await caches.match(request);
        if (enCache) return enCache;
        // Si es una navegación y no hay copia de esa página, mostramos la pantalla principal.
        if (request.mode === "navigate") {
          const inicio = await caches.match("/");
          if (inicio) return inicio;
        }
        return new Response("Sin conexión", { status: 503, statusText: "Offline" });
      })
  );
});
