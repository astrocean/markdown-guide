---
layout: null
---

const staticCacheName = "markdown-guide-v1";

console.log("installing service worker");

const filesToCache = [
  "/",
  "/index.html",
  "/about/",
  "/getting-started/",
  "/cheat-sheet/",
  "/basic-syntax/",
  "/extended-syntax",
  "/api/v1/",
  "/favicon.ico"
];

self.addEventListener("install", function(e){
  self.skipWaiting();

  e.waitUntil(
    caches.open(staticCacheName).then(function(cache){
      return cache.addAll(filesToCache);
    })
  )
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith("markdown-guide-")
            && cacheName != staticCacheName;
        }).map(function(cacheName){
          return caches.delete(cacheName);
        })
      )
    })
  )
});

self.addEventListener("fetch", function(e){
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  )
});
