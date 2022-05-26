//Imports
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const postsCtrl = require("../controllers/postsCtrl");
const postValidator = require("../middleware/postValidator");
const auth_post = require('../middleware/auth_post');
const auth_user = require('../middleware/auth_user');

//Routes 

router.post('/posts/new/', multer, postValidator, auth_user,  postsCtrl.createPost);
router.get('/posts/:postId', multer, auth_user, postsCtrl.listOnePost);
router.get('/posts/', multer, auth_user, postsCtrl.listAllPosts);
router.put('/posts/:postId/updatePost', multer, auth_post, postsCtrl.updatePost);
router.delete('/posts/:postId/deletePost', multer, auth_post, postsCtrl.deletePost);

//Exports

module.exports = router;