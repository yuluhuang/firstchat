var http=require('http');
var fs=require('fs');
var counter=0;
var server=http.createServer(function(req,res){
		fs.readFile('./index.html',function(error,data){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end(data,'utf-8');
	});
}).listen(3000,"127.0.0.1");
console.log('running');

var io=require('socket.io').listen(server);

io.sockets.on('connection',function(socket){

	counter++;
	//有新客户端链接 发送消息给所以老客户端
	socket.broadcast.emit('users',{number : counter});
	//新客户端链接完成 发送消息给新客户端
	socket.emit('users',{number : counter});
	socket.on("disconnect",function(){
		console.log('User disconnect');
		counter--;
		socket.broadcast.emit('users',{number : counter});

	});

});