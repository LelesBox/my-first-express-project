/**
 * Created by li_xiaoliang on 2015/4/26.
 */
define(["jquery"], function ($) {
    return ["$timeout", function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                scope.$on("ngRepeatFinished", function (evt) {
                    $(".card").hover(function () {
                        $(this).find(".img-title").toggleClass("img-title-blur");
                        $(this).find(".mask").toggleClass("mask-slideup").children(".news-title").toggleClass("news-title-hide");
                        $(this).find(".news-summary").toggleClass("summary-slideup");
                        $(this).find("hr,.news-summary-info,.news-summary-content").toggleClass("hidden");
                    });
                })
            }
        };
    }]
})
