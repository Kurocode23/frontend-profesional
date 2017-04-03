// 31 de marzo de 1994
// 12 08 1990
const nacimiento = new Date(1994, 2, 31)
const hoy = new Date()
const tiempo = hoy - nacimiento
const tiempoSegundos = tiempo / 1000
const tiempoMin = tiempoSegundos / 60
const tiempoHoras = tiempoMin / 60
const tiempoDias = tiempoHoras / 24

const nextBirthday = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate())
const diasSemana = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
]

console.log(diasSemana[nextBirthday.getDay()])
