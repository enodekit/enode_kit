
/*
 * GET home page.
 */
var crypto =require("crypto");
var filter=require("./filter");
var async=require('async');
User = require("../models/user.js");
AjaxPagedList=require("../lib/AjaxPagedList.js");

function Users(app){
    
}

module.exports= Users;

Users.list=function(req,res){
    res.render("Users/list",{action:'users'});
}

Users.ajaxlist=function(req,res){
    var ajaxPagedList=new AjaxPagedList(req);
    ajaxPagedList.find(User,{},function(err,lists){
        res.json(lists);
    });

}

Users.create=function(req,res){
	res.send("开发中");
}

Users.save=function(req,res){
	res.send("开发中");
}

Users.blank=function(req,res){
	res.send("开发中");
}

Users.show=function(req,res){
	res.send("开发中");
}

Users.detail=function(req,res){
	res.send("开发中");
}


