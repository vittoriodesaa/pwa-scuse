var app = angular.module('scuseApp', []);

// 2. Creiamo il Controller (il "direttore d'orchestra" della pagina)
app.controller('MainController', function($scope) {

    // Questa è la nostra lista segreta di scuse (la v0)
    var listaScuse = [
        "Ho il gatto che ha bisogno di supporto emotivo.",
        "Devo riordinare la mia collezione di tappi di sughero.",
        "Il mio oroscopo ha detto di non fidarmi dell'aria aperta oggi.",
        "Sto aspettando che un pacco venga consegnato nel 2028.",
        "Ho promesso al mio divano che stasera guardavamo un film insieme.",
        "C'è un aggiornamento di Windows in corso, potrebbe finire tra un mese.",
        "Ho accidentalmente incollato le dita insieme con l'Attak."
    ];

    // Cosa appare sullo schermo appena apri l'app:
    $scope.scusaAttuale = "Premi il bottone per generare una scusa...";

    // 3. La funzione che si attiva quando premi il bottone (VERSIONE ANTI-DOPPIONI)
    $scope.generaScusa = function() {
        var nuovaScusa = $scope.scusaAttuale; // Partiamo dalla scusa che c'è ora a schermo

        // Continua a pescare finché la scusa pescata è uguale a quella di prima
        while (nuovaScusa === $scope.scusaAttuale) {
            var indiceCasuale = Math.floor(Math.random() * listaScuse.length);
            nuovaScusa = listaScuse[indiceCasuale];
        }

        // Trovata una diversa! Mostriamola a schermo.
        $scope.scusaAttuale = nuovaScusa;
    };

});


// --- FASE C: L'Assunzione del Maggiordomo ---
// Controlliamo se il browser supporta i Service Worker
if ('serviceWorker' in navigator) {
    // Aspettiamo che la pagina sia completamente caricata
    window.addEventListener('load', function() {
        // Diciamo al browser dove trovare il nostro maggiordomo
        navigator.serviceWorker.register('./sw.js')
            .then(function(registration) {
                console.log('Maggiordomo assunto con successo! Area di competenza:', registration.scope);
            })
            .catch(function(error) {
                console.log('Problemi con l\'assunzione del maggiordomo:', error);
            });
    });
}