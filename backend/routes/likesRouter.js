//Imports

var express = require("express");
var router = express.Router();
var likesCtrl = require("../controllers/likesCtrl");
var auth_post = require("../middleware/auth_post");
var auth_user = require('../middleware/auth_user');

//Routes 

router.post('/posts/:postId/vote/like', auth_user, likesCtrl.likePost);
router.post('/posts/:postId/vote/dislike', auth_user, likesCtrl.dislikePost);



//Exports

module.exports = router;