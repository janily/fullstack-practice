const express = require('express')
const multer = require('multer')
const morgan = require('morgan')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

const app = express();
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(morgan('combined'))
app.use(cors());

const fileFilter = function(req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if(!allowedTypes.includes(file.mimetype)) {
        const error = new Error('文件类型错误');
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }

    cb(null, true);
}

const MAX_SIZE = 20000;

const upload = multer({
    dest: './uploads',
    fileFilter,
    limits: {
        fileSize: MAX_SIZE
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({file: req.file});
});

app.post('/multiple', upload.array('files'), (req, res) => {
    res.json({files: req.files});
});

app.post('/dropzone', upload.single('file'), async (req, res) => {
    try {
        await sharp(req.file.path)
          .resize(300)
          .toFile(`./static/${req.file.originalname}`);

        fs.unlink(req.file.path, () => {
            res.json({ file: `/static/${req.file.originalname}`});
        });
    } catch (err) {
        // res.status(422).json({ err: '未知错误' });
        res.send(err)
    }
    // res.json({file: req.file});
});

app.use(function(err, req, res, next) {
    if(err.code === "LIMIT_FILE_TYPES") {
        res.status(422).json({error: '只允许上传的文件类型'})
    }

    if(err.code === "FILE_LIMIT_SIZE") {
        res.status(422).json({error: '太大了'});
    }
})

app.listen(3300, () => console.log("Running on!!!"))