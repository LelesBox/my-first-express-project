/**
 * Created by li_xl on 15-4-11.
 */
var nodemailer=require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter=nodemailer.createTransport(smtpTransport({
    //host:"smtp.qq.com",
    //service:'QQ',
    //secureConnection:true,
    //port:465,
    "domains": [
        "qq.com"
    ],
    "host": "smtp.qq.com",
    "port": 465,
    "secure": true,
    auth:{
        user:"li_xiaoliang@foxmail.com",
        pass:"zsl13263383804"
    }
}));

var mailOptions={
    from:"Test li_xiaoliang<519261612@qq.com>",
    to:"li_xiaoliang@foxmail.com",
    subject:"Hello Test NodeMailer",
    html:"<b>thanks a for visiting! this is come from foxmail</b> 世界真奇妙"
}

transporter.sendMail(mailOptions, function (err, respone) {
    if(err)
    console.log(err);
    else{
        console.log("Message sent:"+respone.message);
    }
    transporter.close();
})
//var nodemailer = require('nodemailer');
//var transporter = nodemailer.createTransport();
//transporter.sendMail({
//    from: '519261612@qq.com',
//    to: 'li_xiaoliang@foxmail.com',
//    subject: 'hello',
//    text: 'hello world!'
//});
console.log("发送邮件啦")