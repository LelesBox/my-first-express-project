/**
 * Created by li_xiaoliang on 2015/4/18.
 */
//创建子进程去运行爬虫系统
var cp = require('child_process');
var Q = require('q');

//process.disconnect()

function param(name, option) {
    this.name = name;
    this.option = option;
}
function HupuNews() {
    this.child = cp.fork(__dirname + '/scrapy/hupuscrapy.js');
}

function Lagou() {
    this.child = cp.fork(__dirname + '/scrapy/lagou.js');
}

HupuNews.prototype.hupuNBAnews = function () {
    var d = Q.defer();
    this.child.send(new param("hupuNews"));
    this.child.on('message', function (message) {
        if (!message && message.newlist) {
            d.reject("no data!")
        } else {
            d.resolve(message.newlist);
        }
    });
    return d.promise;
}

HupuNews.prototype.hupuNBAcontent = function (url) {
    var d = Q.defer();
    this.child.send(new param("article", {url: url}));
    this.child.on('message', function (message) {
        if (!message && message.article) {
            d.reject("no data!")
        } else {
            d.resolve(message.article);
        }
    });
    return d.promise;
}

Lagou.prototype.getData = function (keyword, city) {
    var d = Q.defer();
    this.child.send(new param("lagou", {keyword: keyword, city: city}));
    this.child.on('message', function (message) {
        if (!message) {
            d.reject("no data!")
        } else if (message.status == 0) {
            d.reject(message.err);
        } else if (message.status == 1) {
            d.resolve(message.data);
        }
    });
    return d.promise;
}

Lagou.prototype.disconnect = HupuNews.prototype.disconnect = function () {
    this.child.send(new param("close"));
}


module.exports = {
    hupu: new HupuNews(),
    HupuNews: HupuNews,
    lagou: new Lagou(),
    Lagou: Lagou
}