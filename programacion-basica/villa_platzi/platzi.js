var vp = document.getElementById('villaplatzi');
var papel = vp.getContext('2d');

var fondo = {
  url: 'tile.png',
  cargaOK: false
}

var vaca = {
  url: 'vaca.png',
  cargaOK: false
}

fondo.imagen = new Image();
fondo.imagen.src = fondo.url;
fondo.imagen.addEventListener('load', cargarFondo);

vaca.imagen = new Image();
vaca.imagen.src = vaca.url;
vaca.imagen.addEventListener('load', cargarVacas)

var cerdo = new Image();
cerdo.src = 'cerdo.png'
var pollo = new Image();
pollo.src = 'pollo.png'

function dibujar () {
  if (fondo.cargaOK) {
    papel.drawImage(fondo.imagen, 0, 0)
  }

  if (vaca.cargaOK) {
    var cantidad = aleatorio(1, 50);
    console.log(cantidad);
    for (var v = 0; v < cantidad; v++) {
      var x = aleatorio(0, 7);
      var y = aleatorio(0, 7);

      x = x * 60;
      y = y * 60;
      papel.drawImage(vaca.imagen, x, y)
    }
  }
}

function cargarFondo ()
{
  fondo.cargaOK = true
  dibujar();
}

function cargarVacas ()
{
  vaca.cargaOK = true
  dibujar();
}


function aleatorio (min, max)
{
  var resultado;
  resultado = Math.floor(Math.random() * (max - min + 1)) + min
  return resultado
}