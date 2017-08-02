//引入数据库配置模块
var mongoose = require('../configs/db_config.js');

//定义分类骨架
var catSchema = new mongoose.Schema({
	name:{
		type:String,
		unique:true,
	},
	imgUrl:{
		type:String,
		default:'',
	},
	info:{
		type:String,
		default:'',
	},
	ctime:{
		type:Date,
		default:new Date(),
	},
	order:{
		type:Number,
		default:9999,
	}
});

//定义集合
var catModel = mongoose.model('cat',catSchema);

module.exports = catModel;