/**
 * Created by li_xiaoliang on 2015/4/14.
 */
define([], function () {
    return ["$http", "$q", function ($http,$q) {
        var haspermision = function () {
            var d = $q.defer();
            $http({
                    method: "post",
                    url: "/haslogin"
                }
            ).success(function (pers) {
                    d.resolve(pers);
                }).error(function (err) {
                    d.reject(err)
                })
            return d.promise;
        };
        return {
            haspermision: haspermision
        }
    }]
})