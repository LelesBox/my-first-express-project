/**
 * Created by li_xiaoliang on 2015/6/10.
 */
"@Path=feed";
var prefixObj = require('../controller/timeline');

exports.mapRoute = function (app, prefix) {
    prefix = '/' + prefix;
    app.get(prefix, prefixObj.index);   
    app.post(prefix + '/add', prefixObj.add);
}
