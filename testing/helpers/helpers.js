const Notes = require('../../models/Note')
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

const createInitialNotes = async () => {
  await Notes.deleteMany({})

  for (const note of initialNotes) {
    await Notes.create(note)
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

module.exports = {
  createInitialNotes,
  clearOpenConnections,
  initialNotes,
  getAllNotes
}
