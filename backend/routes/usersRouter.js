//Imports
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const emailValidator = require('../middleware/emailValidator');
const passwordValidator = require('../middleware/passwordValidator');
const usernameValidator = require('../middleware/usernameValidator');
const auth_user = require("../middleware/auth_user");
const usersCtrl = require("../controllers/usersCtrl");

//Routes 

router.post('/users/register/', emailValidator, usernameValidator, passwordValidator, multer, usersCtrl.register);
router.post('/users/login/', emailValidator, passwordValidator, usersCtrl.login);
router.get('/users/:userId', auth_user, multer, usersCtrl.getUserProfile);
router.put('/users/:userId/updateProfile', auth_user, multer, usersCtrl.updateUserProfile);
router.put('/users/me/updatePassword', auth_user, passwordValidator, usersCtrl.updateUserPassword);
router.delete('/users/:userId/deleteProfile', auth_user, multer, usersCtrl.deleteUserProfile);


//Exports

module.exports = router;