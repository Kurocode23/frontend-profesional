import test from 'ava'
import micro from 'micro'
import listen from 'test-listen'
import request from 'request-promise'

import utils from './../lib/utils'
import config from './../config'
import auth from '../auth'
import fixtures from './fixtures'

test.beforeEach(async t => {
  let srv = micro(auth)
  t.context.url = await listen(srv)
})

test('success POST /', async t => {
  let user = fixtures.getUser()
  let url = t.context.url

  let options = {
    method: 'POST',
    uri: url,
    body: {
      username: user.username,
      password: user.password
    },
    json: true
  }

  let token = await request(options)
  let decoded = await utils.verifyToken(token, config.secret)

  console.log(`Result: ${JSON.stringify(decoded)}`)

  t.is(decoded.username, user.username)
})
