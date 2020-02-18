const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const routes = require('./routes/Routes');
const app = express();

var mongoDB = 'mongodb+srv://test:test123@cluster0-fxivz.mongodb.net/todo?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todos', routes);

//捕获错误
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  

    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, function() {
    console.log('server is runing on 3000')
})

module.exports = app;