var five = require('johnny-five')
var circuito = new five.Board()
var bombillo, motorcito, celda
var turno = 0

circuito.on('ready', prender)

function prender () {
  var configuracion = {
    pin: 'A0',
    freq: 50
  }

  celda = new five.Sensor(configuracion)

  bombillo = five.Led(13)
  bombillo.on()

  motorcito = new five.Servo(9)
  motorcito.to(90)

  ondear()
}

function ondear () {
  var luz = celda.value

  if (luz > 800) {

    if (turno) {
      turno = 0
      motorcito.to(70)
    } else {
      turno = 1
      motorcito.to(110)
    }
  } else {
    motorcito.to(150)
  }

  setTimeout(ondear, 1000)
}
