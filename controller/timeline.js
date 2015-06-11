var bomb = require("./uploadToBmob");

function ResultJson(_state, _msg, _result) {
    this.state = _state;
    this.msg = _msg;
    this.data = _result;
}

exports.index = function (req, res) {
	bomb.getData("timeline",{ desc: "updatedAt"})
		.then(function (data) {
		res.send(new ResultJson(1, "success", data));
	}, function (err) {
			res.send(new ResultJson(0, "error", err));
		});
};

exports.add = function (req, res) {
	var data = req.body.data || null;
	if (data != null) {
		bomb.sendText("timeline", data)
			.then(function (data) {
			res.send(new ResultJson(1, "success", { id: data.id }));
		}, function (err) {
				res.send(new ResultJson(0, err));
			});
	} else {
		res.send(new ResultJson(0, "no data"));
	}
};