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

const CACHE_NAME = "static-cache-v6";
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
self.addEventListener("activate", (evt) => {
  console.log("[Service Worker] Activate");

  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  //start controlling all oaded clients w/o reloading them
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);
  if (evt.request.mode !== "navigate") {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.open(CACHE_NAME).then(cache => {
        return cache.match("offline.html");
      });
    })
  );
});
