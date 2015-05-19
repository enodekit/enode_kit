
/*
 * GET home page.
 */
var crypto =require("crypto");
var filter=require("../controllers/filter");
Secure=require("../controllers/Secure");
Application=require("../controllers/Application");
AudioUpload=require("../controllers/App/AudioUpload");
CCAgreement=require("../lib/CCAgreement");
User = require("../models/user.js");

module.exports= function(app){


    app.use(function(req,res){
        res.render("error/404");
    })

	Application(app);  //主入口
	Secure(app);     //登陆 注册
    AudioUpload(app);  //声音上传


// requests will never reach this route


    app.use("/:controller/:action",function(req,res,next){
        console.log(222);
    })

    app.all("/database/:value?",function(req,res,next){
        var sss=new CCAgreement("1");    //创建对应盒子编号的下发命令
        sss.param(1,1,1,1,2,"0000000000.amr");   //写入任务内容
        var times=new Array();               //任务的执行时间
        times.push(new Date().getTime());
        times.push(new Date().getTime());
        times.push(new Date().getTime());
        sss.setData(times);
        console.log("value:"+req.param("value"));
        console.log("body:"+req.param("body"));
        console.log(new Date())
       res.send(sss.getValue());
    })

	app.all("/:controller/:action",function(req,res,next){
		var controller=req.param("controller");
		var action=req.param("action");
		if(Application[controller]&&Application[controller][action]){
			filter.checkLogin(req,res);   //登陆验证
			Application[controller][action](req,res,next);
		}else{
			next();
		}
	})
}