'use strict'

const test = require('ava')
const uuid = require('uuid-base62')
const r = require('rethinkdb')

const Db = require('./..')
const fixtures = require('./fixtures')
const utils = require('./../libs/utils')

// De esta manera cada vez que corran nuestros tests se creara una base de datos nueva

test.beforeEach('setup database', async t => {
  const dbName = `platzigram_${uuid.v4()}`
  const db = new Db({ db: dbName, setup: true })
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
  t.is(created.userId, image.userId)
  t.deepEqual(created.tags, ['awesome', 'tags', 'platzi'])
  // Los dos ultimos seran asignados por la base de datos cuando nos la devuelva
  t.is(typeof created.id, 'string')
  t.is(created.publicId, uuid.encode(created.id))
  t.truthy(created.createdAt)
})

test('like image', async t => {
  let db = t.context.db
  t.is(typeof db.likeImage, 'function', 'likeImage is a function')

  let image = fixtures.getImage()
  let created = await db.saveImage(image)

  let result = await db.likeImage(created.publicId)

  t.true(result.liked)
  t.is(result.likes, image.likes + 1)
})

test('get image', async t => {
  let db = t.context.db
  t.is(typeof db.getImage, 'function', 'getImage is function')

  let image = fixtures.getImage()
  let created = await db.saveImage(image)
  let result = await db.getImage(created.publicId)

  t.deepEqual(result, created)

  t.throws(db.getImage('foo'), /not found/)
})

test('list all images', async t => {
  let db = t.context.db

  let images = fixtures.getImages(3)

  let saveImages = images.map(image => db.saveImage(image))
  let created = await Promise.all(saveImages)

  let result = await db.getImages()

  t.is(created.length, result.length)
})

test('save user', async t => {
  let db = t.context.db

  t.is(typeof db.saveUser, 'function', 'saveUser is function')

  let user = fixtures.getUser()
  let plainPassword = user.password
  let created = await db.saveUser(user)

  t.is(user.username, created.username)
  t.is(user.email, created.email)
  t.is(user.name, created.name)
  t.is(utils.encrypt(plainPassword), created.password)
  t.is(typeof created.id, 'string')
  t.truthy(created.createdAt)
})

test('get user', async t => {
  let db = t.context.db
  t.is(typeof db.getUser, 'function', 'getUser is a function')

  let user = fixtures.getUser()
  let created = await db.saveUser(user)

  let result = await db.getUser(user.username)

  t.deepEqual(created, result)

  t.throws(db.getUser('foo'), /not found/)
})

test('authenticate user', async t => {
  let db = t.context.db

  t.is(typeof db.authenticate, 'function', 'authenticate is a function')

  let user = fixtures.getUser()
  let plainPassword = user.password

  await db.saveUser(user)

  let success = await db.authenticate(user.username, plainPassword)
  t.true(success)

  let fail = await db.authenticate(user.username, 'foo')
  t.false(fail)

  let failure = await db.authenticate('foo', 'bar')
  t.false(failure)
})

test('list images by user', async t => {
  let db = t.context.db
  t.is(typeof db.getImagesByUser, 'function', 'getImagesByUser is a function')

  let images = fixtures.getImages(10)
  let userId = uuid.uuid()
  let random = Math.round(Math.random() * images.length)

  let saveImages = []
  for (let i = 0; i < images.length; i++) {
    if (i < random) {
      images[i].userId = userId
    }

    saveImages.push(db.saveImage(images[i]))
  }

  await Promise.all(saveImages)

  let result = await db.getImagesByUser(userId)
  t.is(result.length, random)
})

test('list images by tag', async t => {
  let db = t.context.db
  t.is(typeof db.getImagesByTag, 'function', 'getImagesByTag is a function')

  let images = fixtures.getImages(10)
  let tag = '#filterit'
  let random = Math.round(Math.random() * images.length)

  let saveImages = []
  for (let i = 0; i < images.length; i++) {
    if (i < random) {
      images[i].description = tag
    }

    saveImages.push(db.saveImage(images[i]))
  }

  await Promise.all(saveImages)

  let result = await db.getImagesByTag(tag)
  t.is(result.length, random)
})

test.afterEach.always('cleanup database', async t => {
  let db = t.context.db
  let dbName = t.context.dbName

  await db.disconnect()
  t.false(db.connected, 'should be false')

  let conn = await r.connect({})
  await r.dbDrop(dbName).run(conn)
})
