const express = require('express')
const bdoyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()
app.use(morgan('combined'))
app.use(bdoyParser.json())
app.use(cors())

require('./routes')(app)

var mongoDB = 'mongodb+srv://test:test123@cluster0-fxivz.mongodb.net/tracker?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(process.env.PORT || 8081)