// ============================================
// WEDDING APP SERVICE WORKER
// Offline support, caching, background sync
// ============================================

const CACHE_NAME = 'wedding-app-v10';
const STATIC_CACHE = 'wedding-static-v10';
const DYNAMIC_CACHE = 'wedding-dynamic-v10';

// Files to cache immediately
const STATIC_FILES = [
    './',
    './index.html',
    './src/styles.css',
    './src/app.js',
    './src/data.js',
    './src/translations.js',
    './src/firebase-config.js',
    './src/pwa.js',
    './manifest.json',
    './public/icons/icon-192.svg',
    './public/icons/icon-512.svg'
];

// External resources to cache
const EXTERNAL_RESOURCES = [
    'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@400;500;600&display=swap'
];

// ============================================
// INSTALL EVENT
// ============================================

self.addEventListener('install', event => {
    console.log('📦 Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static files
            caches.open(STATIC_CACHE).then(cache => {
                console.log('Caching static files...');
                return cache.addAll(STATIC_FILES).catch(err => {
                    console.warn('Some static files failed to cache:', err);
                });
            }),
            // Cache external resources
            caches.open(DYNAMIC_CACHE).then(cache => {
                return Promise.all(
                    EXTERNAL_RESOURCES.map(url => 
                        fetch(url)
                            .then(response => cache.put(url, response))
                            .catch(() => console.log('External resource not cached:', url))
                    )
                );
            })
        ])
    );
    
    // Activate immediately
    self.skipWaiting();
});

// ============================================
// ACTIVATE EVENT
// ============================================

self.addEventListener('activate', event => {
    console.log('✅ Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Delete old caches
                    if (cacheName !== STATIC_CACHE && 
                        cacheName !== DYNAMIC_CACHE && 
                        cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    // Take control of all clients immediately
    self.clients.claim();
});

// ============================================
// FETCH EVENT - CACHING STRATEGIES
// ============================================

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip Firebase requests (let them go to network)
    if (url.hostname.includes('firebase') || 
        url.hostname.includes('firebaseio')) {
        return;
    }
    
    // Handle different types of requests
    if (STATIC_FILES.some(file => request.url.includes(file.replace('./', '')))) {
        // Cache First strategy for static files
        event.respondWith(cacheFirst(request));
    } else if (url.hostname === 'fonts.googleapis.com' || 
               url.hostname === 'fonts.gstatic.com') {
        // Cache First for fonts (they rarely change)
        event.respondWith(cacheFirst(request));
    } else if (request.destination === 'image') {
        // Cache First for images
        event.respondWith(cacheFirst(request));
    } else {
        // Network First for everything else (API calls, etc.)
        event.respondWith(networkFirst(request));
    }
});

// Cache First Strategy
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        // Return cached, but fetch new version in background
        fetchAndCache(request);
        return cachedResponse;
    }
    return fetchAndCache(request);
}

// Network First Strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
            return caches.match('./index.html');
        }
        throw error;
    }
}

// Fetch and cache helper
async function fetchAndCache(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        // Return offline fallback for HTML
        if (request.destination === 'document') {
            return caches.match('./index.html');
        }
        throw error;
    }
}

// ============================================
// MESSAGE HANDLING
// ============================================

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('Skipping waiting...');
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
            })
        );
    }
});

// ============================================
// PUSH NOTIFICATIONS (for future use)
// ============================================

self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body || 'Wedding update!',
        icon: './public/icons/icon-192.svg',
        badge: './public/icons/icon-192.svg',
        vibrate: [200, 100, 200],
        tag: data.tag || 'wedding-notification',
        requireInteraction: data.important || false,
        data: {
            url: data.url || './'
        }
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || '💒 Wedding Update', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    const urlToOpen = event.notification.data?.url || './';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(clientList => {
                // Focus existing window if open
                for (const client of clientList) {
                    if (client.url.includes('wedding-app') && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Open new window
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

// ============================================
// BACKGROUND SYNC (for future use)
// ============================================

self.addEventListener('sync', event => {
    if (event.tag === 'sync-tasks') {
        event.waitUntil(syncTasks());
    }
});

async function syncTasks() {
    // This would sync offline task completions when back online
    console.log('Background sync: syncing tasks...');
    // Implementation would go here
}

console.log('🎊 Wedding App Service Worker loaded');
