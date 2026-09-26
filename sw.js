const CACHE = "saebit-church-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.webmanifest",
  "./app-icon.svg",
  "./bulletins/index.html",
  "./bulletins/2026-09-27.html",
  "./assets/bulletin-2026-09-27-p1.jpg",
  "./assets/bulletin-2026-09-27-p2.jpg",
  "./bible-reading/index.html",
  "./bible-reading/new-testament-week8.html",
  "./family-prayers/index.html",
  "./family-prayers/prayer-for-family.html",
  "./assets/family-prayer/prayer-for-family.pdf",
  "./assets/family-prayer/prayer-for-family-p1.jpg",
  "./assets/family-prayer/prayer-for-family-p2.jpg",
  "./assets/family-prayer/prayer-for-family-p3.jpg",
  "./assets/family-prayer/prayer-for-family-p4.jpg",
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() =>
        caches
          .match(event.request)
          .then((r) => r || caches.match("./index.html")),
      ),
  );
});
