const manageError = (err, req, res, next) => {
  console.log(err)
  // Request with bad ID
  if (err.name === 'CastError') {
    res.status(400).send({ error: 'Bad id format' })
  }
  // Not schema completed
  if (err.name === 'ValidationError' || err.name === 'Error') {
    res.status(400).send({ error: 'Validation failed, request format not completed' })
  }
  if (err.name === 'MongoError') {
    res.status(400).send({ error: 'User already taken' })
  }
  res.status(500).end()
}

module.exports = manageError
