//Imports

var express = require("express");
var router = express.Router();
var likesCtrl = require("../controllers/likesCtrl");
var auth_user = require('../middleware/auth_user');

//Routes 

router.post('/posts/:postId/like', auth_user, likesCtrl.likePost);



//Exports

module.exports = router;