/**
 * Created by 14062539 on 2015/5/4.
 */
function thunkify(fn) {
    return function () {
        var args = new Array(arguments.length);
        var ctx = this;

        for (var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }
        return function (done) {
            var called;

            args.push(function () {
                if (called) return;
                called = true;
                done.apply(null, arguments);
                console.log(arguments);
            });

            try {
                fn.apply(ctx, args);
            } catch (err) {
                done(err);
            }
        }
    }
};

function f(a, b, callback) {
    var sum = a + b;
    callback(sum);
    callback(sum + 1);
}

f(1, 2, function (num) {
    console.log(num);
})

function test(num) {
    console.log(num * 2);
}

var ft = thunkify(f);
ft(1, 2)(console.log);
ft(2, 3)(test);

/*****************************Generator使用Thunk*****************************/
//var fs = require('fs');
//var co = require('co');
////var thunkify = require('thunkify');
//var readFile = thunkify(fs.readFile);
