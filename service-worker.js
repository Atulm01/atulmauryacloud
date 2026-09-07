const CACHE_NAME = 'atul-maurya-cloud-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './logo.png.png',
  './myphoto.jpg.jpg',
  './ravi-gupta.jpg.jpg',
  './vijay-singh.jpg.jpg',
  './abdullah-ahmad.jpg.jpg',
  './azure.svg',
  './microsoft.svg',
  './teams.svg',
  './powerbi.svg',
  './powerapps.svg',
  './dynamics365.svg'
];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(APP_SHELL);
  }));
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key !== CACHE_NAME;
      }).map(function (key) {
        return caches.delete(key);
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request).then(function (response) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, copy);
        });
        return response;
      });
    })
  );
});
