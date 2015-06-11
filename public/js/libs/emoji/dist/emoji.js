(function () {
	var exports = this;
	var emoji = {};
	emoji.createEmoji = createEmoji;
	//点击元素 
	var tapElemt;
	//加载样式 
	addCss("emoji");
	// 对元素类的增删改
	var classFactory = new (function () {
		var that = this;
		that.getClass = function (ele) {
			return ele.className.replace(/\s+/, " ").split(" ");
		};
		that.hasClass = function (ele, cls) {
			return -1 < (" " + ele.className + " ").indexOf(" " + cls + " ");
		};
		that.addClass = function (ele, cls) {
			if (!that.hasClass(ele, cls)) {
				ele.className += " " + cls;
			}
			return that;
		};
		that.removeClass = function (ele, cls) {
			if (that.hasClass(ele, cls)) {
				var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
				ele.className = ele.className.replace(reg, " ");
			}
			return that;
		};
		that.clearClass = function (ele, cls) {
			ele.className = "";
			return that;
		};
		that.replaceClass = function (ele, newcls, oldcls) {
			if (that.hasClass(ele, oldcls)) {
				that.removeClass(ele, oldcls).addClass(ele, newcls);
			} else {
				that.addClass(ele, newcls);
			}
			return that;
		}
	})();

	// classFactory.constructor.prototype.test = function () {
	// 	return this.getClass;
	// };

	// 自定义事件系统（非DOM事件），包含添加事件，触发事件
	function EventLite() { }
	var eventLite = new EventLite();
	var eventpro = EventLite.prototype;
	//获取事件对象们 = =，如果不存在则创建一个事件们对象（就是说一个对象们包含多多个事件，以对象的形式，属性为事件名）
	//一个events的属性是事件名，而一个event包含以下属性{eventname,listeners} 
	eventpro._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};
	//添加事件对象
	eventpro.addListener = function addLisenter(evt, listener) {
		var events = this._getEvents();
		//遍历当前属性，如果当前属性包含evt则添加，否则新增属性 
		for (var key in events) {
			if (events.hasOwnProperty(key) && key == evt) {
				events[key].listeners.push(listener);
				return;
			}
		}
		//新增属性 
		events[evt] = { eventname: evt, listeners: [listener] };
	};
	//移除事件 
	eventpro.removeListener = function removeListener(evt) {
		var events = this._getEvents();
		for (var key in events) {
			if (events.hasOwnProperty(key) && key == evt) {
				delete events[key];
			}
		}
	};
	//  触发事件
	eventpro.emit = function emit(evt) {
		var events = this._getEvents();
		for (var key in events) {
			if (events.hasOwnProperty(key) && key == evt) {
				var length = events[key].listeners.length;
				for (var i = 0; i < length; i++) {
					var listener = events[key].listeners[i];
					if (typeof listener == "function") {
						var args = Array.prototype.slice.call(arguments, 1);
						listener.apply(this, args || []);
					}
				}
			}
		}
	};
	//是否存在某一事件，可用来检验是否存在事件进一步实现某一个事件名只接受一个事件对象。
	eventpro.hasEvent = function hasEvent(evtname) {
		var events = this._getEvents();
		for (var key in events) {
			if (events.hasOwnProperty(key) && key == evtname) {
				return true;
			}
		}
		return false;
	};
	 
	// DOM事件系统,事件委托
	var EventUtil = {
		addHandler: function (element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		removeHandler: function (element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent("on" + type, handler);
			} else {
				element["on" + type] = null;
			}
		},
		getEvent: function (event) {
			return event ? event : window.event;
		},
		getTarget: function (event) {
			return event.target || event.srcElement;
		},
		preventDefault: function (event) {
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		stopPropagation: function (event) {
			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		}
	};
	//各种事件处理程序统一在这里，通过非DOM事件(eventLite)关联异步事件 
	var handlers = {
		creatDOMHandler: function (evt) {
			// event = EventUtil.getEvent(evt);
			// var elemt = EventUtil.getTarget(event);
			var imgArr = ["ico_emoji0032", "ico_emoji0001", "ico_emoji0007", "ico_emoji0004", "ico_emoji0008", "ico_emoji0002", "ico_emoji0011", "ico_emoji0009", "ico_emoji0013", "ico_emoji0012", "ico_emoji0014", "ico_emoji0006", "ico_emoji0015", "ico_emoji0017", "ico_emoji0018", "ico_emoji0005", "ico_emoji0016", "ico_emoji0010", "ico_emoji0020", "ico_emoji0019", "ico_emoji0021", "ico_emoji0022", "ico_emoji0023", "ico_emoji0025", "ico_emoji0028", "ico_emoji0026", "ico_emoji0030", "ico_emoji0029", "ico_emoji0031", "ico_emoji0034", "ico_emoji0003", "ico_emoji0033", "ico_emoji0035", "ico_emoji0037", "ico_emoji0036", "ico_emoji0038", "ico_emoji0039", "ico_emoji0040", "ico_emoji0041", "ico_emoji0042", "ico_emoji0043", "ico_emoji0044", "ico_emoji0045", "ico_emoji0046", "ico_emoji0048", "ico_emoji0050", "ico_emoji0049", "ico_emoji0051", "ico_emoji0027", "ico_emoji0052", "ico_emoji0024", "ico_emoji0057", "ico_emoji0054", "ico_emoji0053", "ico_emoji0059", "ico_emoji0056", "ico_emoji0058", "ico_emoji0061", "ico_emoji0060", "ico_emoji0055"]
			if (getLeft(tapElemt) > 300) {
				var obj = {
					x: getLeft(tapElemt) - 300 + 10 + (Math.sqrt(200) / 2) + (tapElemt.clientWidth / 2),
					y: getTop(tapElemt) + tapElemt.clientHeight + 10,
				};
				createDOM(obj.x, obj.y, "left", imgArr);
			} else {
				obj = {
					x: getLeft(tapElemt) - 10 - (Math.sqrt(200) / 2) + (tapElemt.clientWidth / 2),
					y: getTop(tapElemt) + tapElemt.clientHeight + 10,
				};
				createDOM(obj.x, obj.y, "right", imgArr);
			}
		},
		documentClick: function (evt) {
			var emoji = document.getElementById("emoji");
			var event = EventUtil.getEvent(evt);
			var target = EventUtil.getTarget(event);
			if (emoji && !isChild(tapElemt, target)) {
				var ex = event.clientX;
				var ey = event.clientY;
				var emx = getLeft(emoji);
				var emy = getTop(emoji);
				if (ex > emx && ex < emx + 300 & ey > emy && ey < emy + emoji.clientHeight) { } else {
					destory();
				}
			}
		},
		emojiClick: function (evt) {
			event = EventUtil.getEvent(evt);
			var target = EventUtil.getTarget(event);
			EventUtil.stopPropagation(event);
			//如果点击的元素是以ico_emoji开头的
			if (startWith(target.className, "ico_emoji", true)) {
				eventLite.emit("click_emoji", target.className);
			}
		}
	};

	// id表示点击的元素，callback点击正确emoji图标后返回的emoji图标名称回调事件
	function createEmoji(id, callback) {
		emojiInit(id);
		if (!eventLite.hasEvent("click_emoji")) {
			eventLite.addListener("click_emoji", callback);
		}
		// var event = new EventLite();
	}
	// 绑定点击事件，捕获xy坐标
	function emojiInit(id) {
		tapElemt = typeof id === "string" ? document.getElementById(id) : id;
		EventUtil.addHandler(tapElemt, "click", handlers.creatDOMHandler);
	}

	function createDOM(x, y, orient, imgarr) {
		// 如果当前不存在则创建一个
		var emoji = document.getElementById("emoji");
		if (!emoji) {
			var body = document.getElementsByTagName("body")[0];
			// 背景，让点击该背景后emoji表情消失
			emoji = document.createElement("div");
			emoji.setAttribute("id", "emoji");
			emoji.innerHTML = "<div id='emoji-container'>" + "<div id='emoji-triangle'>" + "</div>" + "<div id='emoji-content'>" + "<ul class='emoji-ul emoji-clearfix'>" + repeateli(imgarr) + "</ul>" + "</div>" + "</div>";
			body.appendChild(emoji);
			//注册document事件监听鼠标点击事件看是否点击中了emoji选项框，否则框消失
			EventUtil.addHandler(document, "click", handlers.documentClick);
			// 注册事件，点击图标
			var emojiul = document.getElementsByClassName("emoji-ul")[0];
			EventUtil.addHandler(emojiul, "click", handlers.emojiClick);
		}

		emoji.style.left = x + "px";
		emoji.style.top = y + "px";
		var triangle = document.getElementById("emoji-triangle");
		if (orient == "left") {
			classFactory.replaceClass(triangle, "triangle-left", "triangle-right");
		} else {
			classFactory.replaceClass(triangle, "triangle-right", "triangle-left");
		}
	}
	function getTop(e) {
		var offset = e.offsetTop;
		if (e.offsetParent != null) offset += getTop(e.offsetParent);
		return offset;
	}
		
	//获取元素的横坐标 
	function getLeft(e) {
		var offset = e.offsetLeft;
		if (e.offsetParent != null) offset += getLeft(e.offsetParent);
		return offset;
	}
	
	//判断一个元素是否是另一个元素的子元素
	function isChild(target, element) {
		var childs = getChildElements(target);
		if (childs.length != 0) {
			var length = childs.length;
			for (var i = 0; i < length; i++) {
				if (childs[i] == element) {
					return true;
				} else {
					return arguments.callee(childs[i], element);
				}
			}
		}
	} 
	//  获取子元素
	function getChildElements(elems) {
        var childs = elems.childNodes;
        var result = [];
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].nodeType == 1) {
                result.push(childs[i]);
            }
        }
        return result;
    }


	function destory() {
		var emoji = document.getElementById("emoji");
		if (emoji) {
			EventUtil.removeHandler(document, "click", handlers.documentClick);
			var body = document.getElementsByTagName("body")[0];
			body.removeChild(emoji);
		}
	}

	function repeateli(imgArr) {
		var str = "";
		for (var i = 0; i < imgArr.length; i++) {
			str += "<li class='" + imgArr[i] + "'></li>";
		}
		return str;
	}

	function startWith(target, str, ignorecase) {
		var start_str = target.substr(0, str.length);
		return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str;
	};

	function each(arr, callback) {
		var length = arr.length;
		for (var i = 0; i < length; i++) {
			callback(arr[i], i, arr);
		}
	}
	//根据js路径加载css,name为js名字，不带js后缀或者min.js后缀
	function addCss(name) {
		var script = document.getElementsByTagName("script");
		var regx = new RegExp('.*?' + name + '.js$');

		// var regx = /.*?slide.js$/;
		var regxmin = new RegExp('.*?' + name + '.min.js$');
		// var regxmin = /.*?slide.min.js$/;
		each(script, function (item) {
			var path = item.getAttribute("src");
			if (regx.test(path)) {
				var prefix = path.substr(0, path.indexOf(name + ".js"));
				loadCss(prefix + name + ".css");
				return;
			} else if (regxmin.test(path)) {
				prefix = path.substr(0, path.indexOf(name + ".min.js"));
				loadCss(prefix + name + ".min.css");
				return;
			}
		});
	}

	// 引用css样式as
	function loadCss(filename) {
		var css = document.createElement("link");
		css.setAttribute("rel", "stylesheet");
		css.setAttribute("type", "text/css");
		css.setAttribute("href", filename);
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(css);
	} 
	
	// Expose the class either via AMD, CommonJS or the global object
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return emoji;
		});
	}
	else if (typeof module === 'object' && module.exports) {
		module.exports = emoji;
	}
	else {
		exports.emoji = emoji;
	}
})(this);