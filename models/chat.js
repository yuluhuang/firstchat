//var mongodb=require('./db');
var mongodb = require('mongodb');

var mongoUri =process.env.MONGOLAB_URI ||process.env.MONGOHQ_URL ||
	'mongodb://localhost:27017/04367857m_mongo_0qw7b8g8'||
    'mongodb://dM2173QY:W73jg5JkXo1f@localhost:27017/04367857m_mongo_0qw7b8g8'||
    'mongodb://dM2173QY:W73jg5JkXo1f@10.0.31.57:27017/04367857m_mongo_0qw7b8g8'||
    'mongodb://dM2173QY:W73jg5JkXo1f@10.0.31.58:27017/04367857m_mongo_0qw7b8g8'||
	'mongodb://10.0.31.57:27017/04367857m_mongo_0qw7b8g8'||
	'mongodb://10.0.31.58:27017/04367857m_mongo_0qw7b8g8';
//var settings = require('./setting');

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
	mongodb.Db.connect(mongoUri,function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('chats',function(err,collection){
			if(err){
				 db.close();
				return callback(err);
			}
			collection.ensureIndex('name');
			collection.insert(chat,{safe:true},function(err,user){
				db.close();
				 
				 ///db.close();
				callback(err,chat);
			});
		});
	});
};

//直接调用
Chat.getAll=function get(callback){
	///
		mongodb.Db.connect(mongoUri,function(err,db){
		if(err){
			return callback(err);

		}
		//获取chats集合
		db.collection('chats',function(err,collection){
			if(err){
				db.close();
				 
				 ///db.close();
				return callback(err);
			}
			// 查找 user 屬性爲 username 的文檔，如果 username 是 null 則匹配全部
		    var query = {};
		    // if (username) {
		    //     query.user = username;
		    // }
		    //console.log(collection.find({}));
			collection.find({}).toArray(function(err, docs){
				db.close();
				 
				/// db.close();
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