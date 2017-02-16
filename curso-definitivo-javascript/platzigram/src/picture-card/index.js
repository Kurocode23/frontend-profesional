var yo = require('yo-yo')
var traslate = require('./../traslate')

module.exports = function pictureCard (picture) {
  var el;

  function render (pic) {
    return yo`
      <div class="card ${pic.liked ? 'liked' : ''}">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${pic.url}">
        </div>
        <div class="card-content">
          <a href="/user/pic.user.username" class="card-title">
            <img src="${pic.user.avatar}" class="avatar"/>
            <span class="username">${pic.user.username}</span>
          </a>
          <small class="right time">${traslate.date.format(pic.createdAt)}</small>
          <p>
            <a href="#" class="left" onclick=${like.bind(null, true)}><i class="fa fa-heart-o" aria-hidden="true"></i></a>
            <a href="#" class="left" onclick=${like.bind(null, false)}><i class="fa fa-heart" aria-hidden="true"></i></a>
            <span class="left likes">${traslate.message('likes', { likes: pic.likes })}</span>
          </p>
        </div>
      </div>
    `
  }

  function like (liked) {
    picture.liked = liked
    picture.likes += liked ? 1 : -1
    var newEl = render(picture)
    yo.update(el, newEl)
    return false
  }

  el = render (picture)
  return el
}
















