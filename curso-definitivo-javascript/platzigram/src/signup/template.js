var yo = require('yo-yo')
var landing = require('./../landing/index')
var traslate = require('../traslate')

var signupForm = yo`
  <div class="col s12 m7">
    <div class="row">
      <div class="signup-box">
        <h1 class="platzigram">Platzigram</h1>
      
        <form class="signup-form">
          <h2>${traslate.message('signup.subheading')}</h2>
          <div class="section">
            <a href="#" class="btn btn-fb hide-on-small-only">Iniciar sesion con Facebook</a>
            <a href="#" class="btn btn-fb hide-on-med-and-up"><i class="fa facebook-official"></i> Iniciar sesion</a>
          </div>
          <div class="divider"></div>
          <section>
            <input type="email" name="email" placeholder="Correo electronico" >
            <input type="text" name="name" placeholder="Nombre completo" >
            <input type="text" name="username" placeholder="Nombre de usuario" >
            <input type="password" name="password" placeholder="Contraseña" >
            <button class="btn waves-effect waves-light btn btn-signup" type="submit">Registrate</button>
          </section>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="login-box">
        Tienes una cuenta? <a href="/signin">Entrar</a>
      </div>
    </div>
  </div>
`

module.exports = landing(signupForm)