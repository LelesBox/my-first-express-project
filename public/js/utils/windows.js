define(function(require, exports, module) {
    var screenheight=document.documentElement.clientHeight;
    imgdiv.style.width = "100%";
    imgdiv.style.maxWidth = "100%";
    imgdiv.style.height =screenheight + "px";

    //    require(['./utils'], function(util) {
    //        console.log(util);
    //        console.log(util.hasClass(secondiv, 'hidden'));
    //        util.removeClass(secondiv,'hidden');
    //    });
    //    console.log(secondiv.className)
    window.onresize = function() {
        imgdiv.style.width = "100%";
        imgdiv.style.maxWidth = "100%";
        imgdiv.style.height = (document.documentElement.clientHeight) + "px";
    }
});