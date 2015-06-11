/**
 * Created by 14062539 on 2015/3/30.
 * 虽然取名叫menubarCtr，但其实它的位置是全局的控制器，所以点击菜单触发事件才能
 * 传到它的子控制器里去响应事件。
 */
define([], function () {
    return ["$scope", "$http", "$state", "$location", 'uploadLocalService', 'haspermission',
        function ($scope, $http, $state, $location, uploadLocalService, haspermission) {
            $scope.noEdit = true;
            $scope.noPermission = true;

            haspermission.haspermision().then(function (permision) {
                if (permision === 'true')
                    $scope.noPermission = false;
            }, function (err) {
                alert("检查权限出错");
                $location.url('/')
                return;
            })
            $scope.menus = {
                pull: 'pull',
                edit: 'edit',
                addimg: 'addimg',
                scrollswitchopen:'scrollswitchopen',
                scrollswitchclose:'scrollswitchopen',
                delete:'delete',
                send: 'send',
                tag: 'tag',
                weibo: 'weibo',
                github: 'github',
                coding:'coding',
                news:'news'
            }

            $scope.actionClick = function (actionType) {
                if(actionType==='news'){
                    $state.go('index.hupunba');
                }else {
                    $scope.$broadcast(actionType);//在writepageCtr处理事件
                }
                if(actionType==='send')
                $scope.noEdit = true;
            }


            //接收是否回到首页，如果首页，菜单栏图表要做相应变化
            $scope.$on('onHome', function(){
                $scope.noEdit = true
            })

            $scope.$on('edit', function () {
                $scope.noEdit=false
            });

            //接收

            $scope.uploadLocal = function (files) {
                uploadLocalService.uploadFile(files, '/article/uploadbmob')
                    .then(function (data) {
                        console.log('file uploaded. Response: ' + data);
                        $scope.$broadcast('uploadimg', data);
                    }, function (err) {
                        console.log(err);
                    }, function (notify) {
                        console.log('progress: ' + notify + '% ');
                    })
            }

            $scope.submitText = function () {
                $scope.$broadcast('submit');
            }

            $scope.getText = function () {
                $scope.$broadcast('getText');
            }

            $scope.submitTextToBmob = function () {
                $scope.$broadcast("subtobmob");
            }

            $scope.openTextfromBmob = function () {
                $scope.$broadcast("openfrombmob");
            }

            $scope.newText = function () {
                $scope.$broadcast("newText");
            }
        }
    ]
})
;