//引入数据库配置模块
var mongoose = require('../configs/db_config.js');

//定义分类骨架
var articleSchema = new mongoose.Schema({
	title:{
		type:String,
		default:'对不起，没标题',
	},
	author:{
		type:String, 
		default:'佚名', 
	},
	keyword:{ 
		type:String,
		default:'文章', 
	},
	catId:{
		type:'ObjectId',
		ref:'cat'
	},
	content:{
		type:String,
		default:'',
	},
	ctime:{
		type:Date,
		default:new Date(),
	},
	isDel:{
		type:Number,
		default:0,
	}
});

//定义集合
var articleMdoel = mongoose.model('article',articleSchema);

module.exports = articleMdoel;