'use strict'

const test = require('ava')
const uuid = require('uuid-base62')
const r = require('rethinkdb')

const Db = require('./..')

// De esta manera cada vez que corran nuestros tests se creara una base de datos nueva
const dbName = `platzigram_${uuid.v4()}`
const db = new Db({ db: dbName })

test.before('setup database', async t => {
  await db.connect()

  t.true(db.connected, 'should be connected')
})

test('save image', async t => {
  t.is(typeof db.saveImage, 'function', 'saveImage is function')

  let image = {
    url: `https://platzigram.test/${uuid.v4()}.jpg`,
    likes: 0,
    liked: false,
    user_id: uuid.uuid()
  }

  let created = await db.saveImage(image)

  // Las primeras cuatro aserciones verifican que los datos de la imagen sean correctos
  t.is(created.url, image.url)
  t.is(created.likes, image.likes)
  t.is(created.liked, image.liked)
  t.is(created.user_id, image.user_id)
  // Los dos ultimos seran asignados por la base de datos cuando nos la devuelva
  t.is(typeof created.id, 'string')
  t.truthy(created.createdAt)
})

test.after('disconnect database', async t => {
  await db.disconnect()
  t.false(db.connected, 'should be false')
})

test.after.always('cleanup database', async t => {
  let conn = await r.connect({})
  await r.dbDrop(dbName).run(conn)
})
