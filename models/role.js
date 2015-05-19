/**
 * Created by lifeng on 15/3/26.
 */
var mongoose=require('./mongoosedb');
var async=require('async');
//mongoose.connect("mongodb://192.168.1.210/lifeng");
var Schema = mongoose.Schema ;

var roleSchema=new Schema({
    name:{type:String,index:true},
    sort:Number,
    menu:{type:String,default:0},
    value:{type:String,index:true}
},{
    conllection:"roles"
});



var roleModel= mongoose.model('Role',roleSchema);

function Role(role){
    this.name=role.name;
    this.sort=role.sort;
    this.menu=role.menu;
    this.value=role.value;
};

module.exports=Role;

Role.prototype.save=function(callback){
    //var user={
    //	name:this.name,
    //	password:this.password,
    //	username:this.username
    //};

    var newRole=new userModel(this);

    newRole.save(function(err,role){
        if(err){
            return callback(err);
        }
        callback(null,role);
    });
}



Role.getOne=function(username,password,callback){
    roleModel.findOne({username:username,password:password}).exec(function(err,role){
        callback(err,role);
    })
}

Role.getUsername=function(username,callback){
    roleModel.findOne({username:username}).exec(function(err,role){
        callback(err,role);
    })
}

Role.getGroup=function(name,_id,callback){
    roleModel.aggregate().match({name:name}).group({"_id":{name:"$name"},count:{"$sum":1}}).exec(function(err,roles){
        if(err){
            callback(err);
        }
        callback(null,roles);
    })
}