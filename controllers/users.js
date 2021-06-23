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
    const SALT_ROUNDS = 10
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const createdUser = await User.create({
      name,
      username,
      password: hashedPassword
    })

    res.status(201).json(createdUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
