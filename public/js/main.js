require.config({
    paths: {
        'angular': 'libs/angular-1.3.0',
        'uirouter': 'libs/angular-ui-router',
        'lodash': 'libs/lodash/lodash.min',
        'jquery': 'libs/jquery/dist/jquery',
        'bootstrapjs': '../bootstrap/js/bootstrap',
        'marked': 'libs/marked',
        'fileupload': 'libs/angular-file-upload',
        'bmob': 'libs/bmob-min',
        'highlight': 'libs/highlight/highlight.pack',
        'app': './app',
        'rome-timepicker': 'libs/rome-datetimepicker/dist/rome.min',
        'emoji':'libs/emoji/dist/emoji',
        'ngSanitize':'libs/angular-sanitize.min'
    },
    shim: {
        'app': {
            deps: ['angular', 'uirouter', 'bootstrapjs', 'fileupload','ngSanitize']
        },
        'angular': {
            exports: 'angular'
        },
        'bootstrapjs': {
            deps: ['jquery']
        },
        'uirouter': {
            deps: ['angular']
        },
        'fileupload': {
            deps: ['angular']
        },
        'ngSanitize':{
            deps:['angular']
        }
    },
    priority: ["angular"]
});

require(
    [
        'angular', 'app', 'router'//, 'uirouter','fileupload'
    ],
    function (angular, app, router, uirouter, fileupload) {
        angular.element().ready(function () {
            console.log("DOM加载完成");
            angular.bootstrap(document, [app.name]);
        });
    }
);