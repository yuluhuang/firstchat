var settings = require('./setting.js');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
//var MONGOHQ_URL="mongodb://fc19zAhk:ng08AuXlIWe7@server.mongohq.com:27017/04367857m_mongo_23fi32ue"//这个url就是mongohq给的Connection string
module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT,{}), {safe: true});
