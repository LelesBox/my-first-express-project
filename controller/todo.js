/**
 * Created by li_xiaoliang on 2015/5/3.
 */
var dao = require("../dao").TodoDao;

function Msg(status, msg, data) {
    this.status = status || 0;
    this.msg = msg || "";
    this.data = data || "";
}

exports.addtodo = function (req, res) {
    if (!req.body) {
        return
    }
    var year = req.body.year;
    var month = req.body.month;
    var day = req.body.day;
    var hour = req.body.hour || 0;
    var minute = req.body.minute || 0;
    var second = req.body.second || 0;
    var text = req.body.text;
    var todo = {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        text: text
    };
    dao.SaveTodo(todo, function (err, data) {
        if (err) {
            var msg = new Msg(0, err);
            return res.send(msg);
        }
        var date = data.year + autoFillZero(data.month) + autoFillZero(data.day);
        var time = todoTime(data);
        return res.send(new Msg(1, "", {
            date: date,
            time: time,
            id: data.id,
            year: data.year,
            month: data.month,
            day: data.day,
            hour: data.hour,
            minute: data.minute,
            second: data.second,
            text: data.text
        }));
    });
}

//后期可以添加权限控制
exports.delete = function (req, res) {
    var id = req.params.id || null;
    if (id) {
        dao.DeleteTodoById(id, function (err, data) {
            if (err) {
                return res.send(new Msg(0, err));
            }
            return res.send(new Msg(1, "删除成功", data));
        })
    } else {
        res.send(new Msg(0, "请传入id"));
    }
}

//完成
exports.done = function (req, res) {
    var id = req.params.id;
    if (id) {
        dao.DoneTodo(id, function (err, data) {
            if (err) {
                return res.send(new Msg(0, err));
            }
            return res.send(new Msg(1, "更新成功", data));
        })
    }
}

//加上分页功能 
exports.getdone = function (req, res) {
    var skip = req.query.skip || 0;
    var limit = req.query.limit || 10;
    dao.Getdone(skip, limit, function (err, data) {
        if (err) {
            return res.send(new Msg(0, err));
        }
        var output = [];
        data.forEach(function (item, index, arr) {
            var starttime = item.year + "-" + autoFillZero(item.month) + "-" + autoFillZero(item.day) + " " + autoFillZero(item.hour) + ":" + autoFillZero(item.minute) + ":" + autoFillZero(item.second);
            var donetime = item.donetime;
            var text = item.text;
            var tmp = {
                starttime: starttime,
                donetime: donetime,
                text: text
            }
            output.push(tmp);
        });
        return res.send(new Msg(1, "success", output));
    });
};

exports.todo = function (req, res) {
    dao.GetAllTodo(function (err, data) {
        if (err) {
            var msg = new Msg(0, err);
            return res.send(msg);
        }
        //对data进行处理
        //存放日期的数组，不允许重复
        var dateValue = [];
        //存放已完成的数据
        var doneData = [];
        //存入datekey的内容,按照相同日期放在一个对象内
        for (var i = 0; i < data.length; i++) {
            var dt = data[i];
            if (dt.isdone) {
                var dtime = dt.donetime.split(" ");
                var date = dtime[0];
                var time = dtime[1];
                var _done = {
                    date: date,
                    time: time,
                    text: dt.text
                }
                doneData.unshift(_done);
                continue;
            }
            var date = dt.year + autoFillZero(dt.month) + autoFillZero(dt.day);
            var detail = {
                id: dt._id,
                time: todoTime(dt),
                hour: dt.hour,
                minute: dt.minute,
                second: dt.second,
                text: dt.text
            };
            //检查数组是否存在某值，如果不存在则加入datekey数组
            var index = key_in_array(dateValue, date, "date");
            if (index === false) {
                insert_orderby_key(dateValue, { date: date, year: dt.year, month: dt.month, day: dt.day, times: [detail] }, "date");
                continue;
            }
            insert_orderby_key(dateValue[index].times, detail, "time");
        }
        //为返回值添加order字段，前端需要= =
        var order = 0
        dateValue.forEach(function (item, index, arr) {
            for (var i = 0; i < item.times.length; i++) {
                dateValue[index].times[i]["order"] = order;
                order++;
            }
        });
        var ret = { order: order, data: dateValue, donedata: doneData };
        var msg = new Msg(1, null, ret);
        res.send(msg);
    })
}
//别问为什么不直接存储string类型省事，我只是想多多想想其他方法学习基本语法
function autoFillZero(str) {
    if (typeof str === "string" && str.length === 1) {
        return "0" + str;
    } else if (typeof str === "number" && str < 10 && str >= 0) {
        return "0" + str;
    }
    return str + "";
}
function todoTime(dt) {
    return autoFillZero(dt.hour) + autoFillZero(dt.minute) + autoFillZero(dt.second)
}
//    判断数组某值是否存在，存在则返回存在的index，否则返回false
function key_in_array(array, ext, key) {
    if (array.length === 0) {
        return false;
    }
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === ext) {
            return i;
        }
    }
    return false;
}
//    在数组中插入一个值，并根据key值大小确定摆放位置如 2,3,5,8的数组中，插入4的话，应该是2,3,4,5,8
function insert_orderby_key(array, data, key) {
    if (array.length === 0) {
        return array.push(data);
    }
    for (var i = 0; i < array.length; i++) {
        if (data[key] > array[i][key]) {
            if (i + 1 === array.length || data[key] <= array[i + 1][key]) {
                return array.splice(i + 1, 0, data);
            }
        }
    }
    return array.unshift(data);
}