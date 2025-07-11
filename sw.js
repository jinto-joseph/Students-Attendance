const CACHE_NAME = 'students-app-v3';
const FILES_TO_CACHE = [
    '/Students-Attendance/index.html',
    '/Students-Attendance/style.css',
    '/Students-Attendance/script.js',
    '/Students-Attendance/manifest.json',
    '/Students-Attendance/sw.js',
    '/Students-Attendance/Pics/icon.png',  // App icon for PWA install
    '/Students-Attendance/Pics/URK24CS1002.jpeg',
    '/Students-Attendance/Pics/URK24CS1207.jpeg',
    '/Students-Attendance/Pics/URK24CS1208.jpg',
    '/Students-Attendance/Pics/URK24CS1209.JPG',
    '/Students-Attendance/Pics/URK24CS1210.jpeg',
    '/Students-Attendance/Pics/URK24CS1211.jpg',
    '/Students-Attendance/Pics/URK24CS1212.jpg',
    '/Students-Attendance/Pics/URK24CS1213.jpg',
    '/Students-Attendance/Pics/URK24CS1213%20.jpg',
    '/Students-Attendance/Pics/URK24CS1214.jpeg',
    '/Students-Attendance/Pics/URK24CS1215.jpg',
    '/Students-Attendance/Pics/URK24CS1216.jpg',
    '/Students-Attendance/Pics/URK24CS1218.jpg',
    '/Students-Attendance/Pics/URK24CS1221.jpg',
    '/Students-Attendance/Pics/URK24CS1223.jpeg',
    '/Students-Attendance/Pics/URK24CS1225.jpg',
    '/Students-Attendance/Pics/URK24CS1225%20.jpg',
    '/Students-Attendance/Pics/URK24CS1226.jpg',
    '/Students-Attendance/Pics/URK24CS1228.jpg',
    '/Students-Attendance/Pics/URK24CS1228%20.jpg',
    '/Students-Attendance/Pics/URK24CS1229.jpeg',
    '/Students-Attendance/Pics/URK24CS1230.jpg',
    '/Students-Attendance/Pics/URK24CS1231.jpg',
    '/Students-Attendance/Pics/URK24CS1232.jpg',
    '/Students-Attendance/Pics/URK24CS1233.jpg',
    '/Students-Attendance/Pics/URK24CS1234.jpg',
    '/Students-Attendance/Pics/URK24CS1235.jpg',
    '/Students-Attendance/Pics/URK24CS1239.jpg',
    '/Students-Attendance/Pics/URK24CS1241.jpg',
    '/Students-Attendance/Pics/URK24CS1278.jpg',
    '/Students-Attendance/Pics/urk24cs1281.jpg'
];

// Install event - Cache files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching files...');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Activate event - Remove old caches
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

// Fetch event - Serve from cache if available
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
