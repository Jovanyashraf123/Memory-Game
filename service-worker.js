const CACHE_NAME = "Memory-cache-v1";

// عدّل الأسامي دي لو ملفاتك اسمها مختلف
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./CSS/main.css",
  "./JS/main.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// تثبيت الـ service worker وتخزين الملفات الأساسية
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// تفعيل الـ service worker ومسح أي كاش قديم
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// اعتراض أي طلب: لو موجود في الكاش استخدمه، لو مش موجود روح على النت
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
