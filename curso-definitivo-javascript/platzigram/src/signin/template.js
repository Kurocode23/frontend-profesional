var yo = require('yo-yo')
var landing = require('./../landing/index')
var traslate = require('./../traslate')

var signinForm = yo`
  <div class="col s12 m7">
    <div class="row">
      <div class="signup-box">
        <h1 class="platzigram">Platzigram</h1>
      
        <form class="signup-form">
          <div class="section">
            <a href="#" class="btn btn-fb hide-on-small-only">${traslate.message('signup.facebook')}</a>
            <a href="#" class="btn btn-fb hide-on-med-and-up"><i class="fa facebook-official"></i>Iniciar sesion</a>
          </div>
          <div class="divider"></div>
          <section>
            <input type="text" name="username" placeholder="Nombre de usuario" >
            <input type="password" name="password" placeholder="Contraseña" >
            <button class="btn waves-effect waves-light btn btn-signup" type="submit">Iniciar sesion</button>
          </section>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="login-box">
        No tienes una cuenta? <a href="/signup">Registrate</a>
      </div>
    </div>
  </div>
`

module.exports = landing(signinForm)