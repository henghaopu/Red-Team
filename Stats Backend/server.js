/**
 * Imports the `express`, router`, and `body-parser` modules
 */
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const http = require('http')

/**
 * Set to a variable, instead of typing this out everytime
 */
const app = express()

const server = http.createServer(app)

/**
 * Imports the routes to be used
 */
const statsRoute = require('./routes/stats-route')

/**
 * Imports Override.js
 */
const override = require('./helpers/Override')

/**
 * Port the server listens on
 */
const port = 3001

/**
 * TODO: Enable this when nginx is put in front @Landon
 */
// app.set('trust proxy', true)

/**
 * Set the headers the server accepts
 */
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT')
  next()
})

/**
 * Overrides res.json
 */
app.use(function(req, res, next) {
  override.json(res)

  next()
})

/**
 * Sets the view engine for the server
 */
app.set('views', path.join(__dirname, '/views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

/**
 * Body-parser middleware
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * Sets the JSON spacing for JSON data that is sent back to the user
 */
app.set('json spaces', 4)

/**
 * Setting the routes to be used
 */
app.use('/', statsRoute)

/**
 * Called when the server is ready and it listens on the specified port
 */
server.listen(port, function() {
  console.log('Server started on port ' + port)
})
