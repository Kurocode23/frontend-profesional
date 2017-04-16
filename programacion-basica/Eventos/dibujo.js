var texto = document.getElementById('texto_lineas');
var boton = document.getElementById('botoncito');
var d = document.getElementById('dibujito');

boton.addEventListener('click', dibujoPorClick);

var ancho = d.width
var lienzo = d.getContext('2d');


// while (l < lineas) {
//   yi = 10 * l;
//   xf = 10 * (l + 1);
//   dibujar(colorcito, 0, yi, xf, 300);
//   console.log('Linea ' + l);
//   l++
// }


function dibujar (color, xinicial, yinicial, xfinal, yfinal)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.moveTo(xinicial, yinicial);
  lienzo.lineTo(xfinal, yfinal);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujoPorClick ()
{
  var lineas = parseInt(texto.value);
  var espacio = ancho / lineas;
  var l = 0;
  var yi, xf;
  var colorcito = "#FAA";
  
  for (l = 0; l < lineas; l++) {
    yi = espacio * l;
    xf = espacio * (l + 1);
    dibujar(colorcito, 0, yi, xf, ancho);
    // dibujar(colorcito, yi, 0, 300, xf);
    console.log('Linea ' + l);
  }

  dibujar(colorcito, 1, 1, 0, 299);
  dibujar(colorcito, 1, 299, 299, 299);
}
