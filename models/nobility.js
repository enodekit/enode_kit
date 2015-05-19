/**
 * Created by lifeng on 15/3/11.
 * app用户
 */
var mongoose=require('./mongoosedb');
var async=require('async');
var Schema = mongoose.Schema ;

var nobilitySchema=new Schema({
    name:{type:String,index:true},   //姓名
    password:String,                //密码
    sex:{type:Number,default:0},    //性别
    username:{type:String,index:true},   //用户名、手机号
    weixin:{type:String,index:true},  //微信账号绑定
    age:{type:Number,default:0},  //年龄
    boxIds:{type:Array}
},{
    conllection:"nobility"
});



var nobilityModel= mongoose.model('Nobility',nobilitySchema);

function Nobility(nobility){
    this.name=nobility.name;
    this.password=nobility.password;
    this.username=nobility.username;
    this.sex=nobility.sex;
    this.username=nobility.username;
    this.weixin=nobility.weixin;
    this.age=nobility.age;
};

module.exports=Nobility;

Nobility.prototype.save=function(callback){

    var newNobility=new nobilityModel(this);

    newNobility.save(function(err,nobility){
        if(err){
            return callback(err);
        }
        callback(null,nobility);
    });
}



Nobility.getOne=function(username,password,callback){
    nobilityModel.findOne({username:username,password:password}).exec(function(err,nobility){
        callback(err,nobility);
    })
}

Nobility.getUsername=function(username,callback){
    nobilityModel.findOne({username:username}).exec(function(err,nobility){
        callback(err,nobility);
    })
}

Nobility.getGroup=function(name,_id,callback){
    nobilityModel.aggregate().match({name:name}).group({"_id":{name:"$name"},count:{"$sum":1}}).exec(function(err,nobilitys){
        if(err){
            callback(err);
        }
        callback(null,nobilitys);
    })
}