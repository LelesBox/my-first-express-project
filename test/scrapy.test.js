/**
 * Created by li_xiaoliang on 2015/4/19.
 */
var scrapy = require('../middleware/scrapy');
var should = require('should');

describe('test/scrapy.test.js', function () {
    this.timeout(50000);
    /* it("测试虎扑NBA新闻，输出的格式应该包含 title，url，image,content，time，source，readnum，commentnum",
     function (done) {
     setTimeout(done, 10000);
     //返回的是一个promise
     var hupu = new scrapy.HupuNews();
     hupu.hupuNBAnews().then(function (data) {
     data.should.have.properties('title', 'url', 'image', 'content', 'time', 'source', 'readnum', 'commentnum');
     data.length.should.equal(60);
     hupu.disconnect();
     }, function (err) {
     err.should.equal('no data!');
     hupu.disconnect();
     });
     });*/

    it("测试爬去拉钩数据",
        function (done) {
            scrapy.lagou.getData().then(function (data) {
                console.log(data);
                done();
            }, function (err) {
                console.log(err);
                done();
            });
        });
})