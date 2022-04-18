//Imports

const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsCtrl");
const auth_user = require("../middleware/auth_user");

//Routes

router.post('/posts/comments/:postId/new', auth_user, commentsCtrl.createComment);
router.put('/posts/comments/:commentId/updateComment', auth_user, commentsCtrl.updateComment);
router.delete('/posts/comments/:commentId/deleteComment', auth_user, commentsCtrl.deleteComment);

//Exports

module.exports = router;