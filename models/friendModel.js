//引入数据库配置模块
var mongoose = require('../configs/db_config.js');

//定义分类骨架
var friendSchema = new mongoose.Schema({
	name:{
		type:String,
		default:'网站',
	},
	keyword:{ 
		type:String,
		default:'网站', 
	},
	url:{
		type:String,
		default:'',
	},
	status:{
		type:Number,
		default:1,
		//状态码，1是同意，0是未批准
	},
	connecter:{
		type:Number,
		default:'',
	}
});

//定义集合
var friendMdoel = mongoose.model('friend',friendSchema);

module.exports = friendMdoel;