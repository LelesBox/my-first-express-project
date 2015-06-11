/**
 * Created by li_xiaoliang on 2015/4/21.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HupunewsSchema = new Schema({
    title: String,
    url: String,
    image: {
        image: String,
        video: {type: String, default: ""},
        videoImage: {type: String, default: ""}
    },
    content: String,
    time: String,
    source: String,
    readnum: String,
    commentnum: String
});
exports.HupunewsSchema=HupunewsSchema;
