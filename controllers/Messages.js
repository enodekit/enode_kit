/**
 * Created by lifeng on 15/3/13.
 */

var crypto =require("crypto");
var filter=require("./filter");
var async=require('async');
User = require("../models/message.js");

function Messages(app){

}

module.exports= Messages;

Messages.list=function(req,res){
    res.send("开发中");
}

Messages.create=function(req,res){
    res.send("开发中");
}

Messages.save=function(req,res){
    res.send("开发中");
}

Messages.blank=function(req,res){
    res.send("开发中");
}

Messages.show=function(req,res){
    res.send("开发中");
}

Messages.detail=function(req,res){
    res.send("开发中");
}