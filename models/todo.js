/**
 * Created by li_xiaoliang on 2015/5/2.
 */
var mongoose = require('mongoose');
var config = require("../config");
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    year: { type: Number, require: true },
    month: { type: Number, require: true },
    day: { type: Number, require: true },
    hour: { type: Number, default: 0 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
    //正文
    text: { type: String, require: true },
    //是否已完成
    isdone: { type: Boolean, require: true, default: false },
    //完成时间
    donetime: { type: String }
});

/*------------------------------模型方法---------------------------------*/
//保存方法
TodoSchema.methods.saveTodo = function (callback) {
    var todo = this;
    todo.save(function (err, user) {
        callback(err, user);
    })
}

//删除
TodoSchema.statics.deleteTodoById = function (id, callback) {
    this.findOneAndRemove({ _id: id }, function (err, data) {
        callback(err, data);
    })
}

//获取所有内容，再输出来的时候再判断已完成和未完成
TodoSchema.statics.getAllTodo = function (callback) {
    this.find({isdone:false}, { __v: 0 }, function (err, data) {
        callback(err, data);
    })
}

//更新todo，已完成的todo
TodoSchema.statics.doneTodoById = function (id, callback) {
    this.update({ _id: id }, { $set: { isdone: true, donetime: new Date().toLocaleString() } }, function (err, data) {
        callback(err, data);
    })
}

TodoSchema.statics.getDonetodo = function (skip, limit, callback) {
    this.find({}, { __v: 0 }).sort({donetime:-1}).skip(skip).limit(limit).find(function (err, data) {
        callback(err, data);
    });
}
//TodoSchema.

mongoose.model('Todo', TodoSchema);