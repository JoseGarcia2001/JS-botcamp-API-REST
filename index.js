require('dotenv').config()

// Data Base connection
require('./mongo')

const path = require('path')
const express = require('express')
const cors = require('cors')
const manageError = require('./middleware/manageError')
const manage404 = require('./middleware/manage404')
const app = express()
const Note = require('./models/Note')

app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (req, res, next) => {
  Note
    .find({})
    .then((listOfNotes) => res.json(listOfNotes))
    .catch(error => next(error))
})

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  Note
    .findById(id)
    .then(note => res.json(note))
    .catch(error => next(error))
})

app.post('/api/notes', (req, res, next) => {
  const { content, important } = req.body

  const noteToCreate = {
    content,
    important: typeof important !== 'boolean' ? false : important
  }

  Note
    .create(noteToCreate)
    .then(noteCreated => res.status(201).send(noteCreated))
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  Note
    .findByIdAndDelete(id)
    .then(noteDeleted => res.json({ response: 'Element deleted success', noteDeleted }))
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  const { content, important } = req.body

  Note
    .findByIdAndUpdate(id, { content, important }, { new: true })
    .then(noteUpdated => res.json(noteUpdated))
    .catch(error => next(error))
})

app.use(manageError)

app.use(manage404)

app.listen(process.env.PORT, () => console.log('Server on http://localhost:3001/'))
