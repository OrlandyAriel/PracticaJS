var jugador ="";
var escenario = document.getElementById('escenario')
var enemigo="";
var puntuacion = document.getElementById('puntos');
var puntos = 0;
var direccionX = 1; //derecha = 1, izquierda = 2
var direccionY = 1; //arriba= 1, abajo = abajo
var incr_x;
var incr_y;
var tiempoInicio = 0;
var tiempoRandom = 0; //variable para sacar de quicio
//tiempo = Math.floor(Math.random() * (300000-1)+1);genero un número aleatorio entre 1 y 300000, estos serán milisegundos, que dirá el tiempo que dure jugando el jugador

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
function inicioFastidio()
{
  puntos = 0;
  tiempoInicio = new Date();
  tiempoRandom = Math.floor(Math.random() * (300000-1000)+1);
}
function fastidiar()
{
  var tiempoTrans = new Date();
  var t_a = tiempoInicio.getTime();
  var t_b = tiempoTrans.getTime();
  var dif = Math.abs(t_a - t_b);
  if(dif >= tiempoRandom)
    {
      var cont = notificacion(puntos);
      if(cont == false)
        {
          window.clearInterval(id1);
          window.clearInterval(id2);
        }
      else
        {
          inicioFastidio();
          id1;
        }
    }
}
function notificacion(puntos){
  
  return confirm("Haz logrado:"+puntos+" puntos");
}
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
  var pw = jugador.offsetWidth;
  var ph = jugador.offsetHeight;
  var ex = Number(enemigo.getAttribute('data-x'));
  var ey = Number(enemigo.getAttribute('data-y'));
  var ew = enemigo.offsetWidth;
  var eh = enemigo.offsetHeight;
  var difX = Math.abs(ex - px);
  var difY = Math.abs(ey - py);
  
  /**********/
  if((px+pw) > ex &&
    px < (ex+ew)&&
    py< (ey+eh) &&
    (py+ph) > ey)
    {
      var posX = Math.floor(Math.random() * (400-1)+1);
      var posY = Math.floor(Math.random() * (400-1)+1);
      escenario.removeChild(enemigo);
      crearEnemigo();
      posicionEnemigo(enemigo, posX, posY);
      puntos+=10;
    }
  puntuacion.innerHTML = puntos;    
}
function crearEnemigo()
{
  enemigo = document.createElement('div'); /*'<div id="enemigo" class="enemigo"></div>';*/
  enemigo.className = "enemigo";
  escenario.appendChild(enemigo);
}
function crearJugador()
{
  jugador = document.createElement('div'); /*'<div id="enemigo" class="enemigo"></div>';*/
  jugador.className = "jugador";
  escenario.appendChild(jugador);
}
// Inicialización
crearEnemigo();
crearJugador();
posicionJugador(jugador, 250, 400);
posicionEnemigo(enemigo, 60, 200);
inicioFastidio();
var id1=setInterval(function() { movimientoEnemigo() },15);
var id2=setInterval(function() { fastidiar() },10);

