const loginRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) throw new Error()

    const user = await User.findOne({ username })

    if (!user) res.status(401).json({ error: 'The username and password do not match' })

    const match = await bcrypt.compare(password, user.password)

    if (match) {
      const { name, id, username, notes } = user
      const token =
      jwt.sign(
        { id, name, username, notes },
        process.env.JWT_SECRET,
        { expiresIn: '5' })

      res.status(202).json({ token, data: { name, username, id, notes } })
    } else { res.status(401).json({ error: 'The username and password do not match' }) }
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter
