/**
 * Created by li_xiaoliang on 2015/4/21.
 * 测试数据库dao层方法
 */
var mongoose = require('mongoose');
var testdb='mongodb://127.0.0.1/test'

function TestModel(){
}

exports.initDb=function(){
    var conn=mongoose.createConnection(testdb);
    TestModel.connection=conn;
}

exports.disconnect= function disconnect() {
    if(TestModel) {
        mongoose.disconnect();
    }
}

exports.Models=TestModel;
