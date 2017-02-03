import $    from 'jquery'
import page from 'page'
import qs   from 'qs'
import { getShows, searchShows } from 'src/tvmaze-api-client'
import renderShows from 'src/render/index.js'
import $tvShowsContainer from 'src/render/tv-shows-container'
import 'src/search-form'

page('/', function (ctx, next) {
  $tvShowsContainer.find('.tv-show').remove()
    
  if (!localStorage.shows) {
    getShows(function (shows) {
      localStorage.shows = JSON.stringify(shows)
      renderShows(shows)
    })
  } else {
    // $tvShowsContainer.find('.loader').remove()
    renderShows(JSON.parse(localStorage.shows))
  }
})

page('/search', function (ctx, next) {
  let $loader = $('<div class="loader">')
  let query   = qs.parse(ctx.querystring) // {q: 'breaking bad'}
  $tvShowsContainer.find('.tv-show').remove()
  $loader.appendTo($tvShowsContainer)
  searchShows(query.q, function (data) {
    $loader.remove()

    let shows = data.map(function (el) {
      return el.show
    })
    renderShows(shows)
  })
})

page()
