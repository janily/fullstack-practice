const express = require('express')
const multer = require('multer')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')


const app = express();
const storage = multer.diskStorage({
    destination: 'upload',
    filename: function (req, file, callback) {
      //..
    }
  });
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(morgan('combined'))
app.use(cors());