const mongoose = require('mongoose')

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/indonesia'
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.set('useCreateIndex', true)

mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
)
mongoose.connection.on('open', () => {
  console.log('Database connected', mongoURL)
})

return mongoose
