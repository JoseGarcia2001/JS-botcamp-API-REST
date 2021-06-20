const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')

notesRouter.get('/', async (req, res, next) => {
  try {
    const listOfNotes = await Note.find({})
    res.status(200).json(listOfNotes)
  } catch (error) {
    next(error)
  }
})

notesRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const note = await Note.findById(id).populate('user')

    if (!note) { res.status(400).json({ error: 'Invalid ID' }) }

    res.json(note)
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', async (req, res, next) => {
  try {
    const { content, important, user } = req.body
    const noteToCreate = {
      content,
      important: typeof important !== 'boolean' ? false : important,
      user
    }

    const createdNote = await Note.create(noteToCreate)
    // Save ref of created note to their user
    const ownerUser = await User.findById(user)
    ownerUser.notes.push(createdNote.id)
    ownerUser.save()

    res.status(201).json(createdNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const noteDeleted = await Note.findByIdAndDelete(id)
    res.json({ response: 'Element deleted success', noteDeleted })
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const propToUpdate = req.body

    const noteUpdated =
      await Note
        .findByIdAndUpdate(id, { ...propToUpdate }, { new: true })

    res.json(noteUpdated)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
