var yo = require('yo-yo')




module.exports = function (picture) {
  var card = yo`
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${picture.url}">
      </div>
      <div class="card-content">
        <a href="/user/picture.user.username" class="card-title">
          <img src="${picture.user.avatar}" class="avatar"/>
          <span class="username">${picture.user.username}</span>
        </a>
        <small class="right time">Hace 1 dia</small>
        <p>
          <a href="#" className="left">
            <i className="fa fa-heart-content"></i>
          </a>
          <span className="left likes">${picture.likes} me gusta</span>
        </p>
      </div>
    </div>
  `

  return card;
}