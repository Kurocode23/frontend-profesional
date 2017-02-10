$(document).foundation()

$('[data-toggle-dia]').click(function (ev) {
  var panel = $(this).data('toggleDia')
  $('#lineup-tabs').foundation('selectTab', panel)
})

const $offCanvas = $('#offCanvas')
$offCanvas.find('li').click(function (ev) {
  $offCanvas.foundation('close')
})