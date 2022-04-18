//Imports

const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsCtrl");
const auth_user = require("../middleware/auth_user");
const auth_comment = require("../middleware/auth_comment");

//Routes

router.post('/posts/comments/:postId/new', auth_user, commentsCtrl.createComment);
router.put('/posts/comments/:commentId/updateComment', auth_comment, commentsCtrl.updateComment);
router.delete('/posts/comments/:commentId/deleteComment', auth_comment, commentsCtrl.deleteComment);

//Exports

module.exports = router;