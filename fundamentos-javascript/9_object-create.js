// function Punto (x, y) {
//   this.x = x
//   this.y = y
// }

// Punto.prototype.moverEnX = function moverEnX (x) { this.x += x }
// Punto.prototype.moverEnY = function moverEnY (y) { this.y += y }
// Punto.prototype.distancia = function distancia (p) {
//   const x = this.x - p.x
//   const y = this.y - p.y

//   return Math.sqrt(x*x + y*y)
// }

const Punto = {
  init: function init (x, y) {
    this.x = x
    this.y = y
  },

  moverEnX: function moverEnX (x) {
    this.x += x
  },

  moverEnY: function moverEnY (y) {
    this.y += y
  },

  distancia: function distancia (p) {
    const x = this.x - p.x
    const y = this.y - p.y

    return Math.sqrt(x*x + y*y)
  }
}

const p1 = Object.create(Punto)
const p2 = Object.create(Punto)

p1.init(0, 4)
p2.init(3, 0)

p1.moverEnX(2)
console.log(p1.distancia(p2))
p2.moverEnY(5)
console.log(p1.distancia(p2))
