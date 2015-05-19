/**
 * Created by lifeng on 15/3/11.
 */
var mongoose=require('./mongoosedb');
var async=require('async');
var Schema = mongoose.Schema ;

var brecordSchema=new Schema({
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



var brecordModel= mongoose.model('BRecord',brecordSchema);

function BRecord(brecord){
    this.name=box.name;
    this.password=box.password;
    this.username=box.username;
    this.sex=box.sex;
    this.username=box.username;
    this.weixin=box.weixin;
    this.age=box.age;
};

module.exports=BRecord;

BRecord.prototype.save=function(callback){

    var newBRecord=new brecordModel(this);

    newBRecord.save(function(err,brecord){
        if(err){
            return callback(err);
        }
        callback(null,brecord);
    });
}



BRecord.getOne=function(username,password,callback){
    brecordModel.findOne({username:username,password:password}).exec(function(err,brecord){
        callback(err,brecord);
    })
}

BRecord.getUsername=function(username,callback){
    boxModel.findOne({username:username}).exec(function(err,brecord){
        callback(err,brecord);
    })
}

BRecord.getGroup=function(name,_id,callback){
    brecordModel.aggregate().match({name:name}).group({"_id":{name:"$name"},count:{"$sum":1}}).exec(function(err,brecords){
        if(err){
            callback(err);
        }
        callback(null,brecords);
    })
}
