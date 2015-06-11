/**
 * Created by li_xiaoliang on 2015/3/24.
 */
define([
    "angular",
    "filters/subStrFilter"
], function (angular,
             subStrFilter) {
    angular.module("app.filters", [])
        .filter("subStr", subStrFilter);
});