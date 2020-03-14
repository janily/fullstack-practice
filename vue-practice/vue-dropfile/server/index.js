const express = require("express");
const fileupload = require("express-fileupload");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(fileupload());

app.use("/static", express.static(path.join(__dirname, "static")));
app.use(morgan("combined"));
app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200).send("hello world");
});

app.post("/upload", function(req, res, next) {
  const file = req.files.photo;
  const host = req.host;
  const filePath = req.protocol + "://" + host + "/uploads/" + file.name;
  // const filePath = __dirname + "/uploads" + file.name;

  file.mv("./uploads/" + file.name, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.send({
        success: true,
        message: "文件已上传路径是" + filePath
      });
    }
  });
});

app.listen(3300, () => console.log("Running on!!!"));
