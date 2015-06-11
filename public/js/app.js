define(['angular', 'controller', 'directive','service','filter'],
    function (angular, controller, directive,service,filter) {
        return angular.module('app',
            ['ngSanitize','ui.router','angularFileUpload', 'app.controllers', 'app.directives','app.services',"app.filters"]);
    })