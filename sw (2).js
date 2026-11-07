/* Hair Space — service worker.
   Ao publicar mudanças, aumente o número de VERSAO para os celulares baixarem a versão nova. */
const VERSAO = 'hairspace-v3';
const ARQUIVOS = [
  "./",
  "apple-touch-icon.png",
  "cacheado-degrade.webp",
  "cacheado-tijolinho.webp",
  "cacheado-volume.webp",
  "classico-franja.webp",
  "corte-lateral.webp",
  "degrade-desenho.webp",
  "degrade-oculos.webp",
  "degrade-risca.webp",
  "favicon-48.png",
  "icon-192.png",
  "icon-512.png",
  "index.html",
  "logo-header.webp",
  "manifest.webmanifest",
  "maskable-512.png",
  "mechas-rosas.webp",
  "navalha-acabamento.webp",
  "nosso-espaco.webp",
  "pompadour-degrade.webp",
  "risca-lateral-barba.webp",
  "risca-marcada.webp",
  "risco-duplo-fino.webp",
  "risco-duplo.webp",
  "social-lateral.webp",
  "social-risca.webp"
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
