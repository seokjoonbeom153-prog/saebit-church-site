const CACHE='saebit-church-v3';
const ASSETS=['./','./index.html','./styles.css','./manifest.webmanifest','./app-icon.svg','./bulletins/index.html','./bulletins/2026-09-20.html','./assets/chuseok-family-worship-2026-p1.jpg','./assets/chuseok-family-worship-2026-p2.jpg','./bible-reading/index.html','./bible-reading/new-testament-week7.html'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))))});

