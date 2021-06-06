// load in the 3rd-party packages
const express = require('express')
const mongoose = require('mongoose')
mongoose.plugin(require('mongoose-unique-validator'), {
  message: 'Please choose another {PATH}'
})
const bodyParser = require('body-parser')

const router = require('./config/routes')
// const queryHandler = require('./lib/queryHandler')
const errorHandler = require('./lib/errorHandler')
const { port, dbURI } = require('./config/environment')

const app = express() // create the app

// Connect to a specific database: MONGOOSE
mongoose.connect(dbURI, { useNewUrlParser: true })

app.use(express.static(`${__dirname}/dist`))
// app.use() - tells the app to use this piece of middleware: EXPRESS
// bodyParser.json() - tells bodyParser to handle JSON data: BODY-PARSER
app.use(bodyParser.json())
// queryHandler - custom middleware to modify req.query
// to make it work better for mongoose: WE WROTE THIS
// app.use(queryHandler)

// hook up the router middleware: EXPRESS
app.use('/api', router) // all endpoints prefixed with `/api`

app.use(errorHandler)

// Tell the API to listen to port 4000 for incoming requests: EXPRESS
app.listen(port, () => console.log('listening ...'))

module.exports = app // Export the app for testing
