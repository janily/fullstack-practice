const Todo = require('../models/Todo');

class TodoRepository {
    constructor(model) {
        this.model = model;
    }

    create(name) {
        const newTodo = { name, done:false };
        const todo = new this.model(newTodo);

        return todo.save();
    }

    findAll() {
        return this.model.find();
    }

    findById(id) {
        return this.model.findId(id);
    }

    deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }

    updateById(id) {
        const query = {_id: id};
        return this.model.findOneAndUpdate(query, {$set: {name:object.name, done: object.done}});
    }
}

module.exports = new TodoRepository(Todo);

