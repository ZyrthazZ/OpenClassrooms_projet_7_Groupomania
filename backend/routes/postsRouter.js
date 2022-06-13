//Imports
const express = require("express");
const router = express.Router();
const multerPosts = require("../middleware/multer-config-posts");
const postsCtrl = require("../controllers/postsCtrl");
const postValidator = require("../middleware/postValidator");
const auth_post = require('../middleware/auth_post');
const auth_user = require('../middleware/auth_user');

//Routes 

router.post('/posts/new/', multerPosts, postValidator, auth_user, postsCtrl.createPost);
router.get('/posts/listOnePost/:postId/', multerPosts, auth_user, postsCtrl.listOnePost);
router.get('/posts/listAllPosts', multerPosts, auth_user, postsCtrl.listAllPosts);
router.put('/posts/:postId/updatePost', multerPosts, auth_post, postsCtrl.updatePost);
router.delete('/posts/:postId/deletePost', multerPosts, auth_post, postsCtrl.deletePost);

//Exports

module.exports = router;