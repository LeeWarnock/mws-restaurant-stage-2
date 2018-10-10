/*
Service worker code taken from: https://developers.google.com/web/fundamentals/primers/service-workers/#install_a_service_worker
https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim 
*/
import idb from "idb";

self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

var CACHE_NAME = "restaurant-reviews-cache-v1";

const dbPromise = idb.open("restaurant-reviews-cache-v1", 1, upgradeDB => {
  switch (updradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore("restaurants", { keyPath: "id" });
  }
});

var urlsToCache = [
  "/",
  "./index.html",
  "./restaurant.html",
  "./css/styles.css",
  "./js/dbhelper.js",
  "./js/main.js",
  "./js/restaurant_info.js",
  //"./data/restaurants.json",
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
  "./img/6.jpg",
  "./img/7.jpg",
  "./img/8.jpg",
  "./img/9.jpg",
  "./img/10.jpg"
];

self.addEventListener("activate", function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
