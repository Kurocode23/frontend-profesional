var yo = require('yo-yo')
var traslate = require('./../traslate')

var el = yo`
  <footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col s12 l3 center-align"><a href="#" data-activates="dropdown1" class="dropdown-button btn btn-flat">${traslate.message('language')}</a>
          <ul id="dropdown1" class="dropdown-content">
            <li><a href="#" onclick=${lang.bind(null, 'es')}>${traslate.message('spanish')}</a></li>
            <li><a href="#" onclick=${lang.bind(null, 'en')}>${traslate.message('english')}</a></li>
          </ul>
        </div>
        <div class="col s12 l3 push-l6 center-align">© 2016 Platzigram</div>
      </div>
    </div>
  </footer>
`

function lang (locale) {
  localStorage.locale = locale
  location.reload()
  return false
}

document.body.appendChild(el)