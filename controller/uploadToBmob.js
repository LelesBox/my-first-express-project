/**
 * Created by 14062539 on 2015/4/1.
 */
var Q = require('q');
var Bmob = require("bmob").Bmob;
var AppConfig = require("../config");
var _ = require("underscore");
//Bmob.initialize(config.applicationid, config.restapikey);
Bmob.initialize(AppConfig.bmob.applicationid, AppConfig.bmob.restapikey);
var sendbinaryData = function(filename, data) {
    var file = new Bmob.File(filename, data);
    return file.save();
}

var sendText = function(_class, _new) {
    var Class = Bmob.Object.extend(_class);
    var d = Q.defer();
    var query = new Class();
    query.save(_new, {
        success: function(artdata) {
            d.resolve(artdata);
        }
    }, {
        error: function(artdata, err) {
            d.reject(err.description);
        }
    });
    return d.promise;
}

var getDataById = function(_class, _id) {
    var d = Q.defer();
    var Class = Bmob.Object.extend(_class);
    var query = new Bmob.Query(Class);
    query.get(_id, {
        success: function(data) {
            d.resolve(data);
        },
        error: function(object, err) {
            d.reject(err);
        }
    });
    return d.promise;
}


//第一步处理各种条件
var Query = function(_class, _condition) {
    var Class = Bmob.Object.extend(_class);
    var query = new Bmob.Query(Class);
    var temp;
    if (_condition) {
        if (_condition.equalTo) {
            temp = _condition.equalTo;
            //example:query.equalTo("playerName", "bmob");
            query.equalTo(temp[0], temp[1]);
        }
        if (_condition.notEqualTo) {
            temp = _condition.notEqualTo;
            //example:query.notEqualTo("playerName", "bmob cloud");
            query.notEqualTo(temp[0], temp[1]);
        }
        if (_condition.lessThan) {
            temp = _condition.lessThan;
            //example:query.lessThan("score", 50);score < 50
            query.lessThan(temp[0], temp[1]);
        }
        if (_condition.lessThanOrEqualTo) {
            temp = _condition.lessThanOrEqualTo;
            //example:query.lessThanOrEqualTo("score", 50);
            query.lessThanOrEqualTo(temp[0], temp[1]);
        }
        if (_condition.greaterThan) {
            temp = _condition.greaterThan;
            //example:query.greaterThan("score", 50);
            query.greaterThan(temp[0], temp[1]);
        }
        if (_condition.greaterThanOrEqualTo) {
            temp = _condition.greaterThanOrEqualTo;
            //example:query.greaterThanOrEqualTo("score", 50);
            query.greaterThanOrEqualTo(temp[0], temp[1]);
        }
        if (_condition.containedIn) {
            temp = _condition.containedIn;
            //example:query.containedIn("playerName", ["Bmob", "Codenow", "JS"]);
            query.containedIn(temp[0], temp[1]);
        }
        if (_condition.exists) {
            temp = _condition.exists;
            //example:query.exists("score");
            query.exists(temp);
        }
        if (_condition.doesNotExist) {
            temp = _condition.doesNotExist;
            //example:query.doesNotExist("score");
            query.doesNotExist(temp);
        }
        if (_condition.select) {
            temp = _condition.select;
            //example:query.select(["score", "playerName"]);
            query.select(temp);
        }
        if (_condition.startsWith) {
            temp = _condition.startsWith;
            //example:query.startsWith(["playerName", "bm"]);
            query.startsWith(temp[0], temp[1])
        }
        if (_condition.or) {
            query = Bmob.Query.or(query, Query(_class, _condition.or));
        }
        //分页
        if (_condition.skip) {
            query.skip(_condition.skip);
        }
        if (_condition.limit) {
            query.limit(_condition.limit);
        }
    }
    return query;
}

//获取返回数据的总数
var getCount = function(_query) {
    var d = Q.defer();
    _query.count({
        success: function(count) {
            d.resolve(count);
        },
        error: function(err) {
            d.reject(err);
        }
    });
    return d.promise;
}

//获取count需要先执行getCount函数，所以这里只是初步实现获取数据，
// 接下还要对这个方法和getCount方法进行串行
var getRowData = function(_count, _query, _condition) {
    var d = Q.defer();
    if (_condition) {
        if (_condition.length) {
            _query.limit(_condition.length);
        }
        if (_condition.pagenum) {
            _query.skip(_condition.pagenum * _condition.length);
        }
        if (_condition.asc) {
            _query.ascending(_condition.asc);
        }
        if (_condition.desc) {
            _query.descending(_condition.desc);
        }
    }
    _query.find({
        success: function(data) {
            var results = {
                count: _count,
                data: data
            };
            d.resolve(results);
        },
        error: function(err) {
            d.reject(err);
        }
    });
    return d.promise;
}

var getData = function(_class, _condition) {
    /*在这里的返回值需要先返回总数再返回所要的data，返回的data.length和这里的count不是一个概念
     */
    var d = Q.defer();
    var _query = Query(_class, _condition)
    getCount(_query)
        .then(function(_count) {
            return d.resolve(getRowData(_count, _query, _condition));
        }, function(err) {
            d.reject(err);
        })
    return d.promise;
}

//查询单条数据
var getFirst = function(_class, _condition) {
    var query = Query(_class, _condition);
    var d = Q.defer();
    query.first({
        success: function(data) {
            d.resolve(data);
        },
        error: function(err) {
            d.reject(err);
        }
    });
    return d.promise;
}

//修改数据
var alterData = function(_data, _changes) {
    var data = _data
    var d = Q.defer();
    if (_changes) {
        _.mapObject(_changes, function(val, key) {
            data.set(key, val);
        });
        data.save({
            success: function(data) {
                d.resolve(data);
            },
            error: function(err) {
                d.reject(err);
            }
        })
    } else {
        d.reject("请传入change参数")
    }
    return d.promise;
}

var deleteData = function(_data) {
    var d = Q.defer();
    _data.destroy({
        success: function(data) {
            d.resolve(data)
        },
        error: function(err) {
            d.reject(err);
        }
    });
    return d.promise;
}

var deleteDataById = function(id) {
    var d = Q.defer();
    getDataById("Article", id)
        .then(function(data) {
            return deleteData(data);
        })
        .then(function(data) {
            d.resolve({
                state: 0,
                msg: "delete success！"
            })
        })
        .catch(function(err) {
            d.reject(err);
        })
        .done();
    return d.promise;
}

var deleteAll = function(_data) {
    var d = Q.defer();
    Bmob.Object.destroyAll(_data, {
        success: function(data) {
            d.resolve(data);
        },
        error: function(err) {
            d.reject(err);
        }
    });
    return d.promise;
}

var queryDelete = function(_query) {
    var d = Q.defer();
    _query.destroyAll({
        success: function(data) {
            d.resolve(data)
        },
        error: function(err) {
            d.reject(err);
        }
    });
    return d.promise;
}

module.exports = {
    sendbinaryData: sendbinaryData,
    sendText: sendText,
    getDataById: getDataById,
    getFirst: getFirst,
    getData: getData,
    alterData: alterData,
    deleteData: deleteData,
    deleteAll: deleteAll,
    queryDelete: queryDelete,
    deleteDataById: deleteDataById
}