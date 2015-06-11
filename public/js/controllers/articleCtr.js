/**
 * Created by li_xiaoliang on 2015/4/5.
 */
define(['jquery'], function ($) {
    return ["$scope", "$http", "$location", "$stateParams", "parsemarkdown", "utilitiesService",
        function ($scope, $http, $location, $stateParams, parsemarkdown, utilitiesService) {

            //检查左侧栏开合状态
            if (utilitiesService.articleOpenState === 'close') {
                utilitiesService.articleClose();
            }
            $scope.word = "";
            $http({
                method: 'get',
                url: $location.$$path
            }).then(function (data) {
                utilitiesService.id = $stateParams.id;
                var content = document.getElementById('article_content');
                content.innerHTML = parsemarkdown.parsemarkdown(data.data.text);
                $('pre code').each(function (i, element) {
                    $(this).addClass('hljs');
                });
            }).catch(function (err) {
                console.log(err);
            });
        }]
})
