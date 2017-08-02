// 声明控制器的对象
var indexController = {}; 
 
// 引入分类数据库的模型对象
var catModel = require('../models/catModel');

//引入文章数据库模型对象
var articleModel = require('../models/articleModel');

//引入友情连接数据库模型对象
var friendModel = require('../models/friendModel');

indexController.getIndex = function (req,res) {
	catModel.find(function (err,datalist) {
		if (err) {
			console.log(err);
		}else{
			getData(0);
			function getData(i) {
				articleModel.find({catId:datalist[i]._id}).exec(function (err,data) {
					datalist[i].article = data;
					if (i<datalist.length-1) {
						getData(++i);
					}else{
						friendModel.find({status:1},function (err,friendData) {
							if (err) {
								console.log(err);
							}else{
								res.render('index/index',{datalist:datalist,friendData:friendData});
								// console.log(datalist);			
							}
						})
					}
				})
			}
		}
	})
}

indexController.articleList = function (req,res) {
	var catId = req.params._id;
	articleModel.find({catId:catId},function (err,data) {
		if (err) {
			console.log(err);
		}else{
			catModel.find(function (err,datalist) {
				if (err) {
					console.log(err);
				}else{
					friendModel.find({status:1},function (err,friendData) {
						if (err) {
							console.log(err);
						}else{
							res.render('index/articleList',{datalist:datalist,data:data,friendData:friendData})
						}
					})
				}
			})
		}
	})
}

indexController.articleContent = function (req,res) {
	var _id = req.params._id;
	articleModel.find({_id:_id},function (err,data) {
		if (err) {
			console.log(err);
		}else{
			catModel.find(function (err,datalist) {
				if (err) {
					console.log(err);
				}else{
					friendModel.find({status:1},function (err,friendData) {
						if (err) {
							console.log(err);
						}else{
							res.render('index/articleContent',{datalist:datalist,data:data[0],friendData:friendData})
						}
					})
				}
			})
		} 
	})	
}

indexController.linkApplication = function (req,res) {
	catModel.find(function (err,datalist) {
		if (err) {
			console.log(err);
		}else{
			friendModel.find({status:1},function (err,friendData) {
				if (err) {
					console.log(err);
				}else{
					res.render('index/linkApplication',{datalist:datalist,friendData:friendData})
				}
			})
		}
	})	
}

indexController.linkApply = function (req,res) {
	friendModel.create(req.query,function (err) {
		console.log(req);
		if (err) {
			console.log(err);
		}else{
			res.redirect('/wait');
		}
	})
}
module.exports = indexController;