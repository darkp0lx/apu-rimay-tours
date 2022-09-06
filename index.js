require('./mongo')
const Product = require('./models/Product')

const cors = require('cors')

var express = require('express')
const Place=require('./models/Place')
var app = express()
app.use(cors())
app.use(express.json())

app.get('/api/places', async (req, res) => {
  try {
    const places = await Place.find()
    res.json(places)
  } catch (e) {
    console.log(e)
  }
})

app.get('/api/places/:id', async (req, res, next) => {
  const id = req.params.id
  const productoEncontrado = await Place.findById(id)
  if (productoEncontrado) {
    return res.json(productoEncontrado)
  } else {
    res
      .status(404)
      .end()
      .catch(err => next(err))
  }
})

app.delete('/api/places/:id', async (req, res,next) => {
  console.log('delete id')
  const id = req.params.id

  const productoEncontrado = await Place.findByIdAndDelete(id)
  if (productoEncontrado) {
    res
      .status(202)
      .json({
        status: 'eliminado!!!!'
      })
      .end()
  } else {
    res.status(404).json({ status: 'ese producto no existe' })
  }
})

app.get('/api/places/:name', async (req, res, next) => {
  const name = req.params.name
  Place.find({
    name: {
      $regex: new RegExp(name, 'ig')
    }
  }).then(response => res.json(response))
})


app.post('/api/places', async (req, res) => {
  const { name, image, price,description,address } = req.body

  const newPlace = new Place({
    name,
    image,
    price,
    description,
    address
  })

  if (!name) {
    return res.status(400).json({
      error: 'required "content" field is missing'
    })
  }

  try {
    const savedProduct = await newPlace.save()
    res.json(savedProduct)
  } catch (err) {
    console.log(err)
  }
})

app.put('/api/places/:id', async (req, res) => {
  const id = req.params.id
  const { idBody, precio, nombre, image } = req.body

  const product = {
    id: idBody,
    nombre: nombre,
    image: image,
    precio: precio
  }
  Product.findByIdAndUpdate(id, product, { new: true }).then(response =>
    res.json(response)
  )
})

app.use((req, res) => {
  res.status(404).json({
    error: 'not found'
  })
})

const PORT = process.env.PORT || 3002
const server = app.listen(PORT, () => {
  console.log('Server listening on ' + PORT)
})

module.exports = { server, app }
