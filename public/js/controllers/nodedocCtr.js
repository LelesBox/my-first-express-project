/**
 * Created by 14062539 on 2015/5/28.
 */
define(["lodash"], function (_) {
    return ["$scope", "$location", "$http", "uploadLocalService", "utilitiesService", "haspermission",
        function ($scope, $location, $http, uploadLocalService, utilitiesService, permission) {
            //鉴权
            getdoc();
            $scope.nodedocs = utilitiesService.cache["nodedoc"] || [];
            function getdoc() {
                $http({
                    url: "/nodedoc/all",
                    method: "get"
                }).success(function (data) {
                    if (data.state == 1) {
                        var rst = data.data.data.data;
                        for (var i = 0; i < data.data.data.count; i++) {
                            rst[i] = _.extend(rst[i], {color: ramdonRGB({b: 100})});
                        }
                        $scope.nodedocs = rst;
                        utilitiesService.cache["nodedoc"] = $scope.nodedocs;
                    } else {
                        alert(data.msg);
                    }
                }).error(function (err) {
                    alert(err);
                })
            }

            $scope.opendoc = getDocById;
            //根据id查看详细内容
            function getDocById(id) {
                $location.url("nodedoc/" + id);
            }

            function randomColor() {
                return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
            }

            function ramdonRGB(obj) {
                if (!obj.r) {
                    obj.r = Math.round(Math.random() * 255);
                }
                if (!obj.g) {
                    obj.g = Math.round(Math.random() * 255);
                }
                if (!obj.b) {
                    obj.b = Math.round(Math.random() * 255);
                }
                var rgb = 'rgb(' + obj.r + ',' + obj.g + ',' + obj.b + ')';
                return rgb
            }

            $scope.uploadLocal = function (files) {
                var filename = $scope.filename != "undefined" ? $scope.filename : null;
                uploadLocalService.uploadFile(files, '/nodedoc/add', filename)
                    .then(function (data) {
                        getdoc();
                    }, function (err) {
                        console.log(err);
                    }, function (notify) {
                        console.log('progress: ' + notify + '% ');
                    })
            }
        }]
})