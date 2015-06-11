/**
 * Created by li_xiaoliang on 2015/4/21.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1/exampleDb');
mongoose.connection.on('open',function(){
    console.log("connected to mongoose")
});


var Widget=new Schema({
    title:String,
    desc:{type:String,require:true},
    price:Number
});

//中间件方法，在保存之前会调用，next参数是必须
Widget.pre('save', function (next) {
    console.log("我是中间件")
    next();
});

//自定义方法，系统默认提供增删改查，但我可以根据自己情况自定义抽象方法，暂时我也用不上，先随便
//定义一个自己玩玩 http://mongoosejs.com/docs/guide.html
Widget.post('save', function (doc) {
    console.log('%s has been saved', doc);
});
Widget.methods.SayHello=function(){
    console.log( "调用自定义方法");
}

//上面的方法属于实例方法，就是调用该方法的对象必须是new出来的，接下来是静态方法,
//不要new就可以引用，详情看文档
Widget.statics.SayHi = function (name) {
    console.log(name);
}

//接下来是Virtual方法,在这里可以用作格式化
Widget.virtual('format').get(function () {
    return this.title + ' ' + this.desc+" virtual";
});
var Widget=mongoose.model('Widget',Widget);

var wid={
    title:"three1",
    desc:"three1 three1 desc",
    price:92.181
};
var widobj=new Widget(wid);
console.log(widobj.title + ' ' + widobj.desc);
console.log(widobj.format);
Widget.SayHi("Hi LeeBox");
widobj.SayHello();
widobj.save(function(err,data){
    if(err)
        throw err;
    else
        console.log("插入成功");
});

