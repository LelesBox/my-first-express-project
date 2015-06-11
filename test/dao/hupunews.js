/**
 * Created by 14062539 on 2015/4/22.
 */
var dao = require('../../dao');
var should = require('should');
var db = require('./db');

//在测试开始前打开数据库连接，结束后关闭连接。
require('./aop');


//插库，这是一个异步的测试方法
describe('test/dao/hupunews.js', function () {
    it("测试虎扑新闻news数据入库情况，一次应该插入60条数据,并且是数组",
        function () {
            //返回的是一个promise
            var data = require("../../hupu.json");
            data.length.should.equal(60);
            data.should.Array
        });

    it("插入MongoDB数据库,测试addOne方法", function (done) {
        var data = require("../../hupu.json");
        var data = data[0];

        //如果测试实际的数据库，则下面两行替换为以下代码，默认连接的test库
        //var model=dao.HupuNBAnews;
        //var model=new model(data);
        var model = new db.Models.hupumodels(data);
        model.addOne(function (err, data) {
            if (err)
                console.log(err);
            else
            data.should.equal("save success");
            done();
        });
    })
});
