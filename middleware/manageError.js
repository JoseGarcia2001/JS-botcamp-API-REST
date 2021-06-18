const manageError = (err, req, res, next) => {
  console.log(err)
  // Request with bad ID
  if (err.name === 'CastError') {
    res.status(400).send({ error: 'Bad id format' })
  }
  // Not schema completed
  if (err.name === 'ValidationError') {
    res.status(400).send({ error: 'Validation failed, request format not completed' })
  }
  res.status(500).end()
}

module.exports = manageError
