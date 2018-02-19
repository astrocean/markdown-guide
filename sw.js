---
layout: null
---

const staticCacheName = "markdown-guide-v1";

console.log("installing service worker");

const filesToCache = [
  "/",
  "/index.html"
  "/about/",
  "/getting-started/",
  "/cheat-sheet/",
  "/basic-syntax/",
  "/extended-syntax",
  "/api/v1/",
  "/favicon.ico",
  "/assets/images/atom.png",
  "/assets/images/dillinger.png",
  "/assets/images/markdown-mark-white.svg",
  "/assets/images/markdown-mark.svg",
  "/assets/images/philly-magic-garden.jpg",
  "/assets/images/process.png",
  "/assets/images/shiprock.jpg",
  "/assets/images/tasklist.png",
  "/assets/images/tux.png",
  "/assets/css/bootstrap-toc.min.css",
  "/assets/css/bootstrap.min.css",
  "/assets/css/bootstrap.min.css.map",
  "/assets/css/font-awesome.min.css",
  "/assets/css/homepage.css",
  "/assets/css/open-sans.css",
  "/assets/css/page.css",
  "/assets/css/search.css",
  "/assets/css/syntax.css",
  "/assets/javascript/anchor.js",
  "/assets/javascript/boostrap-toc.min.js",
  "/assets/javascript/bootstrap.min.js",
  "/assets/javascript/jquery-1.12.4.min.js"
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
