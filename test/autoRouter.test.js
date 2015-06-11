/**
 * Created by 14062539 on 2015/5/13.
 */

var auto = require("../autoRouter");

describe('test/autoRouter.test.js', function () {
    it("测试自动查找路径",
        function (done) {
            //返回的是一个promise
            auto.register("../routes", function (data) {
                console.log(data);
                done();
            });
        });
})
