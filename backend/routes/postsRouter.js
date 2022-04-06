//Imports
var express = require("express");
var router = express.Router();
var postsCtrl = require("../controllers/postsCtrl");
//TODO : implemant auth middleware here 

//Routes 

router.post('/posts/new/', postsCtrl.createPost);
router.get('/posts/', postsCtrl.listPosts);

//Exports

module.exports = router;