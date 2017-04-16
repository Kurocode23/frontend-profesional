'use strict'

// Desafios:
  // Toma el codigo y ahora muestra los billetes entregados con imagenes
  // Crear el codigo para ir guardando el estado de billetes del cajero y poder verlo visalmente
  // Intenta optimizar el codigo que hemos escrito

var dinero = 0
var caja = []
var entregado = []
var div = 0
var papeles = 0

caja.push(new Billete(125, 5))
caja.push(new Billete(100, 5))
caja.push(new Billete(50, 10))
caja.push(new Billete(20, 5))
caja.push(new Billete(10, 10))
caja.push(new Billete(5, 5))

var button = document.getElementById('extraer')
var resultado = document.getElementById('resultado')

button.addEventListener('click', entregarDinero)

function entregarDinero ()
{
  var t = document.getElementById('cantidad')
  dinero = parseInt(t.value)

  for (var b of caja)
  {
    if (dinero > 0)
    {
      div = Math.floor(dinero / b.valor)
      
      if (div > b.cantidad)
      {
        papeles = b.cantidad
      }
      else
      {
        papeles = div
      }

      entregado.push(new Billete(b.valor, papeles))
      dinero -= (b.valor * papeles)
    }
  }

  if (dinero > 0) {
    resultado.innerHTML = 'Soy un cajero malo, he sido malo y no puedo darte esa cantidad :('
  }
  else
  {
    for (var e of entregado)
    {
      if (e.cantidad > 0) {
        resultado.innerHTML += e.cantidad + ' billetes de $' + e.valor + '<br />'
      }
    }
  }

  console.log(entregado)
  return entregado
}



// function sacarBilletes () {
//   for (var b of caja) {
//     if (dinero > 0) {
//       div = Math.floor(dinero / b.valor)
//       papeles;

//       if (div > b.cantidad) {
//         papeles = b.cantidad
//       } else {
//         papeles = div
//       }

//       dinero -= (b.valor * papeles)
//       entregado.push(new Billete(b.valor, papeles))
//     }
//   }

//   return entregado
// }

