require('dotenv').config()

// Data Base connection
require('./mongo')

const path = require('path')
const express = require('express')
const cors = require('cors')
const manageError = require('./middleware/manageError')
const manage404 = require('./middleware/manage404')
const app = express()
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})
// Notes Router
app.use('/api/notes', notesRouter)

// Users Router
app.use('/api/users', usersRouter)

// Login Router
app.use('/api/login', loginRouter)

app.use(manageError)

app.use(manage404)

const server = app.listen(process.env.PORT, () =>
  console.log(`Server on http://localhost:${process.env.PORT}/`
  ))

process.on('uncaughtException', () => server.close())

module.exports = { app, server }
