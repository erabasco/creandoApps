"use strict";

window.addEventListener("load", function () {
    var claro = document.getElementById("claro");
    var oscuro = document.getElementById("oscuro");


    claro.addEventListener("click", ponloClaro);
    oscuro.addEventListener("click", ponloOscuro);

    iniciaHammer(); // para iniciar el control de gestor
});

function ponloClaro() {
    // add a class with className
    document.body.className = 'claro';
}

function ponloOscuro() {
    document.body.className = 'oscuro';
}

function iniciaHammer() {
    var zonaGestos = document.getElementById("zona-gestos");
    var hammerTime = new Hammer(zonaGestos);

    // hammer por defecto tiene inhable los manejadores de eventos de pinch y rotate, por eso lo activamos
    hammerTime.get('pinch').set({ enable: true });
    hammerTime.get('rotate').set({ enable: true });

    // para que elimine la clase 
    zonaGestos.addEventListener('webkitAnimationEnd', function (e) {
        zonaGestos.className = '';
    })


    // como el addEventListened: pinch rotate tap doubletap pan swipe press , pinch-rotate pan-swipe
    // se solapan los primeros así que si necesitamos p.ej. rotate eliminamos pinch
    hammerTime.on('pinch rotate tap doubletap pan swipe press', function (e) {
        document.querySelector('#info').innerHTML = e.type + "!";
    });


    //al hacer double pan añadimos las clase correspondiente
    hammerTime.on('doubletap', function (e) {
        zonaGestos.className = 'doubletap';
    })

    hammerTime.on('press', function (e) {
        zonaGestos.className = 'press';
    })

    // debemos saber hacia qué lado se ha hecho el swipe (golpe fuerte)
    // 2 izq, 4 derecha
    hammerTime.on('swipe', function (e) {
        if (e.direction == 2) {
            zonaGestos.className = 'swipe-izquierda';
        }
        else {
            zonaGestos.className = 'swipe-derecha';
        }
    })

    //rotar, debemos ver que umbral de desplazamiento hay
    hammerTime.on('rotate', function(e){
        if (e.distance>25){
            zonaGestos.className='rotate';
        }
    })


}