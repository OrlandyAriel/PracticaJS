var jugador = document.getElementById('jugador');
var enemigo = document.getElementById('enemigo');
var puntuacion = document.getElementById('puntos');
var puntos = 0;
var direccionX = 1; //derecha = 1, izquierda = 2
var direccionY = 1; //arriba= 1, abajo = abajo
var incr_x;
var incr_y;
//instrucciones para el jugador
alert("Usa las teclas de dirección para jugar");
// Actualizamos la ubicación del objeto
function posicionJugador(element, incx, incy) {
  var x = Number(element.getAttribute('data-x')) + incx;
  var y = Number(element.getAttribute('data-y')) + incy;
  if (recinto(x, y) == true) {
    element.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    element.setAttribute('data-x', x);
    element.setAttribute('data-y', y);
  }
  colision();
}
function posicionEnemigo(element, incx, incy) {
  var x = Number(element.getAttribute('data-x'));
  var y = Number(element.getAttribute('data-y'));
  if(direccionX==1)
    {
        x -= incx;
    }
  else{
        x += incx;
    }
  if(direccionY == 1)
    {
        y -= incy;
    }
    else{
        y += incy;
    }
  if (recinto(x, y) == false) {
    if(x <= 10)
      {
          x = 400;
      }
    else if(x >= 460)
      {
          x=10;
      }
    if(y <=10)
      {
        y = 400;
      }
    else if(y >=460)
      {
        y = 10;
      }
  }
  element.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  element.setAttribute('data-x', x);
  element.setAttribute('data-y', y);
  colision();
}

//Fución que controla que ningún jugador salga del escenario
function recinto(x, y) {
  var bandera = true;
  if (x < 0)
    bandera = false;
  else if (x > 470)
    bandera = false;
  else if (y < 0)
    bandera = false;
  else if (y > 470)
    bandera = false;
  return bandera;
}
//Control de teclas
window.addEventListener('keydown', function(e) {
  var movimiento = 10;
  var cas = e.keyCode;
  switch (cas) {
    case 37: //izquierda
      posicionJugador(jugador, -movimiento, 0);
      direccionX =2;
      break;
    case 38: //arriba
      posicionJugador(jugador, 0, -movimiento);
      direccionY = 1;
      break;
    case 39: //derecha
      posicionJugador(jugador, +movimiento, 0);
      direccionX = 1;
      break;
    case 40: //abajo
      posicionJugador(jugador, 0, +movimiento);
      direccionY = 2;
      break;
  }
  colision();
});
//Fución para mover el jugador enemigo
function movimientoEnemigo() {
  var px = Number(jugador.getAttribute('data-x'));
  var py = Number(jugador.getAttribute('data-y'));

  var ex = Number(enemigo.getAttribute('data-x'));
  var ey = Number(enemigo.getAttribute('data-y'));
  
  var difX = Math.abs(ex - px);
  var difY = Math.abs(ey - py);
  
  incr_x = (difX > 10 ? 1 : 2);
  incr_y = (difY > 10 ? 1 : 2);
  
  posicionEnemigo(enemigo, incr_x, incr_y);
  colision();
}
//Función que controla las coliciones entre el enemigo y el jugador
function colision()
{
  var px = Number(jugador.getAttribute('data-x'));
  var py = Number(jugador.getAttribute('data-y'));

  var ex = Number(enemigo.getAttribute('data-x'));
  var ey = Number(enemigo.getAttribute('data-y'));
  
  var difX = Math.abs(ex - px);
  var difY = Math.abs(ey - py);
  
  if( difX < 10 && difY < 10)
    {
      //console.log ("px:"+ px+" py:"+py+" ex:"+ex+" ey:"+ey);
      puntos+=10;
      console.log(puntos)
    }
  puntuacion.innerHTML = puntos;    
}
// Inicialización
posicionJugador(jugador, 250, 400);
posicionEnemigo(enemigo, 60, 200);
setInterval(function() { movimientoEnemigo() },10) ;