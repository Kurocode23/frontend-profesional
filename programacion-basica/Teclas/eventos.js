var teclas = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

document.addEventListener('keydown', dibujarTeclado);
var cuadrito = document.getElementById('area_de_dibujo');
var papel = cuadrito.getContext('2d');
var x = 100;
var y = 100;

dibujar('red', x-1, y-1, x+1, y+1, papel);

function dibujar (color, xinicial, yinicial, xfinal, yfinal, lienzo)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = 3;
  lienzo.moveTo(xinicial, yinicial);
  lienzo.lineTo(xfinal, yfinal);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujarTeclado (ev)
{
  var colorcito = "green";
  var movimiento = 1;

  switch (ev.keyCode) {
    case teclas.UP:
      console.log('UP')
      dibujar(colorcito, x, y, x, y - movimiento, papel);
      y -= movimiento;
      break
    case teclas.DOWN:
      dibujar(colorcito, x, y, x, y + movimiento, papel);
      y += movimiento;
      break
    case teclas.LEFT:
      dibujar(colorcito, x, y, x - movimiento, y, papel);
      x -= movimiento;
      break
    case teclas.RIGHT:
      dibujar(colorcito, x, y, x + movimiento, y, papel);
      x += movimiento;
      break
  }
}