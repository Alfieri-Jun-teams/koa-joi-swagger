const request = require('supertest')
const should = require('should')
const { describe } = require('mocha')
const { it } = require('mocha')
const server = require('./index')

describe('GET /users!!!', () => {
  it('response get /users result!!', () => {
    request(server)
      .get('/v1/users')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        // eslint-disable-next-line no-unused-expressions
        should(res.body).be.String
      })
  })
})

describe('POST /users!!!', () => {
  it('response post /users success!!', () => {
    request(server)
      .post('/v1/users')
      .send({ phone: '13322224444', password: 'hahaha.js' })
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        // eslint-disable-next-line no-unused-expressions
        should(res.body).be.String
      })
  })

  it('requires property "password"', () => {
    request(server)
      .post('/v1/users')
      .send({ phone: '13322221111' })
      .set('Accept', 'application/json')
      .expect(422)
      .then((response) => {
        should(response.error.text).match('requires property "password"')
      })
  })

  it('requires property "phone"', () => {
    request(server)
      .post('/v1/users')
      .send({ password: 'hahahahhaha' })
      .set('Accept', 'application/json')
      .expect(422)
      .then((response) => {
        should(response.error.text).match('requires property "phone"')
      })
  })
})

describe('GET /users/:id!!!', () => {
  it('response success!!', () => {
    request(server)
      .get('/v1/users/1')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        // eslint-disable-next-line no-unused-expressions
        should(res.body).be.String
      })
  })
})

describe('UPDATE /users/:id!!!', () => {
  it('response success!!', () => {
    request(server)
      .put('/v1/users/1')
      .send({ password: 'asdxzas123' })
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        // eslint-disable-next-line no-unused-expressions
        should(res.body).be.String
      })
  })
})

describe('DELETE /users/:id!!!', () => {
  it('response success!!', () => {
    request(server)
      .delete('/v1/users/1')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        // eslint-disable-next-line no-unused-expressions
        should(res.body).be.String
      })
  })
})
