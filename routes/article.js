/**
 * Created by 14062539 on 2015/4/2.
 */
var prefixObj=require('../controller/writepage');

exports.mapRoute= function (app, prefix) {
    prefix='/'+prefix;
    app.get(prefix,prefixObj.index);
    app.post(prefix+'/uploadbmob',prefixObj.uploadbinaryData);
    app.post(prefix+'/uploadtextbmob',prefixObj.uploadTextToBmob);
    app.post(prefix+'/uploadtext',prefixObj.uploadText);
    app.get(prefix+'/get',prefixObj.loadText);
    app.get(prefix+'/article',prefixObj.getArticle);
    app.post(prefix+'/delete/:id',prefixObj.deleteArticle);
    app.get(prefix+'/:id',prefixObj.getTextById);
}
