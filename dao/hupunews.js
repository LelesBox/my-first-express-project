/**
 * Created by 14062539 on 2015/4/22.
 */
var mongoose=require("mongoose");
var schema=require("../models/hupunews");
var Q = require("q");


var Hupunews=schema.HupunewsSchema;

//测试，使用Promise写法插入
Hupunews.statics.insertDBbyArrayP = function (array,model) {
    var d = Q.defer();
    if (Array.isArray(array)) {
        var test = array[1];
        var news = new model(test);
        news.save(function (err, data) {
            if (err) {
                d.reject(err);
            } else {
                d.resolve("Promise插入成功");
            }
        });
    } else {
        d.reject("param should be array");
    }
    return d.promise
}

//由于抓取的新闻是长度为60的数组，它们都需要入库,所以我在这里定义一个直接读取数组入库的静态方法
Hupunews.statics.insertDBbyArray = function (array,model,callback) {
    if (Array.isArray(array)) {
        array.forEach(function (value, index, arr) {
            var news = new model(value);
            news.save(function (err, data) {
                if (err) {
                    callback(err)
                } else {
                    callback(null, "insert success");
                }
            });
        })
    }
}

//实例方法，查找数据
Hupunews.statics.findAll=function(){
    query.find(function(){

    })
}

//实例方法，添加单个数据
Hupunews.methods.addOne=function(callback){
    this.save(function(err){
        if(err){
            callback(err);
        }else{
            callback(null,"save success");
        }
    })
}




//实例方法，删除单个数据,待完善
Hupunews.methods.addOne=function(callback){
    this.save(function(err){
        if(err){
            callback(err);
        }else{
            callback(null,"save success");
        }
    })
}


mongoose.model('Hupunews', Hupunews);

//暴露添加了各种方法后的schema给测试用
exports.Hupunews=Hupunews;
