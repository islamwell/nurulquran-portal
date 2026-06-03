/**
 * NurulQuran Portal - Service Worker
 * Caches core landing assets and Quran recitation track for full offline usage.
 */

const CACHE_NAME = 'nq-portal-cache-v1.03';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './050shatri.mp3',
    'https://iqra.nurulquran.com/icons/palmtree-madinah.svg',
    'https://nurulquran.com/wp-content/uploads/2018/02/nq-logo-200-143.png'
];

// Install Event
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Event
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event (Network-First Fallback-to-Cache Strategy for MP3, Cache-First for other assets)
self.addEventListener('fetch', (e) => {
    const url = new URL(e.request.url);

    // Audio file and large media: Network first, fallback to cache
    if (url.pathname.endsWith('.mp3')) {
        e.respondWith(
            fetch(e.request)
                .catch(() => caches.match(e.request))
        );
    } else {
        // Static assets: Cache first
        e.respondWith(
            caches.match(e.request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(e.request).then((networkResponse) => {
                        // Dynamically cache new requests from CDN
                        if (networkResponse.status === 200) {
                            const cacheCopy = networkResponse.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(e.request, cacheCopy);
                            });
                        }
                        return networkResponse;
                    });
                })
        );
    }
});
