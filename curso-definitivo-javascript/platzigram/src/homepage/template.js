var yo = require('yo-yo')
var layout = require('./../layout')
var picture = require('./../picture-card')

module.exports = function renderPicture (pictures) {
  var el = yo`
    <div class="container timeline">
      <div class="row">
        <div class="col s12 offset-m1 m10">
          ${
            pictures.map((pic) => {
              return picture(pic)
            })
          }
        </div>
      </div>
    </div>
  `

  return layout(el)
}









