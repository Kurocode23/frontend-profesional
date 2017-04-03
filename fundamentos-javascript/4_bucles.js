const nombre = 'Sacha'
const dias = [
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
  'domingo',
]

function correr () {
  const min = 5
  const max = 15
  return Math.round(Math.random() * (max - min) + min)
}

let totalKms = 0
let size = dias.length

for (let i = 0; i < size; i++) {
  const kms = correr()
  totalKms = totalKms + kms
  console.log(`El dia ${dias[i]} ${nombre} corrio ${kms}kms`)
}

const promedioKms = totalKms / size
console.log(`El promedio, ${nombre} corrio ${promedioKms.toFixed(2)}kms`)


