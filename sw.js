self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("up1").then(function(cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/restaurant.html",
        "/data/",
        "/data/restaurants.json",
        "/css/",
        "/css/styles.css",
        "/js/",
        "/js/dbhelper.js",
        "/js/main.js",
        "/js/restaurant_info.js",
        "/js/idb.js",
        "/img/"
        //   '/img/*.jpg'
      ]);
    })
  );
});
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    })
  );
});
