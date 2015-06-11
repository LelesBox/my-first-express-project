/**
 * Created by li_xiaoliang on 2015/5/19.
 */

var TweetModel = require("../models").Tweet;

var saveTweet = function (tweet, callback) {
    var tweet = new TweetModel(tweet);
    tweet.saveTweet(function (err, data) {
        callback(err, data);
    });
}

var deleteById = function (id, callback) {
    TweetModel.deleteById(id, function (err, data) {
        callback(err, data);
    })
}

var updateComment = function (id, comment, callback) {
    TweetModel.updateByComment(id, comment, function (err, data) {
        callback(err, data);
    })
}

var queryAll = function (callback) {
    TweetModel.queryAll(function (err, data) {
        callback(err, data);
    })
}
module.exports = {
    saveTweet: saveTweet,
    deleteById: deleteById,
    updateComment: updateComment,
    queryAll: queryAll
}