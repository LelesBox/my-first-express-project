/**
 * Created by li_xiaoliang on 2015/5/2.
 */
var should = require('should');
var dao = require("../../dao").TodoDao;

describe('test/dao/todo.js', function () {
    //it("测试存储todo内容", function (done) {
    //    var todo = {
    //        year: 2015,
    //        month: 5,
    //        day: 3,
    //        hour: 23,
    //        minute: 12,
    //        text: "这又是一个测试文本哦"
    //    };
    //    dao.SaveTodo(todo, function (err, data) {
    //        if (err)throw err;
    //        console.log("保存成功");
    //        done();
    //    })
    //});
    it("测试获取donetodo的分页方法", function (done) {
        dao.Getdone("1", "2", function (err, data) {
            if (err) {
                throw err;
            }
            // console.log(data);
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
            console.log(output);
            done();
        })
    })
    
    // it("测试删除方法", function (done) {
    //     dao.DeleteTodoById("55463db632af9c002d2c7983", function (err, data) {
    //         done();
    //     })
    // })

    // it("测试获取todo内容", function (done) {
    //     dao.GetAllTodo(function (err, data) {
    //         if (err) throw err;
    //         //console.log(data);
    //         //对data进行处理
    //         //存放日期的数组，不允许重复
    //         var datekey = [];
    //         //存入datekey的内容,按照相同日期放在一个对象内
    //         for (var i = 0; i < data.length; i++) {
    //             var dt = data[i];
    //             var date = dt.year + autoFillZero(dt.month) + autoFillZero(dt.day);
    //             var detail = {
    //                 time: todoTime(dt),
    //                 hour: dt.hour,
    //                 minute: dt.minute,
    //                 second: dt.second,
    //                 text: dt.text
    //             };
    //             //检查数组是否存在某值，如果不存在则加入datekey数组
    //             var index = key_in_array(datekey, date, "date");
    //             if (index === false) {
    //                 insert_orderby_key(datekey, { date: date, times: [detail] }, "date");
    //                 continue;
    //             }
    //             insert_orderby_key(datekey[index].times, detail, "time");
    //         }
    //         datekey.forEach(function (item, index, arr) {
    //             for (var i = 0; i < item.times.length; i++) {
    //                 datekey[index].times[i]["order"] = index;
    //             }
    //         });
    //         console.log(datekey[1]);
    //         done();
    //     })
    // });

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
})