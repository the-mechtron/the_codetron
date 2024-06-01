const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

// Enviormental Varialbes
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

// Create App
const app = express()

app.use((req, res, next) => {
  console.log('CORS')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use('/', express.static(__dirname + '/public'))

// Parse the incoming request
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log('Aagye Ji Aagye')
  next()
})

// Working with routes
const codeRoutes = require('./routes/code')
const authRoutes = require('./routes/auth')
app.use('/code', codeRoutes)
app.use('/auth', authRoutes)

app.use('/', (req, res, next) => {
  res.send('<h1>Hag diya bhai!!!</h1>')
})

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000)
  })
  .catch(err => {
    console.log(err)
  })
