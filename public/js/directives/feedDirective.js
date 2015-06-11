/**
 * Created by li_xiaoliang on 2015/6/10.
 */
define([], function() {
	return ["$sce", function($sce) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				imgUrls: '@',
				text: '@',
				time: '@'
			},
			template: "<div class='feed-contanier'>" + "<p class='feed-text' ng-bind-html='toHtml'></p>" + "<div class='clearfix'><img class='feed-img' ng-style='{{width}}' ng-src='{{imgurl}}' ng-repeat='imgurl in urls'></div>"
				// + "<p ng-repeat='imgurl in urls'>{{imgurl}}</p>" 
				+ "<p class='feed-time'><i class='fa fa-clock-o'></i><span> </span><span>{{time}}</span></p>" + "</div>",
			link: function(scope, element, attrs) {
				// 处理标签正则
				var regx = /:ico_.*?\d:/g;
				var text = scope.text;
				while (matches = regx.exec(scope.text)) {
					var emoji = matches[0].replace(/:/g, "");
					text = text.replace(matches[0], "<i class='" + emoji + " middle-emoji'></i>");
				};

				var mytext = text;
				scope.toHtml = $sce.trustAsHtml(mytext);
				if (scope.urls != "") {
					scope.urls = scope.imgUrls.split(",");
				}
				if (scope.urls.length > 2) {
					scope.width = {
						'width': '33.33%'
					}
				} else if (scope.urls.length == 2) {
					scope.width = {
						'width': '50%'
					}
				} else {
					scope.width = {
						'width': '100%'
					}
				}
				
			}
		}
	}]
})