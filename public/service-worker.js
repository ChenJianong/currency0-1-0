"use strict"; //forces all errors, helps write cleaner code

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [ '/',
  '/index.html',
  '/client.js',
  '/style.css',
  '/images/icon.png',
  '/images/icon144x145.png',
  '/images/icon192x194.png',
  '/images/icon512x512.png',
  '/images/icon96x96.png',
    ];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = 'data-cache-v4';
/* Adds an install event to the page that caches offline resources. */
self.addEventListener("install", evt => {
  console.log("[ServiceWorker] Install");

  // CODELAB: Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

/*once your service worker is ready to control clients and handle
 *functional events like push and sync, you'll get an activate 3event
 */
self.addEventListener('activate', (evt)=> {
  console.log('[ServiceWorker] Activate');
  
 //Remove previous cached data from disk.
  evt.waitUntil(
     caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);

  //start controlling all loaded clients w/o reloading them
  self.clients.claim();
});


self.addEventListener('fetch', (evt)=> {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  if (evt.request.url.includes('/api')) {
  console.log("[Service Worker] Fetch (data)", evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            })
            .catch((err) => {
              // Network request failed, try to get it from the cache.
             return cache.match(evt.request);
            });
      })
    );
    return;
  }
  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request).then((response) => {
        return response || fetch(evt.request);
      });
     })
  );
});
