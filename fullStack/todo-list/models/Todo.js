const mongoose = require('mongoose');

const { Schema } = mongoose;

// 定义数据结构模型

const todoSchema = new Schema({
    name: {
        type: String,
    },
    done: {
        type: Boolean,
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;