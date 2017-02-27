'use strict'

const http = require('http')
const socketio = require('socket.io')
const r = require('rethinkdb')

const config = require('./config')

const server = http.createServer()
const io = socketio(server)
const PORT = process.env.PORT || 5151

r.connect(config.db, (err, conn) => {
  if (err) return console.error(err.message)

  r.table('images').changes().run(conn, (err, cursor) => {
    if (err) return console.error(err.message)

    cursor.on('data', data => {
      let image = data.new_val

      // usamos doble igual para trabajar con valores null y undefined
      if (image.publicId !== null) {
        io.sockets.emit('image', image)
      }
    })
  })
})

server.listen(PORT, () => console.log(`listening on port ${PORT}`))
