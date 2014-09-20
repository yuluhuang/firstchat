var mongodb=require('./db');

function Chat(chat){
	this.name = chat.name;
	this.content = chat.content;
};

module.exports=Chat;

Chat.prototype.save=function save(callback){
	var chat={
		name:this.name,
		content:this.content,
	};

	mongodb.open(function(err,db){
		if(err){
			return callback(err);

		}
		db.collection('chats',function(err,collection){
			if(err){
				return callback(err);
			}
			collection.ensureIndex('name');
			collection.insert(chat,{safe:true},function(err,user){
				mongodb.close();
				callback(err,chat);
			});
		});
	});
};