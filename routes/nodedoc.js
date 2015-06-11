/**
 * Created by li_xiaoliang on 2015/5/28.
 */
var prefixObj = require('../controller/nodedoc');
var request = require("request");

exports.mapRoute = function (app, prefix) {
    var prefix = '/' + prefix;
    //获取虎扑NBA新闻列表
    app.post(prefix + '/add', prefixObj.senddoc);
    app.get(prefix + '/all', prefixObj.getalldoc);
    app.get(prefix + '/:id', prefixObj.getdoc);
}
