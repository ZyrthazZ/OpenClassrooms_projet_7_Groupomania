//Imports

const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/postsCtrl");
const postValidator = require("../middleware/postValidator");
const auth_post = require('../middleware/auth_post');
const auth_user = require('../middleware/auth_user');



//Routes 

router.post('/posts/new/', postValidator, auth_user, postsCtrl.createPost);
router.get('/posts/', auth_user, postsCtrl.listPosts);
router.put('/posts/:postId/updatePost', auth_post, postsCtrl.updatePost);
router.delete('/posts/:postId/deletePost', auth_post, postsCtrl.deletePost);

//Exports

module.exports = router;