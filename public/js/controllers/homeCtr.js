/**
 * Created by 李晓亮 on 2015/3/24.
 * 这是首页的控制器，控制器的加载时在配置路由时为其加载的
 */
define([], function () {
    return ["$scope", "$http", "$log", "$location", "utilitiesService",
        function ($scope, $http, $log, $location, utilitiesService) {
            var currentpath = $location.$$path.replace("/", "");
            $scope.showid = currentpath === 'trends' ? 2 : currentpath === 'doc' ? 3 : 1;

            $scope.$emit('onHome');

            $http({
                method: 'get',
                url: "/article/article"
            }).success(function (data) {
                $scope.articles = data.data;
            }).error(function (err) {
                console.log(err);
            });

            //点击跳转
            $scope.jump = function (id) {
                utilitiesService.id = id;
                utilitiesService.path = "/article";
                $location.url("article/" + id);
            }
        }]
});