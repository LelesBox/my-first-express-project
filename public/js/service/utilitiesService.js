/**
 * Created by li_xiaoliang on 2015/4/5.
 */
define(['jquery'], function($) {
    var utilities = function() {}
    utilities.host = "http://localhost:3000";
    //Objectvalue.send = 1;
    //进入文章正文左侧栏的开合状态，默认打开
    //Objectvalue.articleOpenState = 'open';
    utilities.articleClose = function() {
            $('#middle').css({
                width: "0"
            }).hide();
            $('.right').css({
                left: "3%"
            });
            $('.right').css({
                width: "97%"
            });
        }
        //加载CSS样式,路径应该是浏览器的绝对路径
    var cssurl = [];
    utilities.loadCss = function(href) {
        var hasCss = false;
        for (var i = 0; i < cssurl.length; i++) {
            if (href === cssurl[i]) {
                hasCss = true;
                break;
            }
        }
        //下面这种方法竟然IE9+才支持，我也是~~~~~~~~~~~~~~~~~~~
        //cssurl.every(function(item,index,array){
        //   if(item===href){
        //       hasCss = true;
        //       return;
        //   }
        //});
        if (!hasCss) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = href;
            head.appendChild(link);
            cssurl.push(href);
        }
    }

    //计算时间差
    utilities.timeDiff = function(date) {
        // 计算出毫秒和现在的毫秒
        var now = new Date();
        var sub = date - now;
        //如果date比now小，说明已经到期了
        if (sub < 0)
            return false;
        // 否则
        // 开始计算天差值
        var day = sub / (1000 * 60 * 60 * 24);
        var day = Math.floor(day);
        //获取小时的差值
        var hour = (sub - (day * 1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
        var hour = Math.floor(hour);
        //获取分的差值
        var min = (sub - (day * 1000 * 60 * 60 * 24) - (hour * 1000 * 60 * 60)) / (1000 * 60);
        var min = Math.floor(min);
        //获取秒的差值
        var sec = (sub - (day * 1000 * 60 * 60 * 24) - (hour * 1000 * 60 * 60) - (min * 1000 * 60)) / (1000);
        var sec = Math.floor(sec);
        return {
            day: day,
            hour: hour,
            minute: min,
            second: sec
        };
    }

    //setInterval的id值;提供给外部暂停定时函数用
    var intervals = [];
    utilities.stopCountdown = function() {
            if (intervals.length) {
                for (var i = 0; i < intervals.length; i++) {
                    clearInterval(intervals[i]);
                }
            }
            intervals = [];
        }
        //倒计时
    utilities.countdown = function(date, callback) {
        var now = new Date();
        var sub = date - now;
        if (sub < 0) {
            return
        }

        var interval = setInterval(function() {
            var day = sub / (1000 * 60 * 60 * 24);
            var day = Math.floor(day);
            //获取小时的差值
            var hour = (sub - (day * 1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
            var hour = Math.floor(hour);
            //获取分的差值
            var min = (sub - (day * 1000 * 60 * 60 * 24) - (hour * 1000 * 60 * 60)) / (1000 * 60);
            var min = Math.floor(min);
            //获取秒的差值
            var sec = (sub - (day * 1000 * 60 * 60 * 24) - (hour * 1000 * 60 * 60) - (min * 1000 * 60)) / (1000);
            var sec = Math.floor(sec);
            if (day || hour || min || sec) {
                sub = sub - 1000;
                callback({
                    day: day,
                    hour: hour,
                    minute: min,
                    second: sec
                }, interval);
            } else {
                callback({
                    day: day,
                    hour: hour,
                    minute: min,
                    second: sec
                });
                return;
            }
        }, 1000);
        intervals.push(interval);
    }

    //时间格式化
    utilities.datefomat = function(date, partten) {
        var parttens = {
            fullDate: "yyyy-MM-dd hh:mm:ss",
            Date: "yyyy-MM-dd",
            Time: "hh:mm:ss"
        }

        var cfg = {
            yyyy: date.getFullYear() //年 : 4位
                ,
            yy: date.getFullYear().toString().substring(2) //年 : 2位
                ,
            M: date.getMonth() + 1 //月 : 如果1位的时候不补0
                ,
            MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
                ,
            d: date.getDate() //日 : 如果1位的时候不补0
                ,
            dd: paddNum(date.getDate()) //日 : 如果1位的时候补0
                ,
            hh: date.getHours() //时
                ,
            mm: date.getMinutes() //分
                ,
            ss: date.getSeconds() //秒
        }

        function paddNum(str) {
            return str.length = 2 ? str : "0" + str;
        }

        if (partten == parttens.fullDate) {
            return cfg.yyyy + "-" + cfg.MM + "-" + cfg.dd + " " + cfg.hh + ":" + cfg.mm + ":" + cfg.ss;
        }
    }

    //缓存
    utilities.cache = {};

    // 遍历
    utilities.each = function(arr, callback) {
            for (var i = 0; i < arr.length; i++) {
                callback(arr[i], i, arr);
            }
        }
        // 合并数组
    utilities.concat = function(target, arr) {
        var length = arr.length;
        for (var i = 0; i < length; i++) {
            target.push(arr[i]);
        }
        return target;
    }
    return utilities
})