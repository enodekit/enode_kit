/**
 * Created by lifeng on 15/4/22.
 */
var crypto =require("crypto");
var fs=require("fs");
var ffmpeg = require('fluent-ffmpeg');


function AudioUpload(app){

    app.post('/audioupload',function(req,res){

        var target_path='./public/vv-box/'+req.param("value1")+"/"+req.files.file.name;-
        fs.renameSync(req.files.file.path,target_path);
        ffmpeg(target_path)       //声音转换 去视频
            .noVideo()
            .save(target_path);
        console.log("success");

        res.send("成功");
    });


}

module.exports= AudioUpload;