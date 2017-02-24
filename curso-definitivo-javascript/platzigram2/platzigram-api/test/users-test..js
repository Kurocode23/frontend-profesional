import test from 'ava'
import micro from 'micro'
import listen from 'test-listen'
import request from 'request-promise'

import users from '../users'
import fixtures from './fixtures'

test.beforeEach(async t => {
  let srv = micro(users)
  t.context.url = await listen(srv)
})

test('POST /', async t => {
  let url = t.context.url
  let user = fixtures.getUser()

  let options = {
    method: 'POST',
    uri: url,
    json: true,
    body: {
      name: user.name,
      username: user.username,
      password: user.password,
      email: user.email
    },
    resolveWithFullResponse: true
  }

  let response = await request(options)

  delete user.email
  delete user.password

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, user)
})

test('GET /:username', async t => {
  let url = t.context.url
  let user = fixtures.getUser()

  let options = {
    method: 'GET',
    uri: `${url}/${user.username}`,
    json: true
  }

  let body = await request(options)

  delete user.email
  delete user.password

  t.deepEqual(body, user)
})
