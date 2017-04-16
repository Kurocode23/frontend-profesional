// Es equivalente a:
// var imagenes: {
//   cauchin: 'vaca.png',
//   ...
// }
var imagenes = []
imagenes['Cauchin'] = 'vaca.png'
imagenes['Pokacho'] = 'pollo.png'
imagenes['Tocinauro'] = 'cerdo.png'

var coleccion = []

coleccion.push(new Pakiman('Cauchin', 100, 30))
coleccion.push(new Pakiman('Pokacho', 80, 50))
coleccion.push(new Pakiman('Tocinauro', 120, 40))

for (var p of coleccion) {
  p.mostrar()
}

for (var indice in imagenes) {
  console.log(indice)
}

for (var indice in coleccion[2]) {
  console.log(indice)
}

console.log(coleccion)
