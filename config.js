/**
 * Created by li_xl on 15-4-11.
 */
var config={
    bmob:{
        applicationid:"d88c6158356134f67a54b48469d04020",
        restapikey:"f85e9e66fc88902b82f1e0487c69cf78",
        masterkey:"b045f440c39fec51e33a0eeeae268fad",
        accesskey:"211c8bb93517581b796143ee490d53e2",
        secretkey:"9a5796ab0814f183"
    },
    github:{
        clientID:'41f2f39af10df46e7c67',
        clientSecret:'44d66817fa19deb052c299fe0bf1fd42fe0ed343',
        callbackURL:"http://localhost:3000/login/github/callback"
    },
    redis_host: '127.0.0.1',
    redis_port: 6379,

    session_secret: 'myblog_secret', // 务必修改
    auth_cookie_name: 'node_club',

    username:'leebox',
    password:'123',

<<<<<<< HEAD
    db:'mongodb://127.0.0.1/myblog',
    // db:'mongodb://leebox:519261612@ds045097.mongolab.com:45097/leebox',
=======
    // db:'mongodb://127.0.0.1/myblog',
    db:'mongodb://leebox:519261612@ds045097.mongolab.com:45097/leebox',
>>>>>>> 88157085d5ed6546c2de93ad7032eb5ff6252f3b
    crypto:"md5",
    passkey:"my_blog"
}
module.exports=config;
