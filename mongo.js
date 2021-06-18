const mongoose = require('mongoose')

const { NODE_ENV, DB_URI, DB_URI_TEST } = process.env

const connectionString = NODE_ENV === 'test' ? DB_URI_TEST : DB_URI

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('success connection'))
  .catch((err) => console.log(err))
