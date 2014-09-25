var mongodb=require('./db');
var settings = require('./setting');
//var mongodb = require('mongodb');
// var mongoUri =
// 	process.env.MONGOLAB_URI ||process.env.MONGOHQ_URL ||
// 	'mongodb://localhost:27017/04367857m_mongo_0qw7b8g8'||
//     'mongodb://dM2173QY:W73jg5JkXo1f@localhost:27017/04367857m_mongo_0qw7b8g8'||
//     'mongodb://dM2173QY:W73jg5JkXo1f@mongo.jae.jd.com/04367857m_mongo_0qw7b8g8'||
//     'mongodb://dM2173QY:W73jg5JkXo1f@mongo.jae.jd.com/04367857m_mongo_0qw7b8g8'||
// 	'mongodb://mongo.jae.jd.com/04367857m_mongo_0qw7b8g8'||
// 	'mongodb://admin:admin@ds039850.mongolab.com:39850/nodeapp'||
// 	'mongodb://mongo.jae.jd.com/04367857m_mongo_0qw7b8g8';

//mongo 10.0.31.57:27017/04367857m_mongo_0qw7b8g8 -u dM2173QY -p W73jg5JkXo1f
//mongo mongo.jae.jd.com:27017/04367857m_mongo_0qw7b8g8 -u dM2173QY -p W73jg5JkXo1f
//var mongoUri ='mongodb://admin:admin@ds039850.mongolab.com:39850/nodeapp';
//mongo ds039850.mongolab.com:39850/nodeapp -u admin -p admin

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
	mongodb.open(function(err,db){

		if(err){
			return callback(err);
		}
 		db.authenticate(settings.username, settings.password, function(error, result) {
			if (error) {
				db.close();
				console.log(error);
				return;
			}

		    db.collection('chats',function(err,collection){
				if(err){
					 mongodb.close();
					return callback(err);
				}
				//collection.ensureIndex('name');
				collection.insert(chat,{safe:true},function(err,user){
					mongodb.close();
					 
					 ///db.close();
					callback(err,chat);
				});
			});
		});
 	});
};


//直接调用
Chat.getAll=function get(callback){
	///
		mongodb.open(function(err,db){

		if(err){
			return callback(err);

		}
		db.authenticate(settings.username, settings.password, function(error, result) {
			if (error) {
				db.close();
				console.log(error);
				return;
			}
			//获取chats集合
			db.collection('chats',function(err,collection){
				if(err){
					mongodb.close();
					 
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
					mongodb.close();
					 
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
	});
};