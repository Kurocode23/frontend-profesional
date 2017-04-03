const makePrefixer = pre => word => console.log(`${pre} ${word}`)

const preGG = makePrefixer('GG report')
preGG('Irianas')


// function saludarFamilia (apellido) {
//   return function saludarMiembroFamilia (nombre) {
//     console.log(`Hola ${nombre} ${apellido}`)
//   }
// }

// const saludarGomez = saludarFamilia('Gomez')
// saludarGomez('Pedro')
// saludarGomez('Javier')
// saludarGomez('Laura')
// saludarGomez('Monica')

// const saludarPerez = saludarFamilia('Perez')
// saludarPerez('Dario')
// saludarPerez('Martin')
// saludarPerez('Julieta')
