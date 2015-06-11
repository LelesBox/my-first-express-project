/**
 * Created by li_xl on 15-4-11.
 */
exports.mapRoute= function (app, prefix) {
    var prefix='/'
    //var prefixObj=require('../controller/writepage');
    //app.get(prefix,prefixObj.index);
    //app.post(prefix+'/uploadbmob',prefixObj.uploadbinaryData);
    app.get(prefix, function (req, res) {
        res.send('this is '+prefix+' route');
    });
}