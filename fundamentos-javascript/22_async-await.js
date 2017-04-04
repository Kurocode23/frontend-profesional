function _handleError(err) {
  // Retornamos para cortar la ejecucion
  if (err) return console.log(`Request failed: ${err}`)
}

async function getLuke () {
  try {
    const res = await fetch('http://swapi.co/api/people/1/')
    const luke = await res.json()
    
    const homeworld = await fetch(luke.homeworld)
    luke.homeworld = await homeworld.json()
  } catch (err) {
    _handleError(err)
  }
}

function _handleError(err) {
  // Retornamos para cortar la ejecucion
  if (err) return console.log(`Request failed: ${err}`)
}

