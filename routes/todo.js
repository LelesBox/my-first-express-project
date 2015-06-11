/**
 * Created by li_xiaoliang on 2015/5/3.
 */
//"@"+(Controller="/todos");
"@Path=todo";
var prefixObj = require('../controller/todo');

exports.mapRoute = function (app, prefix) {
    var prefix = '/' + prefix;
    app.get(prefix, prefixObj.todo);
    //获取donetodo
    app.get(prefix+"/done", prefixObj.getdone);
    app.post(prefix + '/addtodo', prefixObj.addtodo);
    app.delete(prefix + '/del/:id', prefixObj.delete);
    app.post(prefix + '/done/:id', prefixObj.done);
}
