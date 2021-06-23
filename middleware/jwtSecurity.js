const jwt = require('jsonwebtoken')

const jwtSecurity = (req, res, next) => {
  try {
    const authorization = req.headers.authorization || ''
    // Split the authorization in the first position
    // method and the other the token
    const [method, token] = authorization.split(' ')

    if (method.toLowerCase() !== 'bearer' || !token) return res.status(401).json({ error: 'The token is needed' })

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = tokenDecoded.id

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = jwtSecurity
