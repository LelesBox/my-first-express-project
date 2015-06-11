/**
 * Created by 14062539 on 2015/3/31.
 */

define(['bmob'], function () {
    return ["$http", "$q", function ($http, $q) {
        Bmob.initialize("", "");
        var sendimg = function (filename, data) {
            var d = $q.defer();
            var file = new Bmob.File(filename, data);
            return file.save();
        }
        var sendtxt = function (filename, data) {
            var file = new Bmob.File(filename, data);
            return file.save();
        }
        return {
            sendimg: sendimg,
            sendtxt: sendtxt
        }
    }]
})