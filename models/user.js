
//monoose
var mongoose=require('./mongoosedb');
var async=require('async');
//mongoose.connect("mongodb://192.168.1.210/lifeng");
var Schema = mongoose.Schema ;

var userSchema=new Schema({
	name:{type:String,index:true},
	password:String,
	login:{type:Number,default:0},
	username:{type:String,index:true},
    roleId:{
        type:Schema.ObjectId,
        ref : 'Role'
    }
},{
	conllection:"users"
});



 var userModel= mongoose.model('User',userSchema);

 function User(user){
 	this.name=user.name;
 	this.password=user.password;
 	this.username=user.username;
 };

module.exports=User;

 User.prototype.save=function(callback){
 	//var user={
 	//	name:this.name,
 	//	password:this.password,
 	//	username:this.username
 	//};

 	var newUser=new userModel(this);

 	newUser.save(function(err,user){
 		if(err){
 			return callback(err);
 		}
 		callback(null,user);
 	});
 }

  User.prototype.save200000=function(callback){
 	var user={
 		name:this.name,
 		password:this.password,
 		username:this.username
 	};
 	var users=[];
	for (var i = 0; i < 20000; i++) {
		var user={
			username:this.username+i,
			password:this.password,
			name:this.name
		};
		users.push(user);
	};
 	userModel.create(users,function(err,users){
 		callback(err,users);
 	})
 }



 User.getOne=function(username,password,callback){
 	userModel.findOne({username:username,password:password}).exec(function(err,user){
 		callback(err,user);
 	})
 }

 User.getUsername=function(username,callback){
 	userModel.findOne({username:username}).exec(function(err,user){
 		callback(err,user);
 	})
 }

User.getList=function(where,fields,options,callback){
    userModel.find(where,fields,options).exec(function(err,users){
        callback(err,users);
    })
}

User.getCount=function(where,callback){
    userModel.count(where,function(err,totals){
        callback(err,totals);
    })
}

 User.getGroup=function(name,_id,callback){
 	userModel.aggregate().match({name:name}).group({"_id":{name:"$name"},count:{"$sum":1}}).exec(function(err,users){
 		if(err){
 			callback(err);
 		}
 		callback(null,users);
 	})
 }