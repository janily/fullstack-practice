'use strict'
const path = require('path');
module.exports = {

    // 代表打包入口
    entry: {
        index: './src/index.js',
    },

    // 指定打包地址及文件名
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'index.js'
    },
    mode: 'production',

    // 解析 es 6
    module: {
        rules: [

            // 解析 es6
            {
                test: /.js$/,
                use: 'babel-loader'
            },

            // 样式打包
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            // 加载图片
            {
                test: /.(jpg|png|gif|jpeg)$/,
                use: [{
                    loader:'url-loader',
                    options: {
                        limit:160000,  // 大小限制，小于这个值会打包为 base64 格式
                        name: 'imgs/[name].[hash].[ext]'
                    }
                }]
            }
        ]
    }
}
