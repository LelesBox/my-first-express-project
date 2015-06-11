/**
 * Created by li_xiaoliang on 2015/4/14.
 */
var passport = require('passport');
var UserDao = require("../dao").UserDao
/*
 路径 '/'
 */
exports.index = function (req, res) {
    res.render('login', {title: "登陆博客后台系统"});
}
/*
 '/login'路径
 */
exports.login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
});

//注册用户
exports.register = function (req, res) {
    if (req.body) {
        var username = req.body.username;
        var password = req.body.passowrd;
        var email = req.body.email;
        UserDao.Register(username, password, email, function (err, data) {
            if (err) {
                res.render("register", {msg: err});
            } else {
                res.render('login', {title: "注册成功，重新登录"});
            }
        });
    }else{
        res.render("register");
    }
}

/*
 路径：'/profile','write'
 */
exports.boss = function (req, res) {
    if (req.isAuthenticated()) {
        var html = "<h2>你好, " + req.user.username + "</h2><a href='/logout'>退出</a>";
        return res.send(html);
    }
    res.redirect('/login');
}

