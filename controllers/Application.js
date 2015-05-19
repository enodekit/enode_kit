
/*
 * GET home page.
 */
var crypto =require("crypto");
var filter=require("./filter");
Application.users=require("./Users.js");
Application.menus=require("./Menus.js");
Application.boxes=require("./Boxes.js");
Application.apps=require("./Apps.js");
Application.brecords=require("./BRecords.js");
Application.messages=require("./Messages.js");
Application.mrecords=require("./MRecords.js");
Application.weixin=require("./Weixin.js");
Application.roles=require("./Roles.js");

function Application(app){

	app.get('/',filter.checkLogin,Application.index);


}

module.exports= Application;

Application.index=function(req, res){
	var forwardedIpsStr =req.ip;//req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
	res.render('Application/index', { action:'application',ip:forwardedIpsStr });
}