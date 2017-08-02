var express = require('express');
var router = express.Router(); 
   
var adminController = require('../controller/adminController'); 
router.get('/', function(req, res, next) {
  res.render('admin/admin');
});
router.get('/top',function (req,res,next) {
	res.render('admin/top');
})
router.get('/left',function (req,res,next) {
	res.render('admin/left');
})
router.get('/switch',function (req,res,next) {
	res.render('admin/switch');
})
router.get('/main',function (req,res,next) { 
	res.render('admin/main');
})
router.get('/buttom',function (req,res,next) {
	res.render('admin/buttom');
})
router.get('/cat',function (req,res,next) {
	res.render('admin/cat');
})
router.get('/catAdd',function (req,res,next) {
	res.render('admin/catAdd');
})
router.post('/catInsert',adminController.catInsert); 
router.get('/catList',adminController.catList);

router.get('/catEdit/:_id',adminController.catEdit);

router.get('/catDel/:_id',adminController.catDel);

router.get('/catUpdate',adminController.catUpdate);
 
router.get('/article',function (req,res,next) {
	res.render('admin/article'); 
})
router.get('/articleAdd',adminController.articleAdd);
router.post('/articleInsert',adminController.articleInsert);
router.get('/articleList',adminController.articleList);

router.get('/articleEdit/:_id',adminController.articleEdit);
router.get('/articleDel/:_id',adminController.articleDel);
router.get('/articleUpdate',adminController.articleUpdate);

router.get('/editArticle/:_id',adminController.editArticle);

router.post('/UpdateContent',adminController.UpdateContent);

router.get('/transbin',adminController.transbin);

router.get('/reshowArticle/:_id',adminController.reshowArticle);
router.get('/byeArticle/:_id',adminController.byeArticle);

router.get('/friend',function (req,res) {
	res.render('admin/friend') 
});
router.get('/friendAdd',function (req,res) {
	res.render('admin/friendAdd')
});

router.post('/friendInsert',adminController.friendInsert);

router.get('/friendList',adminController.friendList);
router.get('/friendEdit/:_id',adminController.friendEdit);
router.post('/friendUpdate',adminController.friendUpdate);
router.get('/friendDel/:_id',adminController.friendDel);

router.get('/friendCheck',adminController.friendCheck);

router.get('/friendAgree/:_id',adminController.friendAgree);
module.exports = router; 
