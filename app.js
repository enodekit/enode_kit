
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var socketApi=require("./controllers/SocketApi");
var http = require('http');
var path = require('path');
var os = require('os')
ejs = require('ejs');
//会话保持
var SessionStore = require('session-mongoose')(express);
var settings = require('./settings')
var flash=require('connect-flash');
var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
app.use(express.bodyParser({keepExtensions:true,uploadDir:'./public/audioupload'}));
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.cookieSession({secret : 'lifeng'}));
var store = new SessionStore({
url: "mongodb://localhost/lifeng",
interval: 120000
});
app.use(express.session({
secret : 'lifeng',
store: store,
cookie: { maxAge: 900000 }
}));

app.use(app.router);

app.use(express.static(path.join(__dirname, 'public/webapp')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);

//启动服务
var io=require('socket.io').listen(app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
}));

io.sockets.on('connection',function(socket){
    socketApi(socket);
})
var data=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var dataMenory=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
setInterval(function(){
    if(data.length>99)
    data = data.slice(1);
    var cpuS=os.cpus();
    var y=0;
    for(var i=0;i<cpuS.length;i++){
        var datas=cpuS[i].times;
        y+= (datas.user+datas.sys)/(datas.user+datas.sys+datas.idle);
       // console.log((datas.user+datas.sys)/(datas.user+datas.sys+datas.idle))
    }
    data.push(y*25+Math.random()*1);

    if(dataMenory.length>99)
        dataMenory = dataMenory.slice(1);
    var freemem=os.freemem();
    var totalmem=os.totalmem();
    var y=(totalmem-freemem)/totalmem;
    dataMenory.push(y*100+Math.random()*1);

    io.sockets.in("serverIndex").emit("cpudata",{cpu:data,menory:dataMenory});
},2000);
//http.createServer(app).listen(app.get('port'), function(){
//    console.log(os.cpus());
//  console.log('Express server listening on port ' + app.get('port'));
//});