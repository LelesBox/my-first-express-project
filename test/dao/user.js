/**
 * Created by li_xiaoliang on 2015/4/24.
 */

var should = require('should');
var dao = require("../../dao").UserDao;
//在测试开始前打开数据库连接，结束后关闭连接。

//插库，这是一个异步的测试方法
describe('test/dao/user.js', function () {
    it("测试用户注册", function (done) {
        var user = {
            id: 1,
            username: "leebox",
            password: "123",
            email: "11114@qq.com"
        }
        dao.SaveUser(user, function (err, data) {
            if (err)
                console.log(err);
            else
                console.log("保存成功");
            done();
        })
    });
    it("测试用户名校验",
        function (done) {
            var username = "leebox7";
            dao.CheckUsername(username, function (err, bool) {
                if (err) throw err;
                if (!bool) {
                    console.log("该账号已存在")
                } else {
                    console.log("该账号可用")
                }
                done();
            })
        });
    it("测试通过ID查找", function (done) {
        var id = 1;
        dao.findId(id, function (err, data) {
            if (err)
                throw err;
            console.log(data);
            done();
        })
    });
    it("测试登陆失败", function (done) {
        var user = {
            username: "leebox",
            password: "12312"
        }
        dao.login(user, function (err, data) {
            if (err)
                throw err;
            if (data.length > 0)
                console.log(data);
            else
                console.log("账号或密码错误！")
            done()
        })
    });
    it("测试登陆成功", function (done) {
        var user = {
            username: "leebox",
            password: "123"
        }
        dao.login(user, function (err, data) {
            if (err)
                throw err;
            if (data.length > 0) {
                console.log("登录成功：信息如下")
                console.log(data);
            }
            else
                console.log("账号或密码错误！")
            done()
        })
    });
    it("测试注册", function (done) {
        var user = {
            username: "leeb",
            password: "123",
            email: "12309@qq.com"
        }
        dao.Register(user.username, user.password, user.email, function (err, data) {
            if (err)
            console.log("注册失败"+err);
            else {
                console.log("注册成功：信息如下")
                console.log(data);
            }
            done()
        })
    });
});

