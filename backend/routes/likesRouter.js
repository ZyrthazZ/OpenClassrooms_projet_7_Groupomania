//Imports

var express = require("express");
var router = express.Router();
var likesCtrl = require("../controllers/likesCtrl");
//TODO : implemant auth middleware here 

//Routes 

router.post('/posts/:postId/vote', likesCtrl.likeOrDislikePost);


//Exports

module.exports = router;