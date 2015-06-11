/**
 * Created by 14062539 on 2015/4/24.
 */

var mongoose = require('mongoose');
var config=require("../config");
var crypto = require("crypto");
var Schema = mongoose.Schema;

//账户模型，id，用户名，密码(加密过),key(明文加key可成唯一对应的密码)
var UserSchema = new Schema({
    id:{ type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    email: { type: String, required: true, unique: true }
});


/*-----------------------------模型方法-------------------------------------*/
//在保存密码的的时候进行加密
UserSchema.pre('save', function (next) {
    var user = this;
    var shasum = crypto.createHmac(config.crypto, config.passkey);
    shasum.update(user.password);
    var dpass = shasum.digest('hex');
    user.password = dpass;
    next();
});


//校验账号是否已存在，回调中如果存在而返回则第二个参数返回false。
UserSchema.statics.CheckUsername = function (username, callback) {
    this.find({username: {$in: [username]}}, function (err, data) {
        if (err)
            return callback(err);
        if (data.length !== 0) {
            return callback(null, false);
        }
        callback(null, true);
    })
}

//保存账户
UserSchema.methods.saveUser = function (callback) {
    var user = this;
    user.save(function (err,user) {
        callback(err,user);
    })
}

//验证密码登陆，如果存在则返回该账号所有信息，需要对密码进行加密后去数据库里查找
UserSchema.statics.login = function (user, callback) {
    var shasum = crypto.createHmac(config.crypto, config.passkey);
    shasum.update(user.password);
    var dpass = shasum.digest('hex');
    this.find({username: user.username, password: dpass}, function (err, data) {
        callback(err,data);
    })
}

//通过id查找用户
UserSchema.statics.findId = function (id, callback) {
    this.findOne({id: id}, {id: 1, username: 1, email: 1}, function (err, data) {
        callback(err,data);
    })
}

mongoose.model('User', UserSchema);