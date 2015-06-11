/**
 * Created by li_xiaoliang on 2015/4/30.
 */
define([],function(){
    return["utilitiesService",function(utilitiesService){
        return{
            restrict: 'E',
            replace: true,
            transclude: true,
            scope:{
              styleUrl:'@'
            },
            link:function(scope,element,attrs){
                console.log(scope.styleUrl);
                utilitiesService.loadCss(scope.styleUrl);
                scope.stylerl=scope.styleUrl;
            }
        }
    }]
})
