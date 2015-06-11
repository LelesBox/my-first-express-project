/**
 * Created by li_xiaoliang on 2015/4/18.
 */
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

process.on('message', function (m) {
    if (m.name === 'hupuNews') {
        hupu();
    } else if (m.name === 'article') {
        getArticle(m.option.url);
    } else if (m.name == 'close' && process.connected) {
        process.disconnect();
    }
});


function hupu() {
    var newlist = new Array();
    request('http://voice.hupu.com/nba/newslist', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var $ = cheerio.load(body, {decodeEntities: false});
            var length = $('.news-list li').length
            //console.log(length);
            var count = 0;
            $('.news-list li').each(function (index, element) {
                var $news = $(this);
                var title = $news.find('h4 a').text();
                var url = $news.find('h4 a').attr('href');
                var content = $news.find('.J_share_title').text().trim();
                var time = $news.find('.time').attr('title');
                var source = $news.find('.comeFrom a').text().trim();
                var readnum = $news.find('.readNum').text().trim();
                var commentnum = $news.find('.btn-comment').text().trim().replace(/[^a-zA-Z0-9]*/g, "");

                getimg(url, function (err, data) {
                    if (err)throw  err;
                    var news = {
                        title: title,
                        url: url,
                        image: data.image,
                        content: content,
                        time: time,
                        source: source,
                        readnum: readnum,
                        commentnum: commentnum
                    }
                    newlist[index] = news;
                    //并发时单线程的好处体现出来了，不然count值会处于不同的并发线程。但实际没有
                    count++;
                    console.log(count);
                    if (count === length) {
                        process.send({newlist: newlist});
                    }
                });
                //async.waterfall([
                //    function getImgUrl(callback) {
                //        getimg(url, function (err, data) {
                //            callback(err, data)
                //        });
                //    },
                //    function collect(data, callback) {
                //        image = data.image;
                //        var news = {
                //            title: title,
                //            url: url,
                //            image: image,
                //            content: content,
                //            time: time,
                //            source: source,
                //            readnum: readnum,
                //            commentnum: commentnum
                //        }
                //        callback(null, news)
                //    }
                //], function (err, news) {
                //    if (err)
                //        throw err;
                //    newlist[index] = news;
                //    //并发时单线程的好处体现出来了，不然count值会处于不同的并发线程。但实际没有
                //    count++;
                //    if (count === length) {
                //        process.send(newlist);
                //    }
                //});
                //Promise形式
                //getimgp(url).then(function (image) {
                //        var news = {
                //            title: title,
                //            url: url,
                //            image: image,
                //            content: content,
                //            time: time,
                //            source: source,
                //            readnum: readnum,
                //            commentnum: commentnum
                //        }
                //        //newlist.push(news);
                //        newlist[index]=news;
                //        //这里有问题，因为index是随机的，也就说，它可能就是59，然后就触发下面的条件了
                //        if(newlist.length===length){
                //            console.log(newlist);
                //        }
                //    }, function (error) {
                //        return;
                //    }
                //)
            });
        }
    });
}

function getArticle(url) {
    request(url, function (error, response, body) {
        var $ = cheerio.load(body, {decodeEntities: false, normalizeWhitespace: true});
        //缩小范围
        var html = $('.voice-main').html();
        //正文内容
        var title = $(html).find('.artical-title .headline').text();
        var source = $(html).find('.comeFrom').children('a').text();
        var time = $(html).find('#pubtime_baidu').text();
        var commentnum = $(html).find('.btn-viewComment').text().replace(/[^a-zA-Z0-9]*/g, "");
        var image = $(html).find('.artical-importantPic').children('img').attr('src');
        var video = $(html).find('.artical-video-play a').attr('href') || null;
        var videoImage = $(html).find('.artical-video-play a img').attr('src') || null;
        var content = $(html).find('.artical-main-content').html();
        var article = {
            title: title,
            source: source,
            time: time,
            commentnum: commentnum,
            image: {
                imageurl: image,
                video: video,
                videoImage: videoImage
            },
            content: content
        }
        //callback({article: article});
        process.send({article: article});
        //$(html).find('.comment-list dl').each(function(){
        //    var $this=$(this);
        //    var avatar=$this.find('.userAvatar').children('a').children('img').attr('src');
        //    var username=$this.find('.userInfo-hd > .name').text();
        //    var comment=$this.find('.J_reply_content p').text();
        //    //好吧，评论的解析太复杂，各种嵌套，暂时先把主要功能做完再考虑它吧
        //})
        //console.log(commentnum);
    })
}

function getimg(url, callback) {
    request(url, function (error, response, body) {
        var $ = cheerio.load(body, {decodeEntities: false, normalizeWhitespace: true});
        var title = $('.artical-title .headline').text();
        var image = $('.artical-importantPic img').attr('src');
        var video = $('.artical-video-play a').attr('href') || null;
        var videoImage = $('.artical-video-play a img').attr('src') || null;
        var imageInfo = {
            image: image,
            video: video,
            videoImage: videoImage
        }
        callback(null, {image: imageInfo});
        //process.send({image:image});
    })
}

//在获取图片的时候实际上已经打开了网页的内容，虽然网页内容在这里不重要，但是既然都打开，为了以防下次点击正文时又要加载一遍，
//所以，在这里我们先换成body到数据库。
function getimgp(url) {
    var d = Q.defer();
    request(url, function (error, response, body) {
        if (error) {
            d.reject(error);
        } else {
            var $ = cheerio.load(body, {decodeEntities: false, normalizeWhitespace: true});
            var title = $('.artical-title .headline').text();
            var image = $('.artical-importantPic img').attr('src');
            var video = $('.artical-video-play a').attr('href');
            var videoImage = $('.artical-video-play a img').attr('src');
            var image = {
                image: image,
                video: video,
                videoImage: videoImage
            }
            d.resolve(image);
        }
    })
    return d.promise;
}
