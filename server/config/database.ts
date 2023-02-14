const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

// this function that connects to mongoDB is async so that nothing happens on the server until this connection is made
const database = async () => {

  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = database
