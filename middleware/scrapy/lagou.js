/**
 * Created by li_xiaoliang on 2015/5/19.
 */
/*
 *根据关键字查询拉钩上的职位，并列出该公司对该职位的要求
 */
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');


var url = "http://www.lagou.com/jobs/list_";
// 岗位
//var type = encodeURIComponent("web前端");
// 城市
//var city = encodeURIComponent("深圳");
// 分页
var pn = "";
// 工资
var yxs = ["2K以下", "2K-5K", "5K-10K", "10K-15K", "15K-25K", "25K-50K", "50k以上"];
// 工作经验 gj
var gjs = ["不限", "应届毕业生", "1年以下", "1-3年", "3-5年", "5-10年", "10年以上"];

//url = url + type + "?kd=" + type + "&city=" + city + "&yx=" + encodeURIComponent("10K-15K");

// 信息数组
var jobs = [];
// 哨兵变量
var idx = 0;

//等待信号
process.on('message', function (m) {
    if (m.name === 'lagou') {
        var keyword = encodeURIComponent(m.option.keyword || "web前端");
        var city=encodeURIComponent(m.option.city || "深圳")
        var link = url + keyword + "?kd=" + keyword + "&city=" + city;
        Lagou(link);
        //(m.keyword);
    } else if (m.name == 'close' && process.connected) {
        process.disconnect();
    }
});

function Lagou(url) {
    request(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            if (err) throw err;
            var $ = cheerio.load(body, {
                decodeEntities: false
            });
            //检测是否有结果
            if($(".noresult").length==0){
                error("no result");
                return;
            }
            $(".hot_pos>li").each(function (index, element) {
                idx++;
                var $list = $(this);
                // 职位编码
                var jobid = $list.attr("data-jobid");
                // 公司名称
                var company = $list.find(".hot_pos_r .mb10 a").text();
                //岗位名称
                var jobtitle=$list.find(".hot_pos_l .mb10 a").attr("title");
                // 职位详情链接
                var jobdetail = $list.find(".hot_pos_r .apply a").attr("href");
                var bs = [];
                $list.find(".hot_pos_l>span").each(function (idx, elm) {
                    var $sp = $(this);
                    bs.push($sp.text());
                })
                var time = bs.pop();
                $list.find(".hot_pos_r>span").each(function (index, elm) {
                    var $sp = $(this);
                    bs.push($sp.text());
                });
                bs.push(time);
                var job = {
                    id: jobid,
                    company: company,
                    jobtitle:jobtitle,
                    basic: bs
                }
                getDescript(jobdetail, job);
            })
        } else {
            error(err);
        }
    });
}

var isRunable = true;
function getDescript(url, job) {
    if (isRunable) {
        request(url, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                var $ = cheerio.load(body, {
                    decodeEntities: false
                });
                // 职位描述
                //var descript = "";
                var descript = [];
                $(".job_bt>p").each(function (index, element) {
                    //descript += $(this).text() + "\n";
                    descript.push($(this).text());
                });
                job["descript"] = descript;
                //公司主页
                var homepage = $(".c_feature").eq(0).find("a").attr("href");
                job["homepage"] = homepage;
                jobs.push(job);
                if (jobs.length == idx) {
                    success(jobs);
                }
            } else {
                error(err);
            }
        });
    }
}

function error(err) {
    isRunable = false;
    process.send({status: 0, error: err});
}
function success(data) {
    process.send({status: 1, data: data});
}