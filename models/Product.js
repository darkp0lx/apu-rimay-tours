const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  nombre: String,
  image: String,
  precio: Number
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Product = model('Product', productSchema)

module.exports = Product
