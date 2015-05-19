/**
 * Created by lifeng on 15/4/17.
 */
/* Controllers */

var boxControllers = angular.module('boxControllers', [
    'ui.router'
]);

boxControllers.controller('IndexCtrl', ['$scope', '$state',
    function($scope, $state) {
        $state.title="盒子";
        //添加盒子
        $scope.addBox=function(){
            $state.go('addbox');
            $(".header_add_list").hide();
        }

        $scope.showAddMenu=function(){
            event.stopPropagation();//阻止事件向上冒泡
            $(".header_add_list").show();
        }
        $scope.showFaceMenu=function(){
            event.stopPropagation();//阻止事件向上冒泡
            $(".header_face_list").show();
        }

        $scope.showCapture=function(){
            //captureAudio方法成功执行后回调函数
            function captureSuccess(mediaFiles) {
                var i, len;
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    //业务逻辑
                    alert(mediaFiles[i].fullPath + " " +mediaFiles[i].name);
                    var fileURL=mediaFiles[i].fullPath;
                    var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                    options.mimeType = "text/plain";

                    var params = {};
                    params.value1 = "test";
                    params.value2 = "param";

                    options.params = params;

                    var ft = new FileTransfer();
                    ft.upload(fileURL, encodeURI("http://192.168.1.50:8080/audioupload"), win, fail, options);
                    var win = function (r) {
                        alert("Code = " + r.responseCode);
                        alert("Response = " + r.response);
                        alert("Sent = " + r.bytesSent);
                        displayVideo(r.response);
                    }

                    var fail = function (error) {
                        alert("An error has occurred: Code = " + error.code);
                        alert("upload error source " + error.source);
                        alert("upload error target " + error.target);
                    }
                }
            }

            //captureAudio方法执行失败后回调函数
            function captureError(error) {
                var msg = 'capture 发生错误: ' + error.code;
                navigator.notification.alert(msg, null, 'Uh oh!');
            }

            //录制音频开始

            navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 1});

        }
    }]);


boxControllers.controller('HomeCtrl', ['$scope', '$state',
    function($scope, $state) {
        $state.title="盒子";
    }]);

boxControllers.controller('MesCtrl', ['$scope', '$state',
    function($scope, $state) {
        $state.title="消息";
    }]);

//提醒
boxControllers.controller('AlertCtrl', ['$scope', '$state',
    function($scope, $state) {
        $state.title="提醒";
      //  $state.go('alert.yy');
    }]);

//添加用药提醒
boxControllers.controller('AlertAddYYCtrl', ['$scope', '$state',
    function($scope, $state) {
        $state.title="提醒";
    }]);


boxControllers.controller('SetCtrl',['$scope', '$state',
    function($scope, $state){
        $state.title="设置";
        $scope.setMenu=function(name){
            $(".contact").addClass("ller");
            $state.go(name);

        }
    }
])   //更多
//选择盒子样式
boxControllers.controller('BoxCheck',['$scope', '$state',
    function($scope, $state){
        $state.title="盒子";
        $scope.boxs1={display:""};
        $scope.boxs2={display:"none"};
        $scope.boxs3={display:"none"};
        $scope.boxs4={display:"none"};
        $scope.boxs=function(name){
            $scope.boxs1={display:"none"};
            $scope.boxs2={display:"none"};
            $scope.boxs3={display:"none"};
            $scope.boxs4={display:"none"};
            if(name==1){
                $scope.boxs1={display:""};
            }else if(name==2){
                $scope.boxs2={display:""};
            }else if(name==3){
                $scope.boxs3={display:""};
            }else if(name==4){
                $scope.boxs4={display:""};
            }

        }
    }
])   //更多

//选择盒子样式
boxControllers.controller('TitBox',['$scope', '$state',
    function($scope, $state){
        $state.title="盒子";
        $scope.yqtit={display:"none"};
        $scope.mask1={display:"none"};
        $scope.usetit=function(name){
            $scope.yqtit
            $scope.yqtit={display:"block"};
            $scope.mask1={display:"block"};
        }
        $scope.nouse=function(name){
            $scope.yqtit={display:"none"};
            $scope.mask1={display:"none"};
        }
        $scope.linktit=function(name){
            console.log($scope.myMessage)
        }
    }
])

//用户信息

boxControllers.controller('UserCtrl',['$scope', '$state',
    function($scope, $state){
        $state.title="用户信息";
        $(".contact").addClass("ller");
    }
])