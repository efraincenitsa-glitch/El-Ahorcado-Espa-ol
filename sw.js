const CACHE_NAME="ahorcado-latino-pro-v1";
const ASSETS=["./","index.html","styles.css","app.js","manifest.webmanifest","assets/icons/icon.svg","assets/icons/icon-192.png","assets/icons/icon-512.png","assets/icons/icon-1024.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",event=>{event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).catch(()=>caches.match("index.html"))));});
