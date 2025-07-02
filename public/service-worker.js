/* eslint-disable no-restricted-globals */

// This service worker can be customized
// See https://developers.google.com/web/tools/workbox/modules

// Precaching and runtime caching using workbox
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('fonts.googleapis.com')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request)
          .then((fetchResponse) => {
            const responseClone = fetchResponse.clone();
            caches.open('google-fonts-stylesheets').then((cache) => {
              cache.put(event.request, responseClone);
            });
            return fetchResponse;
          });
      })
    );
  }

  // Cache the Google Fonts webfont files with a cache-first strategy for 1 year
  if (event.request.url.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response;
        
        return fetch(event.request).then((fetchResponse) => {
          // Cache for 1 year
          const responseClone = fetchResponse.clone();
          caches.open('google-fonts-webfonts').then((cache) => {
            cache.put(event.request, responseClone);
          });
          return fetchResponse;
        });
      })
    );
  }

  // Cache static assets
  if (
    event.request.url.includes('/static/') ||
    event.request.url.match(/\.(png|jpg|jpeg|svg|gif)$/)
  ) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response;
        
        return fetch(event.request).then((fetchResponse) => {
          const responseClone = fetchResponse.clone();
          caches.open('static-assets').then((cache) => {
            cache.put(event.request, responseClone);
          });
          return fetchResponse;
        });
      })
    );
  }
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['google-fonts-stylesheets', 'google-fonts-webfonts', 'static-assets'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});
