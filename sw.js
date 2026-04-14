// Diamo un nome alla nostra "cassaforte" (fondamentale per quando faremo la v1)
var NOME_CACHE = 'scuse-cache-v0';

// La lista della spesa: i file che il maggiordomo deve mettere in cassaforte
var fileDaSalvare = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './icon.png'
];

// FASE 1: L'Installazione
// Quando l'app viene aperta per la prima volta, il maggiordomo scarica i file
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(NOME_CACHE)
            .then(function(cache) {
                console.log('Maggiordomo: Cache aperta, sto salvando i file...');
                return cache.addAll(fileDaSalvare);
            })
    );
});

// FASE 2: Il Recupero (Fetch)
// Ogni volta che l'app cerca un file, il maggiordomo si mette in mezzo
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Se il file è già nella cassaforte (cache), te lo dà subito (funziona offline!)
                if (response) {
                    return response;
                }
                // Altrimenti, lo va a pescare da internet
                return fetch(event.request);
            })
    );
});