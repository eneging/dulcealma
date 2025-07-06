const CACHE_NAME = 'my-react-pwa-cache-v1';
const urlsToCache = [
  '/', // Cacha la página principal
  '/index.html', // Cacha el HTML base
  // Agrega aquí todas las rutas y archivos estáticos que quieres que estén disponibles offline
  // Por ejemplo, CSS, JS que no sea parte del bundle, imágenes, etc.
  // Vite genera bundles JS/CSS con hashes, por lo que es más complejo cachearlos directamente aquí.
  // Para React/Vite, la estrategia más común es cachear el shell de la app y los assets estáticos.
  // Los archivos JS/CSS del bundle se pueden cachear con una estrategia de "cache first" o "network falling back to cache".
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache abierto');
        return cache.addAll(urlsToCache); // Cacha los archivos listados
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si el recurso está en caché, lo devuelve
        if (response) {
          return response;
        }
        // Si no está en caché, intenta ir a la red
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Elimina caches antiguos
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});