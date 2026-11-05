const CACHE_NAME = 'hairspace-cache-v1';

const assetsToCache = [
  './',
  './index.html',
  './css/style.css',
  './config.js',
  './js/app.js',
  './manifest.webmanifest',
  './logo-header.webp',
  './image_PaQRPY.png',
  
  './degrade-desenho.webp',
  './mechas-rosas.webp',
  './pompadour-degrade.webp',
  './social-risca.webp',
  './risca-lateral-barba.webp',
  './risco-duplo.webp',

  './cacheado-degrade.webp',
  './cacheado-tijolinho.webp',
  './cacheado-volume.webp',
  './classico-franja.webp',
  './corte-lateral.webp',
  './degrade-oculos.webp',
  './degrade-risca.webp',
  './navalha-acabamento.webp',
  './risca-marcada.webp',
  './risco-duplo-fino.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.url.includes('://whatsapp.com')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});


