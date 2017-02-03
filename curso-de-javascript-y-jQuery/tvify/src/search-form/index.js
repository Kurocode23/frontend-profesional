import $ from 'jquery'
import $tvShowsContainer from 'src/render/tv-shows-container'
import { searchShows }   from 'src/tvmaze-api-client'
import page from 'page'

$('#app-body').find('form').submit(function (event) {
  event.preventDefault()
  
  let query = $(this).find('input[type="text"]').val()
  page(`/search?q=${query}`)

})