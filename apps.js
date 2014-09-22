var Chat=require('./models/chat.js');
var settings = require('./models/setting');
var express = require('express'),
  app = express(),
  //fs=require('fs'),
  //routes = require('./routes'),
  server = require('http').createServer(app),
 // server = app.createServer();//error
  io = require('socket.io').listen(server),
  nicknames = [];

app.set('port', process.env.PORT || 3000);//设置监听端口

io.sockets.on('connection', function (socket) {
  socket.on('nickname', function (data, callback) {
    if (nicknames.indexOf(data) !== -1) {
      callback(false);//返回客户端消息
    } else {
      callback(true);
      nicknames.push(data);//添加到列表
      socket.nickname = data;
      console.log('Nicknames are ' + nicknames);
      //更新客户端昵称列表
      io.sockets.emit('nicknames', nicknames);
      //发送消息给已连接的用户（不包括此用户）
      socket.broadcast.emit('announcement', {
        nick: 'system',
        message: data + ' connected'
      });
    }
  });
  socket.on('user message', function (data) {

    //?是不是代表发给所以客户端（已连接和正在连接）
    // io.sockets.emit('user message', {
    //   nick: socket.nickname,
    //   message: data
    // });
    //等同与
    //socket.emit('pushmessage',data);
    //socket.broadcast.emit('pushmessage',data);


    //new 一个 Chat
    var newChat=new Chat({
      name:"11",
      content:data,
    });
    newChat.save(function(err){
      if(err){
        //
      }else{
        console.log("success");
      }
    });
    socket.broadcast.emit('announcement', {
        nick: socket.nickname,
        message: data 
      });
  });

  socket.on('disconnect', function () {
    if (!socket.nickname) { return; }
    if (nicknames.indexOf(socket.nickname) > -1) {
       nicknames.splice(nicknames.indexOf(socket.nickname), 1);
    }
    console.log('Nicknames are ' + nicknames);
    socket.broadcast.emit('announcement', {
      nick: 'system',
      message: socket.nickname + ' disconnected'
    });
    io.sockets.emit('nicknames', nicknames);
  });

  //获取历史记录
  socket.on('getinfo',function(data){
    console.log('Nicknames are ');
    //直接调用
    Chat.getAll(function(err,chats){
      if(err){
        //
      }else{
        //send to 客户端
        io.sockets.emit('chats', chats);
      }
    });
  });


});

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  app.use(express.session({
    secret: settings.cookieSecret,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    url: settings.url
  }));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

//app.get('/', routes.index);
app.get('/', function(req,res){
    //res.send('index.html');
    // res.render('index', { title: 'Express' });
    //res.sendfile(__dirname + '/index.html');
    res.redirect('./index.html');
});

//开始监听
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
