/**
 * Created by li_xiaoliang on 2015/4/27.
 */

var bmob = require('../controller/uploadToBmob');
var should = require('should');

describe('test/bmob.js', function () {
    it("测试删除文章接口",
        function (done) {
            //返回的是一个promise
            bmob.getDataById("Article", "ebad5c25b2")
                .then(function (data) {
                    return bmob.deleteData(data);
                })
                .then(function (data) {
                    console.log({state: 0, msg: "delete success！"})
                    done();
                })
                .catch(function (err) {
                    console.log(err);
                })
                .done();
        });
})
