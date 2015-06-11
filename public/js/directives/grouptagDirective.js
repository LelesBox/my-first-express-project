/**
 * Created by hadoop on 2015/3/22.
 */
define([], function () {
    return ["$location", function ($location) {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            scope: {
                tag: '=',
                cls: '@',
                url: '@',
                showId:'='
            },
            template: '<div>'
            + '<ul class="right-nav">'
            + '<li ng-repeat="tag in tags" ng-class="{active:showId==tag.tagId}" ng-click="select(tag)">'
            + '<a>{{tag.title}}</a>'
            + '</li>'
            + '</ul>'
            + '<p class="line"></p>'
            + '</div>',
            link: function (scope, element, attrs) {
                scope.tags = [
                    {
                        tagId: 1,
                        url: "/",
                        title: "最近文章"
                    },
                    {
                        tagId: 2,
                        url: "trends",
                        title: "我的动态"
                    },
                    {
                        tagId: 3,
                        url: "doc",
                        title: "Node相关文档"
                    }
                ]
                scope.select = function (tag) {
                    scope.showId = tag.tagId;
                    $location.url(tag.url);
                }
            }
        }
    }]
})