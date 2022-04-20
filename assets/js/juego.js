// Patrón módulo: patrón de diseño más común en js, por compatibilidad. Encapsulación del código
// Declaro una función anónima, y la llamo inmediatamente después de ser creada => Función anónima autoinvocada
// Crea un nuevo scope entre las llaves, que no tiene una referencia por nombre, por lo cual no es posible
// llamar el objeto directamente, por ejemplo desde la consola del Chrome
/*
(() => {
    'use strict'    // a js: "sé estricto al evaluar mi código". Habilita muchas restricciones,
                    // y evita errores comunes
    const personajes = ['shawn','glassy','el chino'];
    console.log({ personajes });
}) ();*/

const miModulo = (() => {
    'use strict';
    let cartas;
    let puntosJugadores;   // La computadora siempre es el último jugador

    // Referencias HTML
    // document.querySelector('tag');
    //                       ('.clase');
    //                       ('#id');
    // document.querySelector('img').src devuelve o modifica el source de un objeto HTML imagen
    // document.querySelector('id').classList acceso a clases CSS
    //                              .innerText
    //                              .innerHTML
    // document.getElementById('id');
    //          getElementByClassName('clase');
    // -----------------------------------------
    // Agregar elementos HTML
    // const divBotones = document.querySelector('#divBotones');
    // const botonNuevo = document.createElement('button');
    // divBotones.append ( botonNuevo );
    // botonNuevo.innerText = 'txt del botón';
    // botonNuevo.classList.add('btn'); btn, btn-danger, btn-primary, btn-success son clases de bootstrap
    // input, clase -> form-control, placeholder es el txt por defecto
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo'),
          marcador = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');

    // Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 1 ) => {
        cartas = crearMazo();
        puntosJugadores = [];
        for( let i = 0; i <= numJugadores; i++) {
            puntosJugadores.push(0);
        }
        marcador.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem => elem.innerText = '');
        btnDetener.disabled = false;
        btnPedir.disabled = false;
    }
    // Esta función crea un mazo de cartas mezclado
    const crearMazo = () => {
        const palos = ['C','D','H','S'],
              otrasCartas = ['A','J','Q','K'];
        cartas = [];
        for( let i = 2; i <= 10; i++ ) 
            for( let palo of palos ) cartas.push( i + palo );
        
        for( let otraCarta of otrasCartas )
            for( let palo of palos ) cartas.push( otraCarta + palo );
        return _.shuffle( cartas );
    }

    // Esta función me permite tomar una carta
    const pedirCarta = () => {
        if ( cartas.length === 0 ){
            throw 'No quedan más cartas';

        }
        return cartas.pop();
    }

    // Esta función retorna el valor de la carta
    /*const valorCarta = ( carta ) => {
        let simbolo = carta.substring(0, carta.length-1);
        let valor;
        
        if( isNaN( simbolo )) valor = simbolo === 'A' ? 11 : 10;
        else valor = simbolo * 1;

        return valor;
    }*/
    //Reduzco la función
    const valorCarta = carta => isNaN( carta.substring(0, carta.length - 1) ) ?
                                carta.substring(0, carta.length - 1) === 'A' ? 11 : 10
                                : carta.substring(0, carta.length - 1) * 1;

    // Esta función se encarga de actualizar la suma de puntaje y el marcador
    // Turno: 0 - primer jugador. Último la computadora.
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] += valorCarta( carta );
        marcador[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }
    
    // Crear objeto HTML carta
    const crearCarta = ( carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );
        divCartasJugadores[turno].append( imgCarta );    
    }
    
    // Añade retardo y determina ganador
    const determinarGanador = () => {
        const [ puntajeMinimo, puntosComputadora ] = puntosJugadores;
        setTimeout( () => {
            if ( puntosComputadora === puntajeMinimo ) {
                alert('Empate! Nadie gana');
            } else if ( puntosComputadora <= 21 ) {
                alert( 'La casa gana!!! Siga participando' );
            } else {
                alert( 'La casa pierde');
            }
        }, 500);
    }
    // turno de la computadora
    const turnoComputadora = ( puntajeMinimo ) => {
        let puntosComputadora = 0,
            puntosJugador = 0
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1);
            crearCarta( carta, puntosJugadores.length - 1);
        } while ( puntosComputadora < puntajeMinimo  && puntajeMinimo <= 21 );
        determinarGanador();
    }

    // Eventos
    // primer argumento es el evento: click, dbclick, focus...
    // segundo argumento: callback -> función que se envía como argumento de otra función
    btnPedir.addEventListener( 'click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0);
        crearCarta( carta, 0);

        if ( puntosJugador > 21) {
            btnPedir.disabled = true; // deshabilito btn-pedir
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        } else if ( puntosJugador === 21 ) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }
    } );

    btnDetener.addEventListener( 'click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugadores[0] );
    });

    btnNuevo.addEventListener( 'click', () => {
        inicializarJuego();
    })

    // Patrón módulo oculta todo el código que contiene, solo es visible externamente 
    // (por ejemplo desde la consola de chrome, o para otro programador, para el HTML) el contenido
    // del return, mediante el nombre del patrón.
    // No debo invocar una ejecución '()', solo pasar la referencia. Además puedo indicar un
    // 'nombre público' para la referencia que estoy enviando
    return {
        nuevoJuego : inicializarJuego
    };
}) ();