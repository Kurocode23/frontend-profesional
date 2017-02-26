var LocalStrategy = require('passport-local').Strategy;
var platzigram = require('platzigram-client')
var config = require('../config')

var client = platzigram.createClient(config.client)

exports.localStrategy = new LocalStrategy((username, password, done) => {
  console.log(`Usuario: ${username}`)
  console.log(`Contraseña: ${password}`)

  client.auth(username, password, (err, token) => {
    if (err) {
      console.log('Failing in auth method: ' + err)
      return done(null, false, { message: 'username and password not found' })
    }

    console.log(`Token: ${token}`)
    client.getUser(username, (err, user) => {
      if (err) {
        console.log('Failing in getUser method: ' + err)        
        return done(null, false, { message: `an error ocurred: ${err.message}` })
      }

      console.log(`User without token: ${JSON.stringify(user)}`)
      user.token = token
      console.log(`User with token: ${JSON.stringify(user)}`)      
      return done(null, user)
    })
  })
});

exports.serializeUser = function (user, done) {
  done(null, {
    username: user.username,
    token: user.token
  });
}

exports.deserializeUser = function (user, done) {
  client.getUser(user.username, (err, usr) => {
    if (err) return done(err)

    usr.token = user.token
    done(null, usr)
  });
}
