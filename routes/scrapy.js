/**
 * Created by li_xiaoliang on 2015/4/19.
 */
var prefixObj=require('../controller/scrapy');
var request = require("request");


exports.mapRoute=function(app,prefix){
    var prefix='/'+prefix;
    //获取虎扑NBA新闻列表
    app.get(prefix+'/hupunbanews',prefixObj.getHupuNBAnews);
    //获取虎扑图片，不能直接在网页读取，因为被屏蔽了
    app.get(prefix+'/img', function (req, res) {
        var url=req.query.url;
        request(url).pipe(res);
    })
// 获取拉钩数据
    app.get(prefix+'/lagou',prefixObj.getLagou);
}