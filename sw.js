const CACHE_NAME = 'students-app-v1';
const FILES_TO_CACHE = [
    '/index.html',
    '/style.css',
    '/script.js',
    'C:\Users\JINTO\Desktop\Students\Pics\URK24CS1207.jpeg',
    '/Pics/URK24CS1208.jpg',
    '/Pics/URK24CS1209.JPG',
    '/Pics/URK24CS1210.jpeg',
    '/Pics/URK24CS1211.jpg',
    '/Pics/URK24CS1212.jpg',
    '/Pics/URK24CS1213.jpg',  // Fixed space
    '/Pics/URK24CS1214.jpeg',
    '/Pics/URK24CS1215.jpg',
    '/Pics/URK24CS1216.jpg',
    '/Pics/URK24CS1218.jpg',
    '/Pics/URK24CS1221.jpg',
    '/Pics/URK24CS1223.jpeg',
    '/Pics/URK24CS1225.jpg',  // Fixed space
    '/Pics/URK24CS1226.jpg',
    '/Pics/URK24CS1228.jpg',  // Fixed space
    '/Pics/URK24CS1229.jpeg',
    '/Pics/URK24CS1230.jpg',
    '/Pics/URK24CS1231.jpg',
    '/Pics/URK24CS1232.jpg',
    '/Pics/URK24CS1233.jpg',
    '/Pics/URK24CS1234.jpg',
    '/Pics/URK24CS1235.jpg',
    '/Pics/URK24CS1239.jpg',
    '/Pics/URK24CS1241.jpg',
    '/Pics/URK24CS1278.jpg',
    '/Pics/urk24cs1281.jpg'   // Note lowercase; match your actual file
    // Add '/Pics/icon.png' if you have an icon
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching files');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});