/**
 * Created by 14062539 on 2015/4/2.
 */
var BmobFactory = require('../controller/uploadToBmob');
exports.index = function(req, res) {
    res.send("this is writepage index");
}
exports.uploadbinaryData = function(req, res) {
    if (req) {
        var file = req.files.file;
        var bytes = file.buffer.toString("binary");
        var upload = require('../controller/uploadToBmob');
        upload.sendbinaryData(file.name, bytes)
            .then(function(obj) {
                res.send(obj.url());
            }, function(err) {
                res.send(err);
            });
    } else {
        res.send("nodejs has no receive data")
    }
}

exports.uploadText = function(req, res) {
    if (req) {
        try {
            var text = req.body.text;
            console.log(text);
            var fs = require('fs');
            fs.writeFile('./uploads/text.md', text, function(err) {
                if (err) throw err
                console.log("save success");
            })
            res.send("success")
        } catch (err) {
            res.send(err);
        } finally {
            req = null;
            fs = null;
        }
    } else {
        res.send("please add text");
    }
}

exports.loadText = function(req, res) {
    var fs = require('fs');
    try {
        fs.exists('./uploads/text.md', function(ex) {
            console.log(ex);
        })
        fs.readFile('./uploads/text.md', function(err, data) {
            if (err) throw err;
            res.send(data);
        })
    } catch (err) {
        console.log(err);
        res.send(err);
    } finally {
        fs = null;
    }
}

function returnjson(_state, _msg) {
    this.state = _state;
    this.msg = _msg;
}

exports.uploadTextToBmob = function(req, res) {
    var body = req.body;
    if (body.type && body.type === "new") {
        BmobFactory.sendText("Article", body.new)
            .then(function(data) {
                res.send(new returnjson(1, {
                    id: data.id
                }));
            })
            .catch(function(err) {
                res.send(new returnjson(0, err));
            });
    } else if (body.type && body.type === "alter") {
        BmobFactory.getDataById("Article", body.id)
            .then(function(data) {
                return BmobFactory.alterData(data, body.changes);
            })
            .then(function(data) {
                res.send(new returnjson(1, "保存成功！"));
            })
            .catch(function(err) {
                res.send(new new returnjson(0, err));
            })
    }
}

exports.getTextById = function(req, res) {
    if (req.params.id) {
        BmobFactory.getDataById("Article", req.params.id)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(err) {
                res.send(new returnjson(0, err));
            })
    }
}

exports.getArticle = function(req, res) {
    BmobFactory.getData("Article", {
            select: ["title", "summary", "objectId", "tags", "updatedAt"],
            desc: "updatedAt"
        }).then(function(data) {
            return res.send(data);
        })
        .catch(function(err) {
            return res.send(err);
        })
}

//根据id删除文章
exports.deleteArticle = function(req, res) {
    if (req.params.id)
        var id = req.params.id
    console.log(id);
    BmobFactory.deleteDataById(id)
        .then(function(data) {
            res.send(data);
        }, function(err) {
            res.send(err);
        });
}