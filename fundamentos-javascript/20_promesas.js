const promise = new Promise(function (resolve, reject) {
  setTimeout(resolve, 1000)
  // setTimeout(function () {
  //   reject()  
  // }, 1000)
})

promise
  .then(function (res) {

  })
  .catch(function (err) {

  })

function get (URL) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
      const DONE = 4
      const OK = 200
      
      if (this.readyState === DONE) {
        // todo ok
        resolve(JSON.parse(this.responseText))
      } else {
        // hubo un error
        reject(new Error(`Se produjo un error al realizar el request ${this.status}`)) // en este caso this apunta a xhr
      }
    }

    xhr.open('GET', URL)
    xhr.send(null)
  })
}

function _handleError(err) {
  // Retornamos para cortar la ejecucion
  if (err) return console.log(`Request failed: ${err}`)
}

let luke

fetch('someURL')
  .then(response => response.json())
  .then(data => {
    luke = data
    return fetch(luke.homeworld)
  })
  .then(res => res.json())
  .then(homeworld => {
    luke.homeworld = homeworld
    console.log(`${luke.name} nacio en ${luke.homeworld.name}`)
  })
  .catch(err => {
    _handleError(err)
  })
