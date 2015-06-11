/**
 * Created by li_xiaoliang on 2015/5/2.
 */
define(['rome-timepicker'], function (rome) {
    return ["utilitiesService", "$http", "$state",
        function (utilitiesService, $http, $state) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    var todoheader = $("#todo-header");
                    var todoing = $("#tag-todoing");
                    var tododone = $("#tag-todoed");
                    var add = $("#tag-todo-add");
                    var todoul = $("#todo-ul");
                    todoing.click(function () {
                        todoheader.css({"border-bottom": "5px orange solid"});
                        tododone.css({"opacity": "0.1"});
                        todoing.css({"opacity": "1"});
                        todoul.animate({left: "0"}, 300);
                    });
                    tododone.click(function () {
                        todoheader.css({"border-bottom": "5px green solid"});
                        todoing.css({"opacity": "0.1"});
                        tododone.css({"opacity": "1"});
                        todoul.animate({left: "-100%"}, 300);
                    });

                    var openTodoText = false;
                    add.click(function () {
                        if (!openTodoText) {
                            $("#add-todo-text").css({"display": "block"});
                            $("#add-todo-text").animate({height: "140px"}, 300, function () {
                                openTodoText = true;
                            });
                        } else {
                            $("#add-todo-text").animate({height: "0"}, 300, function () {
                                openTodoText = false;
                                $("#add-todo-text").css({"display": "none"});
                            });
                        }
                    });
                    utilitiesService.loadCss("js/libs/rome-datetimepicker/dist/rome.min.css");
                    rome(dt);

                    $(".todo-edit-undo").click(function () {
                        $("#add-todo-textarea").val("").focus();
                    });

                    $(".todo-edit-cancel").click(function () {
                        $("#dt").val("");
                        $("#add-todo-textarea").val("");
                        add.trigger("click");
                    });

                    $(".todo-edit-send").click(function () {
                        var datetime = $("#dt").val();
                        var date = new Date(datetime);
                        var text = $("#add-todo-textarea").val();
                        if (datetime && text) {
                            $http({
                                method: "post",
                                url: "/todo/addtodo",
                                data: {
                                    year: date.getFullYear(),
                                    //js里月份是从0开始的，这里加1是为了防止不必要的理解麻烦
                                    month: date.getMonth() + 1,
                                    day: date.getDate(),
                                    hour: date.getHours(),
                                    minute: date.getMinutes(),
                                    second: date.getSeconds(),
                                    text: text
                                }
                            }).success(function (data) {
                                if (data.status !== 1) {
                                    alert(data.msg);
                                }
                                alert("添加成功");
                                //$(".todo-edit-cancel").trigger("click");
                                $("#dt").val("");
                                $("#add-todo-textarea").val("");
                                scope.$emit("refresh", data.data);

                            }).error(function (err) {
                                alert(err);
                            })
                        }
                    });

                    //等待卡片加载完成后再挂载事件
                    var firstIn = true;
                    scope.$on("ngRepeatFinished", function (evt) {
                        if (!firstIn) {
                            return;
                        }
                        firstIn = false;
                        $(".todo-delay").click(function () {
                            delayTodo($(this).siblings("input").val());
                        });
                        /* $(".todo-done").click(function () {
                         doneTodo($(this).siblings("input").val());
                         });*/
                        //事件委托删除事件
                        $(".todo-day").delegate(".todo-cancel", "click", function () {
                            deleteTodo($(this).siblings("input").val());
                        });
                        //事件委托完成事件
                        $(".todo-day").delegate(".todo-done", "click", function () {
                            var id_order = $(this).siblings("input").val();
                            var text = $(this).parent().siblings("p").text();
                            doneTodo(id_order, text);
                        });
                        var todoul = $("#todo-ul");
                        todoing.click(function () {
                            todoul.animate({left: "0"}, 300);
                        });
                        tododone.click(function () {
                            todoul.animate({left: "-100%"}, 300);
                        });
                    });

                    function doneTodo(id_order, text) {
                        var id = id_order.split(",")[0];
                        var order = id_order.split(",")[1];
                        //
                        $http({
                            method: "post",
                            url: "/todo/done/" + id
                        }).success(function (data) {
                            if (data.status === 1) {
                                scope.$emit("donetodo", order, text);
                            } else {
                                alert("更新失败");
                            }
                        }).error(function (err) {
                            alert("更新todo失败" + err);
                        })
                    }

                    function delayTodo(id) {

                    }

                    //    删除todo
                    function deleteTodo(id_order) {
                        var id = id_order.split(",")[0];
                        var order = id_order.split(",")[1];
                        $http({
                            method: "delete",
                            url: "/todo/del/" + id
                        }).success(function (data) {
                            if (data.status === 1) {
                                scope.$emit("deleteCard", order);
                            } else {
                                alert("删除失败");
                            }
                        }).error(function (err) {
                            alert("删除todo失败" + err);
                        })
                    }

                    /**************************timeline*****************************/
                    var timelineadd = $("#tag-timeline-add");
                    var opentimelineText = false;
                    //发状态输入框
                    timelineadd.click(function () {
                        if (!opentimelineText) {
                            $("#timeline-add").css({"display": "block"});
                            $("#timeline-add").animate({height: "140px"}, 300, function () {
                                opentimelineText = true;
                            });
                        } else {
                            $("#timeline-add").animate({height: "0"}, 300, function () {
                                opentimelineText = false;
                                $("#timeline-add").css({"display": "none"});
                            });

                        }
                    });

                }
            }
        }]
})