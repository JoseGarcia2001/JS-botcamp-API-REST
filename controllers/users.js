const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
      .populate('notes', {
        content: 1,
        important: 1,
        date: 1
      })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const { username, password, name } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      username,
      password: hashedPassword
    })

    const createdUser = await user.save()

    res.status(201).json(createdUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
