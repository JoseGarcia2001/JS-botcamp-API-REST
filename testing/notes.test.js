const supertest = require('supertest')
const { app, server } = require('../index')
const mongoose = require('mongoose')

const api = supertest(app)

describe('Notes', () => {
  test('are returned in JSON', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('are returned in ', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
