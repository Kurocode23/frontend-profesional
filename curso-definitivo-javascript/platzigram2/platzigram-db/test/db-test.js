'use strict'

const test = require('ava')
const uuid = require('uuid-base62')
const r = require('rethinkdb')

const Db = require('./..')
const fixtures = require('./fixtures')

// De esta manera cada vez que corran nuestros tests se creara una base de datos nueva

test.beforeEach('setup database', async t => {
  const dbName = `platzigram_${uuid.v4()}`
  const db = new Db({ db: dbName })
  await db.connect()

  t.context.db = db
  t.context.dbName = dbName

  t.true(db.connected, 'should be connected')
})

test('save image', async t => {
  let db = t.context.db
  t.is(typeof db.saveImage, 'function', 'saveImage is function')

  let image = fixtures.getImage()

  let created = await db.saveImage(image)

  // Las primeras cuatro aserciones verifican que los datos de la imagen sean correctos
  t.is(created.description, image.description)
  t.is(created.url, image.url)
  t.is(created.likes, image.likes)
  t.is(created.liked, image.liked)
  t.is(created.user_id, image.user_id)
  t.deepEqual(created.tags, ['awesome', 'tags', 'platzi'])
  // Los dos ultimos seran asignados por la base de datos cuando nos la devuelva
  t.is(typeof created.id, 'string')
  t.is(created.public_id, uuid.encode(created.id))
  t.truthy(created.createdAt)
})

test('like image', async t => {
  let db = t.context.db
  t.is(typeof db.likeImage, 'function', 'likeImage is a function')

  let image = fixtures.getImage()
  let created = await db.saveImage(image)

  let result = await db.likeImage(created.public_id)

  t.true(result.liked)
  t.is(result.likes, image.likes + 1)
})

test('get image', async t => {
  let db = t.context.db
  t.is(typeof db.getImage, 'function', 'getImage is function')

  let image = fixtures.getImage()
  let created = await db.saveImage(image)
  let result = await db.getImage(created.public_id)

  t.deepEqual(result, created)
})

test('list all images', async t => {
  let db = t.context.db

  let images = fixtures.getImages(3)

  let saveImages = images.map(image => db.saveImage(image))
  let created = await Promise.all(saveImages)

  let result = await db.getImages()

  t.is(created.length, result.length)
})

test.afterEach.always('cleanup database', async t => {
  let db = t.context.db
  let dbName = t.context.dbName

  await db.disconnect()
  t.false(db.connected, 'should be false')

  let conn = await r.connect({})
  await r.dbDrop(dbName).run(conn)
})
