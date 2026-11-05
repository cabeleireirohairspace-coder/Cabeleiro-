/* Hair Space — service worker.
   Ao publicar mudanças (fotos, textos, preços), aumente o número de VERSAO
   para os celulares baixarem a versão nova. */
const VERSAO = 'hairspace-v1';
const ARQUIVOS = [
  "./",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/favicon-48.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/maskable-512.png",
  "assets/img/galeria/cacheado-degrade.webp",
  "assets/img/galeria/cacheado-tijolinho.webp",
  "assets/img/galeria/cacheado-volume.webp",
  "assets/img/galeria/classico-franja.webp",
  "assets/img/galeria/corte-lateral.webp",
  "assets/img/galeria/degrade-oculos.webp",
  "assets/img/galeria/degrade-risca.webp",
  "assets/img/galeria/navalha-acabamento.webp",
  "assets/img/galeria/nosso-espaco.webp",
  "assets/img/galeria/risca-marcada.webp",
  "assets/img/galeria/risco-duplo-fino.webp",
  "assets/img/galeria/social-lateral.webp",
  "assets/img/logo-header.webp",
  "assets/img/vitrine/degrade-desenho.webp",
  "assets/img/vitrine/mechas-rosas.webp",
  "assets/img/vitrine/pompadour-degrade.webp",
  "assets/img/vitrine/risca-lateral-barba.webp",
  "assets/img/vitrine/risco-duplo.webp",
  "assets/img/vitrine/social-risca.webp",
  "css/style.css",
  "index.html",
  "js/app.js",
  "js/config.js",
  "manifest.webmanifest"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    // páginas: tenta a rede, cai para o cache se estiver offline
    e.respondWith(fetch(req).catch(() => caches.match('index.html')));
    return;
  }
  // arquivos: cache primeiro, atualiza em segundo plano
  e.respondWith(caches.match(req).then(hit => {
    const rede = fetch(req).then(res => {
      if (res.ok) caches.open(VERSAO).then(c => c.put(req, res.clone()));
      return res;
    }).catch(() => hit);
    return hit || rede;
  }));
});
