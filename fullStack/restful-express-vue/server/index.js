const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// 生产环境部署
if(process.env.NODE_ENV === 'production') {

    // 静态资源
    app.use(express.static(__dirname + '/public'));

    app.get(/.*/,(req,res) => {
        res.sendFile(__dirname+ '/public/index.html')
    });
}

const port = process.env.PORT || 5000;

var mongoDB = 'mongodb+srv://test:test123@cluster0-fxivz.mongodb.net/vue_express?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port,() => console.log(`server started on port ${port}`));