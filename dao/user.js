/**
 * Created by 14062539 on 2015/4/24.
 */

var UserModel = require("../models").User;

var SaveUser = function (user, callback) {
    var user = new UserModel(user);
    user.saveUser(function (err, data) {
        callback(err, data);
    });
}

var CheckUsername = function (username, callback) {
    UserModel.CheckUsername(username, function (err, isMatch) {
        callback(err, isMatch);
    })
}

var findId = function (id, callback) {
    UserModel.findId(id, function (err, data) {
        callback(err, data);
    })
}

var login = function (user, callback) {
    UserModel.login(user, function (err, data) {
        callback(err, data);
    })
}

var Register = function (username, password, email, callback) {
    var id = Date.now();
    var user = {
        id: id,
        username: username,
        password: password,
        email: email
    }
    SaveUser(user, function (err, data) {
        callback(err, data);
    })
}

module.exports = {
    SaveUser: SaveUser,
    CheckUsername: CheckUsername,
    findId: findId,
    login: login,
    Register: Register
}
