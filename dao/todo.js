/**
 * Created by li_xiaoliang on 2015/5/2.
 */
var TodoModel = require("../models").Todo;

var SaveTodo = function (todo, callback) {
    var todo = new TodoModel(todo);
    todo.saveTodo(function (err, data) {
        callback(err, data);
    });
}

var GetAllTodo = function (callback) {
    TodoModel.getAllTodo(function (err, data) {
        callback(err, data);
    })
}

var DeleteTodoById = function (id, callback) {
    TodoModel.deleteTodoById(id, function (err, data) {
        callback(err, data);
    })
}

//更新，（已完成）
var DoneTodo = function (id, callback) {
    TodoModel.doneTodoById(id, function (err, data) {
        callback(err, data);
    })
}
//分页查询已完成todo
var getdone = function (skip, limit, callback) {
    TodoModel.getDonetodo(skip, limit, function (err, data) {
        callback(err, data);
    })
}
module.exports = {
    SaveTodo: SaveTodo,
    GetAllTodo: GetAllTodo,
    DeleteTodoById: DeleteTodoById,
    DoneTodo: DoneTodo,
    Getdone:getdone
}
