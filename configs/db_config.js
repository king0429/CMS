//引入数据库操作模块
var mongoose = require('mongoose');
//数据库地址
var dbUrl = 'mongodb://localhost:27017/heheCMS';

//连接模块
mongoose.connect(dbUrl,function (err) {
	if (err) {
		console.log('数据库连接失败');
	}
});

module.exports = mongoose;