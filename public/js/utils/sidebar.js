(function() {
	var Menubar = function() {
		this.el = document.querySelector('#sidebar ul');
		this.state = 'allClosed'; //hasOpend
		this.el.addEventListener('click', function(event) {
			event.stopPropagation();
		});
		var self = this;
		var currentOpendMenuContent = null;
		this.menuList = document.querySelectorAll('#sidebar ul > li');
		for (var i = 0; i < this.menuList.length; i++) {
			this.menuList[i].addEventListener('click', function(event) {
				var menuContentEl = document.getElementById(event.currentTarget.id + '-content');
				if (self.state === 'allClosed') {
					console.log('打开' + menuContentEl.id);
					menuContentEl.className = 'nav-content';
					menuContentEl.classList.add('menuContent-move-right');
					self.state = 'hasOpend';
					self.currentOpendMenuContent = menuContentEl;
				} else if (self.currentOpendMenuContent.id != event.currentTarget.id + '-content') {
					console.log('关闭' + self.currentOpendMenuContent.id);
					self.currentOpendMenuContent.className = 'nav-content';
					self.currentOpendMenuContent.classList.add('menuContent-move-left');
					console.log('打开' + menuContentEl.id);
					menuContentEl.className = 'nav-content';
					menuContentEl.classList.add('menuContent-move-right');
					self.currentOpendMenuContent = menuContentEl;
				}
			});
		}
		//点击展开页右上角收起展开页
		this.nvaconList = document.querySelectorAll('.nav-content > div.nav-con-close');
		console.log(this.nvaconList);
		for (i = 0; i < this.nvaconList.length; i++) {
			this.nvaconList[i].addEventListener('click', function(event) {
				var menuContent = event.currentTarget.parentNode;
				menuContent.className = 'nav-content';
				menuContent.classList.add('menuContent-move-left');
				self.state = 'allClosed'
				console.log(i);
			});
		}
	};
	var Content = function() {

	}
	var Sidebar = function(eId, closebarId) {
		var self = this;
		this.state = 'opened';
		this.menubar = new Menubar();
		this.el = document.getElementById(eId || 'sidebar');
		this.closeBarEl = document.getElementById(closebarId || 'closebar');
		this.el.addEventListener('click', function(event) {
			if (event.target != self.el) {
				self.triggerSwitch();
			}
		});
	};
	Sidebar.prototype.close = function() {
		console.log("关闭sidebar");
		this.el.className = 'sidebar-mov-left';
		this.closeBarEl.className = 'closebar-move-right';
		//同时关闭内容面板
		if (this.menubar.currentOpendMenuContent != null) {
			this.menubar.currentOpendMenuContent.className = 'nav-content';
			this.menubar.currentOpendMenuContent.classList.add('menuContent-move-left');
			this.menubar.state = 'allClosed'
		}
		this.state = 'close';
	};
	Sidebar.prototype.open = function() {
		console.log("打开sidebar");
		this.el.className = 'sidebar-move-right';
		this.closeBarEl.className = 'closebar-move-left';
		this.state = 'opened';
	};
	Sidebar.prototype.triggerSwitch = function() {
		if (this.state === 'opened') {
			this.close();
		} else {
			this.open();
		}
	};
	var siderbar = new Sidebar();
})();