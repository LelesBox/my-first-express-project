/**
 * Created by li_xiaoliang on 2015/5/1.
 */
define([], function() {
    return ["utilitiesService", "$http", "$timeout", function(utilitiesService, $http, $timeout) {
        return {
            restrict: "AEC",
            replace: true,
            transclude: true,
            templateUrl: "js/directives/todo/todo.html",
            link: function(scope, element, attrs) {
                //检查缓存
                if (utilitiesService.cache["todo"]) {
                    scope.tododata = utilitiesService.cache["todo"].data.data;
                    scope.donedata = utilitiesService.cache["todo"].done;
                    scope.order = utilitiesService.cache["todo"].data.order;
                }
                //数据存放顺序，其实跟顺序无关，只是用于保存每个卡片的id
                scope.order = 0;
                // 加载css
                utilitiesService.loadCss("js/directives/todo/todo.css");
                // 获取todo数据
                $http({
                    method: "get",
                    url: "/todo"
                }).success(function(data) {
                    if (data.status === 1) {
                        scope.tododata = data.data.data;
                        scope.order = data.data.order;
                        //    缓存
                        utilitiesService.cache["todo"] = data;
                    }
                }).error(function(err) {
                    alert(err);
                });

                // 已完成todo分页，偏移量,"点击加载更多是否显示，默认不显示"
                var doneOffset = 0,ismore=false;
                // 进入页面时获取donetodo数据
                getDoneData(function(err, data) {
                    if (!err) {
                        scope.donedata = data;
                        if (data.length == 10) {
                            scope.ismore = true;
                            doneOffset = 10;
                        }
                        //缓存
                        utilitiesService.cache["todo"].done = data;
                    }
                })

                // 点击加载更多donetodo
                scope.loadmore = function() {
                    getDoneData(doneOffset, function(err, data) {
                        utilitiesService.concat(scope.donedata, data);
                        if (data.length < 10) {
                            scope.ismore = false;
                        } else {
                            doneOffset += 10;
                        }
                    })
                }

                // 获取已完成todo的方法
                function getDoneData(skip, limit, callback) {
                    var url = "/todo/done";
                    if (toString.call(skip) === '[object Function]' || typeof skip === 'function') {
                        callback = skip;
                    } else if (toString.call(limit) === '[object Function]' || typeof limit === 'function') {
                        callback = limit;
                        url = url + "?skip=" + skip;
                    } else {
                        url = url + "?skip=" + skip + "&limit=" + limit;
                    }
                    $http({
                        method: "get",
                        url: url
                    }).success(function(data) {
                        if (data.status === 1) {
                            utilitiesService.each(data.data, function(item, index) {
                                var starttime = item.starttime.split(" ");
                                item.date = starttime[0];
                                item.time = starttime[1];
                            })
                            callback(null, data.data);
                        }
                    }).error(function(err) {
                        callback(err);
                    });
                }

                //为每个卡片记录当前的倒计时状态是否为还剩1小时，红色，12小时内黄色，12小时外绿色,防止重复设置背景
                var colorState = [];
                //等待ng-repeat加载完后渲染，等待网络下载完才能开始倒计时
                var firstIn = true;
                scope.$on("ngRepeatFinished", function(evt) {
                    //为了防止动态添加时会触发它所以这个只在页面首次进入是才生效
                    if (evt.targetScope.tododt && firstIn) {
                        //注册todo卡片的点击事件，包括取消，完成和延迟
                        //开始倒计时
                        utilitiesService.stopCountdown();
                        startCountdown();
                        firstIn = false;
                    }
                });

                //关闭界面后事件，指令内置事件
                scope.$on('$destroy', function() {
                    utilitiesService.stopCountdown();
                });

                scope.countdown = [];

                function startCountdown() {
                    //创建二维数组保存倒计时
                    colorState = [];
                    //清除定时器
                    var colorStateIndex = 0;
                    //取出时间值
                    for (var i = 0; i < scope.tododata.length; i++) {
                        var daydata = scope.tododata[i];
                        //循环获取当天的时间，同样是立即执行
                        for (var j = 0; j < daydata.times.length; j++) {
                            (function(j) {
                                var datetime = daydata.times[j];
                                var order = datetime.order;
                                //获取完整日期,这里有个坑，月份是从0到11,，所以在初始化的时候月份要减一
                                var date = new Date(daydata.year, daydata.month - 1, daydata.day, datetime.hour, datetime.minute, datetime.second);
                                //初始化样式
                                if (utilitiesService.timeDiff(date)) {
                                    var diff = utilitiesService.timeDiff(date);
                                    //SettodoColor(diff, order);
                                }
                                utilitiesService.countdown(date, function(date) {
                                    SettodoColor(date, order);
                                })
                            })(j);
                        }
                    }
                }

                //通过计算时间差初始化当前todo颜色
                function SettodoColor(date, order) {
                    var countdonw = date.day + ":" + date.hour + ":" + date.minute + ":" + date.second;
                    $timeout(function() {
                            scope.countdown[order] = countdonw;
                        })
                        //判断时间差，如果相差一个小时，则颜色背景变红，1-12小时为黄，
                        //其他时间为绿
                        //红色,天数和时间都小于1
                    if (date.day < 1 && date.hour < 1 && colorState[order] !== 0) {
                        var thiscard = $(".todo-card[id=" + order + "]");
                        //线条变红
                        $(thiscard).css({
                            "border-top": "2px red solid"
                        });
                        //文本背景变红
                        $(thiscard).find(".todo-text").css({
                            "background-color": "red",
                            "color": "white"
                        });
                        //倒计时背景变红
                        $(thiscard).find(".countdown").css({
                            "color": "red"
                        });
                        colorState[order] = 0;
                    }
                    //黄色
                    else if (date.day < 1 && date.hour >= 1 && colorState[order] !== 1) {
                        var thiscard = $(".todo-card[id=" + order + "]");
                        //线条变黄
                        $(thiscard).css({
                            "border-top": "2px #FFA500 solid"
                        });
                        //文本背景变黄
                        $(thiscard).find(".todo-text").css({
                            "background-color": "#FFA500",
                            "color": "#fff"
                        });
                        //倒计时背景变黄
                        $(thiscard).find(".countdown").css({
                            "color": "#FFA500"
                        });
                        colorState[order] = 1;
                    }
                    //时间大于1天
                    else if (date.day >= 1 && colorState[order] !== 2) {
                        var thiscard = $(".todo-card[id=" + order + "]");
                        //线条变绿
                        $(thiscard).css({
                            "border-top": "2px #30ff72 solid"
                        });
                        //文本背景变绿
                        $(thiscard).find(".todo-text").css({
                            "background-color": "#30ff72",
                            "color": "white"
                        });
                        //倒计时背景变绿
                        $(thiscard).find(".countdown").css({
                            "color": "#30ff72"
                        });
                        colorState[order] = 2;
                    }
                }

                //新增todo成功后刷新
                scope.$on("refresh", function(evt, data) {
                    firstIn = false;
                    var order = scope.order;
                    scope.order++;
                    insert_array_by_key(scope.tododata, data, "date", order);
                    //又被月份坑了，格式化月份时从0开始
                    var date = new Date(data.year, data.month - 1, data.day, data.hour, data.minute, data.second);
                    utilitiesService.countdown(date, function(date) {
                        SettodoColor(date, order);
                    });
                });

                function insert_array_by_key(array, data, key, order) {
                    var length = array.length;
                    if (!(array instanceof Array)) {
                        throw "array should be Array"
                    }
                    if (length === 0) {
                        array.push(datedetail(data, order));
                    } else if (array[0][key] === data[key]) {
                        insert_array_times(array[0].times, timedetail(data, order), "time");
                    } else if (array[length - 1][key] === data[key]) {
                        insert_array_times(array[length - 1].times, timedetail(data, order), "time");
                    } else if (array[0][key] > data[key]) {
                        array.splice(0, 0, datedetail(data, order));
                    } else if (array[length - 1][key] < data[key]) {
                        array.push(datedetail(data, order));
                    } else {
                        for (var i = 0; i < length; i++) {
                            if (array[i][key] < data[key] && array[i + 1][key] > data[key]) {
                                array.splice(i + 1, 0, datedetail(data, order));
                                break;
                            } else if (array[i][key] === data[key]) {
                                insert_array_times(array[i].times, timedetail(data, order), "time");
                                break;
                            }
                        }
                    }
                }

                function insert_array_times(array, data, key) {
                    var length = array.length;
                    if (!(array instanceof Array)) {
                        throw "array should be Array"
                    }
                    if (array[0][key] >= data[key]) {
                        return array.splice(0, 0, data);
                    } else if (array[length - 1][key] <= data[key]) {
                        return array.push(data);
                    }
                    for (var i = 0; i < length; i++) {
                        if (array[i][key] < data[key] && array[i + 1][key] >= data[key]) {
                            return array.splice(i + 1, 0, data);
                        }
                    }
                }

                function timedetail(data, index) {
                    return {
                        "id": data.id,
                        "time": data.time,
                        "hour": data.hour,
                        "minute": data.minute,
                        "second": data.second,
                        "text": data.text,
                        "order": index
                    }
                }

                function datedetail(data, index) {
                    return {
                        "date": data.date,
                        "year": data.year,
                        "month": data.month,
                        "day": data.day,
                        times: [{
                            "id": data.id,
                            "time": data.time,
                            "hour": data.hour,
                            "minute": data.minute,
                            "second": data.second,
                            "text": data.text,
                            "order": index
                        }]
                    }
                }

                scope.$on("deleteCard", function(evt, order) {
                    deleteCard(scope.tododata, order);
                });

                scope.$on("donetodo", function(evt, order, text) {
                    deleteCard(scope.tododata, order);
                    //var datetime =new Date().format("yyyy-MM-dd hh:mm:ss");//.split(" ");
                    var datetime = utilitiesService.datefomat(new Date(), "yyyy-MM-dd hh:mm:ss").split(" ");
                    var newDone = {
                        date: datetime[0],
                        time: datetime[1],
                        text: text
                    }
                    console.log(newDone);
                    scope.donedata.splice(0, 0, newDone);
                    // 因为在donetodo列表头添加了一行数据，所在在分页获取时偏移量应该加1
                    doneOffset++;
                    //    scope.donedata.unshift(newDone);
                })

                function deleteCard(array, order) {
                    //    有两种情况，删除的那个卡片只有那天才有
                    //    二是删除卡片对应的那天存在其他卡片
                    //    找到order所在位置
                    for (var i = 0; i < array.length; i++) {
                        var times = array[i].times;
                        var length = times.length;
                        //如果当天数组只有一个值
                        if (length === 1) {
                            //且该值的order等于order，则情况1，删除之
                            if (times[0].order == order) {
                                array.splice(i, 1);
                                return;
                            }
                        } else {
                            for (var j = 0; j < times.length; j++) {
                                if (times[j].order == order) {
                                    array[i].times.splice(j, 1);
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        }
    }]
})