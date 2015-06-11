/**
 * Created by 14062539 on 2015/5/28.
 */

/***
 * node文档
 */
var BmobFactory = require('../controller/uploadToBmob');

function resultJson(_state, _msg, _result) {
    this.state = _state;
    this.msg = _msg;
    this.data = _result;
}
var getAlldoc = function (req, res) {
    BmobFactory.getData("nodedoc", {select: ["filename", "objectId", "tags", "updatedAt"], desc: "updatedAt"})
        .then(function (data) {
            res.send(new resultJson(1, "success", {data: data}))
        }, function (err) {
            res.send(new resultJson(0, err));
        });
}

var getDocById = function (req, res) {
    var id = req.params.id;
    BmobFactory.getDataById("nodedoc", id)
        .then(function (data) {
            res.send(data);
        }, function (err) {
            res.send(new resultJson(0, err));
        })
}

//保存新的文档到云端
var senddoc = function (req, res) {
    var files = req.files;
    var txt = files.file.buffer.toString("utf8");
    var filename = req.body.filename;
    var tag = req.body.tag || "any";
    var type = files.file.extension;
    if (txt && (type == "md" || type == "text")) {
        BmobFactory.sendText("nodedoc", {text: txt, filename: filename, tag: tag})
            .then(function (data) {
                res.send(new resultJson(1, "success", {id: data.id}));
            })
            .catch(function (err) {
                res.send(new resultJson(0, err));
            });
    } else {
        res.send(new resultJson(0, "no data"));
    }
}


module.exports = {
    senddoc: senddoc,
    getalldoc: getAlldoc,
    getdoc: getDocById
}