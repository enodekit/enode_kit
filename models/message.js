/**
 * Created by lifeng on 15/3/11.
 */
// 消息表
var mongoose=require('./mongoosedb');
var async=require('async');
var Schema = mongoose.Schema ;

var messageSchema=new Schema({
    name:{type:String,index:true},   //药名
    style:String,                //样式
    color:String,    //颜色
    boxId:{type:String,index:true},   //药盒ID
    type:{type:Number},  //提醒类型（盒内药提醒/非盒内药提醒）
    messageTime:{type:Array}  //提醒时间
},{
    conllection:"message"
});



var messageModel= mongoose.model('Message',messageSchema);

function Message(message){
    this.name=message.name;
    this.style=message.style;
    this.color=message.color;
    this.sex=message.sex;
    this.username=message.username;
    this.weixin=message.weixin;
    this.age=message.age;
};

module.exports=Message;

Message.prototype.save=function(callback){

    var newMessage=new messageModel(this);

    newMessage.save(function(err,message){
        if(err){
            return callback(err);
        }
        callback(null,message);
    });
}



Message.getOne=function(username,password,callback){
    messageModel.findOne({username:username,password:password}).exec(function(err,message){
        callback(err,message);
    })
}

Message.getUsername=function(username,callback){
    messageModel.findOne({username:username}).exec(function(err,message){
        callback(err,message);
    })
}

Message.getGroup=function(name,_id,callback){
    messageModel.aggregate().match({name:name}).group({"_id":{name:"$name"},count:{"$sum":1}}).exec(function(err,messages){
        if(err){
            callback(err);
        }
        callback(null,messages);
    })
}
