var page  = require('page')
var empty = require('empty-element')
var title = require('title')

var template = require('./template')


page('/', function (ctx, next) {
  title('Platzigram')
  var main = document.getElementById('main-container')

  var pictures = [
    {
      user: {
        username: 'Kurocode',
        avatar: 'avatar.jpeg'
      },
      url: 'office.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date()
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

  empty(main).appendChild(template(pictures))
})