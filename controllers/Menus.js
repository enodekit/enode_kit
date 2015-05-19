
/*
 * GET home page.
 */
var crypto =require("crypto");
var filter=require("./filter");
var async=require('async');
User = require("../models/user.js");
Menu = require("../models/menu.js");
AjaxPagedList=require("../lib/AjaxPagedList.js");


function Menus(app){
    
}

module.exports= Menus;

Menus.list=function(req,res){
	res.render("Menus/list",{action:'menus',user:req.session.user});
}

Menus.ajaxlist=function(req,res){
    var ajaxPagedList=new AjaxPagedList(req);
    ajaxPagedList.find(Menu,{},function(err,lists){
        res.json(lists);
    });

}

Menus.create=function(req,res){
	var menus=new Menu(req.body.menu);
	menus.save(function(err,obj){
		if(err){
			console.log(err);
			res.send("失败");
		}else{
			res.send("成功");
		}
	})
}

Menus.save=function(req,res){
	var menus=new Menu(req.body.menu);
	menus.save(function(err,obj){
		if(err){
			res.send("失败");
		}else{
			res.send("成功");
		}
	})
	
}



Menus.blank=function(req,res){
	Menu.getList({pid:"0"},function(err,list){
		res.render("Menus/blank",{list:list});
	});
}

Menus.show=function(req,res){
	res.send("开发中");
}

Menus.detail=function(req,res){
	res.send("开发中");
}

Menus.load=function(req,res){
	res.render("Menus/load");
}

