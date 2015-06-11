/**
 * Created by 14062539 on 2015/4/15.
 */
define(['jquery'], function($) {

    //接收和传递Angular内置参数
    var constant;
    var fn = {
        //菜单栏箭头行为，收，收缩
        pull: function(element, scope) {
            $('#middle').animate({
                width: "0"
            }, 300, function() {
                $('#middle').hide();
                $('.right').animate({
                    left: "3%"
                }, 300);
                $('.right').animate({
                    width: "97%"
                }, 300);
            });
            $(element).addClass('transform180');
            scope.action = 'push';
            scope.$apply(function() {
                constant.valueService.articleOpenState = 'close';
                console.log(constant.valueService.articleOpenState);
            });
        },
        //菜单栏箭头行为，推，展开
        push: function(element, scope) {
            $('.right').animate({
                width: "77%"
            }, 300, function() {
                $('#middle').animate({
                    width: "20%"
                }, 300);
                $('#middle').show();
                $('.right').animate({
                    left: "23%"
                }, 300);
            });
            $(element).removeClass('transform180');
            scope.action = 'pull';
            constant.valueService.articleOpenState = 'open';
        },
        //用作判断是否开启编辑页面实时滚动到最底部,打开
        scrollswitchopen: function(element, scope) {
            $(element).removeClass('logo-iconfont-iconfont95').addClass('logo-iconfont-iconfont94');
            scope.action = 'scrollswitchclose';
            //用作判断是否开启编辑页面实时滚动到最底部
            scope.actionClick();
        },
        //用作判断是否开启编辑页面实时滚动到最底部,关闭
        scrollswitchclose: function(element, scope) {
            $(element).removeClass('logo-iconfont-iconfont94').addClass('logo-iconfont-iconfont95');
            scope.action = 'scrollswitchopen';
            //用作判断是否开启编辑页面实时滚动到最底部
            scope.actionClick();
        },
        //编辑当前页面
        edit: function(element, scope) {
            //跳转到编辑页面，注意这里的方法，在element.bind方法里出发angular内置的方法需要使用apply方法
            scope.$apply(function() {
                constant.location.url('writepage')
                    //根据id打开下载页面，通知writepageController下载页面，咋通知呢，给Service传递通知，当打开页面时
                    //会执行writepageController，可以在这里做检查
                constant.valueService.state = 'edit';
            })
        },
        send: function(element, scope) {
            scope.actionClick();
        },
        //菜单行为之新闻，这里计划会打开一些自己爬虫抓取的新闻
        news: function(element, scope) {
            scope.actionClick();
        },
        delete: function(elemement, scope) {
            //$(".left").animate({width:"6%"}, 300)
            scope.actionClick();
        },
        addimg: function() {

        }
    }

    return ['$location', 'utilitiesService', function($location, utilitiesService) {
        constant = {
            location: $location,
            valueService: utilitiesService
        }
        return {
            restrict: 'C',
            scope: {
                action: '=',
                /*=与@的区别，如果无法理解的话，至少在使用上的区别是能看得出来的，@情况下取值就是html标签的值(字符串)
                                如：action='push',这种情况下action的值就是push(字符串),'='情况下取值就是来源于该html标签的controller里的值,
                                如 action='push',这里push不是一个字符串，而是一个变量，在它的controller里这样定义才有效，scope.push='push'，
                                而&符号，则是绑定方法的,如action-click="actionClick(menus.send)",当scope.actionClick()时，调用的是
                                controller里面actionClick方法,有一个细节，就是指令中定义的actionClick必须对应着标签里的
                                action-click或action_click，别问我怎么知道的，被坑的过的
                                */
                actionClick: '&'
            },
            replace: true,
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    fn[scope.action](this, scope);
                });
            }
        }
    }];
});