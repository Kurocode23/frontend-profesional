'use strict'

var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hola mundo')
})

app.listen(8080, function (err) {
  if (err) {
    return console.log('Hubo un error.', process.exit(0))
  }
  console.log('Servidor escuchando el puerto ' + 8080)
})
