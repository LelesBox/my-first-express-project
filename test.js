///**
// * Created by li_xiaoliang on 2015/4/3.
// */
//var bmb = require('./controller/uploadToBmob');
//bmb.sendText("asd.txt","我是小亮亮，我喜欢小丽丽，是不是觉得我们很萌萌哒！！！好吧 呵呵");
//bmb.getDataById("Articel", "5a44a6dfef")
//    .then(function (data) {
//        console.log(data);
//    }, function (err) {
//        console.log(err);
//    })
//var asd;
//var add= {
//    changed: true,
//    score: 1230,
//    text: "asdasd"
//}
//var _=require("underscore");
//_.mapObject(add, function (val, key) {
//    console.log(val)
//})
//["asd",123,"retyer",12.4].forEach(
//    function (data) {
//    asd=asd+" "+data;
//    console.log(asd);
//}
//)

//var Q = require("q");
//function test(value) {
//    var d = Q.defer();
//    d.resolve(value);
//    return d.promise;
//}
//function test1(value) {
//    var d = Q.defer();
//    d.reject(value);
//    return d.promise;
//}
//并行计算汇总
//Q.all([
//    test(10),//执行三个函数
//    test(20),
//    test1(40)
//])
//    .spread(function (x, y, z) {//三个函数返回的三个值
//        console.log(x, y, z);
//        return x + y + z;
//    }, function (err) {
//        console.log(err);
//    })
//    .done(function (str) {//完成前面的后执行
//        console.log(str)
//    });
//串行计算
//var test3=function () {
//    var d= Q.defer();
//    test(10)
//        .then(
//        function (data) {
//            //return test(data + 10);
//            var d= Q.defer();
//            d.resolve(data+40);
//            return d.promise;
//        }, function (error) {
//            //var d = Q.defer();
//            d.reject(error);
//            return d.promise;
//        })
//        .then(function (data) {
//            //return test(data + 10);
//            //var d = Q.defer();
//            d.resolve(data+90);
//            return d.promise;
//        }, function (error) {
//            //var d = Q.defer();
//            d.reject(error);
//            return d.promise;
//        })
//        .then(function (data) {
//            console.log(data);
//            d.resolve(test(data));
//        }, function (error) {
//            console.log("err:" + error);
//        });
//    return d.promise;
//}
//test3().then(
//    function (data) {
//        console.log("test3 get:"+data);
//    }
//);

//bmb.getFirst("Articel").then(
//    function (data) {
//        console.log(data);
//    },
//    function(err){
//        console.log(err);
//    }
//)
//var condition={
//    greaterThan:["userid",1232],
//    lessThan:["userid",1235],
//    or:{
//        equalTo:['filename',"asd.txt"]
//    }
//}
//bmb.getData("Articel",condition).then(
//    function (data) {
//        debugger;
//        console.log(data.count);
//        console.log(data.data);
//    },
//    function(err){
//        console.log(err);
//    }
//)

//测试修改数据
//首先根据ID获取某一数据，再修改
//bmb.getDataById("Articel", "5a44a6dfef")
//    .then(function (data) {
//        return bmb.alterData(data, {filename: "我又被修改啦.txt", text: "sing for the moment", add: "我是新增属性"});
//    })
//    .then(
//    function (data) {
//        console.log(data);
//    })
//    .catch(function (err) {
//        console.log("err最后Catch处理结果")
//        console.log(err);
//    })
//    .done();

//测试删除数据
//bmb.getDataById("Articel", "5a44a6dfef")
//    .then(function (data) {
//        return bmb.deleteData(data)
//    })
//    .then(function (data) {
//        console.log(data);
//        console.log("删除成功")
//    })
//    .catch(function (err) {
//        console.log(err);
//    })

//测试发送邮件
//require('./common/sendMail');
//var test=require('./middleware/scrapy');
//test.hupuNBAnews().then(function(data){
//    console.log(data)
//},function(err){
//    console.log(err);
//})
var request = require("request");
var fs = require('fs');
var hupu = require('./middleware/scrapy');
//request("http://c2.hoopchina.com.cn/uploads/star/event/images/150420/d1968782a9797d043d3fc01b53c7a9f050544c7d.jpg"
//    , function (err, response, body) {
//        if (err)throw  err;
//        fs.writeFile("test.png",body,'binary',function(err){
//            if(err)throw err;
//            console.log("保存成功")
//        })
//    });
//request('http://c2.hoopchina.com.cn/uploads/star/event/images/150420/d1968782a9797d043d3fc01b53c7a9f050544c7d.jpg')
//    .pipe(fs.createWriteStream('doodle.png'));
//hupu.hupuNBAcontent("http://voice.hupu.com/nba/1904466.html").
//    then(function(data){
//        console.log(data);
//    },function(err){
//        console.log(err);
//    })

//var models = require('./models');
//var data = require("./hupu.json");
//var hupumodel = models.HupuNBAnews;
////hupumodel.insertDBbyArrayP(data).then(function (data) {
////    console.log(data);
////}, function (err) {
////    console.log(err);
////});
//hupumodel.insertDBbyArray(data, function onInsertDbArray(err, data) {
//    if (err) {
//        console.log(err);
//    }else{
//        console.log(data);
//    }
//});

var dao = require('./dao');
var data = require("./hupu.json");

var hupumodel = dao.HupuNBAnews;
//hupumodel.insertDBbyArrayP(data,hupumodel).then(function (data) {
//    console.log(data);
//}, function (err) {
//    console.log(err);
//});
//var models = require('./models');
//var data = require("./hupu.json");
//
//var hupumodel = models.HupuNBAnews;
//hupumodel.insertDBbyArray(data, hupumodel,function onInsertDbArray(err, data) {
//    if (err) {
//        console.log(err);
//    }else{
//        console.log(data);
//    }
//});
//hupumodel.insertDBbyArrayP(data,hupumodel).then(function (data) {
//    console.log(data);
//}, function (err) {
//    console.log(err);
//});
