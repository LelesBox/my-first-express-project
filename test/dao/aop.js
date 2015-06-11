/**
 * Created by 14062539 on 2015/4/22.
 */
var db=require('./db');
//var dao = require('../../dao');

before(function(){
    db.initDb();
})
beforeEach(function(){
    //console.log('before every test')
})

after(function(){
    db.disconnect();
    console.log("close connections");
})
