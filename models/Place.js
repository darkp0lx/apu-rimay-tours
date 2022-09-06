const { Schema, model } = require('mongoose')

const PlaceSchema = new Schema({
  name: String,
  image: String,
  description:String,
  price: Number
})

PlaceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Place = model('Place', PlaceSchema)

module.exports = Place
