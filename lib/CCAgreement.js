/**
 * Created by lifeng on 15/4/28.
 */
/**
 * 即时任务和定时任务下发  即时任务 无孔参数 无任务ID  操作类型增 0  无操作间隔  声音名称 时间戳加.amr
 *                      定时任务
 * @type {exports}
 */
var crypto = require('crypto');

module.exports=CCAgreement;


function CCAgreement(deviceID){
    this.deviceID=stringToHex(deviceID,12);
}
/**
 *
 * @param type   任务类型  0 定时 1 即时
 * @param k    大小孔  0  无孔 1 小孔 2 大孔
 * @param id   任务ID  0--255
 * @param state  操作类型  0 增 1 删 2 改
 * @param jg  操作的时间间隔 分钟单位
 * @param filepath  文件名
 */
CCAgreement.prototype.param=function(type,k,id,state,jg,filepath){
    this.paramdata=toHexString(type)+ toHexString(k)+toHexString(id)+toHexString(state)+toHexString(jg,2)+stringToHex(filepath);
   // console.log(this.paramdata);
}

CCAgreement.prototype.setData=function(times){
    this.timeval=toHexString(times.length);
    for(var x in times){
       var time=Math.floor(times[x]/60000);
        this.timeval+=toHexString(time,4);
    }
  //  console.log(this.timeval);
}

CCAgreement.prototype.getValue=function(){
    var value=this.paramdata+"0000000000000000"+this.timeval;
    var sjc=Math.floor(new Date().getTime()/1000);
    value=this.deviceID+sjc.toString(16)+toHexString(value.length/2,2)+value;
    var nInputLength = value.length;
    var StrHex = "";
    if(nInputLength%2 == 0) //当输入够偶数位；
    {

        for (var i=0; i < nInputLength; i = i + 2 )
        {
            var str = value.substr(i, 2); //16进制；
            //StrHex = StrHex + .toString(16);

            var n = parseInt(str, 16);//10进制；
            StrHex = StrHex + String.fromCharCode(n);
        }

    }
    var md5=crypto.createHash('md5');
    sjc=md5.update(StrHex).digest('hex');
    value=sjc+value;
    console.log(value);
    console.log(value.length);
    return value;
}


function toHexString(value,len){
    if(len==null)len=1;
    value=value.toString(16);
    while(value.length<len*2){
        value="0"+value;
    }
    return value;
}

function stringToHex(str,len){
    var val="";
    for(var i=0;i<str.length;i++){
        if(val==""){
            val=toHexString(str.charCodeAt(i));
        }else{
            val+=toHexString(str.charCodeAt(i));
        }
    }
    if(len!=null){
        while(val.length<len*2){
            val="00"+val;
        }
    }
    return val;
}

var value='000000000000000000000000040000000F00040100000000000000000000000000';
var nInputLength = value.length;
if(nInputLength%2 == 0) //当输入够偶数位；
{
    var StrHex = "";
    for (var i=0; i < nInputLength; i = i + 2 )
    {
        var str = value.substr(i, 2); //16进制；
        //StrHex = StrHex + .toString(16);

        var n = parseInt(str, 16);//10进制；
        StrHex = StrHex + String.fromCharCode(n);
    }
    var md5=crypto.createHash('md5');
    sjc=md5.update(StrHex).digest('hex');
    console.log(sjc);
}

var sjc=Math.floor(new Date().getTime()/1000);
console.log(sjc);
