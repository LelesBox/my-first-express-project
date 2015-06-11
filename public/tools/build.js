{
    appDir: '../js',
        baseUrl: './',
    paths: {
    'angular': 'libs/angular-1.3.0',
        'uirouter': 'libs/angular-ui-router',
        'jquery': 'libs/jquery/dist/jquery',
        'bootstrapjs': '../bootstrap/js/bootstrap',
        'marked': 'libs/marked',
        'fileupload': 'libs/angular-file-upload',
        'bmob': 'libs/bmob-min',
        'highlight': 'libs/highlight/highlight.pack',
        'app': './app',
        'rome-timepicker': 'libs/rome-datetimepicker/dist/rome.min'
},
    dir: '../www-built',
        modules: [
    //First set up the common build layer.
    {
        //module names are relative to baseUrl
        name: './main',
        //List common dependencies here. Only need to list
        //top level dependencies, "include" will find
        //nested dependencies.
        include: ['angular',
            'app',
            'router'
        ]
    },

    //Now set up a build layer for each page, but exclude
    //the common one. "exclude" will exclude
    //the nested, built dependencies from "common". Any
    //"exclude" that includes built modules should be
    //listed before the build layer that wants to exclude it.
    //"include" the appropriate "app/main*" module since by default
    //it will not get added to the build since it is loaded by a nested
    //require in the page*.js files.
    {
        //module names are relative to baseUrl/paths config
        name: 'app',
        include: ['angular', 'controller', 'directive', 'service', 'filter'],
        exclude: ['./main']
    },

    {
        //module names are relative to baseUrl
        name: 'controller',
        include: ['angular',
            'controllers/homeCtr',
            'controllers/writepageCtr',
            'controllers/menubarCtr',
            "controllers/articleCtr",
            "controllers/hupunewsCtr",
            "controllers/trendsCtr"
        ]
    }

]
}