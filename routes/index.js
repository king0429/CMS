var express = require('express');
var router = express.Router(); 

var indexController = require('../controller/indexController'); 

router.get('/', indexController.getIndex);

router.get('/articleList/:_id',indexController.articleList);

router.get('/articleContent/:_id',indexController.articleContent);

router.get('/linkApplication',indexController.linkApplication);

router.get('/linkApply',indexController.linkApply);
router.get('/wait',function (req,res) {
	res.render('index/wait');
});
module.exports = router;  
 