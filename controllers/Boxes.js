/**
 * Created by lifeng on 15/3/13.
 */

/*
 * GET home page.
 */
var crypto =require("crypto");
var filter=require("./filter");
var async=require('async');
Box = require("../models/box.js");

function Boxes(app){

}

module.exports= Boxes;

Boxes.chart=function(req,res){
    res.render("Boxes/chart",{action:'boxes',user:req.session.user});
}

Boxes.list=function(req,res){
    res.render("Boxes/list",{action:'boxes',user:req.session.user});
}

Boxes.create=function(req,res){
    res.send("开发中");
}

Boxes.save=function(req,res){
    res.send("开发中");
}

Boxes.blank=function(req,res){
    res.send("开发中");
}

Boxes.show=function(req,res){
    res.send("开发中");
}

Boxes.detail=function(req,res){
    res.send("开发中");
}


