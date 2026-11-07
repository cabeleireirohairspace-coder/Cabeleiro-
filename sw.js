/* Hair Space — service worker.
   Ao publicar mudanças, aumente o número de VERSAO para os celulares baixarem a versão nova. */
const VERSAO = 'hairspace-v5';
const ARQUIVOS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "maskable-512.png",
  "apple-touch-icon.png",
  "favicon-48.png",
  "social-risca.webp",
  "risco-duplo.webp",
  "risco-duplo-fino.webp",
  "degrade-desenho.webp",
  "pompadour-degrade.webp",
  "mechas-rosas.webp",
  "risca-lateral-barba.webp",
  "cacheado-tijolinho.webp",
  "social-lateral.webp",
  "cacheado-volume.webp",
  "classico-franja.webp",
  "corte-lateral.webp",
  "degrade-oculos.webp",
  "cacheado-degrade.webp",
  "navalha-acabamento.webp"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => Promise.all(ARQUIVOS.map(a => c.add(a).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {
    const rede = fetch(req).then(res => {
      if (res.ok) caches.open(VERSAO).then(c => c.put(req, res.clone()));
      return res;
    }).catch(() => hit);
    return hit || rede;
  }));
});
