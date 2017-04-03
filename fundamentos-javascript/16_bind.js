class Toggable {
  constructor (el) {
    // inicializar el estado interno
    this.el = el
    this.el.innerHTML = 'Off'
    this.activated = false
    this.onClick = this.onClick.bind(this)
    this.el.addEventListener('click', this.onClick)
  }

  onClick () {
    // cambiar el estado interno
    this.activated = !this.activated
    // llamar a toggleText
    this.toggleText()
  }

  toggleText () {
    // cambiar el texto
    this.el.innerHTML = this.activated ? "On" : "Off"
  }
}

const button = document.getElementById('boton')
const miBoton = new Toggable(button)


function saludar (nombre, apellido) {
  console.log(`Hola ${nombre} ${apellido}`)
}

const saludarSacha = saludar.bind(null, 'Sacha')
saludarSacha('Lifszyc')
