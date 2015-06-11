/**
 * Created by 14062539 on 2015/4/2.
 */
var fs=require('fs');
var request=require('request');
function Msg(status,msg){
    this.status=status||2;
    this.msg=msg||"asd";
}
exports.mapRoute = function (app, prefix) {
    var prefix = '/' + prefix;
    //var prefixObj=require('../controller/writepage');
    //app.get(prefix,prefixObj.index);
    //app.post(prefix+'/uploadbmob',prefixObj.uploadbinaryData);
    app.get(prefix, function (req, res) {
        var msg=new Msg(1,"测试");
        //res.send('this is ' + prefix + ' route');
         return res.send(new Msg());
    });

    app.get(prefix+"/hupu",function(req,res){
        var json=require('../hupu');
        res.send(json);
    })

    app.get(prefix+"/coding",function(req,res){
        //request("http://leeblog.coding.io/scrapy/hupunbanews",function(err,response,body){
        //    if(err)throw err
        //    res.send(response);
       //})
        request
            .get("http://leeblog.coding.io/scrapy/hupunbanews")
            .on("error", function (err) {
                res.send(err);
            })
            .pipe(res);
    });

    app.delete(prefix+"/del",function(req,res){
        res.send("test delete");
    })
}
