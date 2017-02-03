import $ from 'jquery'
export function getShows (cb) {
  $.ajax('http://api.tvmaze.com/shows')
  .then(function (shows) {
    // $tvShowsContainer.find('.loader').remove()
    // localStorage.shows = JSON.stringify(shows)
    cb(shows)
  })
}

export function searchShows (query, cb) {
  $.ajax('http://api.tvmaze.com/search/shows', {
    data: {q: query},
    success: function (data, textStatus, xhr) {
      cb(data)
    }
  })
}