self.addEventListener('install', function(event) {
  console.log('Service Worker Installed');
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker Activated');
  // Take control of all the clients as soon as the service worker is activated
  self.clients.claim();
});

function clearLocalStorage() {
  const lastClear = localStorage.getItem('lastClear');
  const now = Date.now();

  // Clear local storage if the last clear was more than 24 hours ago
  if (!lastClear || now - parseInt(lastClear, 10) > 24 * 60 * 60 * 1000) {
    console.log('Clearing local storage');
    localStorage.clear();
    localStorage.setItem('lastClear', now.toString());
  }
}

// Periodically check for local storage clearance
self.addEventListener('periodicsync', function(event) {
  if (event.tag === 'clear-local-storage') {
    event.waitUntil(clearLocalStorage());
  }
});

// Listen for background sync event to clear local storage
self.addEventListener('sync', function(event) {
  if (event.tag === 'clear-local-storage') {
    event.waitUntil(clearLocalStorage());
  }
});
