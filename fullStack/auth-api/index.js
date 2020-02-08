const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

var mongoDB = process.env.DB_CONNECT;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
 
app.listen(3000, () => console.log('server running!!!'))