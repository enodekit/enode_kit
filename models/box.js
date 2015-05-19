/**
 * Created by lifeng on 15/3/11.
 */
//盒子表
var mongoose=require('./mongoosedb');
var async=require('async');
var Schema = mongoose.Schema ;

var boxSchema=new Schema({
    name:{type:String,index:true},   //姓名
    password:String,                //密码
    sex:{type:Number,default:0},    //性别
    username:{type:String,index:true},   //用户名、手机号
    weixin:{type:String,index:true},  //微信账号绑定
    age:{type:Number,default:0},  //年龄
    boxIds:{type:Array}
},{
    conllection:"box"
});



var boxModel= mongoose.model('Box',boxSchema);

function Box(box){
    this.name=box.name;
    this.password=box.password;
    this.username=box.username;
    this.sex=box.sex;
    this.username=box.username;
    this.weixin=box.weixin;
    this.age=box.age;
};

module.exports=Box;

Box.prototype.save=function(callback){

    var newBox=new boxModel(this);

    newBox.save(function(err,box){
        if(err){
            return callback(err);
        }
        callback(null,box);
    });
}



Box.getOne=function(username,password,callback){
    boxModel.findOne({username:username,password:password}).exec(function(err,box){
        callback(err,box);
    })
}

Box.getUsername=function(username,callback){
    boxModel.findOne({username:username}).exec(function(err,box){
        callback(err,box);
    })
}

Box.getGroup=function(name,_id,callback){
    boxModel.aggregate().match({name:name}).group({"_id":{name:"$name"},count:{"$sum":1}}).exec(function(err,boxes){
        if(err){
            callback(err);
        }
        callback(null,boxes);
    })
}
