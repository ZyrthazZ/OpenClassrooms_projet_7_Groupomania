//Imports
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const postsCtrl = require("../controllers/postsCtrl");
const postValidator = require("../middleware/postValidator");
const auth_post = require('../middleware/auth_post');
const auth_user = require('../middleware/auth_user');

//Routes 

router.post('/posts/new/', postValidator, auth_user, multer, postsCtrl.createPost);
router.get('/posts/:postId', auth_user, multer, postsCtrl.listOnePost);
router.get('/posts/', auth_user, multer, postsCtrl.listAllPosts);
router.put('/posts/:postId/updatePost', auth_post, multer, postsCtrl.updatePost);
router.delete('/posts/:postId/deletePost', auth_post, multer, postsCtrl.deletePost);

//Exports

module.exports = router;