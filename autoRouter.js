/**
 * Created by 14062539 on 2015/5/13.
 */
var fs = require('fs');

//当前文件夹
var curDir;

//获取路径下的path名，没有则默认使用文件名作为path
/***
 * 获取控制器名称，该控制器作为路由的路径
 * @param 路由所在文件夹，如route，请传入相对路径
 */
var getPath = function (dir) {
    curDir = dir;
    var result = fs.readdirSync(dir);
    var ctr = [];
    var length = result.length;
    if (length == 0) {
        return null;
    }
    result.forEach(function (item, index, arr) {
        var obj = {
            filename: item.substring(0, item.length - 3)
        }
        var data = fs.readFileSync(dir + "/" + item, 'utf8');

        var regx = /"@Path=(\w+)"/gi;

        var res = regx.exec(data);

        if (res != null) {
            obj["path"] = res[1];
            ctr.push(obj);
        } else {
            obj["path"] = obj.filename;
            ctr.push(obj);
        }
    });
    return ctr;
}

/***
 * 自动注册路径
 * @param app express app
 * @param 控制器名称数组
 */
var mapRouter = function (app, routearry, dir) {
    var idr;
    if (typeof callback == 'undefined') {
        idr = curDir;
    } else {
        idr = dir
    }
    if (curDir == "undefined" && dir == 'undefined') {
        throw new Error("you should run getPath First");
    }
    var dir = idr + "/";
    routearry.forEach(function (path) {
        var route = require(dir + path.filename);
        //if (path.filename == "users") {
        //    debugger;
        //}
        if (route.mapRoute) {
            route.mapRoute(app, path.path);
        }
    });
}

/***
 * 注册路由
 * @param app express
 * @param dir 路由文件所在路径
 * @constructor
 */
var Route = function (app, dir) {
    var data = getPath(dir);
    mapRouter(app, data);
    console.log("路由注册成功");
}

module.exports = {
    Route: Route
}