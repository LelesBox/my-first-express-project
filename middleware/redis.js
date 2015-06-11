/**
 * Created by li_xiaoliang on 2015/4/14.
 */
var redis = require('redis');
/*数据库连接信息host,port,user,pwd,dbname(可查询数据库详情页)*/
var username = 'f8e8e5051d9d49b7b1aec72b580a31b1';          // 用户名（API KEY）
var password = '7e1c77ffe7344b928bdd1f491e622175';  // 密码（Secret KEY）
var db_host = 'redis.duapp.com';
var db_port = 80;
var db_name = 'NvPkNBhXiPdUFMNuUkoK';               // 数据库名
console.log(db_host);
console.log(db_port);
var options = {"no_ready_check": true};

function testRedis(req, res) {
    var client = redis.createClient(db_port, db_host, options);
    client.on("error", function (err) {
        console.log("Error " + err);
    });

    // 建立连接后，在进行集合操作前，需要先进行auth验证

    client.auth(username + '-' + password + '-' + db_name);

    client.set('baidu', 'welcome to BAE');

    client.get('baidu', function (err, result) {
        if (err) {
            console.log(err);
            res.end('get error');
            return;
        }
        res.end('result: ' + result);
    });

}

module.exports = testRedis;
