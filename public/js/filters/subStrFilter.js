/**
 * Created by li_xiaoliang on 2015/4/21.
 */
define([], function () {
    return [function () {
        var subStringFilter=function (input,start,length) {
            if(typeof input=='string'){
                var start=start||0;
                var length=length||input.length;
                var substr=input.substr(start,length);
                if(length>=input.length)
                return substr;
                else
                return substr+"..."
            }else{
                throw Error("input shuold be String or number should be number")
            }
        }
        return subStringFilter;
    }]
})
