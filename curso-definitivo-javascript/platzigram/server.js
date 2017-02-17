'use strict'

var express = require('express')
var app = express()

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('index', {title: 'Platzigram'})
})

app.get('/signup', function (req, res) {
  res.render('index', { title: 'Platzigram - Signup' })
})

app.get('/signin', function (req, res) {
  res.render('index', { title: 'Platzigram - Signin' })
})

app.get('/api/pictures', function (req, res) {
  var pictures = [
    {
      user: {
        username: 'Kurocode',
        avatar: 'avatar.jpeg'
      },
      url: 'office.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date().getTime()
    },

    {
      user: {
        username: 'Archer',
        avatar: 'avatar.jpeg'
      },
      url: 'office.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ]

  setTimeout(function () {
    res.json(pictures)
  }, 2000)
})


app.listen(8080, function (err) {
  if (err) {
    return console.log('Hubo un error.', process.exit(0))
  }
  console.log('Servidor escuchando el puerto ' + 8080)
})
