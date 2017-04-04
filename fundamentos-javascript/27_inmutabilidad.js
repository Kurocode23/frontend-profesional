let sacha = {nombre: 'Sacha', apellido: 'Lifszyc', edad: 26}
let otroSacha = sacha

otroSacha === sacha  // true

otroSacha.edad = 27

sacha // tambien cambia el valor

// con side effect
function cumpleanios (persona) {
  persona.edad++
}

// immutable
cumpleanios = function (persona) {
  const clone = Object.assign({}, persona)
  clone.edad++
  return clone
}

const sachitaViejo = cumpleanios(sacha)

sacha === sachitaViejo  // false

cumpleanios(sacha)
