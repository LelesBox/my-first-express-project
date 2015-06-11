define(function(require, exports, module) {
	var util = require('./utilsync')
	var ul = document.getElementsByClassName("groupTag");
	var currentOpendTag = ul[0];
	for (var i = 0; i < ul.length; i++) {
		ul[i].addEventListener('click', function(event) {
			console.log(event)
			console.log(event.currentTarget.getAttribute("tit"));
			if (currentOpendTag) {
				util.fn.removeClass(currentOpendTag, 'active');
			}
			util.fn.addClass(event.currentTarget, 'active');
			currentOpendTag = event.currentTarget;
		});
	}
});