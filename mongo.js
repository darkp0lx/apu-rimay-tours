const mongoose = require('mongoose')
require('dotenv').config()

const connectString = process.env.MONGO_DB_URI
if (!connectString) {
  console.error(
    'Recuerda que tienes que tener un archivo .env con las variables de entorno definidas y el MONGO_DB_URI que servirá de connection string. En las clases usamos MongoDB Atlas pero puedes usar cualquier base de datos de MongoDB (local incluso).'
  )
}
mongoose
  .connect(connectString)
  .then(() => console.log('connect to database'))
  .catch(error => console.log(error))

process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})
