const supertest = require('supertest')
const { app } = require('../index')
const {
  createInitialNotes,
  clearOpenConnections,
  getAllNotes,
  initialNotes
} = require('./helpers/helpers')

const api = supertest(app)

beforeEach(createInitialNotes)

describe('GET /api/notes', () => {
  test('Get correct format and status code', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('Get all notes', async () => {
    const { notes } = await getAllNotes()
    expect(notes.length).toBe(initialNotes.length)
  })

  test('Get correct content', async () => {
    const { contents } = await getAllNotes()
    expect(contents).toContain(initialNotes[0].content)
  })

  test('Get one note by ID', async () => {
    const { notes } = await getAllNotes()
    const note = notes[0]
    const { body: noteExpected } = await api.get(`/api/notes/${note.id}`)
    expect(noteExpected).toEqual(note)
  })

  test('Get one note with bad ID', async () => {
    await api
      .get('/api/notes/123')
      .expect(400)
      .expect({ error: 'Bad id format' })
  })
})

describe('POST /api/notes', () => {
  test('Create one note success', async () => {
    const { body: createdNote } = await api
      .post('/api/notes')
      .send({ content: 'note of test', important: true })
      .expect(201)

    const { contents, notes } = await getAllNotes()
    expect(contents).toContain(createdNote.content)
    expect(notes).toHaveLength(initialNotes.length + 1)
  })

  test('Create one note without important success', async () => {
    const { body: createdNote } = await api
      .post('/api/notes')
      .send({ content: 'note of test' })
      .expect(201)

    const { contents, notes } = await getAllNotes()
    expect(contents).toContain(createdNote.content)
    expect(notes).toHaveLength(initialNotes.length + 1)
  })

  test('Create one note without content', async () => {
    await api
      .post('/api/notes')
      .send({ important: true })
      .expect(400)
      .expect({ error: 'Validation failed, request format not completed' })

    const { notes } = await getAllNotes()
    expect(notes).toHaveLength(initialNotes.length)
  })
})

describe('DELETE /api/notes/:id', () => {
  test('Delete one note success', async () => {
    const { notes: initialNotes } = await getAllNotes()
    const noteToDelete = initialNotes[0]
    const { body: response } = await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(200)

    const { notes, contents } = await getAllNotes()
    expect(contents).not.toContain(response.noteDeleted.content)
    expect(notes).toHaveLength(initialNotes.length - 1)
  })

  test('Delete one note with bad ID', async () => {
    await api
      .delete('/api/notes/123')
      .expect(400)
      .expect({ error: 'Bad id format' })

    const { notes } = await getAllNotes()
    expect(notes).toHaveLength(initialNotes.length)
  })
})

describe('PUT /api/notes/:id', () => {
  test('Update one note success', async () => {
    const { notes: initialNotes } = await getAllNotes()
    const noteToUpdate = initialNotes[0]

    const { body: updatedNote } = await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .send({ content: 'note updated success', important: true })
      .expect(200)

    const { contents } = await getAllNotes()
    expect(contents).toContain(updatedNote.content)
  })

  test('Update one note with bad ID', async () => {
    await api
      .put('/api/notes/123')
      .expect(400)
      .expect({ error: 'Bad id format' })
  })

  test('Update one note with empty content', async () => {
    const { notes: initialNotes } = await getAllNotes()
    const noteToUpdate = initialNotes[0]

    await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .send({})
      .expect(200)

    const { notes } = await getAllNotes()
    expect(initialNotes).toEqual(notes)
  })
})

afterAll(clearOpenConnections)
