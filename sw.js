// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

// event listener for installation
var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
  "/",
  "/Lab7/",
  //   "/Lab7/scripts/script.js",
  //   "/Lab7/scripts/router.js",
  "/Lab7/index.html",
  "https://cse110lab6.herokuapp.com/entries",
];

self.addEventListener("install", function (event) {
  console.log("listener added");
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// event listener for activation
self.addEventListener("activate", function (event) {
  event.waitUntil(clients.claim());
});

// event listener for fetch
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
