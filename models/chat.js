///var mongodb=require('./db');
mongodb = require('mongodb').Db
var settings = require('./setting');

function Chat(chat){
	this.name = chat.name;
	this.content = chat.content;
};

module.exports=Chat;

//new 
Chat.prototype.save=function save(callback){
	var chat={
		name:this.name,
		content:this.content,
	};
///
	mongodb.connect(settings.url,function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('chats',function(err,collection){
			if(err){
				 mongodb.close();
				return callback(err);
			}
			collection.ensureIndex('name');
			collection.insert(chat,{safe:true},function(err,user){
				///mongodb.close();
				 
				 db.close();
				callback(err,chat);
			});
		});
	});
};

//直接调用
Chat.getAll=function get(callback){
	///
		mongodb.connect(settings.url,function(err,db){
		if(err){
			return callback(err);

		}
		//获取chats集合
		db.collection('chats',function(err,collection){
			if(err){
				///mongodb.close();
				 
				 db.close();
				return callback(err);
			}
			// 查找 user 屬性爲 username 的文檔，如果 username 是 null 則匹配全部
		    var query = {};
		    // if (username) {
		    //     query.user = username;
		    // }
		    //console.log(collection.find({}));
			collection.find({}).toArray(function(err, docs){
				///mongodb.close();
				 
				 db.close();
		        if (err) {
		          callback(err, null);
		        }

		        var posts = [];
		        docs.forEach(function(v, k) {
		        	
		            var post = new Chat(v);
		            posts.push(post);
		        });
		        callback(null, posts);
		      });
		});

	});
};