const request = require('supertest')
const should = require('should')
const { describe } = require('mocha')
const { it } = require('mocha')
const server = require('./index')

let swagger

describe('GET /swagger.json!!!', () => {
  it('respond with json', () => {
    request(server)
      .get('/v1/swagger.json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        swagger = response.body
      })
  })
})

describe('test swagger', () => {
  it('swagger.json mast be an Object!!', () => {
    should(swagger).be.an.Object()
  })

  it('swagger.json have property openapi!!', () => {
    should(swagger).have.property('openapi', '3.0.0')
  })
})

describe('GET /apidoc!!!', () => {
  it('respond with json', () => {
    request(server)
      .get('/v1/apidoc')
      .set('Accept', 'text/html')
      .expect(200)
      .then((response) => {
        // eslint-disable-next-line no-unused-expressions
        should(response.body).be.html
      })
  })
})
