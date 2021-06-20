const User = require('../models/User')
const bcrypt = require('bcrypt')
const { clearOpenConnections, getAllUsers, api } = require('./helpers/helpers')

beforeEach(async () => {
  await User.deleteMany({})

  const hashedPassword = await bcrypt.hash('test123', 10)

  await User.create({
    username: 'testerUser',
    name: 'User Tester',
    password: hashedPassword
  })
})

describe('Users End Points', () => {
  test.only('Create a new user with fresh user', async () => {
    const initialUsers = await getAllUsers()
    const { body: createdUser } = await api
      .post('/api/users')
      .send({
        username: 'New tester User',
        name: 'user Tester',
        password: '123'
      })
      .expect('Content-Type', /json/)
      .expect(201)
    console.log(createdUser)

    const users = await getAllUsers()

    expect(users).toContainEqual(createdUser)
    expect(users).toHaveLength(initialUsers.length + 1)
  })

  test('Try to create a new user with already taken username and response with a error', async () => {
    const initialUsers = await getAllUsers()
    await api
      .post('/api/users')
      .send({
        username: 'testUser',
        name: 'user Tester',
        password: '123'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect({ error: 'User already taken' })

    const users = await getAllUsers()
    expect(users).toHaveLength(initialUsers.length)
  })

  test('Try to create a new user with missing data', async () => {
    const initialUsers = await getAllUsers()
    await api
      .post('/api/users')
      .send({
        username: 'testUser',
        name: 'user Tester'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect({ error: 'Validation failed, request format not completed' })

    const users = await getAllUsers()
    expect(users).toHaveLength(initialUsers.length)
  })
})

afterAll(clearOpenConnections)
