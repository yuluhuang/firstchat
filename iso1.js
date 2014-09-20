
var express = require('express');
var Chat=require('./models/chat.js');

var http=require('http');
var fs=require('fs');
var counter=0;
var server=http.createServer(function(req,res){
		fs.readFile('./index1.html',function(error,data){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end(data,'utf-8');
	});
}).listen(3000,"127.0.0.1");
console.log('running');

var io=require('socket.io').listen(server);

io.sockets.on('connection',function(socket){

	
	socket.on("message",function(data){
		var newChat=new Chat({
			name:"11",
			content:data,
		});

		socket.emit('pushmessage',data);
		socket.broadcast.emit('pushmessage',data);

		newChat.save(function(err){
			if(err){
				//
			}else{
				console.log("success");
			}


		});
	});

});