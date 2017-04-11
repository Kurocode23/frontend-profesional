var d = document.getElementById('dibujito');
var lienzo = d.getContext('2d');
var lineas = 30;
var l = 0;
var yi, xf, xi, yf;
var colorcito = "#FAA";

for (l = 0; l < lineas; l++) {
  yi = 10 * l;
  xf = 10 * (l + 1);
  dibujar(colorcito, 0, yi, xf, 300);
  dibujar(colorcito, yi, 0, 300, xf);
  console.log('Linea ' + l);
}

// while (l < lineas) {
//   yi = 10 * l;
//   xf = 10 * (l + 1);
//   dibujar(colorcito, 0, yi, xf, 300);
//   console.log('Linea ' + l);
//   l++
// }

dibujar(colorcito, 1, 1, 0, 299);
dibujar(colorcito, 1, 299, 299, 299);

function dibujar (color, xinicial, yinicial, xfinal, yfinal)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.moveTo(xinicial, yinicial);
  lienzo.lineTo(xfinal, yfinal);
  lienzo.stroke();
  lienzo.closePath();
}

