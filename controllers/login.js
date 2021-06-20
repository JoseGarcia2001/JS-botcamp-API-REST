const loginRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) res.status(401).json({ error: 'Username and password required' })

  const user = await User.findOne({ username })

  if (!user) res.status(401).json({ error: 'The username and password do not match' })

  const match = await bcrypt.compare(password, user.password)
  if (match) {
    res.status(202).json({ nice: 'authenticated' })
  } else { res.status(401).json({ error: 'The username and password do not match' }) }
})

module.exports = loginRouter
