/**
 * Created by 14062539 on 2015/4/26.
 */

var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

//加载hupunews文件，里面注册了hupunews的model，这样就可以直接在外部引用了
//require("./hupunews");
require("./user");
require("./todo");
require("./tweet");
//exports.HupuNBAnews=mongoose.model("Hupunews");
exports.User = mongoose.model("User");
exports.Todo = mongoose.model("Todo");
exports.Tweet = mongoose.model("Tweet");