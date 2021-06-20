const Note = require('../../models/Note')
const User = require('../../models/User')
const mongoose = require('mongoose')
const { server } = require('../../index')
const supertest = require('supertest')
const { app } = require('../../index')
const api = supertest(app)

const initialNotes = [
  {
    content: 'First Notes',
    important: true
  },
  {
    content: 'I am learning to test my code',
    important: false
  },
  {
    content: 'I am a nice Frontend Developer',
    important: true
  },
  {
    content: 'This is a new note for a test',
    important: true
  }

]

const getUserId = async () => {
  const users = await User.find({})
  const userId = users[0].id
  return userId
}

const createInitialNotes = async () => {
  await Note.deleteMany({})

  const userId = await getUserId()

  for (const note of initialNotes) {
    await Note.create({ ...note, user: userId })
  }
}

const clearOpenConnections = () => {
  mongoose.connection.close()
  server.close()
}

const getAllNotes = async () => {
  const { body: notes } = await api.get('/api/notes')
  return { notes, contents: notes.map(note => note.content) }
}

const getAllUsers = async () => {
  const { body: users } = await api.get('/api/users')
  return users
}

module.exports = {
  api,
  createInitialNotes,
  clearOpenConnections,
  initialNotes,
  getAllNotes,
  getAllUsers,
  getUserId
}
