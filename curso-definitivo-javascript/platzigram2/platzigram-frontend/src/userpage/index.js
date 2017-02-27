import page from 'page'
import title from 'title'
import empty from 'empty-element'
import io from 'socket.io-client'

import header from './../header'
import utils from './../utils'
import template from './template'
import picture from './../picture-card'

const socket = io.connect('http://localhost:5151')

socket.on('image', (image) => {
  let picturesEl = document.getElementById('pictures-container')
  let first = picturesEl.firstChild

  let img = picture(image)
  picturesEl.insertBefore(img, first)
})

page('/:username', utils.loadAuth, header, loadUser, function (ctx, next) {
  title(`Platzigram - ${ctx.user.username}`)
  var main = document.getElementById('main-container')
  empty(main).appendChild(template(ctx.user))
})

page('/:username/:id',  header, loadUser, function (ctx, next) {
  title(`Platzigram - ${ctx.user.username}`)
  var main = document.getElementById('main-container')
  empty(main).appendChild(template(ctx.user))

  $(`#modal${ctx.params.id}`).openModal({
    complete: function () {
      const path = `/${ctx.params.username}`
      page(path)
    }
  })
})

async function loadUser (ctx, next) {
  try {
    ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json())
    next()
  } catch (err) {
    console.log(err)
  }
}
