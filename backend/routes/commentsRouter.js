//Imports

const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsCtrl");
const auth_user = require("../middleware/auth_user");

//Routes

router.post('/posts/comments/:postId/new', auth_user, commentsCtrl.createComment);

//Exports

module.exports = router;