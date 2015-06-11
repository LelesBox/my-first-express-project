/**
 * Created by 14062539 on 2015/5/19.
 */

var mongoose = require('mongoose');
var config = require("../config");
var Schema = mongoose.Schema;

/***
 * text:正文，images:图片，最多九张，date：时间，comments评论
 * @type {Schema}
 */
var TweetSchema = new Schema({
    text: String,
    images: [{image: String, order: Number}],
    date: String,
    comments: [{userid: String, body: String, date: String}]
});

/*----------------------------模型方法------------------------*/

//保存
TweetSchema.methods.saveTweet = function (callback) {
    var twet = this;
    twet.save(function (err, result) {
        callback(err, result);
    });
}

//删除
TweetSchema.statics.deleteById = function (id, callback) {
    this.findOneAndRemove({_id: id}, function (err, data) {
        callback(err, data);
    });
}

//添加评论，既更新
TweetSchema.statics.updateByComment = function (id, comment, callback) {
    this.update({_id: id}, {$push: {comments: comment}}, function (err, data) {
        callback(err, data);
    });
}

//获取全部状态
TweetSchema.statics.queryAll = function (callback) {
    this.find({}, function (err, data) {
        callback(err, data);
    });
}
mongoose.model('Tweet', TweetSchema);