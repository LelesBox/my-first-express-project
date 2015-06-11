/**
 * Created by li_xiaoliang on 2015/4/20.
 */

define([], function () {
    return ["$scope", "$http", "$location", "$stateParams" , "utilitiesService",
        function ($scope, $http, $location, $stateParams, utilitiesService) {
            //检查左侧栏开合状态
            var newsurl=utilitiesService.host+"/test/coding";
            //var codingurl="http://www.leeblog.coding.io/scrapy/hupunbanews";
            var localurl=utilitiesService.host+"/test/hupu";
            //获取数据
            $http({
                method: "get",
                url: localurl
            }).success(function (data) {
                $scope.news = data;

            }).error(function (err) {
                alert(err)
            });

            $scope.readDetail=function(url){
                window.open(url);
            }
        }]
})

