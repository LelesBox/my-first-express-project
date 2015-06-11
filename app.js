var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
//var RedisStore = require('connect-redis')(session);
var MongoStore = require('connect-mongo')(session);
var multer = require('multer');
//var routes = require('./routes/index');
var users = require('./routes/users');
//var maprouter = require('./mapRouter');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
//var mongoose = require("mongoose");
var UserDao=require("./dao").UserDao;
var _ = require("underscore");
var config = require('./config');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'ejsviews'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs-mate'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(multer({dest: './uploads/', inMemory: true}));
app.use(bodyParser.urlencoded({extended: false}));
//app.use(cookieParser());
//test passport authorize
//app.use(session({secret:'leebox',cookie:{maxAge:6000}}));
//app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(config.session_secret));

app.use(session({
    secret: config.session_secret,
    store: new MongoStore({
        url: config.db,
        ttl: 60 * 60 * 24
    }),
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: true,
    saveUninitialized: true
}));
//app.use(session({
//    secret: AppConfig.session_secret,
//    store: new RedisStore({
//        port: AppConfig.redis_port,
//        host: AppConfig.redis_host
//    }),
//    resave: true,
//    saveUninitialized: true
//}));
app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new LocalStrategy(
    function (username, password, done) {
        var user={
            username:username,
            password:password
        }
        debugger;
        UserDao.login(user,function(err,data){
            if(err) return done(err);
            if(data.length>0){
                done(null,data);
            }else{
                done(null,false,{message:"Incorrect username or password"});
            }
        })
    }
));

//序列化到session中，主要是为了能保证登陆用户持续处于登陆状态
passport.serializeUser(function (user, done) {
    done(null, user);
});

//从session中解析出内容
passport.deserializeUser(function (user, done) {
    done(null,user);
});

//注册所有路径,路径使用配置文件注入
//var routeConfig = require('./config.route');
//maprouter.mapRoute(app, routeConfig);
var autoRoute=require("./autoRouter");
autoRoute.Route(app,"./routes");
/*autoRoute.Route(app,"./routes", function (err) {
    if(err){
        throw err;
    }else{
        console.log("路由注册成功");
    }
})*/
require('./test');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
