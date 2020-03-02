# es6 学习

## 使用 Babel-cli 对 es6 进行转换

`npm install -g babel-cli`

`npm install --save-dev babel-preset-es2015 babel-cli`

## 在根目录下新建.babelrc文件，并打开录入下面的代码

`{
    "presets":[
        "es2015"
    ],
    "plugins":[]
}`

## 这个文件我们建立完成后，现在可以在终端输入的转换命令了，这次ES6成功转化为ES5的语法

`babel src/index.js -o dist/index.js`
