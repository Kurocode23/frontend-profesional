const Sacha = {
  nombre: 'Sacha',
  apellido: 'Lifszyc'
}

function saludar (number) {
  for (let i = 0; i < number; i++) {
    console.log(`Hola ${this.nombre} ${this.apellido}`)
  }
}

saludar.apply(Sacha, [3])
