/**
 * Created by 14062539 on 2015/4/2.
 */

var fs=require('fs');

//请添加报错信息
exports.mapRoute= function (app, routearry) {
    routearry.forEach(function(path){
        if(path.path&&path.maproute) {
            var route = require(path.maproute);
            if(route!=null)
            route.mapRoute(app,path.path);
        }
        else{
            var route=require('./'+path);
            if(route!=null)
            route.mapRoute(app,path);
        }
    })
}

//根据routers路径下的文件自动归档，规定文件名就是路径名称
exports.mapRouteAuto= function (app, routearry) {
    routearry.forEach(function(path){
        if(path.path&&path.maproute) {
            var route = require(path.maproute);
            if(route!=null)
                route.mapRoute(app,path.path);
        }
        else{
            var route=require('./'+path);
            if(route!=null)
                route.mapRoute(app,path);
        }
    })
}
