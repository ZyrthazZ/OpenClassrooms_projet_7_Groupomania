//Imports
var express = require("express");
var router = express.Router();
var postsCtrl = require("../controllers/postsCtrl");
var auth_posts = require('../middleware/auth_post');
var auth_user = require('../middleware/auth_user');

//FIX THIS : how can the auth_posts work with 
//an empty db ? 


//Routes 

router.post('/posts/new/', auth_user, postsCtrl.createPost);
router.get('/posts/', auth_user, postsCtrl.listPosts);

//Exports

module.exports = router;