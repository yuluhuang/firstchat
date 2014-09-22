'use strict';
/*
*用户登录 将nickName 发送到后台
*后台判断是否存在返回true or false
*同时广播更新客户端用户列表，和新用户连接的提示消息的广播
*用户发送消息 后台接收并广播
*/
var app=angular.module("chatapp",[]);
app.controller("chatCtrl",function($scope,$rootScope,$interval){
	$scope.state=true;
	$scope.usersList=[];
	$scope.messageList=[];
	$scope.nickName="";
	var socket = io.connect();
	var aa = document.getElementById('scroll');
	$scope.login=function(){
		console.log($scope.nickName);

		socket.emit('nickname', $scope.nickName, function (data) {
			console.log(data);
			if (data) {
				//回调函数里 绑定失效
				//使用$apply 触发脏检查
				$rootScope.$apply(function(){
					$scope.state=false;
				});
			} else {
			 alert("用户已存在")
			}
		});
	};
	 // document.onkeydown = function () {
  //           if (event.keyCode == 13) { //回车事件
  //              $scope.send();
              
  //           }
  //       };

	$scope.send=function(){

		//console.log($scope.content);
		var _content=$scope.content;
		if(_content){
			socket.emit('user message', _content);
			var u={};
			u.name=$scope.nickName;
			u.content=_content;
			u.direction=true;
	    	$scope.messageList.push(u);
	    	console.log($scope.messageList);
			$scope.content="";
			
			$scope.$$postDigest(function () {
            		$scope.scroll();
       		 });

		}else{
			alert("内容不能为空");
		}
	}

	//获取昵称列表
	 socket.on('nicknames', function (data) {
		$rootScope.$apply(function(){
	    	$scope.usersList=data;
	    });
	 });

    /*
    *有新用户连接时的提示
    */
    socket.on('announcement', function (data) {
    	console.log(data);
    	$rootScope.$apply(function(){
	    	$scope.messageList.push(data);
	    });
    	$scope.scroll();
    });
    /*
    *获取别人发送的信息
    */
    socket.on('user message', function (data) {
    	console.log(data);
    	$rootScope.$apply(function(){
	    	$scope.messageList.push(data);

	    	
	    });
		$scope.scroll();
   });

    //客户端接收 历史记录
    socket.on('chats', function (data) {
    	console.log(data);
    	$rootScope.$apply(function(){
	    	$scope.messageList=data;

	    	
	    });
    	$scope.scroll();
    });

	$scope.scroll=function(){
		
		  aa.scrollTop= aa.scrollHeight;    //置底
		  console.log(aa.scrollTop);

	}
	//获取历史记录
	$scope.showinfos=function(){
		console.log("11");
		socket.emit('getinfo', {});
		
	}

});