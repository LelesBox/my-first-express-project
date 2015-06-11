/**
 * Created by li_xiaoliang on 2015/5/19.
 */

var should = require('should');
var dao = require("../../dao").TweetDao;
//在测试开始前打开数据库连接，结束后关闭连接。

//插库，这是一个异步的测试方法
describe('test/dao/tweet.js', function () {
    /*it("测试新增一个状态", function (done) {
     var twe = {
     text: "测试而已",
     images: [{image: "image1.jpg", order: 1}, {image: "image2.png", order: 2}],
     date: new Date().toLocaleString()
     }
     dao.saveTweet(twe, function (err, data) {
     if (err)
     console.log(err);
     else
     console.log(data);
     done();
     })
     });*/

    /* it("测试删除功能555b38310b019c481ba82f7d",
     function (done) {
     var id = "555b38310b019c481ba82f7d";
     dao.deleteById(id, function (err, data) {
     if (err) throw err;
     console.log(data);
     done();
     })
     });*/
    it("测试新增评论", function (done) {
        var id = "555b37e76225b814122c2f1c";
        var comment = {
            userid: 12,
            body: "asdasd",
            date: new Date().toLocaleString()
        }
        dao.updateComment(id, comment, function (err, data) {
            if (err)
                throw err;
            console.log(data);
            done();
        })
    });
    it("测试请求数据功能",
        function (done) {
            dao.queryAll(function (err, data) {
                if (err) throw err;
                console.log(data);
                done();
            })
        });

});


