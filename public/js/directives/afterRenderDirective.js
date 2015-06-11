/**
 * Created by 14062539 on 2015/4/21.
 */
define([], function () {
    return ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    //延迟触发，优化性能
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        };
    }]
});
