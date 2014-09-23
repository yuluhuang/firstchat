module.exports = {
  cookieSecret: 'nodechat',
  //db: "mongodb://fc19zAhk:ng08AuXlIWe7@10.0.31.20:27017/04367857m_mongo_23fi32ue",//'04367857m_mongo_23fi32ue',
  //host: '10.0.31.20',
  //db:"fc19zAhk:ng08AuXlIWe7@04367857m_mongo_23fi32ue",
  db:'04367857m_mongo_23fi32ue',
  host: 'localhost',
  url:process.env.MONGOLAB_URI ||process.env.MONGOHQ_URL ||'mongodb://fc19zAhk:ng08AuXlIWe7@10.0.31.20:27017/04367857m_mongo_23fi32ue',

};
