/**
 * Created by lifeng on 15/3/20.
 */
var crypto =require("crypto");
var filter=require("./filter");
var async=require('async');

function Weixin(app){

}

module.exports= Weixin;

Weixin.index=function(req,res){
    res.render("Weixin/index");
}
