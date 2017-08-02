// 声明控制器的对象
var adminController = {} 

// 引入分类数据库的模型对象
var catModel = require('../models/catModel');

//引入文章数据库模型对象
var articleModel = require('../models/articleModel');

//引入友情连接数据库模型对象
var friendModel = require('../models/friendModel');
// 引入 图片上传的配置文件
var imgUpload = require('../configs/imgUpload_config');


// 添加分类
adminController.catAdd = function(req, res, next) {
	res.render('admin/catAdd');
	// res.send('添加分类的页面')
}

// 添加分类数据的操作
adminController.catInsert = function(req, res, next) {

	// 上传图片保存的位置	
	var imgPath = './uploads';
	// 定义允许上传的文件类型
  	var imgType = ['image/gif','image/png','image/jpeg'];
    // 限制文件大小 （单位）
    var fileSize = 1024 * 1024 * 5;

	var upload = imgUpload(imgPath,imgType,fileSize).single('imgUrl');

	// 图片上传
	upload(req, res,function (err) {
		// 把图片放到 req.body 里
		req.body.imgUrl = req.file.filename;

		catModel.create(req.body,function(err){
			if(err){
				res.send('操作失败');
			}else{
				res.redirect('/admin/catList');
			}
		});
	});
}


// 分类 列表
adminController.catList = function(req, res, next) {
	// 查询分类
	catModel.find(function(err,data){
		res.render('admin/catList',{datalist:data});
	});
}


adminController.catEdit = function (req,res,next) {
	
	// var tj = { _id: new require('mongoose').ObjectId(req.params._id) };
	catModel.find({_id:req.params._id},function (err,data) {
		if (err) {
			res.send(err)
		}else{
			res.render('admin/catEdit',{data:data[0]});
		}
	})
}

adminController.catDel = function (req,res,next) {
	console.log(req.params); 
	// var tj = { _id: new require('mongoose').ObjectId(req.params._id) };
	// console.log(tj);
	catModel.remove({_id:req.params._id},function (err,data) {
		if (err) {
			res.send(err)
		}else{
			res.redirect('/admin/catList');
		}
	})
}

adminController.catUpdate = function (req,res,next) {
	console.log(req);
	var _id = req.query._id;
	delete req.query._id;
	catModel.update({_id:_id},req.query,function (err) {
		if (err) {
			console.log(err);
		}else{
			res.redirect('/admin/catList');
		} 
	}) 
}  
//添加文章数据的操作 
adminController.articleAdd = function (req,res) {
	catModel.find(function (err,data) { 
		if (err) {
			console.log(err);	
		}else{
			res.render('admin/articleAdd',{datalist:data})
		}
	}) 
}

 
// 文章数据插入数据库的操作
adminController.articleInsert = function(req, res, next) {
	console.log(req.body);
	articleModel.create(req.body,function (err) {
		if (err) {
			console.log(err);
		}else{ 
			res.redirect('/admin/articleList');
		}
	}) 
}
 
// 文章 列表
adminController.articleList = function(req, res, next) {
	articleModel.find({isDel:0}).populate('catId',{name:1}).exec(function (err,data) {
		res.render('admin/articleList',{datalist:data});
	});
}

adminController.articleEdit = function (req,res) {
	var _id = req.params._id;
	// console.log(req.params);
	articleModel.find({_id:_id},function (err,data) {
		if (err) {
			console.log(err);
		}else{
			catModel.find(function (err,datalist) {
				if (err) {
					console.log(err);
				}else{
					console.log(data[0].title);
					res.render('admin/articleEdit',{data:data[0],datalist:datalist})
				}
			})
		}
	})
}
adminController.articleUpdate = function(req,res){
	var _id = req.query._id;
	delete req.query._id;
	console.log(req.query);
	articleModel.update({_id:_id},req.query,function (err) {
		if (err) {
			console.log(err);
		}else{
			res.redirect('/admin/articleList')
		};
	});
}

adminController.articleDel = function (req,res) {
	articleModel.update({_id:req.params._id},{$set:{isDel:1}},function (err) {
		if (err) {
			console.log(err);
		}else{
			res.redirect('/admin/articleList');
		}
	})
}	

adminController.editArticle = function (req,res) {
	articleModel.find({_id:req.params._id},function (err,data){
		if (err){
			console.log(err);
		}else{
			// console.log(data);
			res.render('admin/editArticle',{data:data[0]});
		}
	})
}	
adminController.UpdateContent = function (req,res) {
	var _id = req.body._id;
	console.log(req.body);	
	delete req.body._id;

	articleModel.update({_id:_id},{$set:{"content":req.body.content}},function (err) {
		if (err) {
			console.log(err);
		}else{
			res.redirect('/admin/articleList');
		}
	})
}
 
adminController.transbin = function (req,res) {
	articleModel.find({isDel:1}).populate('catId',{name:1}).exec(function (err,data) {
		res.render('admin/transbin',{datalist:data});
	});	
}

adminController.reshowArticle = function (req,res) {
	console.log(req.params._id);
	articleModel.update({_id:req.params._id},{$set:{isDel:0}},function (err) {
		if (err) {
			console.log(err);
		}else{
			res.redirect('/admin/transbin');
		}
	})
}

adminController.byeArticle = function (req,res) {
	console.log('test');
	articleModel.remove({_id:req.params._id},function (err) {
		if (err) {
			console.log(err);
		}else{
			res.redirect('/admin/transbin'); 
		}
	})
}

//友情连接的相关路由
adminController.friendInsert = function (req,res) {
	friendModel.create(req.body,function (err) {
		if (err) {
			console.log(err);
		}else{
			res.redirect('/admin/friendList');
		}
	})
}
adminController.friendList = function function_name(req,res) {
	friendModel.find(function (err,data) {
		if (err) {
			console.log(err);
		}else{
			res.render('admin/friendList',{datalist:data});
		}
	})
}

adminController.friendEdit = function (req,res) {
	friendModel.find({_id:req.params._id},function (err,data) {
		if (err) {
			console.log(err);
		}else{
			res.render('admin/friendEdit',{data:data[0]});
		}
	})
}

adminController.friendUpdate = function (req,res) {
	var _id = req.body._id;
	console.log(req.body);
	delete req.body._id;
	friendModel.update({_id:_id},req.body,function (err) {
		if (err) {
			console.log(err);
		}else{
			res.redirect('/admin/friendList'); 
		}
	})
}

adminController.friendDel = function (req,res) {
	friendModel.remove({_id:req.params._id},function (err) {
		if (err) {
			console.log(err);
		}else{
			res.redirect('/admin/friendList');
		}
	})
}

adminController.friendCheck = function (req,res) {
	friendModel.find({status:0},function (err,data) {
		if (err) {
			console.log(err);
		}else{
			res.render('admin/friendCheck',{datalist:data})
		}
	})
}

adminController.friendAgree = function (req,res) {
	friendModel.update({_id:req.params._id},{$set:{status:1}},function (err) {
		if (err) {
			console.log(err);
		}else{
			res.redirect('/admin/friendCheck');
		}
	})
}
// 对外暴露 后台控制器的对象
module.exports = adminController;