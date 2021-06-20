const { Schema, model } = require('mongoose')

const userSchema = Schema({
  password: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
})

// Config format of response for the client
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

const User = model('User', userSchema)

module.exports = User
