//Imports

const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/likesCtrl");
const auth_user = require('../middleware/auth_user');

//Routes 

router.post('/posts/:postId/like', auth_user, likesCtrl.likePost);



//Exports

module.exports = router;