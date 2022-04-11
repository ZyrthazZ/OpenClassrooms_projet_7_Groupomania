//Imports
var express = require("express");
var router = express.Router();
var postsCtrl = require("../controllers/postsCtrl");
var auth_posts = require('../middleware/auth_post');


//Routes 

router.post('/posts/new/', auth_posts, postsCtrl.createPost);
router.get('/posts/', auth_posts, postsCtrl.listPosts);

//Exports

module.exports = router;