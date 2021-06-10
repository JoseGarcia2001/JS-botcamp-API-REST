const mongoose = require('mongoose')

const connectionString = process.env.DB_URI

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('success connection'))
  .catch((err) => console.log(err))
