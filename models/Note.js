
const { Schema, model } = require('mongoose')

const noteSchema = Schema({
  content: { type: String, required: true },
  date: { type: Date, default: new Date() },
  important: Boolean,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

// Config format of response for the client
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', noteSchema)

module.exports = Note
