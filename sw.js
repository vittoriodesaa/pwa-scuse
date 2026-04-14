// 1. Diamo un nome alla nostra "cassaforte"
// RICORDA: Cambia questo numero (v2, v3, v4...) ogni volta che fai una modifica!
var NOME_CACHE = 'scuse-cache-v3';

var fileDaSalvare = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './icon.png'
];

// FASE 1: L'Installazione
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(NOME_CACHE)
            .then(function(cache) {
                console.log('Maggiordomo: Sto salvando i file nella ' + NOME_CACHE);
                return cache.addAll(fileDaSalvare);
            })
    );
    self.skipWaiting(); // Forza l'attivazione immediata
});

// FASE 2: La Pulizia (Il pezzetto che mancava)
// Questo cancella le vecchie cache (es. la v1) quando la v2 diventa attiva
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(nomiCache) {
            return Promise.all(
                nomiCache.map(function(nome) {
                    if (nome !== NOME_CACHE) {
                        console.log('Maggiordomo: Cancello la vecchia cache:', nome);
                        return caches.delete(nome);
                    }
                })
            );
        })
    );
});

// FASE 3: Il Recupero (Fetch)
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});