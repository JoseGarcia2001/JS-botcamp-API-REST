const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  next()
})

let initialNotes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(initialNotes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const note = initialNotes.find((note) => note.id === id)

  if (note) {
    res.json(note)
    return
  }

  res.json({ error: 'We can not find the note' })
})

app.post('/api/notes', (req, res) => {
  const { content, important } = req.body

  if (!content) {
    res.status(400).send({ error: 'content needed' })
    return
  }

  const ids = initialNotes.map((note) => note.id)
  const id = Math.max(...ids) + 1

  const noteToCreate = {
    id,
    content,
    date: new Date().toISOString(),
    important: typeof important !== 'boolean' ? false : important
  }

  initialNotes = [...initialNotes, noteToCreate]

  res.status(201).send(noteToCreate)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  initialNotes = initialNotes.filter((note) => note.id !== id)

  res.json({ response: 'Element deleted success' })
})

app.use((req, res) => {
  res.status(404).send({ error: '404 not found' })
})

app.listen(3001, () => console.log('Server on http://localhost:3001/'))
