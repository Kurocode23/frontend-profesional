import $ from 'jquery'

var $tvShowsContainer = $('#app-body').find('.tv-shows')
$tvShowsContainer.on('click', 'button.like', function (event) {
  var $this = $(this)
  // $this.animate({
  //   'fontSize': '30px'
  // }, 'fast')

  $this.closest('.tv-show').toggleClass('liked')
})

export default $tvShowsContainer