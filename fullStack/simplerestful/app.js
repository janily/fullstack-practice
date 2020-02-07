const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv/config');

app.use(cors())

app.use(bodyParser.json());

const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute);

// mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => {
//     console.log('connect sucess');
// })

var mongoDB = 'mongodb+srv://test:test123@cluster0-fxivz.mongodb.net/restful?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(3000);