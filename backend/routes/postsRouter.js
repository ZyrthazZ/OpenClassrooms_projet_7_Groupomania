//Imports
var express = require("express");
var router = express.Router();
var postsCtrl = require("../controllers/postsCtrl");
var postValidator = require("../middleware/postValidator");
var auth_user = require('../middleware/auth_user');



//Routes 

router.post('/posts/new/', postValidator, auth_user, postsCtrl.createPost);
router.get('/posts/', auth_user, postsCtrl.listPosts);

//Exports

module.exports = router;