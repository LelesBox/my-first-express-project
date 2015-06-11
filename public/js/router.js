/***
 * 配置路由器
 *li_xiaoliang
 **/
define(['app'], function (app) {
    return app.config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            //$rootScopeProvider.$on('$stateChangeSuccess', function (evt, toParams, fromState, fromParams) {
            //    console.log(evt)
            //    console.log(toParams)
            //    console.log(fromState)
            //    console.log(fromParams);
            //})
            $urlRouterProvider.otherwise('/newly');
            $stateProvider
                .state('index', {
                    url: '',
                    views: {
                        '': {
                            templateUrl: '../tpls/main.html',
                            controller: 'menubarctr'
                        },
                        'main@index': {
                            templateUrl: '../tpls/home/home.html',
                            controller: 'home'
                        },
                        'right@index': {
                            templateUrl: '../tpls/home/right.html'
                        },
                        'article@index': {
                            templateUrl: '../tpls/home/newly.html'
                        }
                    }
                })
                .state('index.newly', {
                    url: '/newly',
                    views: {
                        'article': {
                            templateUrl: '../tpls/home/newly.html'
                        }
                    }
                })
                .state('index.doc', {
                    url: '/doc',
                    views: {
                        'article': {
                            templateUrl: '../tpls/home/doc.html',
                            controller: 'nodedoc'
                        }
                    }
                })
                .state('index.docdetail', {
                    url: '/nodedoc/:id',
                    views: {
                        'right': {
                            templateUrl: '../tpls/article/article.html',
                            controller: 'article'
                        }
                    }
                })
                .state('index.trends', {
                    url: '/trends',
                    views: {
                        'article': {
                            templateUrl: '../tpls/home/trends.html',
                            controller: 'trends'
                        }
                    }
                })
                .state('index.writepage', {
                    url: '/writepage',
                    views: {
                        'main': {
                            templateUrl: '../tpls/write/writepage.html',
                            controller: 'writepage'
                        }
                    }
                })
                .state('index.article', {
                    url: '/article/:id',
                    views: {
                        'right': {
                            templateUrl: '../tpls/article/article.html',
                            controller: 'article'
                        }
                    }
                })
                .state('index.hupunba', {
                    url: '/hupunba',
                    views: {
                        'right': {
                            templateUrl: '../tpls/news/hupunba.html',
                            controller: 'hupunews'
                        }
                    }
                });
        }]).run(['$rootScope', '$location', "utilitiesService", "haspermission",
        function ($rootScope, $location, utilitiesService, permission) {
            permission.haspermision().then(function (permision) {
                if (permision === 'true') {
                    $rootScope.authorize = true;
                }
            });
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                utilitiesService.lastUrl = fromState.url;
            });
        }]);
})