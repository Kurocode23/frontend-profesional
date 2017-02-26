'use strict'

import { send, json } from 'micro'
import HttpHash from 'http-hash'
import Db from 'platzigram-db'

import config from './config'
import utils from './lib/utils'
import DbStub from './test/stub/db'

const env = process.env.NODE_ENV || 'production'

const hash = HttpHash()
let db = new Db(config.db)

if (env === 'test') {
  db = new DbStub()
}

hash.set('POST /', async function authenticate (req, res, params) {
  let credentials = await json(req)

  await db.connect()
  let auth = await db.authenticate(credentials.username, credentials.password)
  await db.disconnect()

  console.log(`Auth: ${auth}`)

  if (!auth) {
    return send(res, 401, { error: 'invalid credentials' })
  }

  let token = await utils.signToken({
    username: credentials.username
  }, config.secret)

  console.log(`Token: ${token}`)

  send(res, 200, token)
})

export default async function main (req, res) {
  let { method, url } = req
  let match = hash.get(`${method} ${url}`)

  if (match.handler) {
    try {
      await match.handler(req, res, match.params)
    } catch (e) {
      send(res, 500, { error: e.message })
    }
  } else {
    send(res, 404, { error: 'route not found' })
  }
}
