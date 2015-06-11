/**
 * Created by li_xiaoliang on 2015/3/29.
 */
define(['jquery'], function ($) {
    return ["$scope", "$http", "$log", "$location", "parsemarkdown", "haspermission", "utilitiesService",
        function ($scope, $http, $log, $location, parsemarkdown, permission, utilitiesService) {

            //这种鉴权服务在初始时鉴权，然后保存在某个位置，但是保存后可能会被篡改，所以
            //在进入页面时还需要进行一次鉴权。
            //console.log(valueService.state)
            if (utilitiesService.state === 'edit' && utilitiesService.lastUrl != "") {
                openRawText(utilitiesService.id);
                currentTextId = utilitiesService.id;
            }

            //permission.haspermision().then(function (permision) {
            //    if (permision==='false') {
            //        alert("请登录");
            //        $location.url('/')
            //        return
            //    }
            //}, function (err) {
            //    alert("检查权限出错");
            //    $location.url('/')
            //    return
            //})
            $scope.word = "";
            var currentTextId;
            //最近一次保存的文本，再新建文本的时候判断当前文本是否和最近保存的文本一致
            //如果不一致则提示用户保存
            var lastSaveText;
            var content = document.getElementById('content');
            var contentpanel = document.getElementById('contentpanel');
            //获取标题
            $scope.$watch('word', function (newval, oldval) {
                content.innerHTML = parsemarkdown.parsemarkdown(newval);
                //由于不明原因，highlight无法使用到背景，所以无奈只能加这句
                $('pre code').each(function (i, element) {
                    $(this).addClass('hljs');
                    //实时显示页面在更新的时候显示底部，在这里应该设一个开关
                    if (scrollToggle) {
                        contentpanel.scrollTop = contentpanel.scrollHeight;
                    }
                });
            });
            var imgIndex = 1;
            $scope.$on('uploadimg', function (event, data) {
                $scope.word += "  \n![" + imgIndex + "][" + imgIndex + "]\n[" + imgIndex + "]:" + data;
                imgIndex++;
                //$scope.$apply();
            });

            $scope.$on('submit', function () {
                $http({
                    method: "post",
                    url: "/article/uploadtext",
                    data: {
                        text: $scope.word
                    }
                }).success(function (obj) {
                    console.log("success:" + obj);
                    alert("保存成功！")
                }).error(function (err) {
                    console.log(err);
                })
            })

            $scope.$on('getText', function () {
                $http(
                    {
                        method: "get",
                        url: "/article/get"
                    }
                ).success(function (data) {
                        $scope.word = data;
                        lastSaveText = $scope.word;
                    }).error(function (err) {
                        console.log(err);
                    })
            })

            $scope.$on('send', function () {
                //如果当前存在文章id，则为提交修改
                //检查是否写标题和概要
                if (!(getTitle() && getSummary())) {
                    console.log(getSummary());
                    alert("请写标题和文章概要")
                    return;
                }
                var request;
                if (currentTextId) {
                    request = $http({
                        method: "post",
                        url: "/article/uploadtextbmob",
                        data: {
                            type: "alter",
                            id: currentTextId,
                            changes: {
                                text: $scope.word,
                                summary: getSummary(),
                                title: getTitle(),
                                tags: getTags()
                            }
                        }
                    });
                }
                else {
                    request = $http({
                        method: "post",
                        url: "/article/uploadtextbmob",
                        data: {
                            type: "new",
                            new: {
                                userid: 123,
                                text: $scope.word,
                                summary: getSummary(),
                                title: getTitle(),
                                tags: getTags()
                            }
                        }
                    });
                }
                request.success(function (data) {
                    lastSaveText = $scope.word;
                    currentTextId = data.msg.id;
                    alert(data.msg + currentTextId);
                    //成功调回首页
                    $location.url('/');
                }).error(function (err) {
                    alert(err.msg);
                })
            });

            //新建文章
            $scope.$on('newText', function () {
                if (lastSaveText !== $scope.word) {
                    alert("请先保存，再新建文本！")
                } else {
                    currentTextId = null;
                    $scope.word = "";
                }
            });

            //markdonw实时预览界面是够保持在底部
            var scrollToggle = true;
            $scope.$on('scrollToggle', function (event) {
                scrollToggle = !scrollToggle;
            });

            $scope.$emit('edit');

            //删除文本
            $scope.$on("delete", deleteArticle);

            function deleteArticle() {
                $http({
                    method: "post",
                    url: "/article/delete/" + utilitiesService.id
                }).success(function (data) {
                    $location.url("/");
                }).error(function (err) {
                    alert(err)
                })
            }

            //打开md文本
            function openRawText(id) {
                $http({
                    method: 'get',
                    url: '/article/' + id
                }).success(function (data) {
                    $scope.word = data.text;
                }).error(function (err) {
                    alert(err);
                })
            }

            function getTitle() {
                var title = document.getElementsByTagName("h1");
                if (title.length > 0)
                    return title[0].innerText
            }

            function getSummary() {
                var summary = document.getElementsByTagName("blockquote");
                if (summary.length > 0)
                    return summary[0].innerText;
            }

            function getTags() {
                //tag标签包围的
                var tags = "";
                var pattern = /<tag>(.*?)<\/tag>/g;
                var matches = pattern.exec($scope.word);
                while (matches) {
                    tags += (matches[1] + ",");
                    matches = pattern.exec(tags);
                }
                return tags.substring(0, tags.length - 1);
            }
        }]
});
