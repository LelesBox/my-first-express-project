/**
 * Created by li_xiaoliang on 2015/3/29.
 */
define(['marked','highlight'],function(marked,highlight){
    return{
        parsemarkdown:function(md){
            var pattern=/~.*?~/g;
            var matches=pattern.exec(md);
            while(matches!=null){
                var match=matches[0];
                console.log(match);
                var bematch=match.replace(match.charAt(0),"<div>").replace(match.substr(-1),"</div>")
                md=md.replace(match,bematch);
                matches=pattern.exec(md);
            }
            marked.setOptions({
                highlight: function (code) {
                    return highlight.highlightAuto(code).value;
                }
            });
            return marked(md)
        }
    }
})