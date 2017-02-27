import page from 'page'
import title from 'title'
import empty from 'empty-element'
import header from './../header'
import utils from './../utils'
import template from './template'

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
