/* Hair Space: substitui o worker antigo, remove somente os caches desta
   barbearia e desativa o cache offline. Publique no mesmo caminho: sw.js.
   A instalação pela tela inicial continua usando manifest.webmanifest. */
function isHairSpaceCache(name) {
  return /^hairspace-v\d+$/.test(name);
}

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) =>
  event.waitUntil(
    (async () => {
      try {
        const names = await caches.keys();
        await Promise.allSettled(
          names.filter(isHairSpaceCache).map((name) => caches.delete(name)),
        );
        await self.clients.claim();
        const windows = await self.clients.matchAll({ type: "window" });
        await Promise.allSettled(windows.map((client) => client.navigate(client.url)));
      } finally {
        await self.registration.unregister();
      }
    })(),
  ),
);
