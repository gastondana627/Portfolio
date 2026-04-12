// Service Worker for Content Portfolio
// Provides offline support and caching

const CACHE_VERSION = 'content-portfolio-v1.0.0';
const CACHE_NAME = `content-portfolio-${CACHE_VERSION}`;

// Assets to cache on install
const PRECACHE_ASSETS = [
    '/content/',
    '/content/index.html',
    '/content/content-styles.css',
    '/content/content-scripts.js',
    '/style.css',
    '/shared/components.css',
    '/shared/components.js'
];

// Cache strategies
const CACHE_STRATEGIES = {
    cacheFirst: 'cache-first',
    networkFirst: 'network-first',
    staleWhileRevalidate: 'stale-while-revalidate'
};

// Install event - cache critical assets
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching precache assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name.startsWith('content-portfolio-') && name !== CACHE_NAME)
                        .map((name) => {
                            console.log('Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip external requests
    if (url.origin !== location.origin) {
        return;
    }

    // Determine cache strategy based on request type
    const strategy = getCacheStrategy(request);

    event.respondWith(
        handleRequest(request, strategy)
    );
});

// Get cache strategy for request
function getCacheStrategy(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Images - cache first
    if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
        return CACHE_STRATEGIES.cacheFirst;
    }

    // CSS and JS - stale while revalidate
    if (path.match(/\.(css|js)$/i)) {
        return CACHE_STRATEGIES.staleWhileRevalidate;
    }

    // HTML - network first
    if (path.match(/\.(html)$/i) || path.endsWith('/')) {
        return CACHE_STRATEGIES.networkFirst;
    }

    // Default - network first
    return CACHE_STRATEGIES.networkFirst;
}

// Handle request with specified strategy
async function handleRequest(request, strategy) {
    switch (strategy) {
        case CACHE_STRATEGIES.cacheFirst:
            return cacheFirst(request);
        
        case CACHE_STRATEGIES.networkFirst:
            return networkFirst(request);
        
        case CACHE_STRATEGIES.staleWhileRevalidate:
            return staleWhileRevalidate(request);
        
        default:
            return fetch(request);
    }
}

// Cache first strategy
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(request);
        
        if (response.ok) {
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        console.error('Fetch failed:', error);
        return new Response('Offline', { status: 503 });
    }
}

// Network first strategy
async function networkFirst(request) {
    const cache = await caches.open(CACHE_NAME);

    try {
        const response = await fetch(request);
        
        if (response.ok) {
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        console.error('Network request failed, trying cache:', error);
        const cached = await cache.match(request);
        
        if (cached) {
            return cached;
        }
        
        return new Response('Offline', { status: 503 });
    }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    // Fetch in background
    const fetchPromise = fetch(request).then((response) => {
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    });

    // Return cached version immediately if available
    return cached || fetchPromise;
}

// Message event - handle commands from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.delete(CACHE_NAME).then(() => {
                return self.clients.matchAll();
            }).then((clients) => {
                clients.forEach((client) => {
                    client.postMessage({ type: 'CACHE_CLEARED' });
                });
            })
        );
    }
});
