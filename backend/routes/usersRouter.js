//Imports
var express = require("express");
var router = express.Router();
var emailValidator = require('../middleware/emailValidator');
var passwordValidator = require('../middleware/passwordValidator');
var usernameValidator = require('../middleware/usernameValidator');
var usersCtrl = require("../controllers/usersCtrl");
var auth_user = require("../middleware/auth_user");

//Routes 

router.post('/users/register/', emailValidator, usernameValidator, passwordValidator, usersCtrl.register);
router.post('/users/login/', emailValidator, passwordValidator, usersCtrl.login);
router.get('/users/me/', auth_user, usersCtrl.getUserProfile);
router.put('/users/me/updateProfile', auth_user, usersCtrl.updateUserProfile);
router.put('/users/me/updatePassword', auth_user, passwordValidator, usersCtrl.updateUserPassword);
router.delete('/users/me/deleteProfile', auth_user, usersCtrl.deleteUserProfile);


//Exports

module.exports = router;