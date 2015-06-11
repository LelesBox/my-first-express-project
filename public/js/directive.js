/**
 * Created by li_xiaoliang on 2015/3/24.
 */
define(['angular',
    'directives/grouptagDirective',
    'directives/menubarDirective',
    'directives/afterRenderDirective',
    'directives/hupuNewsDirective',
    'directives/styleDirective',
    'directives/todo/todoDirective',
    'directives/trendsdomDirective',
    'directives/feedDirective'
], function(angular,
    grouptagDirective,
    menubarDirective,
    afterRenderDirective,
    hupuNewsDirective,
    styleDirective,
    todoDirective,
    trendsdomDirective,
    feedDirective) {
    angular.module('app.directives', [])
        .directive('grouptag', grouptagDirective)
        .directive('menubar', menubarDirective)
        .directive('afterRender', afterRenderDirective)
        .directive("hupunewsdomAction", hupuNewsDirective)
        .directive("mystyle", styleDirective)
        .directive("todo", todoDirective)
        .directive("trendsdomAction", trendsdomDirective)
        .directive("feed", feedDirective);
})