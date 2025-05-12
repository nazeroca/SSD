var CACHE_NAME = 'SSD';
var urlsToCache = [
    '/', '/index.html', '/main.js', '/manifest.json', '/styles.css', '/sw.js', '/オープニング.js', './PWAimage/slime192.png', './PWAimage/slime512.png'
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});