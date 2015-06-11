/**
 * Created by li_xiaoliang on 2015/4/19.
 */
var scrapy = require("../middleware/scrapy");

exports.getHupuNBAnews = function (req, res) {
    scrapy.hupu.hupuNBAnews().then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    })
}


exports.getLagou = function (req, res) {
    if (req.query && req.query.keyword) {
        var keyword = req.query.keyword;
        var city = req.query.city;
        var lagou = new scrapy.Lagou();
        lagou.getData(keyword, city).then(function (data) {
            res.send({status: 1, data: data});
        }, function (err) {
            res.send({status: 0, msg: err});
        }).finally(function () {
            lagou.disconnect();
        })
    } else {
        res.send({status: 0, msg: "请传入keyword参数"});
    }
}