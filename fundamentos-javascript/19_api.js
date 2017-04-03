function get (URL) {

  const xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    const DONE = 4
    const OK = 200
    
    if (this.readyState === DONE) {
      // todo ok
      callback(null, JSON.parse(this.responseText))
    } else {
      // hubo un error
      callback(new Error(`Se produjo un error al realizar el request ${this.status}`)) // en este caso this apunta a xhr
    }
  }

  xhr.open('GET', URL)
  xhr.send(null)
}

function _handleError(err) {
  // Retornamos para cortar la ejecucion
  if (err) return console.log(`Request failed: ${err}`)
}

get('someURL', function onResponse(err, data) {
  _handleError(err)

  get(data.someResource, function onResourceResponse(err, response) {
    _handleError(err)

    data.response = response
    console.log(`some text with the data`)
  })
  console.log(`Request succeded`)
  console.log('the data', data)
})

