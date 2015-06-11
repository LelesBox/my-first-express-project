/**
 * Created by li_xiaoliang on 2015/3/24.
 */
define(['angular',
        'controllers/homeCtr',
        'controllers/writepageCtr',
        'controllers/menubarCtr',
        "controllers/articleCtr",
        "controllers/hupunewsCtr",
        "controllers/trendsCtr",
        "controllers/nodedocCtr"],
    function (angular, homeCtr, writepageCtr, menubarCtr, articleCtr, hupunewsCtr, trendsCtr, nodedocCtr) {
        angular.module('app.controllers', [])
            .controller('home', homeCtr)
            .controller('writepage', writepageCtr)
            .controller('menubarctr', menubarCtr)
            .controller('article', articleCtr)
            .controller('hupunews', hupunewsCtr)
            .controller('trends', trendsCtr)
            .controller('nodedoc', nodedocCtr);
    });