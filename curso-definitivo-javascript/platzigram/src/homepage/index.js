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
      likes: 24,
      liked: true
    },

    {
      user: {
        username: 'Archer',
        avatar: 'avatar.jpeg'
      },
      url: 'office.jpg',
      likes: 12,
      liked: true
    }
  ]

  empty(main).appendChild(template(pictures))
})