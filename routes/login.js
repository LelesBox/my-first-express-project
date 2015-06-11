/**
 * Created by li_xl on 15-4-11.
 */
exports.mapRoute= function (app, prefix) {
    var logController=require('../controller/login');
    var prefix='/'+prefix;
    //var prefixObj=require('../controller/writepage');
    //app.get(prefix,prefixObj.index);
    //app.post(prefix+'/uploadbmob',prefixObj.uploadbinaryData);
    app.get(prefix,logController.index);
    app.post(prefix,logController.login);
    app.get('/profile',logController.boss);
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    app.post('/haslogin', function (req, res) {
        if(req.isAuthenticated()){
            return res.send(true);
        }
        return res.send(false);
    });
    //app.get('/register',logController.register);
    //app.post('/register',logController.register);
}