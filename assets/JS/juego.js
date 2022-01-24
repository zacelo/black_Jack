
(() => {
  'use strict'

  let cartas = [];
  const tipos = ["C", "D", "H", "S"];

  let puntosJugador = 0,
    puntosComputadora = 0;

  //  Referencias del HTML
  const btn_pedir = document.querySelector("#btn_pedir"),
        btn_nuevo = document.querySelector("#btn_nuevo"),
      btn_detener = document.querySelector("#btn_detener");

   const puntosJugadorHtml = document.querySelectorAll("small"),
          divCartasJugador = document.querySelector("#jugador-cartas"),
      divCartasComputadora = document.querySelector("#computadora-cartas");

  // esta funcion inicializa el juego 
  const iniciaJuego = () => {
    cartas = crearCartas();
  }

  // Esta funcion crea el mazo de cartas y _shuffle lo hace random
  const crearCartas = () => {
    cartas = [];
    for (let i = 1; i <= 13; i++) {
      let tipo;
      for (tipo of tipos) {
        cartas.push(i + tipo + ".png");
      }
    }
    return _.shuffle(cartas);
  };


  // Con esta funcion tomo del mazo la ultima carta
  const pedirCarta = () => {
    return cartas.pop();
  };


  // En esta funsion le asigna un valor a las cartas
  const valorCarta = (carta) => {
    let valor = parseInt(carta.substring(0, carta.length - 5));
    if (valor === 11 || valor === 12 || valor === 13) {
      valor = 10;
    }
    if (valor === 1) {
      valor = 11;
    }
    return valor;
  }; 

  // Turno Computadora
  const turnoComputadora = (puntosMinimos) => {
    setTimeout(() => {
      do {
        const carta = pedirCarta();       
        
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosJugadorHtml[1].innerHTML = puntosComputadora;
       
        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}`;
       
        imgCarta.classList.add("carta");      
      
        divCartasComputadora.append(imgCarta);  
  
        if (puntosMinimos > 21) {
          break;
        }
      } while (puntosComputadora < puntosMinimos);
      setTimeout(() => {
        mensaje();
      }, 1000);
      btn_nuevo.disabled = false;
      btn_pedir.style.visibility = "hidden";
      btn_detener.style.visibility = "hidden";
    }, 1000);    
  };

  // Eventos
  btn_pedir.addEventListener("click", () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    setTimeout(() => {
      puntosJugadorHtml[0].innerHTML = puntosJugador;
    }, 600);

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
      btn_pedir.disabled = true;
      btn_detener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      btn_pedir.disabled = true;
      btn_detener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  const mostrar = () => {
    btn_pedir.style.visibility = "visible";
    btn_detener.style.visibility = "visible";
  };

  btn_detener.addEventListener("click", () => {
    btn_pedir.disabled = true;
    turnoComputadora(puntosJugador);
    btn_detener.disabled = true;
  });

  btn_nuevo.addEventListener("click", () => {
    iniciaJuego();   
    mostrar();
    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerHTML = "";

    const cartaBocaAbajo = document.createElement("img");
    cartaBocaAbajo.src = `assets/cartas/grey_back.png`;
    cartaBocaAbajo.classList.add("carta");
    divCartasJugador.append(cartaBocaAbajo);

    const cartaBocaAbajo2 = document.createElement("img");
    cartaBocaAbajo2.src = `assets/cartas/grey_back.png`;
    cartaBocaAbajo2.classList.add("carta");
    divCartasComputadora.append(cartaBocaAbajo2);

    btn_pedir.disabled = false;
    btn_detener.disabled = false;
    btn_nuevo.disabled = true;
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosJugadorHtml[0].innerHTML = 0;
    puntosJugadorHtml[1].innerHTML = 0;
  });
 

  const mensaje = () => {
    if (puntosJugador == puntosComputadora) {
      perdedor();
    } else if (puntosJugador > 21) {
      perdedor();
    } else if (puntosJugador > puntosComputadora) {
      ganador();
    } else if (puntosComputadora > 21) {
      ganador();
    } else if (puntosComputadora > puntosJugador) {
      perdedor();
    }
  };
  const ganador = ()=>{
    Swal.fire({
      icon: 'success',
      title: '♣ Has ganado ♦',
      showConfirmButton: false,
      timer: 2500
    });
  }
  const perdedor = ()=>{
    Swal.fire({
      icon: 'error',
      title: '♦ Has perdido ♣',
      showConfirmButton: false,
      timer: 2500
    });
  }
})();




