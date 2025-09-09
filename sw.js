const CACHE_NAME = 'resep-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/style.css',
  '/resep.jpg'
];

self.addEventListener('install', event => {
  console.log('Service Worker: Menginstal...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Membuka cache dan menambahkan file aset.');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Aktif.');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          console.log('ambil dari cache:', event.request.url);
          return response;
        }
        console.log('fetch dari jaringan:', event.request.url);
        return fetch(event.request);
      })
    );
}); 