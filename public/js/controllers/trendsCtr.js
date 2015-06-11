/**
 * Created by li_xiaoliang on 2015/5/2.
 */
define(['emoji'], function(emoji) {
    return ["$scope", "$http", "$timeout", "uploadLocalService", "utilitiesService",
        function($scope, $http, $timeout, uploadLocalService, utilitiesService) {
            //$scope.$on("refresh",function(evt){
            //    console.log("refresh");
            //})
            $scope.text = "";
            emoji.createEmoji("timeline-emoji", function(name) {
                //该scope会被缓存在emoji的事件队列中，所以，在createEmoji实现中
                //会清空之前存在的事件函数 
                $scope.$apply(function() {
                    $scope.text += ":" + name + ":";
                });
            });
            if (utilitiesService.cache["feed"]) {
                $scope.feeds = utilitiesService.cache["feed"];
            }
            $http({
                url: "/feed",
                method: "GET"
            }).success(function(data) {
                if (data.state == 1) {
                    $scope.feeds = data.data.data;
                    utilitiesService.cache["feed"] = data.data.data;
                }
            }).error(function(err) {
                console.log(err);
            });

            var imgpreivew;
            //打开图片选择框
            $scope.triggerImgInput = function() {
                $("#timeline-img-input").trigger("click");
                imgpreivew = $("#trend-img-preview");
            };

            $scope.imgs = [];
            $scope.uploadLocal = function(files) {
                uploadLocalService.uploadFile(files, '/article/uploadbmob')
                    .then(function(data) {
                        if (!endWith(data, "undefined")) {
                            var img = {
                                src: data
                            };
                            $scope.imgs.push(img);
                        } else {
                            alert("图片上传失败");
                        }
                    }, function(err) {
                        console.log(err);
                    }, function(notify) {
                        console.log('progress: ' + notify + '% ');
                    });
            };

            $scope.imgClose = function(url) {
                var length = $scope.imgs.length;
                for (var i = 0; i < length; i++) {
                    if ($scope.imgs[i].src == url) {
                        $scope.imgs.splice(i, 1);
                    }
                }
            }
            $scope.submitFeed = function() {
                if ($scope.text != "") {
                    var imgs = [];
                    var length = $scope.imgs.length;
                    if (length > 0) {
                        for (var i = 0; i < length; i++) {
                            imgs.push($scope.imgs[i].src);
                        }
                    }
                    var feed = {
                        text: $scope.text,
                        imgurls: imgs.length > 0 ? imgs.join(",") : "",
                        time: utilitiesService.datefomat(new Date(), "yyyy-MM-dd hh:mm:ss")
                    }
                    $http({
                        url: "/feed/add",
                        method: "POST",
                        data: {
                            data: feed
                        }
                    }).success(function(data) {
                        console.log(data);
                    }).error(function(err) {
                        console.log(err);
                    });
                    $scope.feeds.unshift(feed);
                    utilitiesService.cache["feed"] = $scope.feeds;
                    $scope.text = "";
                    $scope.imgs = [];
                }
            }

            function endWith(target, str) {
                return target.substr(target.length - str.length, str.length) == str;
            }
        }
    ];
});