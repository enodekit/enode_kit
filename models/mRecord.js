/**
 * Created by lifeng on 15/3/11.
 */
var mongoose=require('./mongoosedb');
var async=require('async');
var Schema = mongoose.Schema ;

var mrecordSchema=new Schema({
    name:{type:String,index:true},   //姓名
    password:String,                //密码
    sex:{type:Number,default:0},    //性别
    username:{type:String,index:true},   //用户名、手机号
    weixin:{type:String,index:true},  //微信账号绑定
    age:{type:Number,default:0},  //年龄
    boxIds:{type:Array}
},{
    conllection:"mrecord"
});



var mrecordModel= mongoose.model('MRecord',mrecordSchema);

function MRecord(mrecord){
    this.name=mrecord.name;
    this.password=mrecord.password;
    this.username=mrecord.username;
    this.sex=mrecord.sex;
    this.username=mrecord.username;
    this.weixin=mrecord.weixin;
    this.age=mrecord.age;
};

module.exports=MRecord;

MRecord.prototype.save=function(callback){

    var newMRecord=new mrecordModel(this);

    newMRecord.save(function(err,mrecord){
        if(err){
            return callback(err);
        }
        callback(null,mrecord);
    });
}



MRecord.getOne=function(username,password,callback){
    mrecordModel.findOne({username:username,password:password}).exec(function(err,mrecord){
        callback(err,mrecord);
    })
}

MRecord.getUsername=function(username,callback){
    mrecordModel.findOne({username:username}).exec(function(err,mrecord){
        callback(err,mrecord);
    })
}

MRecord.getGroup=function(name,_id,callback){
    mrecordModel.aggregate().match({name:name}).group({"_id":{name:"$name"},count:{"$sum":1}}).exec(function(err,mrecords){
        if(err){
            callback(err);
        }
        callback(null,mrecords);
    })
}
