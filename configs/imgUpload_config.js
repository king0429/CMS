// 引入模块
var path = require('path');
// 引入一下模块
var multer = require('multer');
// 生成唯一的id
var uid = require('uid');
var timestamp = require('time-stamp');

/**
* 功能：图片上传配置文件的函数
* @param imgPsth string   图片保存的路径
* @param imgType Array    允许文件上传的类型 例：['image/gif','image/png','image/jpeg']
* @param fileSize Number  单位字节
*/
function imgUpload(imgPsth,imgType,fileSize){
	// 文件上传的配置======================
	var storage = multer.diskStorage({
	  // 设置文件上传的目录
	  destination: function (req, file, cb) {
	    cb(null, imgPsth)
	  },
	  // 保存文件时设置文件名
	  filename: function (req, file, cb) {
	    // 获取上传文件的后缀
	    var extname = path.extname(file.originalname)
	    // 自定义上传文件保存的文件名称
	    cb(null,'upic_'+timestamp('YYYYMMDD')+timestamp('HH')+'_'+uid()+extname);
	  }
	})

	// 过滤函数(文件类型)
	function fileFilter (req, file, cb) {
	  if(imgType.indexOf(file.mimetype)==-1){
	    // 不接收这个文件
	    cb(null, false)
	    // 如果有问题，你可以总是这样发送一个错误:
	    cb(new Error('只能上传、gif、png、jpeg 格式的图片'));       
	  }else{
	    // 接收这个文件
	    cb(null, true)
	  }
	}


	var upload = multer({ 
	  // 在哪里存储文件 更改文件名。
	  storage: storage,
	  // 文件过滤器，控制哪些文件可以被接受 (类型)
	  fileFilter:fileFilter,
	  // 限制上传的数据
	  limits:{
	    // 限制文件大小 （单位）
	    fileSize: fileSize
	  }
	});

	return upload;

}

module.exports = imgUpload;


